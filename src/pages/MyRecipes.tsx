import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../models/Recipe';
import { RecipeService } from '../services/RecipeService';
import RecipeCard from '../components/RecipeCard';
import FoodLoader from '../components/FoodLoader';
import Snackbar from '../components/Snackbar';
import { motion } from 'framer-motion';
import { GiCookingPot } from 'react-icons/gi';
import { FiPlus } from 'react-icons/fi';

const MyRecipes: React.FC = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const fetchMyRecipes = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                navigate('/login');
                return;
            }

            try {
                const recipeService = new RecipeService();
                const userRecipes = await recipeService.getMyRecipes();
                setRecipes(userRecipes);
                setError(null);
            } catch (error) {
                setError('Failed to load your recipes. Please try again!');
                console.error('Error fetching recipes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyRecipes();
    }, [navigate]);

    const handleAddRecipe = () => {
        navigate('/recipes/new');
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
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">My Recipes</h1>
                </div>
                <div className="flex items-center bg-white rounded-lg shadow-sm p-2">
                    <input
                        type="text"
                        placeholder="Search your recipes..."
                        className="flex-1 px-4 py-2 text-gray-700 focus:outline-none"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <GiCookingPot className="h-6 w-6 text-gray-400 mr-2" />
                </div>
            </div>

            {/* Recipe Grid */}
            {recipes.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg mb-4">You haven't created any recipes yet.</p>
                    <button
                        onClick={handleAddRecipe}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                        <FiPlus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Create your first recipe
                    </button>
                </div>
            ) : (
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
                            <RecipeCard key={recipe.id} recipe={recipe} index={index} onDelete={() => {}} onUpdate={() => {}} />
                        ))}
                </motion.div>
            )}

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

export default MyRecipes;
