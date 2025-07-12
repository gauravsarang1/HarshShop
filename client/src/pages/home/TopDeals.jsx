import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const deals = [
  {
    name: "Smart Watch",
    desc: "Stay connected in style",
    price: "$299",
    originalPrice: "$399",
    discount: "25% OFF",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvBYB4goEhocTGgDBw5fBD5wOnB7NbL119MVbmHLUOzKXhA3LCfAevEHuNY8o14adDO1b4bQ1lQpj8sWMQJwva4hllubgkx1KnDti2KTEXIJcfBBna2t9EObOaBegeAIeOmCkOFfvcPo-SD2qmYQAQh2pwtXWSnrMJM2SdDpW6kcauIVYm_OF6IsfnL3wfEeCdPeok-k9ZzckQDKBxuMpC5woh49tTeaC_rA1RkFv67lo6dnqTg8L5uHdL5kECY42DudXgHcijIWA",
  },
  {
    name: "Wireless Headphones",
    desc: "Immersive sound experience",
    price: "$199",
    originalPrice: "$249",
    discount: "20% OFF",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDRz_E4M7MqyR1T94SJsxvdcPvX3sLixSuvtekrvpO-Cs6Ve6SNPmyqcE70HSQOW73j0j7W0R_i7cu4X4JfJtbRJRCJDUELqbPGyvqblWN_FB46m4HWqJJ469jJi0siA2zZRSfU9Dh0pi2a1vnA0YQWjnclpWMrxhj1w51X06LIIM6T_ZHnuv_b6u8ck5mMtn9rsFLJVCu_S4ovFv5deoF7ApNC2GS775WpL7D2uoY69CHO-jkmzHqRMM1qPemJK1ihQA0ZRdTYZRQ",
  },
  {
    name: "Coffee Maker",
    desc: "Brew your perfect cup",
    price: "$89",
    originalPrice: "$129",
    discount: "31% OFF",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDAONazco_3YEkVppg1VKata0EZm1_m5ZZsUav5YXDdLFPj-xLaKai-llnPBSZj3mWHL3_rAoz3KFZ4h_HQnv06UiigwopZExE1DxoFFUWKxM-CzdsyA9aNCpHV7tFne2toIrRLWKm5stXGmcVGfA0eniLl5b5k9NXCP_EXEBJkm1d5uEZnDNQfCCueN6hChzp24RqiB0RXcQlq3MScKQgtD70e7MxnoKuGUGNvq1dvk_ftF3nm_QQQjI9clw2hnntZEfKbrPbEDM",
  },
  {
    name: "Running Shoes",
    desc: "Run with comfort and support",
    price: "$159",
    originalPrice: "$199",
    discount: "20% OFF",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB6f-SZAcHNvL2ceEd5JTbChWx6hdJ-VbLoEOHT7CBS2JpTTbxdRPcZyXs3CcDQrPx-9Xoe_enljY3t8CvQuR6Ow0yTdS7iV9inJDrt-5bqcwDuaSmYoJh05qOcmA1-VVBysn61N9roRlC0atEYFvqf82pNElRYE2vXaTUur5BKTYmZ24lKcH6ie8oz6dfTuwBuhuAAQ2oaoVCmkwuri9h68PYORscqf7SSNmydRrAKnZj696gzd_7LuBxI6JnJ5fqoQHJ3hAx6zM0",
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

const TopDeals = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="px-4 sm:px-6 py-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-gray-100 dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-3 sm:mb-4"
          >
            Top Deals
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4"
          >
            Discover amazing products at unbeatable prices
          </motion.p>
        </div>

        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {deals.map((deal, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              custom={idx}
              className="group cursor-pointer"
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
                className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                {/* Discount Badge */}
                <div className="relative">
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg"
                  >
                    {deal.discount}
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
                      style={{ backgroundImage: `url(${deal.image})` }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Quick Action Button */}
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-gray-200 p-2 sm:p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-gray-700"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m4.5-5h4" />
                      </svg>
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                    >
                      {deal.name}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 + idx * 0.1 }}
                      className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                    >
                      {deal.desc}
                    </motion.p>
                  </div>

                  {/* Price Section */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + idx * 0.1 }}
                        className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100"
                      >
                        {deal.price}
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + idx * 0.1 }}
                        className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-through"
                      >
                        {deal.originalPrice}
                      </motion.span>
                    </div>
                    
                    {/* Favorite Button */}
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300"
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </motion.button>
                  </div>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12 sm:mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-gray-900 to-blue-900 dark:from-gray-800 dark:to-blue-800 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <a href="/deals" className="relative z-10 text-white hover:text-gray-200 transition-colors duration-300">View All Deals</a>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TopDeals;