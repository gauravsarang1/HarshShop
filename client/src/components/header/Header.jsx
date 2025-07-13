import { FiHeart, FiShoppingCart, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation, Link, useNavigate } from 'react-router-dom';
import { ModeToggle } from '../mode-toggle';
import DropDown from './dropdown-menu';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setIsAuthenticated } from '../../features/userSlice';
import { api } from '../../api/api';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const cartItems = cart?.CartItems || [];
  
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // If no token, just clean up the local state
        dispatch(setUser(null));
        dispatch(setIsAuthenticated(false));
        navigate('/auth/login');
        return;
      }

      // Call the server logout endpoint with the token
      await api.post('/users/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clean up local state, regardless of server response
      localStorage.removeItem('token');
      dispatch(setUser(null));
      dispatch(setIsAuthenticated(false));
      navigate('/auth/login');
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const mobileMenuItems = {
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconButtonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const logoVariants = {
    hover: {
      rotate: 5,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const searchVariants = {
    focused: {
      scale: 1.02,
      boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)",
      transition: {
        duration: 0.2
      }
    },
    unfocused: {
      scale: 1,
      boxShadow: "0 0 0 0px rgba(99, 102, 241, 0)",
      transition: {
        duration: 0.2
      }
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'Deals', path: '/deals' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Brands', path: '/brands' }
  ];

  return (
    <motion.header 
      className="border-b border-solid border-b-gray-200/50 dark:border-b-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 shadow-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <NavLink 
            to="/"
            className="flex items-center"
          >
            <motion.div 
              className="flex-shrink-0 flex items-center cursor-pointer"
              whileHover="hover"
              variants={logoVariants}
            >
              <motion.div 
                className="w-8 h-8 text-indigo-600 dark:text-indigo-400"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                    fill="currentColor"
                  />
                </svg>
              </motion.div>
              <motion.h2 
                className="ml-3 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                HarshShop
              </motion.h2>
            </motion.div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => `
                  relative px-4 py-2 text-sm font-medium transition-colors rounded-lg
                  ${isActive 
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' 
                    : 'text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }
                `}
              >
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                >
                  {link.name}
                </motion.span>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </NavLink>
            ))}
          </div>

          {/* Search, Cart, and Profile */}
          <div className="flex items-center space-x-3">
            {/* Search - Hidden on mobile */}
            <Link to="/products" className="hidden md:flex items-center">
              <motion.div 
                className="relative"
                variants={searchVariants}
                animate={searchFocused ? "focused" : "unfocused"}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <motion.div
                    animate={{ rotate: searchFocused ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiSearch className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  </motion.div>
                </div>
                <motion.input
                  type="text"
                  placeholder="Search products..."
                  className="block w-64 pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 focus:border-indigo-500 dark:focus:border-indigo-400 text-sm transition-all duration-200"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>
            </Link>

            {/* Wishlist and Cart Buttons */}
            <div className="flex items-center space-x-1">
              {/*<NavLink 
                to="/wishlist"
                className={({ isActive }) => `
                  relative p-2.5 hidden md:block rounded-xl transition-colors group
                  ${isActive 
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-200'
                  }
                `}
              >
                <motion.div
                  variants={iconButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FiHeart className="h-5 w-5 group-hover:text-red-500 transition-colors" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <span className="text-xs text-white font-medium">3</span>
                  </motion.div>
                </motion.div>
              </NavLink>*/}
              
              <NavLink 
                to="/cart"
                className={({ isActive }) => `
                  relative p-2.5 hidden md:block rounded-xl transition-colors group
                  ${isActive 
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-200'
                  }
                `}
              >
                <motion.div
                  variants={iconButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FiShoppingCart className="h-5 w-5 group-hover:text-indigo-500 transition-colors" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <span className="text-xs text-white font-medium">{cartItems.length}</span>
                  </motion.div>
                </motion.div>
              </NavLink>
            </div>

              {/* Theme Toggle */}
              <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.2 }}
            >
              <ModeToggle />
            </motion.div>

            {/* Profile Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.2 }}
            >
              <DropDown 
                userData={user} 
                handleLogout={handleLogout}
              />
            </motion.div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 transition-colors"
                variants={iconButtonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden overflow-hidden"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link, index) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) => `
                      block px-4 py-3 text-sm font-medium transition-colors rounded-lg
                      ${isActive 
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' 
                        : 'text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <motion.span
                      variants={mobileMenuItems}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      transition={{ delay: index * 0.1 }}
                    >
                      {link.name}
                    </motion.span>
                  </NavLink>
                ))}
                
                {/* Mobile Search */}
                <motion.div 
                  className="relative mt-4 px-4"
                  variants={mobileMenuItems}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  transition={{ delay: navLinks.length * 0.1 }}
                >
                  <div className="absolute inset-y-0 left-7 flex items-center pointer-events-none">
                    <FiSearch className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  </div>
                  <motion.input
                    type="text"
                    placeholder="Search products..."
                    className="block w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 focus:border-indigo-500 dark:focus:border-indigo-400 text-sm transition-all duration-200"
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}