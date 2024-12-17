import { User, Recipe } from './Recipe';

export interface Subscription {
    id: number;
    subscriptionType: string;
    price: number;
    users?: User[];
    recipes?: Recipe[];
}
