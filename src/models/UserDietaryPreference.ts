import { User } from './User';
import { DietaryPreference } from './DietaryPreference';

export interface UserDietaryPreference {
    id: number;
    userId: number;
    dietaryPreferenceId: number;
    user?: User;
    dietaryPreference?: DietaryPreference;
}
