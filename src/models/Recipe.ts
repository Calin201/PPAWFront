export interface User {
    id: number;
    username: string | null;
    email: string | null;
    password: string | null;
    subscriptionId: number;
    joinDate: string;
    alias: string | null;
    totalRecipes: number;
    isDeleted: boolean;
    deletedAt: string | null;
    subscription: Subscription | null;
    favorites: Favorite[] | null;
    dietaryPreferences: UserDietaryPreference[] | null;
    recipes: Recipe[] | null;
}

export interface Subscription {
    id: number;
    subscriptionType: string | null;
    price: number;
    users: User[] | null;
    recipes: Recipe[] | null;
}

export interface Recipe {
    id: number;
    recipeName: string;
    description: string;
    prepTime: number;
    cookTime: number;
    servings: number;
    instructions: string;
    authorId: number;
    subscriptionId: number;
    author: User;
    subscription: Subscription;
    dietaryPreferences: RecipeDietaryPreference[];
    favorites: Favorite[];
    recipeIngredients: RecipeIngredient[];
}

export interface RecipeIngredient {
    recipeId: number;
    ingredientId: number;
    quantity: number;
    ingredient: Ingredient | null;
}

export interface Ingredient {
    id: number;
    ingredientName: string;
    unitId: number;
    unit: UnitOfMeasurement | null;
    recipeIngredients: RecipeIngredient[] | null;
}

export interface UnitOfMeasurement {
    id: number;
    unitName: string;
    ingredients: Ingredient[];
}

export interface DietaryPreference {
    id: number;
    preferenceName: string | null;
    userDietaryPreferences: UserDietaryPreference[] | null;
    recipeDietaryPreferences: RecipeDietaryPreference[] | null;
}

export interface UserDietaryPreference {
    userId: number;
    preferenceId: number;
    user: User | null;
    preference: DietaryPreference | null;
}

export interface RecipeDietaryPreference {
    recipeId: number;
    preferenceId: number;
    recipe: Recipe | null;
    preference: DietaryPreference | null;
}

export interface Favorite {
    id: number;
    userId: number;
    recipeId: number;
    user: User | null;
    recipe: Recipe | null;
}

export interface CreateIngredientRequest {
    ingredientName: string;
    unitId: number;
}
