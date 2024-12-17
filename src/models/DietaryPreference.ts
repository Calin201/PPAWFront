export interface DietaryPreference {
    id: number;
    preferenceName: string;
    userPreferences?: UserDietaryPreference[];
    recipePreferences?: RecipeDietaryPreference[];
}

export interface UserDietaryPreference {
    id: number;
    userId: number;
    dietaryPreferenceId: number;
    user?: User;
    dietaryPreference?: DietaryPreference;
}

export interface RecipeDietaryPreference {
    id: number;
    recipeId: number;
    dietaryPreferenceId: number;
    recipe?: Recipe;
    dietaryPreference?: DietaryPreference;
}

// Re-export these types from Recipe model to avoid circular dependencies
import { User } from './Recipe';
import { Recipe } from './Recipe';
