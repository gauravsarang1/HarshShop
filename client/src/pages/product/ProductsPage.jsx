import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { FiFilter, FiX, FiChevronDown, FiGrid, FiList, FiStar, FiSliders, FiShoppingBag, FiPackage, FiTruck } from 'react-icons/fi';
import ProductCard from '../../components/ProductCard';
import { Button } from '../../components/ui/button';
import StatsBanner from '../../components/products/StatsBanner';
import MobileFilterButton from '../../components/products/MobileFilterButton';
import MobileFilterDrawer from '../../components/products/MobileFilterDrawer';
import CategoryPills from '../../components/products/CategoryPills';
import ProductsGrid from '../../components/products/ProductsGrid';
import ViewToggle from '../../components/products/ViewToggle';
import FilterContent from '../../components/products/FilterContent';
import { publicApi } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/features/cartSlice';
import { toast } from 'react-hot-toast';
import LoadingProductGrid from '../../components/LoadingProductGrid';

const categories = [
  "All",
  "Footwear",
  "Apparel",
  "Electronics",
  "Accessories",
  "Home & Living",
  "Beauty",
  "Sports"
];

const sortOptions = [
  { id: "featured", name: "Featured" },
  { id: "newest", name: "Newest First" },
  { id: "price-asc", name: "Price: Low to High" },
  { id: "price-desc", name: "Price: High to Low" },
  { id: "rating", name: "Highest Rated" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [loadingProducts, setLoadingProducts ] = useState(false)

  // Filter states
  const [filters, setFilters] = useState({
    category: "All",
    priceRange: [0, 1000],
    rating: 0,
    onlyDiscounted: false,
    onlyInStock: false
  });

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.user);

useEffect(() => {
  let isMounted = true;

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await publicApi.get('/products/all-products');
      if (isMounted) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error(error);
      if (isMounted) {
        setError(error.message);
      }
    } finally {
      if (isMounted) {
        setLoadingProducts(false);
      }
    }
  };

  fetchProducts();

  return () => {
    isMounted = false;
  };
}, []);


  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    
    try {
      await dispatch(addToCart(productId)).unwrap();
      toast.success('Added to cart successfully');
    } catch (error) {
      toast.error(error.message || 'Error adding to cart');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: "All",
      priceRange: [0, 1000],
      rating: 0,
      onlyDiscounted: false,
      onlyInStock: false
    });
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <StatsBanner />
      
      <MobileFilterButton onClick={() => setIsMobileFilterOpen(true)} />

      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 mb-8"
        >
          <motion.div 
            variants={itemVariants}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Discover Our Collection
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our curated selection of premium products, designed to elevate your lifestyle.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 hover:border-indigo-500 dark:hover:border-indigo-400"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>
          </motion.div>

          <CategoryPills
            categories={categories}
            selectedCategory={filters.category}
            onCategoryChange={(category) => handleFilterChange('category', category)}
          />
        </motion.div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <motion.div 
            variants={itemVariants}
            className="hidden md:block w-64 flex-shrink-0"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sticky top-24 shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-lg bg-opacity-90">
              <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Refine Your Search
              </h2>
              <FilterContent filters={filters} onFilterChange={handleFilterChange} />
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1"
          >
            <ProductsGrid
              loading={loadingProducts}
              products={products}
              viewMode={viewMode}
              onResetFilters={resetFilters}
              onAddToCart={handleAddToCart}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductsPage;
