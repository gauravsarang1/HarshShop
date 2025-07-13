import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiAlertCircle, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { MdLocalShipping, MdPayment } from 'react-icons/md';
import Loading from '@/components/Loading';
import { createOrder, fetchOrders } from '@/features/orderSlice';
import { toast } from 'react-hot-toast';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
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

const OrderStatusBadge = ({ status }) => {
  const statusConfig = {
    'PENDING': { color: 'bg-yellow-100 text-yellow-800', icon: FiClock },
    'PROCESSING': { color: 'bg-blue-100 text-blue-800', icon: FiPackage },
    'SHIPPED': { color: 'bg-purple-100 text-purple-800', icon: FiTruck },
    'DELIVERED': { color: 'bg-green-100 text-green-800', icon: FiCheckCircle },
    'CANCELLED': { color: 'bg-red-100 text-red-800', icon: FiAlertCircle },
  };

  const config = statusConfig[status] || statusConfig['PENDING'];
  const Icon = config.icon;

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${config.color} shadow-sm`}
    >
      <Icon className="w-4 h-4 mr-2" />
      {status}
    </motion.span>
  );
};

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
      className="w-full"
    >
      <Card className="p-6 hover:shadow-xl transition-shadow duration-300 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Order #{order.id}</h3>
              <OrderStatusBadge status={order.status.toUpperCase()} />
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
              <FiClock className="w-4 h-4" />
              <p className="text-sm">{formattedDate}</p>
            </div>
            <div className="mt-4">
              <p className="font-medium mb-3 flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <FiShoppingBag className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Order Items
              </p>
              <ul className="mt-2 space-y-2 pl-6">
                {order.OrderItems.map((item) => (
                  <motion.li
                    key={item.id}
                    className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                    {item.Product.name} × {item.quantity}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-end justify-between gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Amount</p>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                ₹{parseFloat(order.totalAmount).toLocaleString('en-IN')}
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                View Details
                <FiArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
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
              onClick={() => navigate('/login')}
              className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium transition-colors"
            >
              Login to Continue
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (isLoading) {
    return <Loading type="skeleton" />;
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
          <p className="text-gray-500 dark:text-gray-400 mb-8">{error}</p>
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
            className="grid gap-6"
          >
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OrderPage;
