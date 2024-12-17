import { User, Subscription } from '../models/User';

class UserService {
    private mockUsers: User[] = [
        {
            id: 1,
            username: "johndoe",
            email: "john@example.com",
            password: "password123",
            subscriptionId: 1
        },
        {
            id: 2,
            username: "janedoe",
            email: "jane@example.com",
            password: "password456",
            subscriptionId: 2
        }
    ];

    private mockSubscriptions: Subscription[] = [
        {
            id: 1,
            subscriptionType: "Basic",
            price: 0
        },
        {
            id: 2,
            subscriptionType: "Premium",
            price: 9.99
        }
    ];

    async getAllUsers(): Promise<User[]> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.mockUsers.map(({ password, ...user }) => user) as User[];
    }

    async getUserById(id: number): Promise<User | null> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const user = this.mockUsers.find(u => u.id === id);
        if (!user) return null;
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword as User;
    }

    async createUser(user: Omit<User, 'id'>): Promise<User> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newUser: User = {
            ...user,
            id: this.mockUsers.length + 1
        };
        
        this.mockUsers.push(newUser);
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword as User;
    }

    async updateUser(id: number, user: Partial<Omit<User, 'id'>>): Promise<User | null> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const index = this.mockUsers.findIndex(u => u.id === id);
        if (index === -1) return null;
        
        this.mockUsers[index] = {
            ...this.mockUsers[index],
            ...user
        };
        
        const { password, ...userWithoutPassword } = this.mockUsers[index];
        return userWithoutPassword as User;
    }

    async deleteUser(id: number): Promise<User | null> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const index = this.mockUsers.findIndex(u => u.id === id);
        if (index === -1) return null;
        
        const [deletedUser] = this.mockUsers.splice(index, 1);
        const { password, ...userWithoutPassword } = deletedUser;
        return userWithoutPassword as User;
    }

    async login(email: string, password: string): Promise<User | null> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = this.mockUsers.find(
            u => u.email === email && u.password === password
        );
        
        if (!user) return null;
        
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword as User;
    }

    async getUserSubscription(userId: number): Promise<Subscription | null> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = await this.getUserById(userId);
        if (!user) return null;
        
        return this.mockSubscriptions.find(s => s.id === user.subscriptionId) || null;
    }
}

export default new UserService();
