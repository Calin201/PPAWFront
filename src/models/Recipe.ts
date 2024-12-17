export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    subscriptionId: number;
    joinDate: string;
    alias: string;
    totalRecipes: number;
    subscription?: Subscription;
    favorites?: Favorite[];
    dietaryPreferences?: UserDietaryPreference[];
    recipes?: Recipe[];
}

export interface Subscription {
    id: number;
    subscriptionType: string;
    users?: User[];
    recipes?: Recipe[];
}

export interface Recipe {
    id: number;
    recipeName: string;
    description: string;
    prepTime: number;
    cookTime: number;
    instructions: string;
    authorId: number;
    subscriptionId: number;
    recipeIngredients?: RecipeIngredient[];
}

export interface RecipeIngredient {
    id: number;
    recipeId: number;
    ingredientId: number;
    quantity: number;
    unitId: number;
}

export interface Ingredient {
    id: number;
    ingredientName: string;
    unitId: number;
    unit?: UnitOfMeasurement;
}

export interface UnitOfMeasurement {
    id: number;
    unitName: string;
}

export interface DietaryPreference {
    id: number;
    preferenceName: string;
}

export interface UserDietaryPreference {
    id: number;
    userId: number;
    dietaryPreferenceId: number;
    user?: User;
    dietaryPreference?: DietaryPreference;
}

export interface Favorite {
    id: number;
    userId: number;
    recipeId: number;
}
