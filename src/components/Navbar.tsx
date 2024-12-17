import React from 'react';
import { motion } from 'framer-motion';
import { GiCookingPot, GiKnifeFork } from 'react-icons/gi';
import { MdOutlineRestaurantMenu, MdFavorite } from 'react-icons/md';
import { FaUserCog } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeItem, setActiveItem] = React.useState(location.pathname.slice(1) || 'recipes');

    const menuItems = [
        { 
            id: 'recipes', 
            name: 'Recipes', 
            icon: GiCookingPot, 
            path: '/recipes',
            description: 'Browse and search recipes'
        },
        { 
            id: 'my-recipes', 
            name: 'My Recipes', 
            icon: MdOutlineRestaurantMenu, 
            path: '/my-recipes',
            description: 'Manage your recipes'
        },
        { 
            id: 'favorites', 
            name: 'Favorites', 
            icon: MdFavorite, 
            path: '/favorites',
            description: 'Your favorite recipes'
        },
        { 
            id: 'ingredients', 
            name: 'Ingredients', 
            icon: GiKnifeFork, 
            path: '/ingredients',
            description: 'Browse available ingredients'
        },
        { 
            id: 'profile', 
            name: 'Profile', 
            icon: FaUserCog, 
            path: '/profile',
            description: 'Manage your profile and preferences'
        }
    ];

    const handleNavigation = (path: string, id: string) => {
        setActiveItem(id);
        navigate(path);
    };

    return (
        <motion.nav 
            className="bg-white shadow-lg"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-7">
                        <motion.div
                            className="flex items-center py-4 px-2 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            onClick={() => navigate('/')}
                        >
                            <GiCookingPot className="text-emerald-500 text-3xl mr-2" />
                            <span className="font-semibold text-gray-700 text-lg">
                                Recipe Hub
                            </span>
                        </motion.div>

                        <div className="flex items-center space-x-1">
                            {menuItems.map((item) => (
                                <motion.button
                                    key={item.id}
                                    className={`py-4 px-6 text-gray-600 hover:text-emerald-500 relative group ${
                                        activeItem === item.id ? 'text-emerald-500' : ''
                                    }`}
                                    onClick={() => handleNavigation(item.path, item.id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="flex items-center space-x-2">
                                        <item.icon className="text-xl" />
                                        <span>{item.name}</span>
                                    </div>
                                    {activeItem === item.id && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                                            layoutId="underline"
                                        />
                                    )}
                                    <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded-md py-1 px-2 -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                                        {item.description}
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <motion.button
                            className="py-2 px-6 bg-emerald-500 text-white rounded-lg font-medium overflow-hidden relative group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/auth')}
                        >
                            <span className="relative z-10">Login</span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600"
                                initial={{ x: "100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ type: "tween", duration: 0.3 }}
                            />
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
