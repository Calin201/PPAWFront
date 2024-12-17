import React, { useEffect, useState } from 'react';
import { Recipe } from '../models/recipe';
import RecipeCard from '../components/RecipeCard';
import { FavoriteService } from '../services/FavoriteService';
import { useNavigate } from 'react-router-dom';
import { RecipeService } from '../services/RecipeService';

const Favorites = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const favoriteService = new FavoriteService();
  const recipeService = new RecipeService();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Assuming user ID 1 for now - you should get this from your auth context
        const userFavorites = await favoriteService.getFavoritesByUserId(1);
        const recipeIds = userFavorites.map(fav => fav.recipeId);
        
        // Fetch the actual recipe details for each favorite
        const recipePromises = recipeIds.map(id => recipeService.getRecipeById(id));
        const recipes = await Promise.all(recipePromises);
        
        setFavorites(recipes.filter(recipe => recipe !== null) as Recipe[]);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Favorite Recipes</h1>
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl text-gray-600 mb-4">You haven't saved any favorites yet</h2>
          <button
            onClick={() => navigate('/recipes')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Browse Recipes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
