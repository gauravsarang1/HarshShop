import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";

const ExploreProductCard = ({ product, index, onAddToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {product.discount}% OFF
        </div>
      )}

      {/* Wishlist Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 shadow-lg"
      >
        <FiHeart className="w-5 h-5" />
      </motion.button>

      {/* Image Container */}
      <div className="aspect-[4/5] relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <motion.button
            onClick={() => onAddToCart(product.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FiShoppingCart className="w-4 h-4" />
            Quick Add
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand */}
        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-1">
          {product?.Brand?.name}
        </p>
        
        {/* Title */}
        <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-1 truncate">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-4 h-4 ${
                  i < product?.rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({product?.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {Number(product?.discountedPrice).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 , style: 'currency', currency: 'INR' })}
          </span>
          {product?.price && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              {Number(product?.price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 , style: 'currency', currency: 'INR' })}
            </span>
          )}
        </div>

        {/* Colors */}
        {product.colors && (
          <div className="flex items-center gap-1 mt-3">
            {product?.Colors?.map((color, idx) => (
              <div
                key={idx}
                className="w-4 h-4 rounded-full border-2 border-white dark:border-gray-700 shadow-sm cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ExploreProductCard; 