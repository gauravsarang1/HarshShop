import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    initiatePayment,
    confirmPayment,
    getPaymentStatus,
    getAllPayments,
    getUserPayments
} from "../controllers/payment.controller.js";

const router = Router();

// All routes need authentication
router.use(verifyJWT);

// User routes
router.route('/initiate').post(initiatePayment);
router.route('/confirm').post(confirmPayment);
router.route('/status/:paymentId').get(getPaymentStatus);
router.route('/user').get(getUserPayments);

// Admin routes (protected by role check in controller)
router.route('/all').get(getAllPayments);

export default router; 