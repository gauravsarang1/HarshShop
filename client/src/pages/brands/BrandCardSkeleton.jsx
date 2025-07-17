import { Skeleton } from "@/components/ui";
import { Card } from "@/components/ui";

const BrandCardSkeleton = () => {
  return (
    <Card className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      
      {/* Featured Badge Skeleton */}
      <div className="absolute top-4 left-4 z-10">
        <Skeleton className="w-20 h-5 rounded-full bg-yellow-300/40 dark:bg-yellow-400/10" />
      </div>

      {/* Brand Logo Skeleton */}
      <div className="aspect-[16/9] relative overflow-hidden bg-gray-100 dark:bg-gray-900">
        <Skeleton className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title & Category Skeleton */}
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
            <Skeleton className="h-3 w-24 bg-gray-200 dark:bg-gray-600 rounded" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 bg-yellow-300/50 dark:bg-yellow-400/20 rounded-full" />
            <Skeleton className="h-4 w-6 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-5 w-10 mx-auto bg-gray-300 dark:bg-gray-700 rounded" />
              <Skeleton className="h-3 w-12 mx-auto bg-gray-200 dark:bg-gray-600 rounded" />
            </div>
          ))}
        </div>

        {/* Description Skeleton */}
        <div className="space-y-2 mb-6">
          <Skeleton className="h-3 w-full bg-gray-200 dark:bg-gray-600 rounded" />
          <Skeleton className="h-3 w-3/4 bg-gray-200 dark:bg-gray-600 rounded" />
        </div>

        {/* Button Skeleton */}
        <Skeleton className="h-10 w-full rounded-xl bg-gray-300 dark:bg-gray-700" />
      </div>
    </Card>
  );
};

export default BrandCardSkeleton;
