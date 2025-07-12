import { Router } from "express";
import { verifyJWT, optionalAuth } from "../middlewares/auth.middleware.js";
import {
    updateCartItem,
    removeFromCart,
    clearCartItem
} from "../controllers/cartItem.controller.js";

const router = Router();

router.route('/update-cart-item/:cartItemId').put(verifyJWT, updateCartItem)
router.route('/remove-from-cart/:cartItemId').delete(verifyJWT, removeFromCart)
router.route('/clear-cart-item/:cartItemId').delete(verifyJWT, clearCartItem)

export default router;