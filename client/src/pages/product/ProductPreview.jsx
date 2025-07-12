import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
import { publicApi } from '../../api/api';
import { useParams } from 'react-router-dom';
import { 
  Star, 
  Truck, 
  Shield, 
  Package, 
  Heart,
  Share2,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  CheckCircle
} from 'lucide-react';

const ProductPreview = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event) => {
    const { currentTarget, clientX, clientY } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await publicApi.get(`/products/get-product/${productId}`);
        if (response.data?.data) {
          setProduct(response.data.data);
          console.log('response', response.data.data);
        } else {
          setError('Product data not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.response?.data?.message || 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="mt-2 text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Product Not Found</h2>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (action) => {
    if (action === 'increase' && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAddingToCart(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        className="flex flex-col lg:flex-row gap-12"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Product Images */}
        <div className="lg:w-2/3 space-y-6">
          <motion.div 
            className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onMouseMove={handleMouseMove}
            
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={product?.images?.[0]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>
          </motion.div>

          {/* Product Images */}
          {console.log('product images', product.images)}
          
          <div className="grid grid-cols-4 gap-4">
            {Array.isArray(product?.images) && product.images.map((image, index) => (
              <motion.button
                key={index}
                className={`relative aspect-square rounded-2xl overflow-hidden ${
                  selectedImage === index 
                    ? 'ring-2 ring-indigo-500 dark:ring-indigo-400 ring-offset-2 ring-offset-white dark:ring-offset-gray-900' 
                    : 'ring-1 ring-gray-200 dark:ring-gray-700'
                }`}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <img 
                  src={image} 
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
                {selectedImage === index && (
                  <motion.div
                    className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-400/10"
                    layoutId="selectedImage"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/3 space-y-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                  {product?.category}
                </span>
              </motion.div>
              <motion.h1 
                className="text-4xl font-bold mt-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {product.name}
              </motion.h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          i < Math.floor(product?.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    </motion.div>
                  ))}
                  <motion.span 
                    className="ml-2 text-sm text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                  >
                    ({product?.reviews} reviews)
                  </motion.span>
                </div>
                <motion.span 
                  className="text-sm text-gray-600 dark:text-gray-400"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  SKU: {product?.sku}
                </motion.span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-baseline gap-4"
            >
              <motion.span 
                className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              >
                ${product.price}
              </motion.span>
              <motion.span 
                className="text-lg text-green-600 dark:text-green-400 font-medium flex items-center gap-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <CheckCircle className="w-5 h-5" />
                In Stock ({product.stock})
              </motion.span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed"
            >
              {product.description}
            </motion.p>
          </div>

          {/* Color Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Colors
            </h3>
            <div className="flex gap-3">
              {Array.isArray(product?.colors) && product.colors.map((color, index) => (
                <motion.button
                  key={index}
                  className={`w-12 h-12 rounded-full relative ${
                    selectedColor === index 
                      ? 'ring-2 ring-offset-2 ring-indigo-500 dark:ring-indigo-400' 
                      : ''
                  }`}
                  style={{ backgroundColor: color }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedColor(index)}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1), type: "spring" }}
                >
                  {selectedColor === index && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-white/10 dark:bg-black/10"
                      layoutId="selectedColor"
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Quantity Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Quantity
            </h3>
            <div className="flex items-center gap-4">
              <motion.div 
                className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                <motion.button
                  onClick={() => handleQuantityChange('decrease')}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-2xl transition-colors disabled:opacity-50"
                  disabled={quantity <= 1}
                  whileTap={{ scale: 0.9 }}
                >
                  <Minus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </motion.button>
                <motion.span 
                  className="w-16 text-center font-medium text-lg text-gray-900 dark:text-white"
                  key={quantity}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {quantity}
                </motion.span>
                <motion.button
                  onClick={() => handleQuantityChange('increase')}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-2xl transition-colors disabled:opacity-50"
                  disabled={quantity >= product.stock}
                  whileTap={{ scale: 0.9 }}
                >
                  <Plus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </motion.button>
              </motion.div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ({product.stock} items available)
              </span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <div className="flex gap-4">
              <motion.button
                className="flex-1 relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-4 rounded-2xl font-medium flex items-center justify-center gap-2 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                <AnimatePresence mode="wait">
                  {isAddingToCart ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600"
                    >
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              <motion.button
                className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-red-500 transition-colors" />
                <motion.div
                  className="absolute inset-0 bg-red-500/10 dark:bg-red-400/10 rounded-2xl"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
              </motion.button>
              <motion.button
                className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-indigo-500 transition-colors" />
                <motion.div
                  className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-400/10 rounded-2xl"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                />
              </motion.button>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-4 border-t-2 border-gray-200 dark:border-gray-700 pt-8"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Key Features
            </h3>
            <ul className="space-y-4">
              {Array.isArray(product?.features) && product.features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 group hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors"
                    whileHover={{ rotate: 5 }}
                  >
                    <ChevronRight className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </motion.div>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Shipping Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="space-y-4 border-t-2 border-gray-200 dark:border-gray-700 pt-8"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:from-indigo-50 hover:to-indigo-100 dark:hover:from-indigo-900/20 dark:hover:to-indigo-800/20 transition-colors group"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors"
                  whileHover={{ rotate: 5 }}
                >
                  <Truck className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </motion.div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Free Shipping</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">2-3 business days</p>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:from-indigo-50 hover:to-indigo-100 dark:hover:from-indigo-900/20 dark:hover:to-indigo-800/20 transition-colors group"
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors"
                  whileHover={{ rotate: 5 }}
                >
                  <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </motion.div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Warranty</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">2 year coverage</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductPreview; 