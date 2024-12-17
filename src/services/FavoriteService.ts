import { Favorite } from '../models/Recipe';

export class FavoriteService {
    private mockFavorites: Favorite[] = [
        {
            id: 1,
            userId: 1,
            recipeId: 1
        },
        {
            id: 2,
            userId: 1,
            recipeId: 2
        }
    ];

    async getFavoritesByUserId(userId: number): Promise<Favorite[]> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.mockFavorites.filter(f => f.userId === userId);
    }

    async addFavorite(favorite: Omit<Favorite, 'id'>): Promise<Favorite> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newFavorite: Favorite = {
            ...favorite,
            id: this.mockFavorites.length + 1
        };
        
        this.mockFavorites.push(newFavorite);
        return newFavorite;
    }

    async removeFavorite(userId: number, recipeId: number): Promise<Favorite | null> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const index = this.mockFavorites.findIndex(
            f => f.userId === userId && f.recipeId === recipeId
        );
        
        if (index === -1) return null;
        
        const [removedFavorite] = this.mockFavorites.splice(index, 1);
        return removedFavorite;
    }
}
