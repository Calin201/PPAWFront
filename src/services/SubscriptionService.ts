import { Subscription } from '../models/User';

export class SubscriptionService {
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

    async getAllSubscriptions(): Promise<Subscription[]> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.mockSubscriptions;
    }

    async getSubscriptionById(id: number): Promise<Subscription | null> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.mockSubscriptions.find(s => s.id === id) || null;
    }

    async getSubscriptionByType(type: string): Promise<Subscription | null> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.mockSubscriptions.find(
            s => s.subscriptionType.toLowerCase() === type.toLowerCase()
        ) || null;
    }

    async getUserSubscription(_userId: number): Promise<Subscription | null> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // For demo purposes, return the first subscription
        return this.mockSubscriptions[0];
    }

    async updateUserSubscription(_userId: number, _subscriptionId: number): Promise<boolean> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // For demo purposes, always return success
        return true;
    }

    async getSubscriptionFeatures(subscriptionId: number): Promise<string[]> {
        const features: { [key: string]: string[] } = {
            "Basic": [
                "Access to basic recipes",
                "Save up to 10 favorite recipes",
                "Basic search functionality"
            ],
            "Premium": [
                "Access to all recipes",
                "Unlimited favorite recipes",
                "Advanced search functionality",
                "Create and share custom recipes",
                "Meal planning tools"
            ]
        };

        const subscription = await this.getSubscriptionById(subscriptionId);
        if (!subscription) return [];
        
        return features[subscription.subscriptionType] || [];
    }
}

export default new SubscriptionService();
