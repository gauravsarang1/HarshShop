import { Router } from 'express'
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createWishlist,
    getWishlist,
    deleteWishlist,
    getWishlistById,
    deleteAllWishlist,
    getWishlistByUserId
} from "../controllers/wishlist.controller.js";

const router = Router();

router.use(verifyJWT);

router.route('/create-wishlist').post(createWishlist)
router.route('/get-wishlist').get(getWishlist)
router.route('/delete-wishlist').delete(deleteWishlist)
router.route('/get-wishlist-by-id').get(getWishlistById)
router.route('/delete-all-wishlist').delete(deleteAllWishlist)
router.route('/get-wishlist-by-user-id').get(getWishlistByUserId)

export default router;
