import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiClock, FiTag, FiPercent, FiPackage, FiGift } from "react-icons/fi";
import DealCard from "../../components/DealCard";

// Mock deals data
const dealsData = {
  flashSales: [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      description: "High-quality noise-canceling headphones with 30-hour battery life",
      price: 149.99,
      originalPrice: 299.99,
      discount: 50,
      type: "Flash Sale",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuABENrK-SltVp4rYZvj9D47HPqpBwcXdfMuVe-DVjeYdjAo6MmQpBbuN3eIWyjxFYQrr7m3mYcjg8fUlp_XC8_FXq4biu_PcAc6gwq5j5bdKjRKsL-pKsA4YZTXbcJm3rEAgNrTx8kMyqN1CyCBbwCKBnln2OhD19LcpSndIZt5LbAH6GSpO4gGt_HAukyiCcBBCw1SqsdfaLKIPbXfW0TEoLAyt_HTecCz8VrrpKTYdUmdNHSc77gM66ACqjRsjYyErph8J_6RMvg"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      description: "Track your health and fitness with this advanced smartwatch",
      price: 79.99,
      originalPrice: 159.99,
      discount: 50,
      type: "Flash Sale",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDe21F5Qgz4HMwHvZepWqt6BjSSOpB0JPQv-IZT1Eu24ojeVS8GFUSpOOrx-yTXFszoit_VD8i2Jcy6a9McVfgjTSxlapvbqHZpsNuaLOeAeeHboK4Mrdsd2F7CjpKdQioapAvRnyKE7BeBhjcztXO7nWI4Hwlj1YkhFHfZCyM6F9N_V0a7c55GyKkXrmhDHx9WOem1Fuc-9kfv7G4xvyS1xDu44cYbXEsWmMN3DnSX8QIE0Jxn_tvPyZRZKyojFL0YxWBACyIsFsc"
    }
  ],
  bundleDeals: [
    {
      id: 3,
      name: "Home Office Bundle",
      description: "Complete setup including desk, chair, and accessories",
      price: 499.99,
      originalPrice: 799.99,
      discount: 37,
      type: "Bundle",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRz_E4M7MqyR1T94SJsxvdcPvX3sLixSuvtekrvpO-Cs6Ve6SNPmyqcE70HSQOW73j0j7W0R_i7cu4X4JfJtbRJRCJDUELqbPGyvqblWN_FB46m4HWqJJ469jJi0siA2zZRSfU9Dh0pi2a1vnA0YQWjnclpWMrxhj1w51X06LIIM6T_ZHnuv_b6u8ck5mMtn9rsFLJVCu_S4ovFv5deoF7ApNC2GS775WpL7D2uoY69CHO-jkmzHqRMM1qPemJK1ihQA0ZRdTYZRQ"
    },
    {
      id: 4,
      name: "Gaming Setup Bundle",
      description: "Gaming chair, mechanical keyboard, and pro mouse",
      price: 299.99,
      originalPrice: 499.99,
      discount: 40,
      type: "Bundle",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6f-SZAcHNvL2ceEd5JTbChWx6hdJ-VbLoEOHT7CBS2JpTTbxdRPcZyXs3CcDQrPx-9Xoe_enljY3t8CvQuR6Ow0yTdS7iV9inJDrt-5bqcwDuaSmYoJh05qOcmA1-VVBysn61N9roRlC0atEYFvqf82pNElRYE2vXaTUur5BKTYmZ24lKcH6ie8oz6dfTuwBuhuAAQ2oaoVCmkwuri9h68PYORscqf7SSNmydRrAKnZj696gzd_7LuBxI6JnJ5fqoQHJ3hAx6zM0"
    }
  ],
  clearance: [
    {
      id: 5,
      name: "Designer Sunglasses",
      description: "Premium UV protection with stylish design",
      price: 59.99,
      originalPrice: 149.99,
      discount: 60,
      type: "Clearance",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDAONazco_3YEkVppg1VKata0EZm1_m5ZZsUav5YXDdLFPj-xLaKai-llnPBSZj3mWHL3_rAoz3KFZ4h_HQnv06UiigwopZExE1DxoFFUWKxM-CzdsyA9aNCpHV7tFne2toIrRLWKm5stXGmcVGfA0eniLl5b5k9NXCP_EXEBJkm1d5uEZnDNQfCCueN6hChzp24RqiB0RXcQlq3MScKQgtD70e7MxnoKuGUGNvq1dvk_ftF3nm_QQQjI9clw2hnntZEfKbrPbEDM"
    },
    {
      id: 6,
      name: "Luxury Watch Collection",
      description: "Limited edition timepieces at clearance prices",
      price: 199.99,
      originalPrice: 599.99,
      discount: 67,
      type: "Clearance",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvBYB4goEhocTGgDBw5fBD5wOnB7NbL119MVbmHLUOzKXhA3LCfAevEHuNY8o14adDO1b4bQ1lQpj8sWMQJwva4hllubgkx1KnDti2KTEXIJcfBBna2t9EObOaBegeAIeOmCkOFfvcPo-SD2qmYQAQh2pwtXWSnrMJM2SdDpW6kcauIVYm_OF6IsfnL3wfEeCdPeok-k9ZzckQDKBxuMpC5woh49tTeaC_rA1RkFv67lo6dnqTg8L5uHdL5kECY42DudXgHcijIWA"
    }
  ]
};

const dealCategories = [
  { id: "all", name: "All Deals", icon: FiTag },
  { id: "flash", name: "Flash Sales", icon: FiClock },
  { id: "bundle", name: "Bundle Deals", icon: FiPackage },
  { id: "clearance", name: "Clearance", icon: FiPercent },
  { id: "special", name: "Special Offers", icon: FiGift }
];

const Deals = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 30 });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <FiClock className="w-4 h-4" />
            <span>Flash Sale Ends in {timeLeft.hours}h {timeLeft.minutes}m</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Today's Best Deals
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Discover amazing discounts on top products. Don't miss out on these limited-time offers!
          </motion.p>
        </div>

        {/* Categories Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {dealCategories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Flash Sales Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">⚡ Flash Sales</h2>
            <a href="#" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
              View All
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dealsData.flashSales.map((deal, index) => (
              <DealCard key={deal.id} deal={deal} index={index} />
            ))}
          </div>
        </section>

        {/* Bundle Deals Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📦 Bundle Deals</h2>
            <a href="#" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
              View All
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dealsData.bundleDeals.map((deal, index) => (
              <DealCard key={deal.id} deal={deal} index={index} />
            ))}
          </div>
        </section>

        {/* Clearance Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🏷️ Clearance</h2>
            <a href="#" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
              View All
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dealsData.clearance.map((deal, index) => (
              <DealCard key={deal.id} deal={deal} index={index} />
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl overflow-hidden"
        >
          <div className="px-6 py-12 sm:px-12 sm:py-16 text-center text-white relative">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Never Miss a Deal!</h2>
              <p className="text-lg opacity-90 mb-8">
                Subscribe to our newsletter and be the first to know about exclusive deals and discounts.
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

export default Deals;
