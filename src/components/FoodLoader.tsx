import React from 'react';
import { motion } from 'framer-motion';
import { BsFillFileFill } from 'react-icons/bs';
import { GiPotato, GiCarrot, GiMushroomGills, GiGarlic, GiCookingPot } from 'react-icons/gi';

const ingredients = [
    { Icon: GiPotato, color: "text-yellow-700" },
    { Icon: GiCarrot, color: "text-orange-500" },
    { Icon: GiMushroomGills, color: "text-brown-500" },
    { Icon: GiGarlic, color: "text-gray-200" }
];

const cookingPhrases = [
    "Chopping vegetables...",
    "Adding spices...",
    "Stirring the pot...",
    "Simmering gently...",
    "Checking seasoning...",
    "Almost ready..."
];

const FoodLoader: React.FC = () => {
    const [phrase, setPhrase] = React.useState(cookingPhrases[0]);

    React.useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % cookingPhrases.length;
            setPhrase(cookingPhrases[currentIndex]);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="relative">
                {/* Cooking flames */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[95%] flex gap-4">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.8, 1, 0.8]
                            }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                        >
                            <BsFillFileFill className="text-orange-500 w-8 h-8" />
                        </motion.div>
                    ))}
                </div>

                {/* Main pot */}
                <motion.div
                    className="relative w-80 h-80"
                    animate={{
                        y: [-5, 5, -5]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {/* Pot icon */}
                    <GiCookingPot className="w-full h-full text-gray-700" />

                    {/* Bubbling effect */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-6 h-6 bg-blue-200 rounded-full opacity-40"
                                style={{
                                    top: '40%',
                                    left: '50%'
                                }}
                                animate={{
                                    y: [-20, -40],
                                    x: Math.sin(i * 45) * 20,
                                    opacity: [0.4, 0],
                                    scale: [1, 1.5]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeOut"
                                }}
                            />
                        ))}
                    </div>

                    {/* Jumping ingredients */}
                    {ingredients.map((Ingredient, i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            style={{
                                top: '30%',
                                left: `${25 + i * 20}%`
                            }}
                            animate={{
                                y: [-20, 20],
                                rotate: [0, 180, 360],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3,
                                ease: "easeInOut"
                            }}
                        >
                            <Ingredient.Icon className={`w-10 h-10 ${Ingredient.color}`} />
                        </motion.div>
                    ))}

                    {/* Steam effect */}
                    <div className="absolute w-full flex justify-center" style={{ top: '-20%' }}>
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-4 h-4 bg-gray-200 rounded-full"
                                animate={{
                                    y: [-20, -60],
                                    x: Math.sin(i * Math.PI) * 30,
                                    opacity: [0.6, 0],
                                    scale: [1, 2]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.6,
                                    ease: "easeOut"
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Loading text */}
            <motion.div
                className="mt-12 text-2xl font-medium text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.span
                    key={phrase}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                >
                    {phrase}
                </motion.span>
            </motion.div>
        </div>
    );
};

export default FoodLoader;
