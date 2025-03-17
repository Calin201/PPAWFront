import { User, Subscription } from '../models/User';
import { BaseService } from './BaseService';

class UserService extends BaseService<User> {
    constructor() {
        super('User');
    }

    async getAllUsers(): Promise<User[]> {
        return this.getAll();
    }

    async getUserById(id: number): Promise<User | null> {
        return this.getById(id);
    }

    async createUser(user: Omit<User, 'id'>): Promise<User> {
        return this.create(user);
    }

    async updateUser(id: number, user: Partial<Omit<User, 'id'>>): Promise<User | null> {
        return this.update(id, user);
    }

    async deleteUser(id: number): Promise<User | null> {
        return this.delete(id);
    }

    async login(email: string, password: string): Promise<User | null> {
        const users = await this.getAll();
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) return null;
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword as User;
    }

    async getUserSubscription(userId: number): Promise<Subscription | null> {
        const user = await this.getUserById(userId);
        if (!user) return null;
        // Assuming you have an API to get subscriptions
        // For demonstration purposes, we'll use mock data
        const subscriptions = await this.getAllSubscriptions();
        return subscriptions.find(s => s.id === user.subscriptionId) || null;
    }

    async updateUserSubscription(userId: number, subscriptionId: number): Promise<User> {
        const currentUser = await this.getUserById(userId);
        const updatedUser = {
            ...currentUser,
            subscriptionId: subscriptionId
        };
        return this.updateUser(userId, updatedUser);
    }

    async getAllSubscriptions(): Promise<Subscription[]> {
        // Assuming you have an API to get subscriptions
        // For demonstration purposes, we'll use mock data
        return [
            {
                id: 1,
                subscriptionType: "Basic",
                price: 9.99
            },
            {
                id: 2,
                subscriptionType: "Premium",
                price: 19.99
            },
            {
                id: 3,
                subscriptionType: "Recipeer",
                price: 9.99
            },
            {
                id: 4,
                subscriptionType: "Grand Chef",
                price: 19.99
            }
        ];
    }
}

export default new UserService();
