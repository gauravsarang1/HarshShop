import  {Skeleton}  from "@/components/ui";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const OrderCardSkeleton = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="w-full"
    >
      <Card className="p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-md">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Left Side */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Skeleton className="h-6 w-40" /> {/* Order ID */}
              <Skeleton className="h-6 w-24" /> {/* Status Badge */}
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded-full" /> {/* Clock Icon */}
              <Skeleton className="h-4 w-32" /> {/* Date */}
            </div>

            <div className="space-y-2 mt-4">
              <Skeleton className="h-5 w-28" /> {/* "Order Items" title */}
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center gap-2 pl-6">
                  <Skeleton className="w-2 h-2 rounded-full" />
                  <Skeleton className="h-4 w-48" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-end justify-between gap-4">
            <div className="text-right space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-28" />
            </div>
            <Skeleton className="h-10 w-32 rounded-md" /> {/* Button */}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default OrderCardSkeleton;
