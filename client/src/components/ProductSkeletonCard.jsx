const ProductSkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 animate-pulse">
      {/* Image Placeholder */}
      <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>

      {/* Category Placeholder */}
      <div className="w-1/3 h-4 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>

      {/* Title Placeholder */}
      <div className="w-3/4 h-5 bg-gray-300 dark:bg-gray-500 rounded mb-2"></div>

      {/* Rating Placeholder */}
      <div className="flex gap-2 mb-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
        ))}
      </div>

      {/* Price Placeholder */}
      <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-500 rounded mb-4"></div>

      {/* Button Placeholder */}
      <div className="w-full h-10 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
    </div>
  );
};

export default ProductSkeletonCard;
