import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ShoppingCart
} from "lucide-react";

const OrderViewModal = ({ isOpen, onClose, order, onUpdateStatus, loading }) => {
  if (!order) return null;
  console.log("order", order);

  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200',
    Processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
    Shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200',
    Delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200',
    Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
  };

  const statusIcons = {
    Pending: <Clock className="w-5 h-5" />,
    Processing: <Package className="w-5 h-5" />,
    Shipped: <Truck className="w-5 h-5" />,
    Delivered: <CheckCircle2 className="w-5 h-5" />,
    Cancelled: <AlertCircle className="w-5 h-5" />
  };

  // Define next possible statuses based on current status
  const getNextStatuses = (currentStatus) => {
    switch (currentStatus) {
      case 'Pending':
        return ['Processing', 'Cancelled'];
      case 'Processing':
        return ['Shipped', 'Cancelled'];
      case 'Shipped':
        return ['Delivered', 'Cancelled'];
      default:
        return [];
    }
  };

  const getStatusTimeline = () => {
    const timeline = ['Pending', 'Processing', 'Shipped', 'Delivered'];
    const currentIndex = timeline.indexOf(order.status);
    
    return timeline.map((status, index) => {
      const isCurrent = status === order.status;
      const isPast = index < currentIndex;
      const isCancelled = order.status === 'Cancelled';

      return {
        status,
        isCurrent,
        isPast,
        isDisabled: isCancelled
      };
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center justify-between border-b pb-4 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              <span>Order #{order.id}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-normal dark:text-gray-400">Status:</span>
              {order.status !== 'Delivered' && order.status !== 'Cancelled' ? (
                <Select
                  defaultValue={order.status}
                  onValueChange={onUpdateStatus}
                  disabled={loading}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        {statusIcons[order.status]}
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {getNextStatuses(order.status).map((status) => (
                      <SelectItem key={status} value={status}>
                        <div className="flex items-center gap-2">
                          {statusIcons[status]}
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
                            {status}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex items-center gap-2">
                  {statusIcons[order.status]}
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Order Timeline */}
        {order.status !== 'Cancelled' && (
          <div className="my-6">
            <div className="flex justify-between items-center">
              {getStatusTimeline().map((step, index) => (
                <div key={step.status} className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.isDisabled ? 'bg-gray-200 dark:bg-gray-700' :
                    step.isCurrent ? (step.status === 'Delivered' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white') :
                    step.isPast ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
                  }`}>
                    {statusIcons[step.status]}
                  </div>
                  <div className="text-xs mt-2 font-medium text-center dark:text-gray-300">
                    {step.status}
                  </div>
                  {index < getStatusTimeline().length && (
                    <div className={`h-1 w-full mt-4 ${
                      step.isDisabled ? 'bg-gray-200 dark:bg-gray-700' :
                      step.isPast || order.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Order Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <span>Customer Information</span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Name</span>
                  <span className="font-medium dark:text-gray-200">{order?.User?.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Email</span>
                  <span className="font-medium dark:text-gray-200">{order?.User?.email}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Phone</span>
                  <span className="font-medium dark:text-gray-200">{order?.User?.phone || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Order Date</span>
                  <span className="font-medium dark:text-gray-200">
                    {new Date(order?.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Total Items</span>
                  <span className="font-medium dark:text-gray-200">{order?.OrderItems?.length}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Total Amount</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {Number(order.totalAmount).toLocaleString('en-IN', {
                      style: 'currency',
                      currency: 'INR'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-semibold p-6 border-b dark:border-gray-700 flex items-center gap-2">
              <Package className="w-5 h-5" />
              <span>Order Items</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {order.OrderItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0">
                            <img 
                              className="h-16 w-16 rounded-lg object-cover" 
                              src={item.Product?.images?.[0]} 
                              alt="" 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.Product.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{item.Product.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                          {item.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {Number(item.price).toLocaleString('en-IN', {
                          style: 'currency',
                          currency: 'INR'
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {Number(item.price * item.quantity).toLocaleString('en-IN', {
                          style: 'currency',
                          currency: 'INR'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-right text-sm font-medium text-gray-900 dark:text-gray-100">
                      Total
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-100">
                      {Number(order.totalAmount).toLocaleString('en-IN', {
                        style: 'currency',
                        currency: 'INR'
                      })}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Truck className="w-5 h-5" />
              <span>Shipping Address</span>
            </h3>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p className="font-medium">{order.Address?.street}</p>
              <p>{order.Address?.city}, {order.Address?.state} {order.Address?.zipCode}</p>
              <p>{order.Address?.country}</p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t dark:border-gray-700">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderViewModal; 