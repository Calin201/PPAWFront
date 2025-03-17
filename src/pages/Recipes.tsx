import React, { useEffect, useState } from 'react';
import { Recipe, Ingredient } from '../models/Recipe';
import { RecipeService } from '../services/RecipeService';
import { IngredientService } from '../services/IngredientService';
import RecipeCard from '../components/RecipeCard';
import FoodLoader from '../components/FoodLoader';
import Snackbar from '../components/Snackbar';
import { motion } from 'framer-motion';
import { GiCookingPot } from 'react-icons/gi';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Recipes: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const recipeService = new RecipeService();
                const ingredientService = new IngredientService();
                
                const [fetchedRecipes, fetchedIngredients] = await Promise.all([
                    recipeService.getAllRecipes(),
                    ingredientService.getAllIngredients()
                ]);

                // Enhance recipes with ingredient details
                const enhancedRecipes = fetchedRecipes.map(recipe => ({
                    ...recipe,
                    recipeIngredients: recipe.recipeIngredients.map(ri => ({
                        ...ri,
                        ingredient: fetchedIngredients.find(i => i.id === ri.ingredientId) || null
                    }))
                }));

                setRecipes(enhancedRecipes);
                setIngredients(fetchedIngredients);
                setError(null);
            } catch (err) {
                setError('Oops! Could not fetch your delicious recipes. Please try again!');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAddRecipe = () => {
        navigate('/recipes/new');
    };

    const handleDeleteRecipe = (deletedRecipeId: number) => {
        setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== deletedRecipeId));
    };

    const handleUpdateRecipe = (updatedRecipe: Recipe) => {
        setRecipes(prevRecipes => prevRecipes.map(recipe => 
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        ));
    };

    if (loading) {
        return <FoodLoader />;
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 relative">
            {/* Search Bar */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex items-center bg-white rounded-lg shadow-sm p-2">
                    <input
                        type="text"
                        placeholder="Search recipes..."
                        className="flex-1 px-4 py-2 text-gray-700 focus:outline-none"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <GiCookingPot className="h-6 w-6 text-gray-400 mr-2" />
                </div>
            </div>

            {/* Recipe Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
                {recipes
                    .filter(recipe =>
                        recipe.recipeName?.toLowerCase().includes(searchValue.toLowerCase()) ||
                        recipe.description?.toLowerCase().includes(searchValue.toLowerCase())
                    )
                    .map((recipe, index) => (
                        <RecipeCard 
                            key={recipe.id} 
                            recipe={recipe} 
                            index={index} 
                            onDelete={handleDeleteRecipe}
                            onUpdate={handleUpdateRecipe}
                        />
                    ))}
            </motion.div>

            {/* Floating Action Button */}
            <motion.button
                className="fixed right-8 bottom-8 w-14 h-14 bg-emerald-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddRecipe}
            >
                <FiPlus className="w-6 h-6" />
            </motion.button>

            {/* Error Snackbar */}
            {error && <Snackbar message={error} onClose={() => setError(null)} type="error" />}
        </div>
    );
};

export default Recipes;
