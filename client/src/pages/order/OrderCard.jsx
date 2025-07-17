import React from "react";
import { motion } from "framer-motion";
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiAlertCircle, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

  
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
                  {Array.isArray(order.OrderItems) && order.OrderItems.map((item) => (
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

  export default OrderCard