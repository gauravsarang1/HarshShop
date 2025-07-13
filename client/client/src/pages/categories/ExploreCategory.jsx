import React, { useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiFilter, FiGrid, FiList, FiChevronDown, FiSliders, FiX } from "react-icons/fi";
import ExploreProductCard from "./ExploreProductCard";
import { publicApi } from "../../api/api";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";

const ExploreCategory = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedFilters, setSelectedFilters] = useState({
    category: "All",
    brand: "All Brands",
    sizes: [],
    colors: [],
    priceRange: ""
  });
  const [filters, setFilters] = useState({
    categories: [ "All Categories" ],
    brands: [ "All Brands" ],
    sizes: [ "All Sizes" ],
    colors: [ "All Colors" ],
    priceRanges: [ "All Prices" ]
  });
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await publicApi.get(`/products/get-products-by-category-id/${categoryId}`);
      setProducts(response.data.data);
      console.log('categoryResponse', response.data);
    }
    fetchProducts();
  }, [categoryId]);

  const handleAddToCart = async (productId) => {
    try {
      const response = await dispatch(addToCart(productId)).unwrap();
    } catch (error) {
      console.log('error', error);
    }
  }

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col gap-4">
            <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Home</a>
              <span>/</span>
              <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Categories</a>
              <span>/</span>
              <span className="text-gray-900 dark:text-white">{products[0]?.Category?.name}</span>
            </nav>
            
            <div className="flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {products[0]?.Category?.name}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {products.length} Products
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filters</h2>
                
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Category</h3>
                  <div className="space-y-2">
                    {filters.categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedFilters.category === category}
                          onChange={(e) => setSelectedFilters({...selectedFilters, category: e.target.value})}
                          className="w-4 h-4 text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-300">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Brand</h3>
                  <select
                    value={selectedFilters.brand}
                    onChange={(e) => setSelectedFilters({...selectedFilters, brand: e.target.value})}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  >
                    {filters.brands.map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Sizes */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {filters.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          const newSizes = selectedFilters.sizes.includes(size)
                            ? selectedFilters.sizes.filter(s => s !== size)
                            : [...selectedFilters.sizes, size];
                          setSelectedFilters({...selectedFilters, sizes: newSizes});
                        }}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          selectedFilters.sizes.includes(size)
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {filters.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => {
                          const newColors = selectedFilters.colors.includes(color.name)
                            ? selectedFilters.colors.filter(c => c !== color.name)
                            : [...selectedFilters.colors, color.name];
                          setSelectedFilters({...selectedFilters, colors: newColors});
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                          selectedFilters.colors.includes(color.name)
                            ? "border-indigo-600 dark:border-indigo-400"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: color.code }}
                        title={color.name}
                      >
                        {selectedFilters.colors.includes(color.name) && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {filters.priceRanges.map((range) => (
                      <label key={range} className="flex items-center">
                        <input
                          type="radio"
                          name="priceRange"
                          value={range}
                          checked={selectedFilters.priceRange === range}
                          onChange={(e) => setSelectedFilters({...selectedFilters, priceRange: e.target.value})}
                          className="w-4 h-4 text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-300">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={toggleFilter}
                className="w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg shadow-lg flex items-center justify-center gap-2"
              >
                <FiFilter className="w-5 h-5" />
                <span>Filter Products</span>
              </button>
            </div>

            {/* Sort and View Options */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <select className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400">
                    <option>Most Popular</option>
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg ${
                      viewMode === "grid"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <FiGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg ${
                      viewMode === "list"
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <FiList className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            } gap-6`}>
              {products.length > 0 ? products.map((product, index) => (
                <ExploreProductCard key={product.id} product={product} index={index} onAddToCart={handleAddToCart} />
              )) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  No products found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={toggleFilter} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="absolute right-0 top-0 h-full w-full max-w-xs bg-white dark:bg-gray-800 shadow-xl"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
              <button onClick={toggleFilter} className="text-gray-500 dark:text-gray-400">
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              {/* Mobile Filters Content - Same as desktop and adjust styling ... */}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ExploreCategory; 