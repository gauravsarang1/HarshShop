import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { FiFilter, FiGrid, FiList, FiStar, FiHeart, FiShoppingCart, FiChevronDown, FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";
import ProductCard from "../../components/ProductCard";

// Mock brand data
const brandData = {
  id: 1,
  name: "Nike",
  logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuBr7_ic02pFLXSfJjd8UKTdHrPsUeGiYiO83Xe9YkPxBRIv7isgx7LIY1oXMy_ZT_gTIve4KISUyPArDYUbyGmxnqLE7aArBWcM6eNL0SSYAMAB07gRnrxh_Q-Hym0qzpwS6sVoQ7VfR6jrHOVSaNtd2y-TUEwz9uvF7W9tze6deHembxxV9oDYCqRPX7tMHIOdtP8qw31Ybb3CnzwC9Iy2IXNT6HX29oF9Tx1EWccq475muS040PGOx1Sz0q_z3ViVlZZwg1xzLT0",
  coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBr7_ic02pFLXSfJjd8UKTdHrPsUeGiYiO83Xe9YkPxBRIv7isgx7LIY1oXMy_ZT_gTIve4KISUyPArDYUbyGmxnqLE7aArBWcM6eNL0SSYAMAB07gRnrxh_Q-Hym0qzpwS6sVoQ7VfR6jrHOVSaNtd2y-TUEwz9uvF7W9tze6deHembxxV9oDYCqRPX7tMHIOdtP8qw31Ybb3CnzwC9Iy2IXNT6HX29oF9Tx1EWccq475muS040PGOx1Sz0q_z3ViVlZZwg1xzLT0",
  rating: 4.8,
  followers: "2.5M",
  products: 1200,
  description: "Nike, Inc. is a global leader in athletic footwear, apparel, equipment, and accessories. The company's mission is to bring inspiration and innovation to every athlete in the world.",
  story: "Founded in 1964 as Blue Ribbon Sports, Nike has grown to become one of the world's largest suppliers of athletic shoes and apparel. The company takes its name from Nike, the Greek goddess of victory, and continues to live up to this inspiring namesake through continuous innovation and design excellence.",
  values: [
    "Innovation at Our Core",
    "Sustainability First",
    "Equal Opportunity",
    "Community Impact"
  ],
  stats: {
    yearFounded: 1964,
    globalPresence: "170+ countries",
    employees: "75,000+",
    annualRevenue: "$44.5B"
  },
  socialLinks: {
    instagram: "nike",
    twitter: "nike",
    facebook: "nike"
  }
};

// Mock products data
const productsData = [
  {
    id: 1,
    name: "Air Max 270",
    category: "Footwear",
    price: 150,
    discountedPrice: 129.99,
    rating: 4.8,
    reviews: 1250,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBr7_ic02pFLXSfJjd8UKTdHrPsUeGiYiO83Xe9YkPxBRIv7isgx7LIY1oXMy_ZT_gTIve4KISUyPArDYUbyGmxnqLE7aArBWcM6eNL0SSYAMAB07gRnrxh_Q-Hym0qzpwS6sVoQ7VfR6jrHOVSaNtd2y-TUEwz9uvF7W9tze6deHembxxV9oDYCqRPX7tMHIOdtP8qw31Ybb3CnzwC9Iy2IXNT6HX29oF9Tx1EWccq475muS040PGOx1Sz0q_z3ViVlZZwg1xzLT0",
    colors: ["#000000", "#FFFFFF", "#FF0000"],
    isNew: true
  },
  {
    id: 2,
    name: "Dri-FIT Running Shirt",
    category: "Apparel",
    price: 35,
    rating: 4.6,
    reviews: 820,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuABENrK-SltVp4rYZvj9D47HPqpBwcXdfMuVe-DVjeYdjAo6MmQpBbuN3eIWyjxFYQrr7m3mYcjg8fUlp_XC8_FXq4biu_PcAc6gwq5j5bdKjRKsL-pKsA4YZTXbcJm3rEAgNrTx8kMyqN1CyCBbwCKBnln2OhD19LcpSndIZt5LbAH6GSpO4gGt_HAukyiCcBBCw1SqsdfaLKIPbXfW0TEoLAyt_HTecCz8VrrpKTYdUmdNHSc77gM66ACqjRsjYyErph8J_6RMvg",
    colors: ["#000000", "#FFFFFF", "#0000FF"],
    isNew: false
  },
  {
    id: 3,
    name: "Elite Basketball Shorts",
    category: "Apparel",
    price: 45,
    discountedPrice: 35.99,
    rating: 4.7,
    reviews: 650,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDe21F5Qgz4HMwHvZepWqt6BjSSOpB0JPQv-IZT1Eu24ojeVS8GFUSpOOrx-yTXFszoit_VD8i2Jcy6a9McVfgjTSxlapvbqHZpsNuaLOeAeeHboK4Mrdsd2F7CjpKdQioapAvRnyKE7BeBhjcztXO7nWI4Hwlj1YkhFHfZCyM6F9N_V0a7c55GyKkXrmhDHx9WOem1Fuc-9kfv7G4xvyS1xDu44cYbXEsWmMN3DnSX8QIE0Jxn_tvPyZRZKyojFL0YxWBACyIsFsc",
    colors: ["#000000", "#FFFFFF"],
    isNew: true
  }
];

const categories = ["All", "Footwear", "Apparel", "Equipment", "Accessories"];
const sortOptions = [
  { id: "newest", name: "Newest First" },
  { id: "price-asc", name: "Price: Low to High" },
  { id: "price-desc", name: "Price: High to Low" },
  { id: "rating", name: "Highest Rated" }
];

const BrandCollection = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const { brandId } = useParams();
  const location = useLocation();


  fetch

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update active section based on scroll position
      const sections = ["hero", "story", "products"];
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax and animation values
  const heroScale = 1 + scrollY * 0.0005;
  const heroOpacity = 1 - scrollY * 0.002;

  // Function to check if a section is active based on the current URL
  const isLinkActive = (path) => {
    const currentPath = location.hash || "#hero";
    return currentPath === path;
  };

  // Navigation links configuration
  const navLinks = [
    { name: "Story", path: "#story" },
    { name: "Products", path: "#products" },
    { name: "Contact", path: "#contact" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Floating Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: scrollY > 400 ? 0 : -100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <NavLink 
            to="/brands"
            className="flex items-center gap-4 hover:opacity-80 transition-opacity"
          >
            <img src={brandData.logo} alt={brandData.name} className="w-10 h-10 object-contain" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{brandData.name}</h2>
          </NavLink>
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={`/brands/${brandId}${link.path}`}
                className={({ isActive }) => `
                  text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400
                  ${isLinkActive(link.path) ? 'text-indigo-600 dark:text-indigo-400 font-medium' : ''}
                `}
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.span>
              </NavLink>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Parallax */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            scale: heroScale,
            opacity: heroOpacity
          }}
        >
          <img
            src={brandData.coverImage}
            alt={brandData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-gray-900" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img
              src={brandData.logo}
              alt={brandData.name}
              className="w-32 h-32 object-contain bg-white rounded-2xl p-6 mx-auto mb-6 shadow-2xl"
            />
            <h1 className="text-6xl sm:text-7xl font-bold text-white mb-4 tracking-tight">
              {brandData.name}
            </h1>
            <div className="flex items-center justify-center gap-6 text-white/80 mb-6">
              <span className="flex items-center gap-1">
                <FiStar className="w-5 h-5 text-yellow-400" />
                {brandData.rating}
              </span>
              <span>{brandData.followers} Followers</span>
              <span>{brandData.products} Products</span>
            </div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              {brandData.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4"
          >
            {Object.entries(brandData.socialLinks).map(([platform, handle]) => (
              <motion.a
                key={platform}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={`https://${platform}.com/${handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                {platform === 'instagram' && <FiInstagram className="w-6 h-6 text-white" />}
                {platform === 'twitter' && <FiTwitter className="w-6 h-6 text-white" />}
                {platform === 'facebook' && <FiFacebook className="w-6 h-6 text-white" />}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div className="w-1 h-1 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Brand Story Section */}
      <section id="story" className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Our Story
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {brandData.story}
            </p>
          </motion.div>

          {/* Stats Grid with Hover Effect */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
            {Object.entries(brandData.stats).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-2xl shadow-lg"
              >
                <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Values with Animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandData.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-white rounded-lg" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {value}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Category Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 mb-8">
            <motion.select
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </motion.select>

            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl p-1">
              {["grid", "list"].map((mode) => (
                <motion.button
                  key={mode}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode(mode)}
                  className={`p-2 rounded-lg ${
                    viewMode === mode
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {mode === "grid" ? <FiGrid className="w-5 h-5" /> : <FiList className="w-5 h-5" />}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Products Grid with Stagger Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`grid ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              } gap-6`}
            >
              {productsData.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25 transition-all duration-300"
            >
              Load More Products
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BrandCollection; 