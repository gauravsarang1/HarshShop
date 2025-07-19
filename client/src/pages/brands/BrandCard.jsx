import { motion } from "framer-motion";
import { FiArrowRight, FiStar } from "react-icons/fi";
import { brands } from './../../data/mockData';
import { Link } from "react-router-dom";

const BrandCard = ({ brand, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Featured Badge */}
      {brand.featured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <FiStar className="w-3 h-3" />
            Featured
          </div>
        </div>
      )}

      {/* Brand Logo Container */}
      <div className="aspect-[16/9] relative overflow-hidden bg-gray-100 dark:bg-gray-900">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={brand.logo}
          alt={brand.name}
          className="w-full h-full object-contain p-6"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {brand.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {brand.Category.name}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {brand.rating}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {brand.products}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Products</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {brand.followers}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Followers</p>
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {brand.rating}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Rating</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2">
          {brand.description}
        </p>

        {/* Action Button */}
        <motion.div
        onClick={() => `/brand/${brand.id}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
           <Link
            to={`/brand/${brand.id}`}
            className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900  rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            <FiArrowRight className="w-4 h-4" />
            View Collection
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BrandCard;
