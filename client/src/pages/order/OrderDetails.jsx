import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { FiPackage, FiMapPin, FiCreditCard, FiArrowLeft, FiCheckCircle, FiClock, FiTruck, FiHome } from 'react-icons/fi';
import Loading from '@/components/Loading';
import { fetchOrderById } from '@/features/orderSlice';

const OrderTimeline = ({ status }) => {
  const steps = [
    { key: 'PENDING', label: 'Order Placed', icon: FiClock },
    { key: 'PROCESSING', label: 'Processing', icon: FiPackage },
    { key: 'SHIPPED', label: 'Shipped', icon: FiTruck },
    { key: 'DELIVERED', label: 'Delivered', icon: FiHome }
  ];
  
  const currentStep = steps.findIndex(step => step.key === status.toUpperCase());

  return (
    <div className="relative py-8">
      {/* Progress Line */}
      <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800" />
      
      <div className="space-y-8">
        {steps.map((step, index) => {
          const isCompleted = index <= currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            key={step.key}
            className="relative flex items-center gap-6 group"
          >
            {/* Timeline Node */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 transform
                ${isCurrent ? (status.toUpperCase() === 'DELIVERED' ? 'bg-green-500 dark:bg-green-400 text-white shadow-lg shadow-green-500/25' : 'bg-sky-500 dark:bg-sky-400 text-white shadow-lg shadow-sky-500/25') : 
                  isCompleted ? 'bg-green-500 dark:bg-green-400 text-white shadow-lg shadow-green-500/25' : 
                  'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'}`}
            >
              {isCompleted && !isCurrent ? (
                <FiCheckCircle className="w-8 h-8" />
              ) : (
                status.toUpperCase() === 'DELIVERED' ? <FiCheckCircle className="w-8 h-8" /> : <FiPackage className="w-8 h-8" />
              )}
            </motion.div>
            
            {/* Step Content */}
            <div className="flex-1 min-w-0">
              <div className={`font-semibold text-lg transition-colors duration-300
                ${isCurrent ? (status.toUpperCase() === 'DELIVERED' ? 'text-green-500 dark:text-green-400' : 'text-sky-600 dark:text-sky-400') : 
                  isCompleted ? 'text-green-500 dark:text-green-400' : 
                  'text-gray-500 dark:text-gray-400'}`}>
                {step.label}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {isCurrent && (status.toUpperCase() === 'DELIVERED' ? 'Order Delivered' : 'Currently processing your order')}
                {isCompleted && !isCurrent && 'Completed'}
                {!isCompleted && !isCurrent && 'Pending'}
              </div>
            </div>
          </motion.div>
          
          );
        })}
      </div>
    </div>
  );
};

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentOrder: order, isLoading, error } = useSelector((state) => state.order);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated && orderId) {
      dispatch(fetchOrderById(orderId));
    }
  }, [dispatch, orderId, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4"
      >
        <div className="max-w-md w-full">
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FiPackage className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Login Required</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Please sign in to view your order details and track your purchases.</p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                onClick={() => navigate('/login')} 
                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium py-3 rounded-xl transition-all duration-300"
              >
                Sign In
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (isLoading) {
    return <Loading type="skeleton" />;
  }

  if (error || !order) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4"
      >
        <div className="max-w-md w-full">
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FiPackage className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Order Not Found</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">{error || 'The order you\'re looking for doesn\'t exist or has been removed.'}</p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                onClick={() => navigate('/orders')} 
                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium py-3 rounded-xl transition-all duration-300"
              >
                View All Orders
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800';
      case 'PROCESSING': return 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800';
      case 'SHIPPED': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800';
      case 'DELIVERED': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div whileHover={{ x: -5 }}>
            {/*<Button
              variant="ghost"
              onClick={() => navigate('/orders')}
              className="mb-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
            >
              <FiArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Orders
            </Button>*/}
          </motion.div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <motion.h1
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent"
              >
                Order #{order.id}
              </motion.h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}
            >
              {order.status.toUpperCase()}
            </motion.div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Timeline */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 p-6">
                  <h2 className="text-2xl font-bold text-white">Order Progress</h2>
                  <p className="text-indigo-100 mt-1">Track your order journey</p>
                </div>
                <div className="p-6">
                  <OrderTimeline status={order.status} />
                </div>
              </Card>
            </motion.div>

            {/* Order Items */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 p-6">
                  <h2 className="text-2xl font-bold text-white">Order Items</h2>
                  <p className="text-indigo-100 mt-1">{order.OrderItems.length} item(s) in your order</p>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {order.OrderItems.map((item, index) => (
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                        key={item.id}
                        className="flex gap-6 p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
                          <img
                            src={item.Product.images[0]}
                            alt={item.Product.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{item.Product.name}</h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Quantity: {item.quantity}</p>
                          <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-2">
                            ₹{(item.Product.price * item.quantity).toLocaleString('en-IN')}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Order Summary
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Subtotal</span>
                  <span>₹{order.totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Tax</span>
                  <span>₹0</span>
                </div>
                <div className="h-px bg-gray-200 dark:bg-gray-700 my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-indigo-600 dark:text-indigo-400">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <FiMapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span>Delivery Address</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <FiCreditCard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <span>Payment Method</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderDetails;