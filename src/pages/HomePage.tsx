import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GiCookingPot, GiKnifeFork, GiSpellBook } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import FoodLoader from '../components/FoodLoader';
import SplashCursor from '../components/common/SplashCursor';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulăm un timp de încărcare pentru demonstrație
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <FoodLoader />;
    }

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            <SplashCursor />
            {/* Hero Section */}
            <motion.section 
                className="h-screen flex items-center justify-center relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute inset-0">
                    <video
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover opacity-50"
                        style={{ filter: 'brightness(0.5)' }}
                    >
                        <source src="Gordon Ramsay PUNISHES an IDIOT SANDWICH.mp4" type="video/mp4" />
                    </video>
                </div>
                
                <div className="text-center z-10 px-4">
                    <motion.h1 
                        className="text-6xl md:text-8xl font-bold mb-6"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Recipe Hub
                    </motion.h1>
                    <motion.p 
                        className="text-xl md:text-2xl mb-8 text-gray-300"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        Elevate your culinary journey
                    </motion.p>
                    <motion.button
                        className="bg-emerald-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-600 transition-colors"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        onClick={() => navigate('/recipes')}
                    >
                        Explore Recipes
                    </motion.button>
                </div>
            </motion.section>

            {/* Features Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <FeatureCard 
                            icon={<GiCookingPot className="text-5xl" />}
                            title="Discover Recipes"
                            description="Explore a vast collection of curated recipes from around the world"
                        />
                        <FeatureCard 
                            icon={<GiKnifeFork className="text-5xl" />}
                            title="Quality Ingredients"
                            description="Find the perfect ingredients for your culinary masterpieces"
                        />
                        <FeatureCard 
                            icon={<GiSpellBook className="text-5xl" />}
                            title="Precise Measurements"
                            description="Get exact measurements and conversions for perfect results"
                        />
                        <FeatureCard 
                            icon={<MdOutlineRestaurantMenu className="text-5xl" />}
                            title="Create & Share"
                            description="Share your own recipes with our growing community"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Call to Action Section */}
            <motion.section 
                className="py-20 bg-gradient-to-r from-emerald-600 to-teal-700"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Your Culinary Journey Today</h2>
                    <p className="text-xl text-gray-200 mb-8">
                        Join thousands of food enthusiasts and start creating amazing dishes
                    </p>
                    <button 
                        className="bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
                        onClick={() => navigate('/recipes')}
                    >
                        Get Started
                    </button>
                </div>
            </motion.section>
        </div>
    );
};

const FeatureCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
}> = ({ icon, title, description }) => (
    <motion.div 
        className="bg-gray-900 p-6 rounded-2xl text-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <div className="text-emerald-500 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </motion.div>
);

export default HomePage;
