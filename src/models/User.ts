export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    subscriptionId: number;
}

export interface Subscription {
    id: number;
    subscriptionType: string;
    price: number;
}

export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface UserRegistrationRequest {
    username: string;
    email: string;
    password: string;
}
