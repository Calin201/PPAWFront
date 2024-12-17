import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiCookingPot, GiSpellBook } from 'react-icons/gi';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulăm loading pentru efect
        setTimeout(() => setIsLoading(false), 1500);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        },
        exit: { 
            opacity: 0,
            y: -20,
            transition: { duration: 0.4 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    backgroundSize: '60px 60px',
                    animation: 'slide 20s linear infinite'
                }} />
            </div>
            
            <motion.div
                className="max-w-md w-full bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
            >
                <div className="p-8">
                    <motion.div 
                        className="text-center mb-8"
                        variants={itemVariants}
                    >
                        <GiCookingPot className="text-6xl text-white mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Welcome to Recipe Hub
                        </h2>
                        <p className="text-gray-200">
                            {isLogin ? "Sign in to access your recipes" : "Join our cooking community"}
                        </p>
                    </motion.div>

                    <motion.form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div variants={itemVariants}>
                            <label className="block text-gray-200 text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-gray-300 border-opacity-20 focus:border-white focus:ring-2 focus:ring-white text-white placeholder-gray-300"
                                placeholder="Enter your email"
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <label className="block text-gray-200 text-sm font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-gray-300 border-opacity-20 focus:border-white focus:ring-2 focus:ring-white text-white placeholder-gray-300"
                                placeholder="Enter your password"
                            />
                        </motion.div>

                        {!isLogin && (
                            <motion.div variants={itemVariants}>
                                <label className="block text-gray-200 text-sm font-medium mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-gray-300 border-opacity-20 focus:border-white focus:ring-2 focus:ring-white text-white placeholder-gray-300"
                                    placeholder="Confirm your password"
                                />
                            </motion.div>
                        )}

                        <motion.button
                            type="submit"
                            className="w-full bg-white text-emerald-600 rounded-lg py-3 px-4 font-medium hover:bg-opacity-90 transform transition-all duration-200 relative overflow-hidden group"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isLoading}
                        >
                            <AnimatePresence mode='wait'>
                                {isLoading ? (
                                    <motion.div
                                        key="loading"
                                        className="absolute inset-0 flex items-center justify-center bg-white"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <GiSpellBook className="text-emerald-600 text-xl animate-spin" />
                                    </motion.div>
                                ) : (
                                    <motion.span
                                        key="text"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        {isLogin ? "Sign In" : "Create Account"}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
                        </motion.button>
                    </motion.form>

                    <motion.div 
                        className="mt-6 flex justify-center space-x-4"
                        variants={itemVariants}
                    >
                        <button className="p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-200">
                            <FaGoogle className="text-white text-xl" />
                        </button>
                        <button className="p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all duration-200">
                            <FaGithub className="text-white text-xl" />
                        </button>
                    </motion.div>

                    <motion.p 
                        className="mt-6 text-center text-gray-200"
                        variants={itemVariants}
                    >
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        {" "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-white font-medium hover:underline"
                        >
                            {isLogin ? "Sign Up" : "Sign In"}
                        </button>
                    </motion.p>
                </div>
            </motion.div>

            <style>{`
                @keyframes slide {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(-60px);
                    }
                }
            `}</style>
        </div>
    );
};

export default Auth;
