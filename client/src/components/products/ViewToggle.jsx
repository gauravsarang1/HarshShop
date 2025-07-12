import { motion } from 'framer-motion';
import { FiGrid, FiList } from 'react-icons/fi';

const ViewToggle = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onViewModeChange("grid")}
        className={`p-2 rounded-lg transition-all duration-200 ${
          viewMode === "grid"
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
            : "hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        <FiGrid className="w-5 h-5" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onViewModeChange("list")}
        className={`p-2 rounded-lg transition-all duration-200 ${
          viewMode === "list"
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
            : "hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        <FiList className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default ViewToggle; 