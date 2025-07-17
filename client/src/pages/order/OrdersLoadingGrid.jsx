import OrderCardSkeleton from "./OrderCardSkeleton";

const OrderLoadingGrid = () => {
  return (
    <div className="flex flex-col gap-6">
      {[...Array(4)].map((_, index) => (
        <OrderCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default OrderLoadingGrid;
