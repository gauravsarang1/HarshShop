import { motion } from 'framer-motion';
import { FiFilter } from 'react-icons/fi';

const MobileFilterButton = ({ onClick }) => {
  return (
    <div className="md:hidden fixed bottom-6 right-6 z-50">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl"
        />
        <motion.button
          onClick={onClick}
          className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-2xl shadow-lg backdrop-blur-sm border border-white/20"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(99, 102, 241, 0.4)",
              "0 0 0 15px rgba(99, 102, 241, 0)",
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            animate={{ rotate: [0, 180] }}
            transition={{ duration: 0.5 }}
          >
            <FiFilter className="w-6 h-6" />
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default MobileFilterButton; 