import React, { useEffect, useState } from 'react';
import { User, Subscription } from '../models/User';
import UserService from '../services/UserService';

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    email: ''
  });
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Using user ID 1 for demo purposes - in real app, get from auth context
      const userData = await UserService.getUserById(1);
      if (userData) {
        setUser(userData);
        setEditForm({
          username: userData.username,
          email: userData.email
        });
        const subscriptionData = await UserService.getUserSubscription(userData.id);
        setSubscription(subscriptionData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!user) return;
      
      const updatedUser = await UserService.updateUser(user.id, editForm);
      if (updatedUser) {
        setUser(updatedUser);
        setEditing(false);
        setUpdateMessage('Profile updated successfully!');
        setTimeout(() => setUpdateMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setUpdateMessage('Error updating profile. Please try again.');
      setTimeout(() => setUpdateMessage(''), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          Error loading profile. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-purple-600 text-white p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-300 rounded-full p-4">
                <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <p className="text-purple-200">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Subscription Info */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold mb-4">Subscription</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <span className="font-medium">Current Plan: </span>
                {subscription?.subscriptionType || 'Loading...'}
              </p>
              <p className="text-gray-700 mt-2">
                <span className="font-medium">Price: </span>
                ${subscription?.price.toFixed(2)}/month
              </p>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Profile Information</h2>
              <button
                onClick={() => setEditing(!editing)}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                {editing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {updateMessage && (
              <div className={`p-3 rounded-lg mb-4 ${
                updateMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}>
                {updateMessage}
              </div>
            )}

            {editing ? (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-500 text-sm">Username</label>
                  <p className="text-gray-800">{user.username}</p>
                </div>
                <div>
                  <label className="block text-gray-500 text-sm">Email</label>
                  <p className="text-gray-800">{user.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
