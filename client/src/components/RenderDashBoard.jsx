import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, ShoppingBag, DollarSign, Store } from 'lucide-react';
import StatCard from '../pages/vendor/components/StatCard';


const RenderDashboard = ({
    userType,
    stats = [],
    recentOrders = [],
    topVendors = [],
    topProducts = []
}) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<BarChart3 className="text-blue-500" />}
          title="Total Sales"
          value={stats.totalSales}
        />
        <StatCard
          icon={<Users className="text-green-500" />}
          title="Total Pending Orders"
          value={stats.totalPendingOrders}
        />
        <StatCard
          icon={<ShoppingBag className="text-yellow-500" />}
          title="Total Products"
          value={stats.totalProducts}
        />
        <StatCard
          icon={<DollarSign className="text-red-500" />}
          title="Total Revenue"
          value={stats.totalRevenue}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">#{order.id}</p>
                  <p className="text-sm text-gray-600">{order.User?.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.totalAmount}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold mb-4">
            {userType === 'admin' ? 'Top Vendors' : 'Top Products'}
          </h3>
          <div className="space-y-3">
            {(userType === 'admin' ? topVendors : topProducts).map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {userType === 'admin' ? `${item.products} products` : item.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {userType === 'admin' ? item.revenue : item.price}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    item.status === 'Out of Stock' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

export default RenderDashboard;