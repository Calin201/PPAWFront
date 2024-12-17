import { DietaryPreference } from '../models/Recipe';

export class DietaryPreferenceService {
    private mockPreferences: DietaryPreference[] = [
        {
            id: 1,
            preferenceName: "Vegetarian"
        },
        {
            id: 2,
            preferenceName: "Vegan"
        },
        {
            id: 3,
            preferenceName: "Gluten-Free"
        }
    ];

    async getAllPreferences(): Promise<DietaryPreference[]> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.mockPreferences;
    }

    async getPreferenceById(id: number): Promise<DietaryPreference | null> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.mockPreferences.find(p => p.id === id) || null;
    }
}

export default new DietaryPreferenceService();
