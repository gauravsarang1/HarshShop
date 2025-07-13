import { motion } from 'framer-motion';
import { FiPackage, FiTruck, FiShoppingBag } from 'react-icons/fi';

const StatsBanner = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 gap-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <FiPackage className="w-5 h-5" />
            <span>Free Shipping over $50</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <FiTruck className="w-5 h-5" />
            <span>Express Delivery</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <FiShoppingBag className="w-5 h-5" />
            <span>24/7 Support</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsBanner; 