import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight, FiPlay, FiStar, FiTrendingUp } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const shimmerVariants = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const imageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBLV9LrxXTmvPS0U6qTfnUV5x4nY9EXm8zjHkT4-10kydx-FSVCVoYj6-EWOlqgQ1zHQgIcHBEM4r5F1R2P6ISBEknH-dRYisEltLmmv-B-q9Roq8YWLx736tuVBQpSgQxzfaYg-EY3A9-xnG0dSaTRreiExmbMuJ2kIzjiAVod47Kqen886Of-ZuEIYvJB0oQU76K0aW0L23Zg-HFx2WIK5GJ8DoWQC6wYI1rZvhjLrB0B_H3Q5dkqN_bIkbo2QRu0vmChB5zI3gc";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="w-full relative overflow-hidden">
      <div className="p-2 sm:p-4">
        <div className="relative min-h-[520px] sm:min-h-[600px] overflow-hidden sm:rounded-2xl group">
          {/* Background Image with Parallax */}
          <motion.div
            className="absolute inset-0"
            style={{ y, opacity }}
          >
            <motion.img
              src={imageUrl}
              alt="Lifestyle"
              className="w-full h-full object-cover scale-110"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </motion.div>

          {/* Dynamic Gradient Overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-transparent"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)`,
            }}
          />

          {/* Floating Elements */}
          <motion.div
            className="absolute top-8 right-8 bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30"
            variants={floatingVariants}
            animate="animate"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-2">
              <FiTrendingUp className="text-white text-lg" />
              <div className="text-white">
                <div className="text-xs opacity-80">Trending</div>
                <div className="text-sm font-semibold">+25% Sales</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-10 left-8 bg-white/15 backdrop-blur-md rounded-xl p-3 border border-white/20"
            variants={floatingVariants}
            animate="animate"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
            style={{ animationDelay: "1s" }}
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="text-yellow-400 text-xs fill-current" />
              ))}
              <span className="text-white text-xs ml-1">4.9</span>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-start justify-end gap-8 px-6 pb-12 sm:px-12 sm:pb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            {/*<motion.div 
              className="bg-gradient-to-r from-indigo-500/80 to-purple-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              🔥 New Collection Available
            </motion.div>*/}

            {/* Main Text */}
            <div className="flex flex-col gap-4 text-left max-w-2xl">
              <motion.h1
                className="text-white text-5xl sm:text-7xl font-black leading-none tracking-tight"
                variants={itemVariants}
              >
                <span className="block">Elevate</span>
                <span className="block bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Your Lifestyle
                </span>
              </motion.h1>
              
              <motion.p
                className="text-gray-200 text-lg sm:text-xl font-light leading-relaxed max-w-lg"
                variants={itemVariants}
              >
                Discover curated collections for every aspect of your life, from home essentials to fashion-forward finds.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              variants={itemVariants}
            >
              {/* Primary CTA */}
              <motion.button
                className="group relative overflow-hidden bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 min-w-[200px]"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  variants={shimmerVariants}
                  animate="animate"
                  style={{ backgroundSize: "200% 100%" }}
                />
                <a href="/products" className="relative z-10 text-black hover:text-gray-500 transition-colors duration-300">Shop Now</a>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FiArrowRight className="text-xl" />
                </motion.div>
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                className="group bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 min-w-[200px]"
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  backgroundColor: "rgba(255,255,255,0.2)" 
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <FiPlay className="text-lg" />
                <span>Watch Video</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="flex gap-8 text-white/80"
              variants={itemVariants}
            >
              <div className="text-center">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1M+</div>
                <div className="text-sm">Products Sold</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">99%</div>
                <div className="text-sm">Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive Glow Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: `radial-gradient(circle 300px at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.15), transparent)`,
            }}
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;