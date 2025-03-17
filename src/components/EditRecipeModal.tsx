import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlus, FiTrash } from 'react-icons/fi';
import { Recipe, RecipeIngredient, Ingredient } from '../models/Recipe';
import { RecipeService } from '../services/RecipeService';
import { IngredientService } from '../services/IngredientService';
import Snackbar from './Snackbar';

interface EditRecipeModalProps {
    isOpen: boolean;
    recipe: Recipe;
    onClose: () => void;
    onUpdate: (updatedRecipe: Recipe) => void;
}

const EditRecipeModal: React.FC<EditRecipeModalProps> = ({
    isOpen,
    recipe,
    onClose,
    onUpdate
}) => {
    const [formData, setFormData] = useState<Recipe>({ ...recipe });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [newIngredient, setNewIngredient] = useState<{
        ingredientId: number;
        quantity: number;
        unitName: string;
    }>({
        ingredientId: 0,
        quantity: 0,
        unitName: ''
    });

    useEffect(() => {
        setFormData({ ...recipe });
        fetchIngredients();
    }, [recipe]);

    const fetchIngredients = async () => {
        try {
            const ingredientService = new IngredientService();
            const data = await ingredientService.getAllIngredients();
            setIngredients(data);
        } catch (err) {
            console.error('Error fetching ingredients:', err);
            setError('Failed to load ingredients');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'prepTime' || name === 'cookTime' ? parseInt(value) || 0 : value
        }));
    };

    const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewIngredient(prev => ({
            ...prev,
            [name]: name === 'quantity' ? parseFloat(value) || 0 : value
        }));
    };

    const handleIngredientSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIngredient = ingredients.find(ing => ing.id === parseInt(e.target.value));
        if (selectedIngredient) {
            setNewIngredient(prev => ({
                ...prev,
                ingredientId: selectedIngredient.id,
                unitName: selectedIngredient.unit?.unitName ?? ''
            }));
        }
    };

    const addIngredient = () => {
        if (!newIngredient.ingredientId || !newIngredient.quantity) {
            setError('Please fill in all ingredient fields');
            return;
        }

        const selectedIngredient = ingredients.find(ing => ing.id === newIngredient.ingredientId);
        if (!selectedIngredient) {
            setError('Invalid ingredient selected');
            return;
        }

        const recipeIngredient: RecipeIngredient = {
            recipeId: recipe.id,
            ingredientId: selectedIngredient.id,
            quantity: newIngredient.quantity,
            ingredient: selectedIngredient
        };

        setFormData(prev => ({
            ...prev,
            recipeIngredients: [...prev.recipeIngredients, recipeIngredient]
        }));

        setNewIngredient({
            ingredientId: 0,
            quantity: 0,
            unitName: ''
        });
    };

    const removeIngredient = (index: number) => {
        setFormData(prev => ({
            ...prev,
            recipeIngredients: prev.recipeIngredients.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            setError(null);
            
            const recipeService = new RecipeService();
            const updatedRecipe = await recipeService.updateRecipe(recipe.id, formData);
            
            //onUpdate(updatedRecipe);
            onClose();
        } catch (err) {
            console.error('Error updating recipe:', err);
            setError('Failed to update recipe. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-50"
                        onClick={onClose}
                    />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-0 flex items-center justify-center z-50 p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-semibold text-gray-800">Edit Recipe</h2>
                                    <button
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <FiX className="w-6 h-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Basic Info */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Recipe Name
                                            </label>
                                            <input
                                                type="text"
                                                name="recipeName"
                                                value={formData.recipeName}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                rows={3}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Prep Time (minutes)
                                                </label>
                                                <input
                                                    type="number"
                                                    name="prepTime"
                                                    value={formData.prepTime}
                                                    onChange={handleInputChange}
                                                    min="0"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Cook Time (minutes)
                                                </label>
                                                <input
                                                    type="number"
                                                    name="cookTime"
                                                    value={formData.cookTime}
                                                    onChange={handleInputChange}
                                                    min="0"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ingredients */}
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-4">Ingredients</h3>
                                        <div className="space-y-4">
                                            {formData.recipeIngredients.map((ingredient, index) => (
                                                <div key={index} className="flex items-center space-x-4">
                                                    <div className="flex-1">
                                                        <span className="text-gray-700">
                                                            {ingredient.ingredient?.ingredientName} - {ingredient.quantity} {ingredient.ingredient?.unit?.unitName}
                                                        </span>
                                                    </div>
                                                    <motion.button
                                                        type="button"
                                                        onClick={() => removeIngredient(index)}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="p-2 text-red-500 hover:text-red-700 transition-colors"
                                                    >
                                                        <FiTrash />
                                                    </motion.button>
                                                </div>
                                            ))}

                                            <div className="mt-4 space-y-4">
                                                <h4 className="text-sm font-medium text-gray-700">Add New Ingredient</h4>
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Ingredient
                                                        </label>
                                                        <select
                                                            value={newIngredient.ingredientId}
                                                            onChange={handleIngredientSelect}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                        >
                                                            <option value="">Select an ingredient</option>
                                                            {ingredients.map(ingredient => (
                                                                <option key={ingredient.id} value={ingredient.id}>
                                                                    {ingredient.ingredientName}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Quantity
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="quantity"
                                                            value={newIngredient.quantity}
                                                            onChange={handleIngredientChange}
                                                            min="0"
                                                            step="0.01"
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Unit
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={newIngredient.unitName}
                                                            readOnly
                                                            className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-lg"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex justify-end">
                                                    <motion.button
                                                        type="button"
                                                        onClick={addIngredient}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                                                    >
                                                        Add Ingredient
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Instructions */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Instructions
                                        </label>
                                        <textarea
                                            name="instructions"
                                            value={formData.instructions}
                                            onChange={handleInputChange}
                                            rows={6}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex justify-end space-x-4">
                                        <motion.button
                                            type="button"
                                            onClick={onClose}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                        >
                                            Cancel
                                        </motion.button>
                                        <motion.button
                                            type="submit"
                                            disabled={isSubmitting}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`px-6 py-2 bg-emerald-500 text-white rounded-lg ${
                                                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-emerald-600'
                                            }`}
                                        >
                                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                                        </motion.button>
                                    </div>
                                </form>

                                {error && (
                                    <Snackbar
                                        message={error}
                                        type="error"
                                        onClose={() => setError(null)}
                                    />
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default EditRecipeModal;
