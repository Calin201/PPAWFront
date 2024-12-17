import React, { useEffect, useState } from 'react';
import { Ingredient, UnitOfMeasurement } from '../models/Recipe';
import IngredientService from '../services/IngredientService';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [units, setUnits] = useState<UnitOfMeasurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');
  const [newIngredient, setNewIngredient] = useState({
    ingredientName: '',
    unitId: 1
  });

  const ingredientService = new IngredientService();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ingredientsData, unitsData] = await Promise.all([
        ingredientService.getAllIngredients(),
        ingredientService.getAllUnits()
      ]);
      setIngredients(ingredientsData);
      setUnits(unitsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIngredient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const unit = units.find(u => u.id === newIngredient.unitId);
      if (!unit) {
        throw new Error('Selected unit not found');
      }
      const created = await ingredientService.createIngredient({
        ...newIngredient,
        unit
      });
      setIngredients(prev => [...prev, created]);
      setNewIngredient({ ingredientName: '', unitId: 1 });
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  };

  const handleDeleteIngredient = async (id: number) => {
    try {
      await ingredientService.deleteIngredient(id);
      setIngredients(prev => prev.filter(ing => ing.id !== id));
    } catch (error) {
      console.error('Error deleting ingredient:', error);
    }
  };

  const handleUnitFilter = async (unitId: number | 'all') => {
    setSelectedUnit(unitId);
    try {
      const filteredIngredients = unitId === 'all' 
        ? await ingredientService.getAllIngredients()
        : await ingredientService.getIngredientsByUnit(unitId as number);
      setIngredients(filteredIngredients);
    } catch (error) {
      console.error('Error filtering ingredients:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Ingredients Management</h1>
      
      {/* Add New Ingredient Form */}
      <form onSubmit={handleAddIngredient} className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <div className="flex gap-4">
          <input
            type="text"
            value={newIngredient.ingredientName}
            onChange={(e) => setNewIngredient(prev => ({ ...prev, ingredientName: e.target.value }))}
            placeholder="Ingredient name"
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <select
            value={newIngredient.unitId}
            onChange={(e) => setNewIngredient(prev => ({ ...prev, unitId: Number(e.target.value) }))}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {units.map(unit => (
              <option key={unit.id} value={unit.id}>
                {unit.unitName}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Add Ingredient
          </button>
        </div>
      </form>

      {/* Filter by Unit */}
      <div className="mb-6">
        <label className="text-gray-700 mr-2">Filter by unit:</label>
        <select
          value={selectedUnit}
          onChange={(e) => handleUnitFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Units</option>
          {units.map(unit => (
            <option key={unit.id} value={unit.id}>
              {unit.unitName}
            </option>
          ))}
        </select>
      </div>

      {/* Ingredients List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ingredients.map(ingredient => (
          <div key={ingredient.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{ingredient.ingredientName}</h3>
                <p className="text-gray-600">Unit: {ingredient.unit?.unitName}</p>
              </div>
              <button
                onClick={() => handleDeleteIngredient(ingredient.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ingredients;
