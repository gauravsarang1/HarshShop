import React from 'react';
import { Button } from "@/components/ui/button";

const OrderStatusFilter = ({ activeFilter, onFilterChange }) => {
  const statuses = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Processing', value: 'Processing' },
    { label: 'Shipped', value: 'Shipped' },
    { label: 'Delivered', value: 'Delivered' },
    { label: 'Cancelled', value: 'Cancelled' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {statuses.map(status => (
        <Button
          key={status.value}
          variant={activeFilter === status.value ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(status.value)}
          className={`${
            activeFilter === status.value
              ? ''
              : 'hover:bg-gray-100'
          }`}
        >
          {status.label}
          {activeFilter === status.value && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-white bg-opacity-20 rounded-full">
              {status.label !== 'All' ? status.label : 'All Orders'}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
};

export default OrderStatusFilter; 