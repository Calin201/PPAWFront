import React, { useState } from 'react';
import { Recipe } from '../models/Recipe';
import { FiClock, FiList, FiChevronDown, FiHeart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { GiCookingPot } from 'react-icons/gi';

interface RecipeCardProps {
    recipe: Recipe;
    index: number;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const getUnitName = (unitId: number): string => {
        // You can expand this mapping as needed
        const units: { [key: number]: string } = {
            1: 'grams',
            2: 'ml',
            3: 'pieces',
            4: 'tablespoons',
            5: 'teaspoons',
            6: 'cups'
        };
        return units[unitId] || 'units';
    };

    const getIngredientName = (ingredientId: number): string => {
        // You can expand this mapping as needed
        const ingredients: { [key: number]: string } = {
            1: 'Flour',
            2: 'Sugar',
            3: 'Salt',
            4: 'Butter',
            5: 'Milk'
        };
        return ingredients[ingredientId] || `Ingredient ${ingredientId}`;
    };

    const formatTime = (minutes: number) => {
        if (minutes < 60) {
            return `${minutes} min`;
        }
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };

    return (
        <motion.div 
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform-gpu"
        >
            {/* Recipe Image Placeholder */}
            <motion.div 
                className="h-48 bg-gradient-to-br from-emerald-400 to-teal-500 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            >
                <GiCookingPot className="absolute inset-0 m-auto text-white/20 text-[150px]" />
                
                {/* Like Button */}
                <motion.button
                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsLiked(!isLiked)}
                >
                    <FiHeart 
                        className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`}
                    />
                </motion.button>
            </motion.div>

            {/* Content */}
            <div className="p-6">
                <motion.div layout="position">
                    <motion.h2 
                        className="text-2xl font-bold text-gray-800 mb-2"
                        whileHover={{ scale: 1.02 }}
                    >
                        {recipe.recipeName}
                    </motion.h2>
                <p className="text-gray-600 mb-4">{recipe.description}</p>

                    {/* Time Information */}
                    <div className="flex items-center space-x-6 text-gray-500 mb-4">
                        <motion.div 
                            className="flex items-center"
                            whileHover={{ scale: 1.05, color: '#10B981' }}
                        >
                            <FiClock className="mr-2" />
                        <span>Prep: {formatTime(recipe.prepTime)}</span>
                        </motion.div>
                        <motion.div 
                            className="flex items-center"
                            whileHover={{ scale: 1.05, color: '#10B981' }}
                        >
                            <FiClock className="mr-2" />
                            <span>Cook: {formatTime(recipe.cookTime)}</span>
                        </motion.div>
                    </div>

                    {/* Ingredients Preview */}
                    {recipe.recipeIngredients && recipe.recipeIngredients.length > 0 && (
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <FiList className="text-emerald-600 mr-2" />
                                <h3 className="font-semibold text-gray-700">Main Ingredients</h3>
                    </div>
                            <ul>
                                {recipe.recipeIngredients.map((ri) => (
                                    <li key={ri.id} className="text-sm text-gray-600">
                                        {`${ri.quantity} ${getUnitName(ri.unitId)} of ${getIngredientName(ri.ingredientId)}`}
                                    </li>
                                ))}
                            </ul>
                </div>
                    )}

                    {/* Expand/Collapse Button */}
                    <motion.button
                        className="w-full flex items-center justify-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors"
                    onClick={() => setIsExpanded(!isExpanded)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                >
                        <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FiChevronDown />
                        </motion.div>
                    </motion.button>

                    {/* Instructions Preview */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4 pt-4 border-t border-gray-100"
                        >
                                <h3 className="font-semibold text-gray-700 mb-2">Instructions</h3>
                                <p className="text-gray-600 whitespace-pre-line">
                                {recipe.instructions}
                                </p>
                        </motion.div>
                    )}
                </AnimatePresence>
                </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div 
                className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-2"
                layout="position"
            >
                <motion.button
                    className="px-4 py-2 bg-white text-emerald-600 rounded-lg border border-emerald-200 font-medium"
                    whileHover={{ scale: 1.05, backgroundColor: '#f0fdf4' }}
                    whileTap={{ scale: 0.95 }}
                >
                    Save
                </motion.button>
                <motion.button
                    className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium"
                    whileHover={{ scale: 1.05, backgroundColor: '#059669' }}
                    whileTap={{ scale: 0.95 }}
                >
                    Cook Now
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default RecipeCard;
