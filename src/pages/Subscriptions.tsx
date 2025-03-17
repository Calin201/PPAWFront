import React, { useEffect, useState } from 'react';
import { Subscription } from '../models/User';
import UserService from '../services/UserService';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const Subscriptions = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSubscription, setSelectedSubscription] = useState<number | null>(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        loadSubscriptions();
    }, []);

    const loadSubscriptions = async () => {
        try {
            const data = await UserService.getAllSubscriptions();
            setSubscriptions(data);
            // In a real app, you would get the user's current subscription
            // const user = await UserService.getCurrentUser();
            // setSelectedSubscription(user.subscriptionId);
        } catch (error) {
            console.error('Error loading subscriptions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubscriptionSelect = async (subscriptionId: number) => {
        try {
            setUpdating(true);
            // Hardcoded user ID for demonstration
            const userId = Number(localStorage.getItem('userId'));
            //await UserService.updateUserSubscription(userId, subscriptionId);
            localStorage.setItem('subscriptionId', String(subscriptionId));

            setSelectedSubscription(subscriptionId);
        } catch (error) {
            console.error('Error updating subscription:', error);
        } finally {
            setUpdating(false);
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
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-12">Choose Your Plan</h1>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {subscriptions.map((subscription) => (
                    <motion.div
                        key={subscription.id}
                        whileHover={{ scale: 1.05 }}
                        className={`rounded-lg overflow-hidden shadow-lg ${
                            selectedSubscription === subscription.id
                                ? 'border-4 border-purple-500'
                                : 'border border-gray-200'
                        }`}
                    >
                        <div className="px-6 py-8">
                            <h3 className="text-2xl font-semibold text-center mb-4">
                                {subscription.subscriptionType}
                            </h3>
                            <div className="text-center mb-6">
                                <span className="text-4xl font-bold">${subscription.price}</span>
                                <span className="text-gray-500">/month</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center">
                                    <FiCheck className="text-green-500 mr-2" />
                                    Access to all recipes
                                </li>
                                {subscription.subscriptionType === 'Premium' && (
                                    <>
                                        <li className="flex items-center">
                                            <FiCheck className="text-green-500 mr-2" />
                                            Create unlimited recipes
                                        </li>
                                        <li className="flex items-center">
                                            <FiCheck className="text-green-500 mr-2" />
                                            Priority support
                                        </li>
                                    </>
                                )}
                            </ul>
                            <button
                                onClick={() => handleSubscriptionSelect(subscription.id)}
                                disabled={updating || selectedSubscription === subscription.id}
                                className={`w-full py-3 px-4 rounded-md transition-colors ${
                                    selectedSubscription === subscription.id
                                        ? 'bg-green-500 text-white cursor-default'
                                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                                } ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {selectedSubscription === subscription.id
                                    ? 'Current Plan'
                                    : updating
                                    ? 'Updating...'
                                    : 'Select Plan'}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Subscriptions;
