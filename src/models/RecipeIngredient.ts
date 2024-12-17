import { Recipe } from './Recipe';
import { Ingredient } from './Ingredient';

export interface RecipeIngredient {
    recipeId: number;
    ingredientId: number;
    quantity: number;
    recipe?: Recipe;
    ingredient?: Ingredient;
}
