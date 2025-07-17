import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiAlertCircle, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { MdLocalShipping, MdPayment } from 'react-icons/md';
import Loading from '@/components/Loading';
import { createOrder, fetchOrders } from '@/features/orderSlice';
import { toast } from 'react-hot-toast';
import OrderCard from './OrderCard';
import OrderLoadingGrid from './OrdersLoadingGrid';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

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

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders = [], isLoading, error } = useSelector((state) => state.order);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchOrders());
    }
  }, [dispatch, isAuthenticated]);

  const handleCreateOrder = async () => {
    if (!cart?.CartItems?.length) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      const orderData = cart.CartItems.map(item => ({
        productId: item.ProductId,
        quantity: item.quantity
      }));

      const result = await dispatch(createOrder(orderData)).unwrap();
      toast.success('Order placed successfully!');
      navigate(`/orders/${result.id}`);
    } catch (error) {
      toast.error(error.message || 'Error creating order');
    }
  };

  if (!isAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <div className="max-w-md mx-auto">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <FiPackage className="w-20 h-20 mx-auto mb-6 text-indigo-600 dark:text-indigo-400" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
            Please Login
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">You need to be logged in to access your orders.</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => navigate('/auth/login')}
              className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium transition-colors"
            >
              Login to Continue
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <div className="max-w-md mx-auto">
          <FiAlertCircle className="w-20 h-20 mx-auto mb-6 text-red-500" />
          <h2 className="text-2xl font-semibold mb-4 text-red-600">Error loading orders</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            {typeof error === 'object' ? error.message || 'Something went wrong' : error}
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => dispatch(fetchOrders())}
              className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white transition-colors"
            >
              Try Again
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <motion.h1
          variants={itemVariants}
          className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text"
        >
          My Orders
        </motion.h1>
        {cart?.CartItems?.length > 0 && (
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={handleCreateOrder}
              className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white flex items-center gap-2 transition-colors"
            >
              <MdPayment className="w-5 h-5" />
              Place New Order
            </Button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-16"
          >
            <MdLocalShipping className="w-20 h-20 mx-auto mb-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">No orders yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Start shopping to create your first order!</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => navigate('/products')}
                className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white transition-colors"
              >
                Browse Products
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            className="flex flex-col gap-6"
          >
            {isLoading?(
              <OrderLoadingGrid />
            ):(
              
            orders.map((order) => (
              <OrderCard key={order.id} order={order} />
              
            ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OrderPage;
