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

export interface RecipeIngredient {
    id: number;
    recipeId: number;
    ingredientId: number;
    quantity: number;
    unitId: number;
}
