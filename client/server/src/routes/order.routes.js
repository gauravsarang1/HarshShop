import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
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
} from "../controllers/order.controller.js";

const router = Router();

router.use(verifyJWT);

// User routes
router.route('/create-order').post(createOrder);
router.route('/my-orders').get(getAllOrders);
router.route('/cancel-order/:orderId').put(cancelOrder);

// Vendor routes
router.route('/get-orders-by-vendor').get(getOrdersByVendorId);
router.route('/get-vendor-filtered-orders').post(getVendorFilteredOrdersByStatus);
router.route('/get-total-revenue').get(getTotalRevenue);
router.route('/get-total-sales').get(getTotalSales);
router.route('/get-total-pending-orders').get(getTotalPendingOrders);

// Admin routes (protected by role check in controller)
router.route('/all').get(getAllOrdersAdmin);
router.route('/update-order-status/:orderId').put(updateOrderStatus);
router.route('/payment-status/:orderId').put(updatePaymentStatus);

// Parameterized routes last
router.route('/:orderId').get(getOrderById);

export default router;