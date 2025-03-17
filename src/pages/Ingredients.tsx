import React, { useEffect, useState } from 'react';
import { Ingredient, UnitOfMeasurement } from '../models/Recipe';
import { IngredientService } from '../services/IngredientService';
import { FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [units, setUnits] = useState<UnitOfMeasurement[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');
  const [newIngredient, setNewIngredient] = useState({
    ingredientName: '',
    unitId: 1
  });
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
        unitId: unit.id 
      });
      setIngredients(prev => [...prev, created]);
      setNewIngredient({ ingredientName: '', unitId: 1 });
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  };

  const handleEditClick = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient);
    setIsEditModalOpen(true);
  };

  const handleEditSave = async () => {
    if (!editingIngredient) return;

    try {
      const updated = await ingredientService.updateIngredient(editingIngredient.id, {
        ingredientName: editingIngredient.ingredientName,
        unitId: editingIngredient.unitId
      });

      setIngredients(prev => 
        prev.map(ing => ing.id === updated.id ? updated : ing)
      );
      setIsEditModalOpen(false);
      setEditingIngredient(null);
    } catch (error) {
      console.error('Error updating ingredient:', error);
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
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(ingredient)}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  <FiEdit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteIngredient(ingredient.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <FiTrash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editingIngredient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Ingredient</h2>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editingIngredient.ingredientName}
                  onChange={(e) => setEditingIngredient(prev => ({
                    ...prev!,
                    ingredientName: e.target.value
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Unit</label>
                <select
                  value={editingIngredient.unitId}
                  onChange={(e) => setEditingIngredient(prev => ({
                    ...prev!,
                    unitId: Number(e.target.value)
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  {units.map(unit => (
                    <option key={unit.id} value={unit.id}>
                      {unit.unitName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ingredients;
