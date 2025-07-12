import { ApiResponse } from "../utils/ApResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import db from "../models/index.js";

const { Payment, Order } = db;

const initiatePayment = AsyncHandler(async(req, res) => {
    const { orderId, paymentMethod } = req.body;
    
    if(!orderId || !paymentMethod) {
        throw new ApiError(400, 'Order ID and payment method are required');
    }

    // Find the order
    const order = await Order.findByPk(orderId);
    if(!order) {
        throw new ApiError(404, 'Order not found');
    }

    // Check if order belongs to user
    if(order.UserId !== req.user.id) {
        throw new ApiError(403, 'Not authorized to pay for this order');
    }

    // Check if order is already paid
    if(order.paymentStatus === 'Paid') {
        throw new ApiError(400, 'Order is already paid');
    }

    // Create payment record
    const payment = await Payment.create({
        OrderId: orderId,
        amount: order.totalAmount,
        paymentMethod,
        paymentStatus: 'Pending'
    });

    res.status(201).json(
        new ApiResponse(201, payment, 'Payment initiated successfully')
    );
});

const confirmPayment = AsyncHandler(async(req, res) => {
    // Check if user is admin
    if(req.user.role !== 'Admin') {
        throw new ApiError(403, 'Only administrators can confirm payments');
    }

    const { paymentId, transactionId } = req.body;

    if(!paymentId || !transactionId) {
        throw new ApiError(400, 'Payment ID and transaction ID are required');
    }

    // Find payment
    const payment = await Payment.findOne({
        where: { id: paymentId },
        include: [{ model: Order }]
    });

    if(!payment) {
        throw new ApiError(404, 'Payment not found');
    }

    // Check if payment is already confirmed
    if(payment.paymentStatus === 'Paid') {
        throw new ApiError(400, 'Payment is already confirmed');
    }

    // Update payment status
    payment.paymentStatus = 'Paid';
    payment.transactionId = transactionId;
    payment.paidAt = new Date();
    await payment.save();

    // Update order payment status
    await Order.update(
        { paymentStatus: 'Paid' },
        { where: { id: payment.OrderId } }
    );

    res.status(200).json(
        new ApiResponse(200, payment, 'Payment confirmed successfully')
    );
});

const getPaymentStatus = AsyncHandler(async(req, res) => {
    const { paymentId } = req.params;

    if(!paymentId) {
        throw new ApiError(400, 'Payment ID is required');
    }

    const payment = await Payment.findOne({
        where: { id: paymentId },
        include: [{ model: Order }]
    });

    if(!payment) {
        throw new ApiError(404, 'Payment not found');
    }

    // Check if payment belongs to user's order
    if(payment.Order.UserId !== req.user.id && req.user.role !== 'Admin') {
        throw new ApiError(403, 'Not authorized to view this payment');
    }

    res.status(200).json(
        new ApiResponse(200, payment, 'Payment status fetched successfully')
    );
});

const getAllPayments = AsyncHandler(async(req, res) => {
    // Admin only route
    if(req.user.role !== 'Admin') {
        throw new ApiError(403, 'Not authorized to view all payments');
    }

    const payments = await Payment.findAll({
        include: [{ 
            model: Order,
            include: [{ model: db.User, attributes: ['id', 'name', 'email'] }]
        }]
    });

    res.status(200).json(
        new ApiResponse(200, payments, 'All payments fetched successfully')
    );
});

const getUserPayments = AsyncHandler(async(req, res) => {
    const payments = await Payment.findAll({
        include: [{ 
            model: Order,
            where: { UserId: req.user.id }
        }]
    });

    res.status(200).json(
        new ApiResponse(200, payments, 'User payments fetched successfully')
    );
});

export {
    initiatePayment,
    confirmPayment,
    getPaymentStatus,
    getAllPayments,
    getUserPayments
}