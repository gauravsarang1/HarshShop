import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FiArrowRight, FiTrendingUp, FiHeart, FiShoppingBag, FiGrid, FiStar } from "react-icons/fi";

const categoryList = [
  {
    name: "Home Decor",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDe21F5Qgz4HMwHvZepWqt6BjSSOpB0JPQv-IZT1Eu24ojeVS8GFUSpOOrx-yTXFszoit_VD8i2Jcy6a9McVfgjTSxlapvbqHZpsNuaLOeAeeHboK4Mrdsd2F7CjpKdQioapAvRnyKE7BeBhjcztXO7nWI4Hwlj1YkhFHfZCyM6F9N_V0a7c55GyKkXrmhDHx9WOem1Fuc-9kfv7G4xvyS1xDu44cYbXEsWmMN3DnSX8QIE0Jxn_tvPyZRZKyojFL0YxWBACyIsFsc",
    itemCount: "2.5K+ items",
    trending: true,
    gradient: "from-amber-500 to-orange-600",
    icon: "🏠",
    desc: "Transform your living space"
  },
  {
    name: "Women's Fashion",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBr7_ic02pFLXSfJjd8UKTdHrPsUeGiYiO83Xe9YkPxBRIv7isgx7LIY1oXMy_ZT_gTIve4KISUyPArDYUbyGmxnqLE7aArBWcM6eNL0SSYAMAB07gRnrxh_Q-Hym0qzpwS6sVoQ7VfR6jrHOVSaNtd2y-TUEwz9uvF7W9tze6deHembxxV9oDYCqRPX7tMHIOdtP8qw31Ybb3CnzwC9Iy2IXNT6HX29oF9Tx1EWccq475muS040PGOx1Sz0q_z3ViVlZZwg1xzLT0",
    itemCount: "8.2K+ items",
    trending: true,
    gradient: "from-pink-500 to-rose-600",
    icon: "👗",
    desc: "Elegant & trendy styles"
  },
  {
    name: "Men's Fashion",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDaW4JPrWzz4ODvNjxihcVqtPBroyjbBG8qyyZ3tG0-l_Ug9G9Q4jccAZmEr0NstmjKIl_qjpu_WjtoBJ76p6bcenIsuCWkDuwLMMZICm5F0tDWIayBJK-gjp8yLOgKhcsiWaOnVy95cYoPoT3-lddlLikV3EjbxqMBnYgb8hzJPe-1WBCsFoF3ZP1HCtrEqo0FNesnXhsBSiD4sePEqGtYmnN-m_AkCh0z_kJBW2gdAe_2miveX_y5TEIRNE1uazhoMCil-MlKEPQ",
    itemCount: "5.8K+ items",
    trending: true,
    gradient: "from-blue-500 to-indigo-600",
    icon: "👔",
    desc: "Style & comfort combined"
  },
  {
    name: "Electronics",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuABENrK-SltVp4rYZvj9D47HPqpBwcXdfMuVe-DVjeYdjAo6MmQpBbuN3eIWyjxFYQrr7m3mYcjg8fUlp_XC8_FXq4biu_PcAc6gwq5j5bdKjRKsL-pKsA4YZTXbcJm3rEAgNrTx8kMyqN1CyCBbwCKBnln2OhD19LcpSndIZt5LbAH6GSpO4gGt_HAukyiCcBBCw1SqsdfaLKIPbXfW0TEoLAyt_HTecCz8VrrpKTYdUmdNHSc77gM66ACqjRsjYyErph8J_6RMvg",
    itemCount: "3.1K+ items",
    trending: true,
    gradient: "from-purple-500 to-violet-600",
    icon: "📱",
    desc: "Latest tech gadgets"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.9,
    rotateX: 15
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      duration: 0.8,
    },
  },
};

const Categories = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="px-4 sm:px-6 py-8 sm:py-12 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <FiGrid className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">Browse Categories</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4 sm:mb-6"
          >
            Featured Categories
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Discover our curated collections across various lifestyle categories
          </motion.p>
        </div>

        {/* Categories Grid */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {categoryList.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              custom={idx}
              className="group cursor-pointer perspective-1000"
            >
              <motion.div
                whileHover={{ 
                  y: -12,
                  rotateY: 5,
                  scale: 1.03,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }
                }}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 dark:border-gray-700/20 relative"
              >
                {/* Trending Badge */}
                <AnimatePresence>
                  {category.trending && (
                    <motion.div
                      initial={{ x: -50, opacity: 0, rotate: -15 }}
                      animate={{ x: 0, opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.6 + idx * 0.1, type: "spring", stiffness: 200 }}
                      className="absolute top-4 right-4 z-20"
                    >
                      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300 flex items-center gap-1">
                        <FiTrendingUp className="w-3 h-3" />
                        Trending
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Image Container */}
                <div className="relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl aspect-square">
                  <motion.div
                    whileHover={{
                      scale: 1.15,
                      rotate: 2,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }
                    }}
                    className="w-full h-full bg-center bg-no-repeat bg-cover transform-gpu"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-40 dark:opacity-50`} />
                  
                  {/* Icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
                    className="absolute top-4 left-4 text-2xl sm:text-3xl"
                  >
                    {category.icon}
                  </motion.div>

                  {/* Stats Badge */}
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    className="absolute bottom-4 left-4 bg-black/20 dark:bg-black/40 backdrop-blur-md text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-medium flex items-center gap-1"
                  >
                    <FiStar className="w-3 h-3" />
                    {category.itemCount}
                  </motion.div>

                  {/* Quick Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 sm:p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <FiHeart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 sm:p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <FiShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <motion.h3 
                    className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300"
                  >
                    {category.name}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-sm text-gray-600 dark:text-gray-300 mb-4"
                  >
                    {category.desc}
                  </motion.p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <span>Explore Category</span>
                    <motion.div
                      animate={{ x: hoveredIndex === idx ? 5 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </motion.div>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mt-12 sm:mt-20 px-4"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 dark:bg-black/20 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4"
              >
                Explore All Categories
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90"
              >
                Discover more collections and find your perfect style
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <a href="/categories" className="relative z-10 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-300">View All Categories</a>
              </motion.button>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 dark:bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 dark:bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Categories;