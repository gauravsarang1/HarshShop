import { motion } from "framer-motion";
import { FiHeart, FiShoppingCart, FiStar, FiEye } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, index, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* New Badge */}
      {product.isNew && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            New
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 shadow-lg"
        >
          <FiHeart className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 shadow-lg"
        >
          <Link to={`/product/${product.id}`}>
            <FiEye className="w-5 h-5" />
          </Link>
        </motion.button>
      </div>

      {/* Image Container */}
      <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-900">
        <motion.img
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {console.log(product)}
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-3 rounded-full font-medium text-sm flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-lg"
          >
            <FiShoppingCart className="w-4 h-4" />
            Quick Add
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-1">
          {product.category}
        </p>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${product.discountedPrice || product.price}
          </span>
          {product.discountedPrice && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              ${product.price}
            </span>
          )}
        </div>

        {/* Colors */}
        {product.colors && (
          <div className="flex items-center gap-1 mt-3">
            {product.colors.map((color, idx) => (
              <div
                key={idx}
                className="w-4 h-4 rounded-full border-2 border-white dark:border-gray-700 shadow-sm cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}

        {/* Add to Cart Button */}
        <motion.button
          onClick={() => onAddToCart(product.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-2 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          <FiShoppingCart className="w-4 h-4" />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
