import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiFilter, FiGrid, FiList, FiChevronDown, FiArrowUp, FiArrowDown } from "react-icons/fi";
import NewArrivalCard from "../../components/NewArrivalCard";

// Mock new arrivals data
const newArrivalsData = [
  {
    id: 1,
    name: "Premium Leather Backpack",
    brand: "Urban Explorer",
    price: 129.99,
    rating: 5,
    reviews: 28,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBr7_ic02pFLXSfJjd8UKTdHrPsUeGiYiO83Xe9YkPxBRIv7isgx7LIY1oXMy_ZT_gTIve4KISUyPArDYUbyGmxnqLE7aArBWcM6eNL0SSYAMAB07gRnrxh_Q-Hym0qzpwS6sVoQ7VfR6jrHOVSaNtd2y-TUEwz9uvF7W9tze6deHembxxV9oDYCqRPX7tMHIOdtP8qw31Ybb3CnzwC9Iy2IXNT6HX29oF9Tx1EWccq475muS040PGOx1Sz0q_z3ViVlZZwg1xzLT0",
    colors: ["#8B4513", "#000000", "#4A4A4A"],
    launchDate: "2 days ago",
    category: "Accessories"
  },
  {
    id: 2,
    name: "Smart Home Security Camera",
    brand: "TechGuard",
    price: 199.99,
    rating: 4,
    reviews: 15,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuABENrK-SltVp4rYZvj9D47HPqpBwcXdfMuVe-DVjeYdjAo6MmQpBbuN3eIWyjxFYQrr7m3mYcjg8fUlp_XC8_FXq4biu_PcAc6gwq5j5bdKjRKsL-pKsA4YZTXbcJm3rEAgNrTx8kMyqN1CyCBbwCKBnln2OhD19LcpSndIZt5LbAH6GSpO4gGt_HAukyiCcBBCw1SqsdfaLKIPbXfW0TEoLAyt_HTecCz8VrrpKTYdUmdNHSc77gM66ACqjRsjYyErph8J_6RMvg",
    colors: ["#FFFFFF", "#000000"],
    launchDate: "1 day ago",
    category: "Electronics"
  },
  {
    id: 3,
    name: "Organic Cotton Sweater",
    brand: "EcoStyle",
    price: 89.99,
    rating: 5,
    reviews: 42,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDe21F5Qgz4HMwHvZepWqt6BjSSOpB0JPQv-IZT1Eu24ojeVS8GFUSpOOrx-yTXFszoit_VD8i2Jcy6a9McVfgjTSxlapvbqHZpsNuaLOeAeeHboK4Mrdsd2F7CjpKdQioapAvRnyKE7BeBhjcztXO7nWI4Hwlj1YkhFHfZCyM6F9N_V0a7c55GyKkXrmhDHx9WOem1Fuc-9kfv7G4xvyS1xDu44cYbXEsWmMN3DnSX8QIE0Jxn_tvPyZRZKyojFL0YxWBACyIsFsc",
    colors: ["#E5D3B3", "#4A4A4A", "#8B4513"],
    launchDate: "3 days ago",
    category: "Fashion"
  },
  {
    id: 4,
    name: "Wireless Gaming Mouse",
    brand: "GameTech",
    price: 79.99,
    rating: 4,
    reviews: 56,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRz_E4M7MqyR1T94SJsxvdcPvX3sLixSuvtekrvpO-Cs6Ve6SNPmyqcE70HSQOW73j0j7W0R_i7cu4X4JfJtbRJRCJDUELqbPGyvqblWN_FB46m4HWqJJ469jJi0siA2zZRSfU9Dh0pi2a1vnA0YQWjnclpWMrxhj1w51X06LIIM6T_ZHnuv_b6u8ck5mMtn9rsFLJVCu_S4ovFv5deoF7ApNC2GS775WpL7D2uoY69CHO-jkmzHqRMM1qPemJK1ihQA0ZRdTYZRQ",
    colors: ["#000000", "#FF0000"],
    launchDate: "Just now",
    category: "Electronics"
  },
  {
    id: 5,
    name: "Minimalist Watch",
    brand: "TimeStyle",
    price: 159.99,
    rating: 5,
    reviews: 89,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6f-SZAcHNvL2ceEd5JTbChWx6hdJ-VbLoEOHT7CBS2JpTTbxdRPcZyXs3CcDQrPx-9Xoe_enljY3t8CvQuR6Ow0yTdS7iV9inJDrt-5bqcwDuaSmYoJh05qOcmA1-VVBysn61N9roRlC0atEYFvqf82pNElRYE2vXaTUur5BKTYmZ24lKcH6ie8oz6dfTuwBuhuAAQ2oaoVCmkwuri9h68PYORscqf7SSNmydRrAKnZj696gzd_7LuBxI6JnJ5fqoQHJ3hAx6zM0",
    colors: ["#C0C0C0", "#FFD700", "#000000"],
    launchDate: "4 hours ago",
    category: "Accessories"
  },
  {
    id: 6,
    name: "Eco-Friendly Water Bottle",
    brand: "GreenLife",
    price: 34.99,
    rating: 4,
    reviews: 127,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDAONazco_3YEkVppg1VKata0EZm1_m5ZZsUav5YXDdLFPj-xLaKai-llnPBSZj3mWHL3_rAoz3KFZ4h_HQnv06UiigwopZExE1DxoFFUWKxM-CzdsyA9aNCpHV7tFne2toIrRLWKm5stXGmcVGfA0eniLl5b5k9NXCP_EXEBJkm1d5uEZnDNQfCCueN6hChzp24RqiB0RXcQlq3MScKQgtD70e7MxnoKuGUGNvq1dvk_ftF3nm_QQQjI9clw2hnntZEfKbrPbEDM",
    colors: ["#00FF00", "#0000FF", "#FF69B4"],
    launchDate: "1 hour ago",
    category: "Lifestyle"
  }
];

const categories = ["All", "Fashion", "Electronics", "Accessories", "Lifestyle"];
const sortOptions = [
  { id: "newest", name: "Newest First" },
  { id: "price-asc", name: "Price: Low to High" },
  { id: "price-desc", name: "Price: High to Low" },
  { id: "rating", name: "Highest Rated" }
];

const NewArrivals = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
            New Arrivals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Discover our latest collection of products, fresh off the shelves and ready to enhance your lifestyle.
          </motion.p>
        </div>

        {/* Filters and Controls */}
        <div className="mb-8">
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

            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
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

        {/* Products Grid */}
        <div className={`grid ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1"
        } gap-6`}>
          {newArrivalsData.map((product, index) => (
            <NewArrivalCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            Load More Products
          </motion.button>
        </div>

        {/* Newsletter Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl overflow-hidden"
        >
          <div className="px-6 py-12 sm:px-12 sm:py-16 text-center text-white relative">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-lg opacity-90 mb-8">
                Subscribe to our newsletter to be the first to know about new arrivals and exclusive offers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-indigo-600 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Subscribe
                </motion.button>
              </div>
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

export default NewArrivals;
