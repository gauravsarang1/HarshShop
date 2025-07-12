import { ApiResponse } from "../utils/ApResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import db from "../models/index.js";

const { Order, Product, OrderItem, User } = db;

const createOrder = AsyncHandler(async(req, res) => {
    const { orderData } = req.body;
    if(!orderData || !Array.isArray(orderData) || orderData.length === 0) {
        throw new ApiError(400, 'Order items are required');
    }

    // Calculate total amount and verify products
    let totalAmount = 0;
    for(const item of orderData) {
        const { productId, quantity } = item;
        if(!productId || !quantity) {
            throw new ApiError(400, 'Product ID and quantity are required for each item');
        }

        const product = await Product.findByPk(productId);
        if(!product) {
            throw new ApiError(404, `Product not found with id: ${productId}`);
        }

        totalAmount += product.price * quantity;
    }

    // Create the order
    const order = await Order.create({
        UserId: req.user.id,
        totalAmount,
        status: 'Pending',
        paymentStatus: 'unPaid'
    });

    if(!order) {
        throw new ApiError(500, 'Failed to create order');
    }

    // Create order items
    const orderedItems = [];
    for(const item of orderData) {
        const { productId, quantity } = item;
        const product = await Product.findByPk(productId);
        
        const orderItem = await OrderItem.create({
            OrderId: order.id,
            ProductId: productId,
            quantity,
            price: product.discountedPrice
        });
        orderedItems.push(orderItem);
    }

    // Return order with its items
    const orderWithItems = {
        ...order.toJSON(),
        items: orderedItems
    };

    res.status(201).json(
        new ApiResponse(201, orderWithItems, 'Order created successfully')
    )
})

const getAllOrders = AsyncHandler(async(req, res) => {

    const orders = await Order.findAll({
        where: {
            UserId: req.user.id
        },
        include: [
            { model: db.OrderItem, include: [{ model: db.Product, attributes: ['id', 'name'] }] }
        ]
    })

    if(!orders) {
        throw new ApiError(404, 'No orders found');
    }

    res.status(200).json(
        new ApiResponse(200, orders, 'Orders fetched successfully')
    )
})

const cancelOrder = AsyncHandler(async(req, res) => {
    const { orderId } = req.params;
    if(!orderId) {
        throw new ApiError(400, 'Order ID is required');
    }

    const order = await Order.findByPk(orderId);
    if(!order) {
        throw new ApiError(404, 'Order not found');
    }

    if(order.UserId !== req.user.id && req.user.role !== 'Admin') {
        throw new ApiError(401, 'You are not authorized to cancel this order');
    }

    if(order.status !== 'Pending') {
        throw new ApiError(400, 'Order is not pending');
    }

    order.status = 'Cancelled';
    await order.save();

    res.status(200).json(
        new ApiResponse(200, order, 'Order cancelled successfully')
    )
})

const getAllOrdersAdmin = AsyncHandler(async(req, res) => {
    if(req.user.role !== 'Admin') {
        throw new ApiError(403, 'Not authorized to access all orders');
    }

    const orders = await Order.findAll({
        include: [
            { model: db.User, attributes: ['id', 'name', 'email'] },
            { model: db.OrderItem, include: [{ model: db.Product }] }
        ]
    });

    res.status(200).json(
        new ApiResponse(200, orders, 'All orders fetched successfully')
    );
});

const updateOrderStatus = AsyncHandler(async(req, res) => {
    if(req.user.role !== 'Vendor') {
        throw new ApiError(403, 'Not authorized to update order status');
    }

    const { orderId } = req.params;
    const { status } = req.body;
    console.log("status", status);

    if(!orderId || !status) {
        throw new ApiError(400, 'Order ID and status are required');
    }

    if(!['Pending', 'Shipped', 'Delivered', 'Cancelled', 'Processing'].includes(status)) {
        throw new ApiError(400, 'Invalid order status');
    }

    const order = await Order.findByPk(orderId);
    if(!order) {
        throw new ApiError(404, 'Order not found');
    }

    order.status = status;
    await order.save();

    const updatedOrder = await Order.findByPk(orderId, {
        include: [{ model: db.User, attributes: ['id', 'name', 'email'] }, { model: db.OrderItem, include: [{ model: db.Product }] }]
    });

    res.status(200).json(
        new ApiResponse(200, updatedOrder, 'Order status updated successfully')
    );
});

const updatePaymentStatus = AsyncHandler(async(req, res) => {
    if(req.user.role !== 'Admin') {
        throw new ApiError(403, 'Not authorized to update payment status');
    }

    const { orderId } = req.params;
    const { paymentStatus } = req.body;

    if(!orderId || !paymentStatus) {
        throw new ApiError(400, 'Order ID and payment status are required');
    }

    if(!['unPaid', 'Paid', 'Failed'].includes(paymentStatus)) {
        throw new ApiError(400, 'Invalid payment status');
    }

    const order = await Order.findByPk(orderId);
    if(!order) {
        throw new ApiError(404, 'Order not found');
    }

    order.paymentStatus = paymentStatus;
    await order.save();

    res.status(200).json(
        new ApiResponse(200, order, 'Payment status updated successfully')
    );
});

const getOrderById = AsyncHandler(async(req, res) => {
    const { orderId } = req.params;
    if(!orderId) {
        throw new ApiError(400, 'Order ID is required');
    }
    const order = await Order.findByPk(orderId, {
        include: [{ model: db.OrderItem, include: [{ model: db.Product }] }, { model: db.User, attributes: ['id', 'name', 'email'] }]
    });

    if(!order) {
        throw new ApiError(404, 'Order not found');
    }

    res.status(200).json(
        new ApiResponse(200, order, 'Order fetched successfully')
    );
});

const getOrdersByVendorId = AsyncHandler(async(req, res) => {
    const { id: vendorId } = req.user;
    if(!vendorId) {
        throw new ApiError(400, 'Vendor ID is required');
    }
    const vendor = await User.findByPk(vendorId);
    if(!vendor) {
        throw new ApiError(404, 'Vendor not found');
    }

    // First get all products associated with this vendor's brands
    const vendorProducts = await db.Product.findAll({
        include: [{
            model: db.Brand,
            where: { UserId: vendorId },
            required: true
        }],
        attributes: ['id']
    });

    const vendorProductIds = vendorProducts.map(product => product.id);

    // Then find orders that contain these products
    const orders = await Order.findAll({
        include: [
            { 
                model: db.OrderItem,
                where: {
                    ProductId: vendorProductIds
                },
                required: true
            },
            {
                model: db.User,
                attributes: ['id', 'name', 'email']
            }
        ]
    });

    res.status(200).json(
        new ApiResponse(200, orders, 'Orders fetched successfully')
    );
});

const getVendorFilteredOrdersByStatus = AsyncHandler(async(req, res) => {
    if(req.user.role !== 'Vendor') {
        throw new ApiError(403, 'Not authorized to fetch filtered orders');
    }

    const { status } = req.body;
    if(!status) {
        throw new ApiError(400, 'Status is required');
    }

    if(!['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
        throw new ApiError(400, 'Invalid status');
    }

    const { id: vendorId } = req.user;
    if(!vendorId) {
        throw new ApiError(400, 'Vendor ID is required');
    }

    const vendor = await User.findByPk(vendorId);
    if(!vendor) {
        throw new ApiError(404, 'Vendor not found');
    }

    // First get all products associated with this vendor's brands
    const vendorProducts = await db.Product.findAll({
        include: [{
            model: db.Brand,
            where: { UserId: vendorId },
            required: true
        }],
        attributes: ['id']
    });

    const vendorProductIds = vendorProducts.map(product => product.id);

    // Then find orders with the specified status that contain these products
    const orders = await Order.findAll({
        where: { status },
        include: [
            { 
                model: db.OrderItem,
                where: {
                    ProductId: vendorProductIds
                },
                required: true,
                include: [
                    { 
                        model: db.Product,
                        attributes: ['id', 'name'],
                        include: [
                            { 
                                model: db.Brand,
                                attributes: ['id', 'name'],
                                where: { UserId: vendorId }
                            }
                        ]
                    }
                ]
            },
            {
                model: db.User,
                attributes: ['id', 'name', 'email']
            }
        ]
    });

    res.status(200).json(
        new ApiResponse(200, orders, 'Orders fetched successfully')
    );
});


const getTotalRevenue = AsyncHandler(async(req, res) => {
    const { id: vendorId } = req.user;
    if(!vendorId) {
        throw new ApiError(400, 'Vendor ID is required');
    }

    const vendor = await User.findByPk(vendorId);
    if(!vendor) {
        throw new ApiError(404, 'Vendor not found');
    }

    const vendorProducts = await db.Product.findAll({
        include: [{
            model: db.Brand,
            where: { UserId: vendorId },
            required: true
        }],
        attributes: ['id']
    });

    const vendorProductIds = vendorProducts.map(product => product.id);

    const orders = await Order.findAll({
        where: {
            status: 'Delivered'
        },
        include: [
            {
                model: db.OrderItem,
                where: { ProductId: vendorProductIds },
                required: true
            }
        ]
    });

    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

    res.status(200).json(
        new ApiResponse(200, totalRevenue, 'Total revenue fetched successfully')
    );
})

const getTotalSales = AsyncHandler(async(req, res) => {
    const { id: vendorId } = req.user;
    if(!vendorId) {
        throw new ApiError(400, 'Vendor ID is required');
    }

    const vendorProducts = await db.Product.findAll({
        include: [{
            model: db.Brand,
            where: { UserId: vendorId },
            required: true
        }],
        attributes: ['id']
    });

    const vendorProductIds = vendorProducts.map(product => product.id);

    const orders = await Order.findAll({
        where: {
            status: 'Delivered'
        },
        include: [
            {
                model: db.OrderItem,
                where: { ProductId: vendorProductIds },
                required: true
            }
        ]
    });

    const totalSales = orders.length;

    res.status(200).json(
        new ApiResponse(200, totalSales, 'Total sales fetched successfully')
    );
})

const getTotalPendingOrders = AsyncHandler(async(req, res) => {
    const { id: vendorId } = req.user;
    if(!vendorId) {
        throw new ApiError(400, 'Vendor ID is required');
    }

    const vendorProducts = await db.Product.findAll({
        include: [{
            model: db.Brand,
            where: { UserId: vendorId },
            required: true
        }],
        attributes: ['id']
    });

    const vendorProductIds = vendorProducts.map(product => product.id);

    const orders = await Order.findAll({
        where: {
            status: 'Pending'
        },
        include: [
            {
                model: db.OrderItem,
                where: { ProductId: vendorProductIds },
                required: true
            }
        ]
    })

    const totalPendingOrders = orders.length;

    res.status(200).json(
        new ApiResponse(200, totalPendingOrders, 'Total pending orders fetched successfully')
    );
})

export { 
    createOrder, 
    getAllOrders, 
    cancelOrder,
    getAllOrdersAdmin,
    updateOrderStatus,
    updatePaymentStatus,
    getOrderById,
    getOrdersByVendorId,
    getVendorFilteredOrdersByStatus,
    getTotalRevenue,
    getTotalSales,
    getTotalPendingOrders
}
