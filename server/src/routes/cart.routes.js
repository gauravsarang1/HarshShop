import { Router } from "express";
import { verifyJWT, optionalAuth } from "../middlewares/auth.middleware.js";
import {
    addToCart,
    getCart,
    clearCart
} from "../controllers/cart.controller.js";

const router = Router();

router.route('/add-to-cart').post(verifyJWT, addToCart)
router.route('/get-cart').get(verifyJWT, getCart)
router.route('/clear-cart').delete(verifyJWT, clearCart)

export default router;