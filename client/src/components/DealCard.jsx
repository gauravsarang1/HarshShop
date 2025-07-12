import { motion } from "framer-motion";
import { FiClock, FiShoppingCart, FiHeart, FiTag } from "react-icons/fi";
import { useState } from "react";

const DealCard = ({ deal, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate remaining time (mock function)
  const getTimeLeft = () => {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${hours}h ${minutes}m`;
  };

  // Calculate progress (mock function)
  const progress = Math.floor(Math.random() * (100 - 30) + 30);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Deal Type Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
          <FiTag className="w-3 h-3" />
          {deal.type}
        </div>
      </div>

      {/* Time Left Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
          <FiClock className="w-3 h-3" />
          {getTimeLeft()}
        </div>
      </div>

      {/* Image Container */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <motion.img
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
          src={deal.image}
          alt={deal.name}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />

        {/* Quick Actions */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/90 dark:bg-gray-900/90 p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 shadow-lg"
          >
            <FiHeart className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-indigo-700 shadow-lg"
          >
            <FiShoppingCart className="w-4 h-4" />
            Add to Cart
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
            {deal.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {deal.description}
          </p>
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${deal.price.toFixed(2)}
          </span>
          {deal.originalPrice && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ${deal.originalPrice.toFixed(2)}
            </span>
          )}
          {deal.discount && (
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              {deal.discount}% OFF
            </span>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">Sold: {progress}%</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">
              {100 - progress} left
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DealCard; 