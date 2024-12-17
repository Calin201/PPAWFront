import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GiCookingPot, GiKnifeFork } from 'react-icons/gi';

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    const containerVariants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex items-center justify-center p-4">
            {/* Pattern Background */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
                <div className="absolute w-full h-full">
                    {[...Array(100)].map((_, i) => (
                        <GiKnifeFork
                            key={i}
                            className="absolute text-white transform rotate-45"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                fontSize: `${Math.random() * 20 + 10}px`,
                                opacity: Math.random() * 0.5 + 0.5
                            }}
                        />
                    ))}
                </div>
            </div>

            <motion.div
                className="text-center relative z-10"
                variants={containerVariants}
                initial="initial"
                animate="animate"
            >
                <motion.div
                    className="text-9xl font-bold text-white mb-8 flex items-center justify-center"
                    variants={itemVariants}
                >
                    <span>4</span>
                    <motion.div
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        <GiCookingPot className="mx-4" />
                    </motion.div>
                    <span>4</span>
                </motion.div>

                <motion.h2
                    className="text-4xl font-bold text-white mb-4"
                    variants={itemVariants}
                >
                    Oops! This recipe seems to be missing
                </motion.h2>

                <motion.p
                    className="text-xl text-white mb-8"
                    variants={itemVariants}
                >
                    Let's get you back to the kitchen
                </motion.p>

                <motion.div
                    className="text-white text-lg"
                    variants={itemVariants}
                >
                    Redirecting in{" "}
                    <motion.span
                        key={countdown}
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-block font-bold text-2xl"
                    >
                        {countdown}
                    </motion.span>{" "}
                    seconds...
                </motion.div>

                <motion.button
                    className="mt-8 px-8 py-3 bg-white text-emerald-600 rounded-lg font-bold hover:bg-opacity-90 transition-colors"
                    onClick={() => navigate('/')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variants={itemVariants}
                >
                    Go Home Now
                </motion.button>
            </motion.div>
        </div>
    );
};

export default NotFound;
