import { ApiResponse } from "../utils/ApResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import db from "../models/index.js";

const { OrderItem, Order, Product } = db;

const updateOrderItem = AsyncHandler(async(req, res) => {
    const { orderItemId } = req.params;
    const { quantity } = req.body;
    
    if(!orderItemId || !quantity) {
        throw new ApiError(400, 'Order item ID and quantity are required');
    }

    // Find the order item
    const orderItem = await OrderItem.findByPk(orderItemId, {
        include: [{ model: Order }]
    });
    
    if(!orderItem) {
        throw new ApiError(404, 'Order item not found');
    }

    // Check if user owns this order or is admin
    if(orderItem.Order.UserId !== req.user.id && req.user.role !== 'Admin') {
        throw new ApiError(403, 'Not authorized to update this order item');
    }

    // Check if order is still pending
    if(orderItem.Order.status !== 'Pending') {
        throw new ApiError(400, 'Can only update items in pending orders');
    }

    // Get product to recalculate price
    const product = await Product.findByPk(orderItem.ProductId);
    if(!product) {
        throw new ApiError(404, 'Product not found');
    }

    // Update quantity
    orderItem.quantity = quantity;
    await orderItem.save();

    // Update order total amount
    const allOrderItems = await OrderItem.findAll({
        where: { OrderId: orderItem.OrderId }
    });

    const newTotalAmount = allOrderItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    await Order.update(
        { totalAmount: newTotalAmount },
        { where: { id: orderItem.OrderId } }
    );

    res.status(200).json(
        new ApiResponse(200, orderItem, 'Order item updated successfully')
    );
});

const deleteOrderItem = AsyncHandler(async(req, res) => {
    const { orderItemId } = req.params;
    
    if(!orderItemId) {
        throw new ApiError(400, 'Order item ID is required');
    }

    // Find the order item
    const orderItem = await OrderItem.findByPk(orderItemId, {
        include: [{ model: Order }]
    });
    
    if(!orderItem) {
        throw new ApiError(404, 'Order item not found');
    }

    // Check if user owns this order or is admin
    if(orderItem.Order.UserId !== req.user.id && req.user.role !== 'Admin') {
        throw new ApiError(403, 'Not authorized to delete this order item');
    }

    // Check if order is still pending
    if(orderItem.Order.status !== 'Pending') {
        throw new ApiError(400, 'Can only delete items from pending orders');
    }

    // Get all order items to check if this is the last item
    const orderItemCount = await OrderItem.count({
        where: { OrderId: orderItem.OrderId }
    });

    if(orderItemCount === 1) {
        // If this is the last item, delete the entire order
        await Order.destroy({
            where: { id: orderItem.OrderId }
        });
        
        res.status(200).json(
            new ApiResponse(200, null, 'Order deleted as it had no items')
        );
    } else {
        // Delete the order item and update order total
        await orderItem.destroy();

        const remainingItems = await OrderItem.findAll({
            where: { OrderId: orderItem.OrderId }
        });

        const newTotalAmount = remainingItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        await Order.update(
            { totalAmount: newTotalAmount },
            { where: { id: orderItem.OrderId } }
        );

        res.status(200).json(
            new ApiResponse(200, null, 'Order item deleted successfully')
        );
    }
});

const getOrderItems = AsyncHandler(async(req, res) => {
    const { orderId } = req.params;
    
    if(!orderId) {
        throw new ApiError(400, 'Order ID is required');
    }

    const order = await Order.findByPk(orderId);
    if(!order) {
        throw new ApiError(404, 'Order not found');
    }

    // Check if user owns this order or is admin
    if(order.UserId !== req.user.id && req.user.role !== 'Admin') {
        throw new ApiError(403, 'Not authorized to view these order items');
    }

    const orderItems = await OrderItem.findAll({
        where: { OrderId: orderId },
        include: [{ model: Product }]
    });

    res.status(200).json(
        new ApiResponse(200, orderItems, 'Order items fetched successfully')
    );
});

export { updateOrderItem, deleteOrderItem, getOrderItems}