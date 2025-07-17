import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiGrid, FiList, FiStar } from "react-icons/fi";
import BrandCard from "./BrandCard";
import { publicApi } from '../../api/api'
import BrandCardSkeleton from "./brandCardSkeleton";

const categories = ["All", "Fashion", "Technology", "Sports & Athletics", "Lifestyle", "Beauty"];
const sortOptions = [
  { id: "featured", name: "Featured" },
  { id: "rating", name: "Highest Rated" },
  { id: "products", name: "Most Products" },
  { id: "followers", name: "Most Followers" }
];

const Brands = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    let mount = true
    const fetchAllBrands = async() => {
      try {
        setLoading(true)
        const response = await publicApi.get('brands/get-all-brands')
        console.log(response.data.data)
        if(response.status === 200){
          if(mount) {
            setBrands(response.data.data)
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllBrands()

    return () => {
      mount = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
          >
            Featured Brands
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Discover and shop from our curated collection of premium brands, each offering unique products and experiences.
          </motion.p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Featured Toggle */}
              <button
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  showFeaturedOnly
                    ? "bg-yellow-400 text-gray-900"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                <FiStar className={`w-4 h-4 ${showFeaturedOnly ? "fill-current" : ""}`} />
                Featured
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${
                    viewMode === "grid"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${
                    viewMode === "list"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Brands Grid */}
        <div className={`grid ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        } gap-6`}>
          {loading?(
            [...Array(3)].map((_, i) => (
              <BrandCardSkeleton key={i}/>
            ))
          ):(
            brands.map((brand, index) => (
            <BrandCard key={brand.id} brand={brand} index={index} />
          ))
          )}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            Load More Brands
          </motion.button>
        </div>

        {/* Featured Brands Banner */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl overflow-hidden"
        >
          <div className="px-6 py-12 sm:px-12 sm:py-16 text-center text-white relative">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Want to Feature Your Brand?</h2>
              <p className="text-lg opacity-90 mb-8">
                Join our marketplace and showcase your products to millions of potential customers.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-indigo-600 font-medium px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Partner With Us
              </motion.button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Brands;
