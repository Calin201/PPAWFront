import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { AuthService } from '../services/AuthService';
import { GiCookingPot, GiKnifeFork } from 'react-icons/gi';
import { MdOutlineRestaurantMenu, MdFavorite } from 'react-icons/md';
import { FaUserCog } from 'react-icons/fa';
import { RiVipCrownLine } from 'react-icons/ri';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activeItem, setActiveItem] = useState('recipes');

    useEffect(() => {
        const authService = new AuthService();
        const checkAuth = () => {
            const isAuth = authService.isAuthenticated();
            setIsAuthenticated(isAuth);
            if (isAuth) {
                setUsername(localStorage.getItem('username'));
                setEmail(localStorage.getItem('email'));
            }
        };

        checkAuth();
    }, []);

    const handleLogout = () => {
        const authService = new AuthService();
        authService.logout();
        setIsAuthenticated(false);
        setUsername(null);
        setEmail(null);
        setShowDropdown(false);
        navigate('/');
    };

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
            description: 'View and manage your recipes',
            requiresAuth: true
        },
        { 
            id: 'favorites', 
            name: 'Favorites', 
            icon: MdFavorite, 
            path: '/favorites',
            description: 'Your favorite recipes',
            requiresAuth: true
        },
        { 
            id: 'ingredients', 
            name: 'Ingredients', 
            icon: GiKnifeFork, 
            path: '/ingredients',
            description: 'Manage ingredients',
            requiresAuth: true
        },
        {
            id: 'subscriptions',
            name: 'Subscriptions',
            icon: RiVipCrownLine,
            path: '/subscriptions',
            description: 'Manage your subscription',
            requiresAuth: true
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
                        {isAuthenticated ? (
                            <div className="relative ml-auto">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center space-x-4 px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg focus:outline-none transition-colors duration-200"
                                >
                                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                                        <FiUser className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-base font-semibold text-gray-900">{username}</p>
                                        <p className="text-sm text-gray-500">{email}</p>
                                    </div>
                                </motion.button>

                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-100">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <FiUser className="w-5 h-5" />
                                                <span>Profile</span>
                                            </div>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                                        >
                                            <FiLogOut className="w-5 h-5" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/login')}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                            >
                                <FiUser className="mr-2" />
                                Login
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
