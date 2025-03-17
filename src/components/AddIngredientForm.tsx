import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IngredientService } from '../services/IngredientService';
import { CreateIngredientRequest, UnitOfMeasurement } from '../models/Recipe';

interface AddIngredientFormProps {
    onAdd: (ingredient: CreateIngredientRequest) => void;
    onCancel: () => void;
}

const AddIngredientForm: React.FC<AddIngredientFormProps> = ({ onAdd, onCancel }) => {
    const [ingredientName, setIngredientName] = useState('');
    const [unitId, setUnitId] = useState<number>(1);
    const [units, setUnits] = useState<UnitOfMeasurement[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadUnits = async () => {
            try {
                const ingredientService = new IngredientService();
                const fetchedUnits = await ingredientService.getAllUnits();
                setUnits(fetchedUnits);
                if (fetchedUnits.length > 0) {
                    setUnitId(fetchedUnits[0].id);
                }
            } catch (err) {
                setError('Failed to load units of measurement');
                console.error('Error loading units:', err);
            }
        };

        loadUnits();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!ingredientName.trim()) {
            setError('Please enter an ingredient name');
            return;
        }

        const newIngredient: CreateIngredientRequest = {
            id: 0,
            ingredientName: ingredientName.trim(),
            unitId: unitId
        };

        onAdd(newIngredient);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg"
        >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Ingredient</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="ingredientName" className="block text-sm font-medium text-gray-700 mb-1">
                        Ingredient Name
                    </label>
                    <input
                        type="text"
                        id="ingredientName"
                        value={ingredientName}
                        onChange={(e) => setIngredientName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Enter ingredient name"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="unitId" className="block text-sm font-medium text-gray-700 mb-1">
                        Unit of Measurement
                    </label>
                    <select
                        id="unitId"
                        value={unitId}
                        onChange={(e) => setUnitId(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        {units.map((unit) => (
                            <option key={unit.id} value={unit.id}>
                                {unit.unitName}
                            </option>
                        ))}
                    </select>
                </div>

                {error && (
                    <div className="mb-4 text-red-600 text-sm">
                        {error}
                    </div>
                )}

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                        Add Ingredient
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default AddIngredientForm;
