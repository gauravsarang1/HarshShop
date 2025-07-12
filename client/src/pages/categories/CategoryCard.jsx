import { motion } from "framer-motion";
import { FiArrowRight, FiTrendingUp, FiHeart, FiShoppingBag, FiStar } from "react-icons/fi";
import { Link } from 'react-router-dom'

const CategoryCard = ({ category, index }) => {
  return (
    <motion.div
      variants={{
        hidden: { 
          opacity: 0, 
          y: 60,
          scale: 0.9,
          rotateX: 15
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          transition: {
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.8,
          },
        },
      }}
      custom={index}
      className="group cursor-pointer perspective-1000"
    >
      <motion.div
        whileHover={{ 
          y: -12,
          rotateY: 5,
          scale: 1.03,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 15,
          }
        }}
        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 dark:border-gray-700/20 relative"
      >
        {/* Trending Badge */}
        {category.trending && (
          <motion.div
            initial={{ x: -50, opacity: 0, rotate: -15 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 200 }}
            className="absolute top-4 right-4 z-20"
          >
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300 flex items-center gap-1">
              <FiTrendingUp className="w-3 h-3" />
              Trending
            </div>
          </motion.div>
        )}

        {/* Image Container */}
        <div className="relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl aspect-square">
          <motion.div
            whileHover={{
              scale: 1.15,
              rotate: 2,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 15,
              }
            }}
            className="w-full h-full bg-center bg-no-repeat bg-cover transform-gpu"
            style={{ backgroundImage: `url(${category.image})` }}
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-40 dark:opacity-50`} />
          
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            className="absolute top-4 left-4 text-2xl sm:text-3xl"
          >
            {category.icon}
          </motion.div>

          {/* Stats Badge */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="absolute bottom-4 left-4 bg-black/20 dark:bg-black/40 backdrop-blur-md text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium flex items-center gap-1"
          >
            <FiStar className="w-3 h-3" />
            {category.itemCount}
          </motion.div>

          {/* Quick Action Buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 sm:p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white dark:hover:bg-gray-700"
            >
              <FiHeart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 sm:p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white dark:hover:bg-gray-700"
            >
              <FiShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <motion.h3 
            className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300"
          >
            {category.name}
          </motion.h3>
          
          <motion.p 
            className="text-sm text-gray-600 dark:text-gray-300 mb-4"
          >
            {category.desc}
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Link to={`/category/${category.id}`}>Explore Category</Link>
            <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CategoryCard;
