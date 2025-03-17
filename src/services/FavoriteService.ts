import { Favorite } from '../models/Recipe';

export class FavoriteService {
    private baseUrl = 'https://localhost:7117/api';

    async getFavoritesByUserId(userId: number): Promise<Favorite[]> {
        const response = await fetch(`${this.baseUrl}/favorites/user/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch favorites');
        }
        return response.json();
    }

    async addFavorite(userId: number, recipeId: number): Promise<Favorite> {
        const response = await fetch(`${this.baseUrl}/favorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, recipeId })
        });
        if (!response.ok) {
            throw new Error('Failed to add favorite');
        }
        return response.json();
    }

    async removeFavorite(userId: number, recipeId: number): Promise<void> {
        const response = await fetch(`${this.baseUrl}/favorites/${userId}/${recipeId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to remove favorite');
        }
    }
}
