import { BaseService } from './BaseService';
import { UnitOfMeasurement, Ingredient } from '../models/Recipe';

export class UnitService extends BaseService<UnitOfMeasurement> {
    constructor() {
        super('Ingredient');
    }

    async getAllUnits(): Promise<UnitOfMeasurement[]> {
        const response = await fetch(`${this.baseUrl}/Ingredient/units`, {
            method: 'GET',
            headers: {
                'accept': 'text/plain',
                ...this.headers
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch units');
        }
        
        return response.json();
    }

    getUnitForIngredient(ingredientId: number, units: UnitOfMeasurement[]): UnitOfMeasurement | undefined {
        return units.find(unit => 
            unit.ingredients?.some(ingredient => ingredient.id === ingredientId)
        );
    }
}
