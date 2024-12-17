import { Recipe, RecipeIngredient } from '../models/Recipe';

export class RecipeService {
    private baseUrl = 'http://localhost:5117/api';
    private mockRecipes: Recipe[] = [
        {
            id: 1,
            recipeName: "Spaghetti Carbonara",
            description: "A classic Italian pasta dish",
            prepTime: 15,
            cookTime: 20,
            instructions: "1. Cook pasta\n2. Prepare sauce\n3. Combine",
            authorId: 2,
            subscriptionId: 1,
            recipeIngredients: [
                {
                    id: 1,
                    recipeId: 1,
                    ingredientId: 1,
                    quantity: 2,
                    unitId: 6
                }
            ]
        },
        {
            id: 2,
            recipeName: "Classic Margherita Pizza",
            description: "Traditional Neapolitan pizza",
            prepTime: 20,
            cookTime: 15,
            instructions: "1. Prepare dough\n2. Add toppings\n3. Bake",
            authorId: 3,
            subscriptionId: 1,
            recipeIngredients: [
                {
                    id: 2,
                    recipeId: 2,
                    ingredientId: 2,
                    quantity: 1,
                    unitId: 6
                }
            ]
        }
    ];

    // Mock data methods
    async getAllRecipesMock(): Promise<Recipe[]> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.mockRecipes;
    }

    async getRecipeByIdMock(id: number): Promise<Recipe | null> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.mockRecipes.find(r => r.id === id) || null;
    }

    // API methods
    async getAllRecipesApi(): Promise<Recipe[]> {
        try {
            const response = await fetch(`${this.baseUrl}/Recipe`);
            if (!response.ok) {
                throw new Error('Failed to fetch recipes');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching recipes:', error);
            throw error;
        }
    }

    async getRecipeByIdApi(id: number): Promise<Recipe | null> {
        try {
            const response = await fetch(`${this.baseUrl}/Recipe/${id}`);
            if (!response.ok) {
                if (response.status === 404) {
                    return null;
                }
                throw new Error('Failed to fetch recipe');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching recipe ${id}:`, error);
            throw error;
        }
    }

    async createRecipeApi(recipe: Omit<Recipe, 'id'>): Promise<Recipe> {
        try {
            const response = await fetch(`${this.baseUrl}/Recipe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipe),
            });
            if (!response.ok) {
                throw new Error('Failed to create recipe');
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating recipe:', error);
            throw error;
        }
    }

    async updateRecipeApi(id: number, recipe: Recipe): Promise<Recipe> {
        try {
            const response = await fetch(`${this.baseUrl}/Recipe/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(recipe),
            });
            if (!response.ok) {
                throw new Error('Failed to update recipe');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error updating recipe ${id}:`, error);
            throw error;
        }
    }

    async deleteRecipeApi(id: number): Promise<void> {
        try {
            const response = await fetch(`${this.baseUrl}/Recipe/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete recipe');
            }
        } catch (error) {
            console.error(`Error deleting recipe ${id}:`, error);
            throw error;
        }
    }

    async getRecipesByAuthorApi(authorId: number): Promise<Recipe[]> {
        try {
            const response = await fetch(`${this.baseUrl}/Recipe/author/${authorId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch recipes by author');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching recipes by author ${authorId}:`, error);
            throw error;
        }
    }

    async addIngredientToRecipeApi(recipeId: number, ingredient: Omit<RecipeIngredient, 'id' | 'recipeId'>): Promise<Recipe | null> {
        try {
            const response = await fetch(`${this.baseUrl}/Recipe/${recipeId}/ingredient`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ingredient),
            });
            if (!response.ok) {
                throw new Error('Failed to add ingredient to recipe');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error adding ingredient to recipe ${recipeId}:`, error);
            throw error;
        }
    }

    async removeIngredientFromRecipeApi(recipeId: number, ingredientId: number): Promise<Recipe | null> {
        try {
            const response = await fetch(`${this.baseUrl}/Recipe/${recipeId}/ingredient/${ingredientId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to remove ingredient from recipe');
            }
            return await response.json();
        } catch (error) {
            console.error(`Error removing ingredient from recipe ${recipeId}:`, error);
            throw error;
        }
    }

    // Default methods that can be switched between mock and API
    async getAllRecipes(): Promise<Recipe[]> {
        return this.getAllRecipesApi();
    }

    async getRecipeById(id: number): Promise<Recipe | null> {
        return this.getRecipeByIdApi(id);
    }

    async getRecipesByAuthor(authorId: number): Promise<Recipe[]> {
        return this.getRecipesByAuthorApi(authorId);
    }

    async addIngredientToRecipe(recipeId: number, ingredient: Omit<RecipeIngredient, 'id' | 'recipeId'>): Promise<Recipe | null> {
        return this.addIngredientToRecipeApi(recipeId, ingredient);
    }

    async removeIngredientFromRecipe(recipeId: number, ingredientId: number): Promise<Recipe | null> {
        return this.removeIngredientFromRecipeApi(recipeId, ingredientId);
    }

    async createRecipe(recipe: Omit<Recipe, 'id'>): Promise<Recipe> {
        return this.createRecipeApi(recipe);
    }

    async updateRecipe(id: number, recipe: Partial<Omit<Recipe, 'id'>>): Promise<Recipe | null> {
        return this.updateRecipeApi(id, recipe);
    }

    async deleteRecipe(id: number): Promise<Recipe | null> {
        await this.deleteRecipeApi(id);
        return null;
    }
}
