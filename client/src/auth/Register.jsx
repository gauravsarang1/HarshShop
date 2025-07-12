import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { BsApple, BsFacebook } from "react-icons/bs";
import RightPanal from "./RightPanal";
import { useNavigate } from "react-router-dom";
import { publicApi } from "../api/api";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const newFormData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }
      
      const response = await publicApi.post('/users/register', newFormData);
      if (response.status === 200) {
        // After successful registration, automatically log in
        const loginResponse = await publicApi.post("/users/login", {
          email: formData.email,
          password: formData.password
        });
        
        if (loginResponse.status === 200) {
          localStorage.setItem("token", loginResponse.data.data.accessToken);
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-white/20 rounded-full"
      animate={{
        y: [0, -20, 0],
        x: [0, Math.random() * 20 - 10, 0],
        opacity: [0.3, 0.8, 0.3]
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: i * 0.5
      }}
      style={{
        left: `${10 + i * 15}%`,
        top: `${20 + Math.random() * 60}%`
      }}
    />
  ));

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Left side - Registration Form */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md space-y-8"
        >
          {/* Logo/Brand */}
          <motion.div variants={itemVariants} className="text-center">
            {/* <motion.div
              className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 relative"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span 
                className="text-white text-2xl font-bold"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(255,255,255,0)",
                    "0 0 20px rgba(255,255,255,0.5)",
                    "0 0 0px rgba(255,255,255,0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                HS
              </motion.span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20"></div>
            </motion.div> */}
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="mt-2 text-gray-600">
              Already have an account?{" "}
              <motion.a 
                href="/auth/login" 
                className="font-semibold text-blue-600 hover:text-blue-500 relative"
                whileHover={{ scale: 1.05 }}
              >
                Sign in
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            </p>
          </motion.div>

          {/* Glass morphism card */}
          <motion.div 
            variants={itemVariants}
            className="backdrop-blur-xl bg-white/40 p-8 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden"
          >
            {/* Card background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            
            <div className="space-y-6 relative z-10">
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 text-red-700 px-4 py-3 rounded-2xl relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-transparent"></div>
                    <div className="relative">{error}</div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-5">
                {/* Name Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <motion.input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-0 ${
                        errors.name 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200/50 focus:border-blue-500 hover:border-gray-300/70'
                      }`}
                      placeholder="Enter your full name"
                      whileFocus={{ 
                        scale: 1.01,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-red-600"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Email Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <motion.input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-0 ${
                        errors.email 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200/50 focus:border-blue-500 hover:border-gray-300/70'
                      }`}
                      placeholder="Enter your email"
                      whileFocus={{ 
                        scale: 1.01,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-red-600"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Password Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <motion.input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 pr-12 bg-white/80 backdrop-blur-sm border-2 rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-0 ${
                        errors.password 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200/50 focus:border-blue-500 hover:border-gray-300/70'
                      }`}
                      placeholder="Create a password"
                      whileFocus={{ 
                        scale: 1.01,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </motion.button>
                  </div>
                  <AnimatePresence>
                    {errors.password && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-red-600"
                      >
                        {errors.password}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Confirm Password Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <motion.input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 pr-12 bg-white/80 backdrop-blur-sm border-2 rounded-2xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-0 ${
                        errors.confirmPassword 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200/50 focus:border-blue-500 hover:border-gray-300/70'
                      }`}
                      placeholder="Confirm your password"
                      whileFocus={{ 
                        scale: 1.01,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <motion.button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {showConfirmPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </motion.button>
                  </div>
                  <AnimatePresence>
                    {errors.confirmPassword && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-sm text-red-600"
                      >
                        {errors.confirmPassword}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  onClick={onSubmit}
                  disabled={loading}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-2xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ 
                    scale: loading ? 1 : 1.02,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                  }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10 flex items-center justify-center">
                    {loading ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Social Login */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-gray-500 text-sm mb-4">Or continue with</p>
            <div className="flex space-x-4 justify-center">
              {[
                { icon: <FcGoogle className="w-6 h-6" />, name: 'Google' },
                { icon: <BsApple className="w-6 h-6 text-black" />, name: 'Apple' },
                { icon: <BsFacebook className="w-6 h-6 text-blue-600" />, name: 'Facebook' }
              ].map((provider, index) => (
                <motion.button
                  key={provider.name}
                  className="w-12 h-12 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-2xl flex items-center justify-center hover:bg-white/70 transition-all duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {provider.icon}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right side - E-commerce Background */}
     <RightPanal />
    </div>
  );
};

export default Register;
