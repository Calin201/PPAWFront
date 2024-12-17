import { User } from './User';
import { Recipe } from './Recipe';

export interface Favorite {
    id: number;
    userId: number;
    recipeId: number;
    user?: User;
    recipe?: Recipe;
}
