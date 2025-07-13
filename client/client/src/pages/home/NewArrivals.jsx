import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const NewArrivals = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const items = [
    {
      title: "Summer Dress",
      desc: "Light and breezy for summer",
      price: "$89",
      badge: "NEW",
      category: "Fashion",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPq71w6WJs5KgAVeyERPMHreiHdQpjvqB1e5ApG_tPQRO7ZbKlIhYiJHifzQ_HJE9e9r4BaySiVO8vueI426GcduMyMQE0pALy22RgvwFogZE2e96GZLuyTawmlewdKceZO4tUY9T25XYMlPf3W_yW1nomHVLOEogBSXtIycM2L8rA0i0v3iDrAQA7fyf0pxWKbk6AqrUWGaUgbfY4Hquk1ctMg4aOAawvLT_BH26ZPpxS3V7fCbMdkEFn1h6gmDN7qgzejoiWzzU"
    },
    {
      title: "Leather Wallet",
      desc: "Classic and durable",
      price: "$129",
      badge: "PREMIUM",
      category: "Accessories",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUh9qW9bgg_fnOMWpIvYRw_lwmKixcxd0hlZn3yUSdGEo8-_P0JC3hLC3ZEk5a7yjPWaszD4Gb-PcTZTUet0yfCClPZIDqY__-m2WU4g9kHD54Vb_T464WCOyrIbFGSR4Jr2CMztBlLeKbFKZvwX7NT6YDMoAMyJlzJ-Tv_hontgOE3XUIQYnnz1eUZr3t_njCcxbCPXBtI5lp2NUXjrO4hw-dsUZjOd8a4FVKFq4xqlB6JA7bERt5YYhN_MDpN5Soyp6ngxRwFL8"
    },
    {
      title: "Bluetooth Speaker",
      desc: "Portable and powerful sound",
      price: "$199",
      badge: "TRENDING",
      category: "Electronics",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ6HGXBdBZ3W2FAopNLdYWlQVOKejRZN9vCfl1t7pKU8HxwTR_8O_ocXQFJVepRx4IOnFsA2SipnV12udvVzX6H0Bs0DING7stQlHx3_MgkMlmLdDWhpaH1oT7zhPhUMDmxAuZwgdyLj_EwP8rzLEdB5uWRO7sntdO9pBJsa02_MQ9uaqpne_Lmjxwq3Qe4kTUsIaany3at8uO2VJKP5T5vZqHs-rJx7xIA3TdhZgfrTfl-rOtMvsWuApLuvdGV8Kh6NQXAxsh8rY"
    },
    {
      title: "Fitness Tracker",
      desc: "Track your progress",
      price: "$249",
      badge: "HOT",
      category: "Health",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHOo2yiQg5Dh591xcvcE5231ArT7piPgSHQ_wBJ3HfIzuW_pEh5poxQOKBEwxRPXsWFkcv3TLVMzEoyz9TncRAK6YknM83Mh4uR7UfVQnifrivGT0Xhz2emIiMTpHL6ZYQtK24bwel7JraTbWOGeZxXNHbapcH_KbVxmqOuDmKfDg1qk6eXmd6fqlhkWkFf4Cynd6sOMofL19JsDqyW4GFaiLmyuUPiNSkHZRvkHy5xtesROG2ow_ddrfNHFbWh_tpvV_XEflDTPk"
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

  const getBadgeColors = (badge) => {
    const colors = {
      NEW: "from-emerald-500 to-teal-500",
      PREMIUM: "from-amber-500 to-orange-500",
      TRENDING: "from-purple-500 to-pink-500",
      HOT: "from-red-500 to-rose-500"
    };
    return colors[badge] || "from-blue-500 to-indigo-500";
  };

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
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">Just Dropped</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4 sm:mb-6"
          >
            New Arrivals
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Fresh finds and latest trends, handpicked just for you
          </motion.p>
        </div>

        {/* Products Grid */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {items.map((item, idx) => (
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
                {/* Floating Badge */}
                <motion.div
                  initial={{ x: -50, opacity: 0, rotate: -15 }}
                  animate={{ x: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1, type: "spring", stiffness: 200 }}
                  className="absolute top-4 left-4 z-20"
                >
                  <div className={`bg-gradient-to-r ${getBadgeColors(item.badge)} text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300`}>
                    {item.badge}
                  </div>
                </motion.div>

                {/* Category Tag */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                  className="absolute top-4 right-4 z-20 bg-black/20 dark:bg-black/40 backdrop-blur-md text-white px-2 sm:px-3 py-1 rounded-lg text-xs font-medium"
                >
                  {item.category}
                </motion.div>

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
                    style={{ backgroundImage: `url("${item.img}")` }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 sm:p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white dark:hover:bg-gray-700"
                    >
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 sm:p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white dark:hover:bg-gray-700"
                    >
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m4.5-5h4" />
                      </svg>
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <motion.h3 
                    className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300"
                  >
                    {item.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-sm text-gray-600 dark:text-gray-300 mb-4"
                  >
                    {item.desc}
                  </motion.p>

                  <div className="flex items-center justify-between mb-4">
                    <motion.span
                      className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100"
                    >
                      {item.price}
                    </motion.span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 dark:hover:from-indigo-600 dark:hover:to-purple-600 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Add to Cart
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
                Don't Miss Out!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90"
              >
                Be the first to discover our latest collections
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
                <a href="/new-arrivals" className="relative z-10 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-300">Explore All New Items</a>
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

export default NewArrivals;