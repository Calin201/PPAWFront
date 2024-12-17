import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiAlertCircle } from 'react-icons/fi';

interface SnackbarProps {
    message: string | null;
    onClose: () => void;
    type?: 'error' | 'success' | 'info';
}

const Snackbar: React.FC<SnackbarProps> = ({ message, onClose, type = 'error' }) => {
    React.useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    const colors = {
        error: {
            bg: 'bg-red-500',
            text: 'text-white',
            icon: 'text-white',
            hover: 'hover:bg-red-600'
        },
        success: {
            bg: 'bg-emerald-500',
            text: 'text-white',
            icon: 'text-white',
            hover: 'hover:bg-emerald-600'
        },
        info: {
            bg: 'bg-blue-500',
            text: 'text-white',
            icon: 'text-white',
            hover: 'hover:bg-blue-600'
        }
    };

    const colorScheme = colors[type];

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 20, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 20, x: 20 }}
                    className="fixed bottom-4 right-4 z-50"
                >
                    <motion.div
                        className={`${colorScheme.bg} rounded-lg shadow-lg p-4 pr-12 min-w-[300px] relative
                            backdrop-blur-sm bg-opacity-95`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex items-start space-x-3">
                            <FiAlertCircle className={`${colorScheme.icon} text-xl mt-0.5`} />
                            <p className={`${colorScheme.text} font-medium`}>
                                {message}
                            </p>
                        </div>

                        <motion.button
                            className={`absolute right-2 top-2 p-1 rounded-full 
                                ${colorScheme.text} opacity-70 hover:opacity-100`}
                            onClick={onClose}
                            whileHover={{ scale: 1.1, rotate: 180 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FiX className="w-5 h-5" />
                        </motion.button>

                        <motion.div
                            className={`absolute bottom-0 left-0 h-1 ${colorScheme.bg} ${colorScheme.hover}`}
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 5, ease: "linear" }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Snackbar;
