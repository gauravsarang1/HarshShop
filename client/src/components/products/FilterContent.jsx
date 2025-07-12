import { motion } from 'framer-motion';
import { FiStar, FiTag, FiPackage, FiDollarSign } from 'react-icons/fi';

const FilterContent = ({ filters, onFilterChange }) => {
  return (
    <div className="space-y-6">
      {/* Price Range */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <FiDollarSign className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold">Price Range</h3>
        </div>
        <motion.div className="px-4">
          <div className="relative">
            <div className="absolute -top-2 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceRange[1]}
              onChange={(e) => onFilterChange('priceRange', [0, parseInt(e.target.value)])}
              className="w-full h-1 accent-emerald-500 appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-emerald-500"
            />
          </div>
          <motion.div 
            className="flex justify-between mt-4 text-sm font-medium"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-gray-600 dark:text-gray-400">$0</span>
            <span className="text-emerald-600 dark:text-emerald-400">${filters.priceRange[1]}</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Rating Filter */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <FiStar className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold">Rating</h3>
        </div>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <motion.button
              key={rating}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onFilterChange('rating', rating)}
              className={`flex items-center gap-2 w-full px-4 py-3 rounded-xl transition-all duration-200 ${
                filters.rating === rating
                  ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 dark:from-yellow-500/20 dark:to-orange-500/20 text-yellow-600 dark:text-yellow-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 1 }}
                    animate={index < rating ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                  >
                    <FiStar
                      className={`w-4 h-4 ${
                        index < rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
              <span className="ml-2">{rating}+ Stars</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Additional Filters */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <FiTag className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold">Additional Filters</h3>
        </div>
        <div className="space-y-3">
          <motion.label 
            whileHover={{ scale: 1.02, x: 5 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 transition-all duration-200 cursor-pointer group"
          >
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={filters.onlyDiscounted}
                onChange={(e) => onFilterChange('onlyDiscounted', e.target.checked)}
                className="peer h-5 w-5 rounded border-2 border-purple-500 text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
              />
              <motion.div
                initial={false}
                animate={filters.onlyDiscounted ? { scale: 1 } : { scale: 0 }}
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded pointer-events-none"
              />
            </div>
            <div>
              <span className="font-medium text-gray-900 dark:text-white">Only Discounted Items</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">Show items with active discounts</p>
            </div>
          </motion.label>
          <motion.label 
            whileHover={{ scale: 1.02, x: 5 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/50 dark:hover:to-cyan-900/50 transition-all duration-200 cursor-pointer group"
          >
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={filters.onlyInStock}
                onChange={(e) => onFilterChange('onlyInStock', e.target.checked)}
                className="peer h-5 w-5 rounded border-2 border-blue-500 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
              />
              <motion.div
                initial={false}
                animate={filters.onlyInStock ? { scale: 1 } : { scale: 0 }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded pointer-events-none"
              />
            </div>
            <div>
              <span className="font-medium text-gray-900 dark:text-white">In Stock Only</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">Show items available for immediate purchase</p>
            </div>
          </motion.label>
        </div>
      </motion.div>
    </div>
  );
};

export default FilterContent; 