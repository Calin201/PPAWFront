import { Ingredient, UnitOfMeasurement, CreateIngredientRequest } from '../models/Recipe';
import { BaseService } from './BaseService';
import { UnitService } from './UnitService';

export class IngredientService extends BaseService<Ingredient> {
    private unitService: UnitService;

    constructor() {
        super('Ingredient');
        this.unitService = new UnitService();
    }

    async getAllIngredients(): Promise<Ingredient[]> {
        return this.getAll();
    }

    async getIngredientById(id: number): Promise<Ingredient> {
        return this.getById(id);
    }

    async createIngredient(ingredient: CreateIngredientRequest): Promise<Ingredient> {
        return this.create(ingredient);
    }

    async updateIngredient(id: number, ingredient: Partial<Ingredient>): Promise<Ingredient> {
        return this.update(id, ingredient);
    }

    async deleteIngredient(id: number): Promise<void> {
        return this.delete(id);
    }

    async getAllUnits(): Promise<UnitOfMeasurement[]> {
        return this.unitService.getAllUnits();
    }

    async getUnitById(id: number): Promise<UnitOfMeasurement | null> {
        const units = await this.getAllUnits();
        return units.find(unit => unit.id === id) || null;
    }

    async getIngredientsByUnit(unitId: number): Promise<Ingredient[]> {
        const units = await this.getAllUnits();
        const unit = units.find(u => u.id === unitId);
        if (!unit) return [];
        return unit.ingredients || [];
    }
}
