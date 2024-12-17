import { Recipe } from './Recipe';
import { DietaryPreference } from './DietaryPreference';

export interface RecipeDietaryPreference {
    id: number;
    recipeId: number;
    dietaryPreferenceId: number;
    recipe?: Recipe;
    dietaryPreference?: DietaryPreference;
}
