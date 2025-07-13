import { Router } from "express";
import { verifyJWT, optionalAuth } from "../middlewares/auth.middleware.js";
import {
    createAddress,
    getUserAddress,
    updateAddress,
    deleteAddress,
    getAddressById
} from "../controllers/address.controller.js";

const router = Router();

router.route('/create-address').post(verifyJWT, createAddress)
router.route('/get-user-address').get(verifyJWT, getUserAddress)
router.route('/update-address/:addressId').put(verifyJWT, updateAddress)
router.route('/delete-address/:addressId').delete(verifyJWT, deleteAddress)
router.route('/get-address/:addressId').get(verifyJWT, getAddressById)

export default router;