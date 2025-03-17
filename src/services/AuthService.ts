import { BaseService } from './BaseService';

export interface UserProfile {
    id: number;
    username: string;
    email: string;
    joinDate: string;
    totalRecipes: number;
}

export interface LoginResponse {
    userId: number;
    username: string;
    email: string;
    subscriptionId: number;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export class AuthService extends BaseService<UserProfile> {
    
    constructor() {
        super('Auth');
    }

    async login(request: LoginRequest): Promise<LoginResponse> {
        const response = await this.post<LoginResponse>('login', request);
        // Store the user information
        console.log(response);
        localStorage.setItem('userId', response.userId.toString());
        localStorage.setItem('username', response.username);
        localStorage.setItem('email', response.email);
        localStorage.setItem('subscriptionId', response.subscriptionId.toString());
        return response;
    }

    async register(request: RegisterRequest): Promise<LoginResponse> {
        const response = await this.post<LoginResponse>('register', request);
        // Store the user information after registration
        localStorage.setItem('userId', response.userId.toString());
        localStorage.setItem('username', response.username);
        localStorage.setItem('email', response.email);
        return response;
    }

    async getProfile(userId: number): Promise<UserProfile> {
        const response = await this.get<UserProfile>(`profile/${userId}`);
        return response;
    }

    logout(): void {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('subscriptionId');
    }

    isAuthenticated(): boolean {
        return localStorage.getItem('userId') !== null;
    }

    getCurrentUserId(): number | null {
        const userId = localStorage.getItem('userId');
        return userId ? parseInt(userId) : null;
    }

    protected async get<R>(path: string): Promise<R> {
        const response = await fetch(`${this.baseUrl}/${this.endpoint}/${path}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    protected async post<R>(path: string, data: any): Promise<R> {
        const response = await fetch(`${this.baseUrl}/${this.endpoint}/${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }
}
