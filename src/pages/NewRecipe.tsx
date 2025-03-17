import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlus, FiMinus, FiSave, FiX } from 'react-icons/fi';
import { Recipe, RecipeIngredient, Ingredient } from '../models/Recipe';
import { RecipeService } from '../services/RecipeService';
import { IngredientService } from '../services/IngredientService';
import Snackbar from '../components/Snackbar';

// Interface for ingredient form state
interface IngredientFormState {
    ingredientName: string;
    quantity: number;
    unitName: string;
}

const NewRecipe: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [recipe, setRecipe] = useState<Partial<Recipe>>({
        recipeName: '',
        description: '',
        instructions: '',
        prepTime: 0,
        cookTime: 0,
        recipeIngredients: [],
        authorId: 1, // Temporar hardcodat - ar trebui să vină din autentificare
        subscriptionId: 1, // Temporar hardcodat - ar trebui să vină din autentificare
        dietaryPreferences: [], // Array gol inițial
        favorites: [] // Array gol inițial
    });
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [newIngredient, setNewIngredient] = useState<IngredientFormState>({
        ingredientName: '',
        quantity: 0,
        unitName: ''
    });
    const mockUnits = [
        { id: 1, unitName: 'g' },
        { id: 2, unitName: 'ml' },
        { id: 3, unitName: 'piece' },
    ];

    useEffect(() => {
        fetchIngredients();
    }, []);

    const fetchIngredients = async () => {
        try {
            const ingredientService = new IngredientService();
            const data = await ingredientService.getAllIngredients();
            setIngredients(data as Ingredient[]);
        } catch (err) {
            console.error('Error fetching ingredients:', err);
            setError('Failed to load ingredients');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRecipe(prev => ({
            ...prev,
            [name]: name === 'prepTime' || name === 'cookTime' ? parseInt(value) || 0 : value
        }));
    };

    const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                ingredientName: selectedIngredient.ingredientName,
                unitName: selectedIngredient.unit?.unitName ?? ''
            }));
        }
    };

    const addIngredient = () => {
        if (!newIngredient.ingredientName || !newIngredient.quantity) {
            setError('Please fill in all ingredient fields');
            return;
        }

        // Find the selected ingredient to get its ID
        const selectedIngredient = ingredients.find(
            ing => ing.ingredientName === newIngredient.ingredientName
        );

        if (!selectedIngredient) {
            setError('Invalid ingredient selected');
            return;
        }

        // Create a proper RecipeIngredient object
        const recipeIngredient: RecipeIngredient = {
            ingredientId: selectedIngredient.id,
            quantity: newIngredient.quantity,
            ingredient: selectedIngredient,
            recipeId: 0
        };

        setRecipe(prev => ({
            ...prev,
            recipeIngredients: [...(prev.recipeIngredients || []), recipeIngredient]
        }));

        // Reset form
        setNewIngredient({
            ingredientName: '',
            quantity: 0,
            unitName: ''
        });
    };

    const removeIngredient = (index: number) => {
        setRecipe(prev => ({
            ...prev,
            recipeIngredients: prev.recipeIngredients?.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!recipe.recipeName || !recipe.description || !recipe.instructions || 
            !recipe.recipeIngredients?.length) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            setSaving(true);
            const recipeService = new RecipeService();
            
            // Format the recipe data before sending
            const recipeToSend = {
                ...recipe,
                author: {
                    id: recipe.authorId,
                    username: "ChefJohn",
                    email: "john@example.com",
                    password: "",
                    subscriptionId: recipe.subscriptionId,
                    joinDate: "2024-01-15T00:00:00",
                    alias: "ChefJohn",
                    totalRecipes: 5,
                    isDeleted: false,
                    deletedAt: null,
                    subscription: {
                        id: recipe.subscriptionId,
                        subscriptionType: "Basic",
                        price: 9.99,
                        users: [],
                        recipes: []
                    },
                    recipes: [],
                    favorites: [],
                    dietaryPreferences: []
                },
                subscription: {
                    id: recipe.subscriptionId,
                    subscriptionType: "Basic",
                    price: 9.99,
                    users: [],
                    recipes: []
                },
                recipeIngredients: recipe.recipeIngredients?.map(ingredient => ({
                    recipeId: 0,
                    ingredientId: ingredient.ingredientId,
                    quantity: ingredient.quantity,
                    ingredient: ingredient.ingredient
                }))
            };
            console.log(recipeToSend);
            await recipeService.createRecipe(recipeToSend as Recipe);
            navigate('/recipes');
        } catch (err) {
            setError('Failed to save recipe. Please try again.');
            console.error('Error saving recipe:', err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow-sm p-6"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Create New Recipe</h1>
                        <button
                            onClick={() => navigate('/recipes')}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <FiX className="w-6 h-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="recipeName" className="block text-sm font-medium text-gray-700">
                                    Recipe Name
                                </label>
                                <input
                                    type="text"
                                    id="recipeName"
                                    name="recipeName"
                                    value={recipe.recipeName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={recipe.description ?? ''}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700">
                                        Prep Time (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        id="prepTime"
                                        name="prepTime"
                                        value={recipe.prepTime}
                                        onChange={handleInputChange}
                                        min="0"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cookTime" className="block text-sm font-medium text-gray-700">
                                        Cook Time (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        id="cookTime"
                                        name="cookTime"
                                        value={recipe.cookTime}
                                        onChange={handleInputChange}
                                        min="0"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Ingredients */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Ingredients</h3>
                            <div className="space-y-4">
                                {recipe.recipeIngredients?.map((ingredient, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center space-x-4"
                                    >
                                        <span className="flex-1">
                                            {ingredient.quantity} {ingredient.ingredient?.unit?.unitName} of {ingredient.ingredient?.ingredientName}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeIngredient(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FiMinus className="w-5 h-5" />
                                        </button>
                                    </motion.div>
                                ))}

                                <div className="space-y-4 mt-4">
                                    <h3 className="text-lg font-medium">Add Ingredients</h3>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Ingredient
                                            </label>
                                            <select
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                value={ingredients.find(ing => ing.ingredientName === newIngredient.ingredientName)?.id || ''}
                                                onChange={handleIngredientSelect}
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
                                            <label className="block text-sm font-medium text-gray-700">
                                                Quantity
                                            </label>
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={newIngredient.quantity || ''}
                                                onChange={handleIngredientChange}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Unit
                                            </label>
                                            <input
                                                type="text"
                                                value={newIngredient.unitName}
                                                readOnly
                                                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                                            />
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                onClick={addIngredient}
                                                className="px-3 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                            >
                                                <FiPlus className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Instructions */}
                        <div>
                            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
                                Instructions
                            </label>
                            <textarea
                                id="instructions"
                                name="instructions"
                                value={recipe.instructions ?? ''}
                                onChange={handleInputChange}
                                rows={6}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <motion.button
                                type="submit"
                                disabled={saving}
                                className="flex items-center space-x-2 px-6 py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FiSave className="w-5 h-5" />
                                <span>{saving ? 'Saving...' : 'Save Recipe'}</span>
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>

            {error && <Snackbar message={error} onClose={() => setError(null)} type="error" />}
        </div>
    );
};

export default NewRecipe;
