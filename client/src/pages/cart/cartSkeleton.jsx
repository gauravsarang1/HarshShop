import  {Skeleton}  from '@/components/ui';

const CartSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left side - Cart Items */}
        <div className="lg:w-8/12 space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-6 border rounded-xl shadow-sm bg-white">
              <div className="flex flex-col md:flex-row gap-6">
                <Skeleton className="w-full md:w-40 h-40 rounded-lg" />

                <div className="flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>

                  <div className="flex items-center gap-4 mt-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-6 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-5 w-24 mt-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right side - Price Summary */}
        <div className="lg:w-4/12">
          <div className="p-6 sticky top-4 border rounded-xl shadow-sm bg-white space-y-4">
            <Skeleton className="h-6 w-1/2 mb-4" />

            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>

            <div className="border-t pt-4 space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <Skeleton className="h-12 w-full rounded-md mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
