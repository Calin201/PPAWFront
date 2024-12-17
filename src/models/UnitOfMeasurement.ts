import { Ingredient } from './Ingredient';

export interface UnitOfMeasurement {
    id: number;
    unitName: string;
    ingredients?: Ingredient[];
}
