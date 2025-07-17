import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FiGrid, FiFilter, FiSearch } from "react-icons/fi";
import CategoryCard from "./CategoryCard";
import { publicApi } from "../../api/api";
import { useDebounce } from "../../hooks/use-debounce";
import { ProductSkeletonCard } from "@/components";

const Categories = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [loading, setLoading ] = useState(false)

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

  useEffect(() => {
    const fetchCategories = async () => {
      if(debouncedSearchQuery) {
        try {
          setLoading(true)
          const response = await publicApi.get(`/categories/get-category/${debouncedSearchQuery}`);
          setCategories(response.data.data);
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      } else {
        try {
          setLoading(true)
          const response = await publicApi.get(`/categories/get-all-categories`);
          setCategories(response.data.data);
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }
    };
    fetchCategories();
  }, [debouncedSearchQuery]);

  return (
    <section className="px-4 sm:px-6 py-8 sm:py-12 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto">
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
            <span className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">All Categories</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 dark:from-gray-100 dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent mb-4 sm:mb-6"
          >
            Browse Categories
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Explore our wide range of categories and find exactly what you're looking for
          </motion.p>
        </div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search categories..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 text-gray-900 dark:text-gray-100"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <FiFilter className="w-5 h-5" />
              <span>Filter</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          { !loading?(
              categories.length > 0 ? categories.map((category, idx) => (
                <CategoryCard key={idx} category={category} index={idx} />
              )) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                  No categories found
                </div>
              )
            ):(
              [...Array(4)].map((_, i) => (
                <ProductSkeletonCard key={i} />
              ))
            )
          }
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
                Can't Find What You're Looking For?
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90"
              >
                Contact our support team and we'll help you find the perfect category for your needs
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
                Contact Support
              </motion.button>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 dark:bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 dark:bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
