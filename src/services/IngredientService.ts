import { Ingredient, UnitOfMeasurement } from '../models/Recipe';

const mockUnits: UnitOfMeasurement[] = [
    { id: 1, unitName: "grams" },
    { id: 2, unitName: "milliliters" },
    { id: 3, unitName: "pieces" },
    { id: 4, unitName: "tablespoons" },
    { id: 5, unitName: "teaspoons" },
    { id: 6, unitName: "cups" }
];

const mockIngredients: Ingredient[] = [
    {
        id: 1,
        ingredientName: "Flour",
        unitId: 6,
        unit: mockUnits[5]
    },
    {
        id: 2,
        ingredientName: "Sugar",
        unitId: 6,
        unit: mockUnits[5]
    },
    {
        id: 3,
        ingredientName: "Milk",
        unitId: 2,
        unit: mockUnits[1]
    },
    {
        id: 4,
        ingredientName: "Eggs",
        unitId: 3,
        unit: mockUnits[2]
    },
    {
        id: 5,
        ingredientName: "Butter",
        unitId: 1,
        unit: mockUnits[0]
    },
    {
        id: 6,
        ingredientName: "Salt",
        unitId: 4,
        unit: mockUnits[3]
    },
    {
        id: 7,
        ingredientName: "Pepper",
        unitId: 5,
        unit: mockUnits[4]
    }
];

export default class IngredientService {
    private mockIngredients: Ingredient[] = mockIngredients;

    async getAllIngredients(): Promise<Ingredient[]> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.mockIngredients;
    }

    async getIngredientById(id: number): Promise<Ingredient | null> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.mockIngredients.find(i => i.id === id) || null;
    }

    async createIngredient(ingredient: Omit<Ingredient, 'id'>): Promise<Ingredient> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newIngredient: Ingredient = {
            ...ingredient,
            id: this.mockIngredients.length + 1
        };
        
        this.mockIngredients.push(newIngredient);
        return newIngredient;
    }

    async updateIngredient(id: number, ingredient: Partial<Omit<Ingredient, 'id'>>): Promise<Ingredient | null> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const index = this.mockIngredients.findIndex(i => i.id === id);
        if (index === -1) return null;
        
        this.mockIngredients[index] = {
            ...this.mockIngredients[index],
            ...ingredient
        };
        
        return this.mockIngredients[index];
    }

    async deleteIngredient(id: number): Promise<Ingredient | null> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const index = this.mockIngredients.findIndex(i => i.id === id);
        if (index === -1) return null;
        
        const [deletedIngredient] = this.mockIngredients.splice(index, 1);
        return deletedIngredient;
    }

    async getAllUnits(): Promise<UnitOfMeasurement[]> {
        return Promise.resolve(mockUnits);
    }

    async getUnitById(id: number): Promise<UnitOfMeasurement | null> {
        const unit = mockUnits.find(u => u.id === id);
        return Promise.resolve(unit || null);
    }

    async getIngredientsByUnit(unitId: number): Promise<Ingredient[]> {
        return Promise.resolve(
            this.mockIngredients.filter(i => i.unitId === unitId)
        );
    }
}
