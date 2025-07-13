import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    updateOrderItem,
    deleteOrderItem,
    getOrderItems
} from "../controllers/orderItem.controller.js";

const router = Router();

router.route('/update-order-item/:orderItemId').put(verifyJWT, updateOrderItem)
router.route('/delete-order-item/:orderItemId').delete(verifyJWT, deleteOrderItem)
router.route('/get-order-items').get(verifyJWT, getOrderItems)

export default router;