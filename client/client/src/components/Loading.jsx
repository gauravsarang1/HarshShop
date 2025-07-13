import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 w-3/4 bg-gray-200 rounded-md"></div>
    <div className="space-y-3">
      <div className="h-4 w-full bg-gray-200 rounded-md"></div>
      <div className="h-4 w-5/6 bg-gray-200 rounded-md"></div>
      <div className="h-4 w-4/6 bg-gray-200 rounded-md"></div>
    </div>
  </div>
);

const Loading = ({ type = 'spinner' }) => {
  if (type === 'skeleton') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
              <LoadingSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
      <div className="relative">
        <Loader2 className="w-12 h-12 animate-spin text-[#FB641B]" />
        <div className="absolute inset-0 animate-ping opacity-50 rounded-full bg-[#FB641B]/10"></div>
      </div>
      <p className="mt-4 text-gray-600 animate-pulse">Loading...</p>
    </div>
  );
};

export default Loading;
