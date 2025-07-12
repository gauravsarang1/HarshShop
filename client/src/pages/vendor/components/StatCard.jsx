import React from 'react';
import { Card } from "@/components/ui/card";
import Loading from '@/components/Loading';

const StatCard = ({ title, value, icon, loading, error }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        {loading ? (
          <div className="h-8 flex items-center">
            <Loading />
          </div>
        ) : error ? (
          <p className="text-sm text-red-500">Failed to load</p>
        ) : (
          <h3 className="text-2xl font-semibold mt-1">
            {title.toLowerCase().includes('revenue') 
              ? Number(value || 0).toLocaleString('en-IN', { 
                  style: 'currency', 
                  currency: 'INR',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })
              : value}
          </h3>
        )}
      </div>
      <div className="text-primary text-2xl">
        {icon}
      </div>
    </div>
  </Card>
);

export default StatCard; 