import { BaseService } from './BaseService';
import { Recipe } from '../models/Recipe';

export class RecipeService extends BaseService<Recipe> {
    constructor() {
        super('Recipe');
    }

    async getAllRecipes(): Promise<Recipe[]> {
        const subscriptionId = localStorage.getItem('userId');
        if (!subscriptionId) {
            throw new Error('No subscription found');
        }
        return this.getByParamId('subscription', parseInt(subscriptionId));
    }

    async addRecipe(recipe: Recipe): Promise<Recipe> {
        return this.create(recipe);
    }

    async updateRecipe(id: number, recipe: Recipe): Promise<Recipe> {
        // Format the recipe data according to API requirements
        const formattedRecipe = {
            ...recipe,
            id: id,
            authorId: recipe.author.id,
            subscriptionId: recipe.subscription.id,
            author: {
                ...recipe.author,
                password: recipe.author.password || "",
                recipes: recipe.author.recipes || [],
                favorites: recipe.author.favorites || [],
                subscription: recipe.author.subscription || {
                    id: recipe.subscription.id,
                    subscriptionType: recipe.subscription.subscriptionType,
                    price: recipe.subscription.price,
                    users: [],
                    recipes: []
                },
                dietaryPreferences: recipe.author.dietaryPreferences || []
            },
            subscription: {
                ...recipe.subscription,
                users: recipe.subscription.users || [],
                recipes: recipe.subscription.recipes || []
            },
            recipeIngredients: recipe.recipeIngredients.map(ri => ({
                recipeId: id,
                ingredientId: ri.ingredientId,
                quantity: ri.quantity,
                ingredient: ri.ingredient
            }))
        };

        return this.update(id, formattedRecipe);
    }

    async deleteRecipe(id: number): Promise<void> {
        return this.delete(id);
    }

    async getRecipesByAuthor(authorId: number): Promise<Recipe[]> {
        return this.getByParamId('author', authorId);
    }

    async getRecipeById(id: number): Promise<Recipe> {
        return this.getById(id);
    }

    async createRecipe(recipe: Partial<Recipe>): Promise<Recipe> {
        return this.create(recipe);
    }

    async getMyRecipes(): Promise<Recipe[]> {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            throw new Error('User not authenticated');
        }
        return this.getRecipesByAuthor(parseInt(userId));
    }

    async searchRecipes(searchTerm: string): Promise<Recipe[]> {
        const response = await this.get<Recipe[]>(`search?searchTerm=${encodeURIComponent(searchTerm)}`);
        return response;
    }

    async getRecipesBySubscription(subscriptionId: number): Promise<Recipe[]> {
        return this.getByParamId('subscription', subscriptionId);
    }

    protected async get<R>(path: string): Promise<R> {
        const response = await fetch(`${this.baseUrl}/${this.endpoint}/${path}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }
}
