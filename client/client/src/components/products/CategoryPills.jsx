import { motion, LayoutGroup } from 'framer-motion';
import { FiBox, FiMonitor, FiBook, FiHome, FiActivity } from 'react-icons/fi';

const categoryIcons = {
  "All": FiBox,
  "Electronics": FiMonitor,
  "Clothing": FiBook,
  "Books": FiBook,
  "Home": FiHome,
  "Sports": FiActivity
};

const CategoryPills = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <motion.div 
      className="hidden md:flex flex-wrap gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LayoutGroup>
        {categories.map((category) => {
          const Icon = categoryIcons[category] || FiBox;
          return (
            <motion.button
              key={category}
              layout
              onClick={() => onCategoryChange(category)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedCategory === category && (
                <motion.div
                  layoutId="activeCategoryBg"
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2 }}
                />
              )}
              <motion.span 
                className={`relative z-10 ${
                  selectedCategory === category
                    ? "text-white"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <Icon className="w-4 h-4" />
              </motion.span>
              <span className="relative z-10">{category}</span>
              {selectedCategory === category && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute inset-0 bg-indigo-600/20 dark:bg-indigo-400/20 blur-xl rounded-xl"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2 }}
                />
              )}
            </motion.button>
          );
        })}
      </LayoutGroup>
    </motion.div>
  );
};

export default CategoryPills; 