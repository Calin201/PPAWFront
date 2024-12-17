import React, { useEffect, useState } from 'react';
import { Recipe } from '../models/Recipe';
import { RecipeService } from '../services/RecipeService';
import RecipeCard from '../components/RecipeCard';
import FoodLoader from '../components/FoodLoader';
import Snackbar from '../components/Snackbar';
import { motion } from 'framer-motion';
import { GiCookingPot } from 'react-icons/gi';

const Recipes: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState('');

    // Efect pentru încărcarea rețetelor
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const recipeService = new RecipeService();
                const fetchedRecipes = await recipeService.getAllRecipes();
                setRecipes(fetchedRecipes);
                setError(null);
            } catch (err) {
                setError('Oops! Could not fetch your delicious recipes. Please try again!');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    // Efect pentru simularea unei erori după 3 secunde
    useEffect(() => {
        const timer = setTimeout(() => {
            setError('🔥 Oops! The kitchen got too hot! Our chefs are cooling things down...');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);
    const filteredRecipes = recipes.filter(recipe =>
        recipe.recipeName.toLowerCase().includes(searchValue.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchValue.toLowerCase())
    );
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
        <div className="min-h-screen bg-gray-50">
            
            <div className="container mx-auto px-4 py-8">
                {/* Header with animated background */}
                <motion.div
                    className="text-center mb-12 relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 p-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="absolute inset-0 bg-white opacity-10"
                        animate={{
                            backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        style={{
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M0 0h20L0 20z"/%3E%3C/g%3E%3C/svg%3E")'
                        }}
                    />
                    
                    <motion.h1
                        className="text-4xl font-bold text-white mb-4 relative"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <GiCookingPot className="inline-block mr-2 text-5xl" />
                        Discover Delicious Recipes
                    </motion.h1>
                    
                    <motion.p
                        className="text-lg text-white max-w-2xl mx-auto relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Explore our collection of mouth-watering recipes, perfect for any occasion
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div
                        className="mt-6 max-w-xl mx-auto relative"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <input
                            type="text"
                            placeholder="Search recipes..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="w-full px-6 py-3 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-shadow duration-200"
                        />
                        <motion.button
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-500 text-white px-6 py-2 rounded-full"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Search
                        </motion.button>
                    </motion.div>
                </motion.div>

                {recipes.length === 0 ? (
                    <motion.div
                        className="text-center py-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p className="text-gray-600 text-lg">
                            No recipes found. Check back later for new additions!
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {recipes.map((recipe, index) => (
                            <motion.div
                                key={recipe.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <RecipeCard recipe={recipe} index={index} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Snackbar pentru erori */}
            <Snackbar 
                message={error} 
                onClose={() => setError(null)}
                type="error"
            />
        </div>
    );
};

export default Recipes;
