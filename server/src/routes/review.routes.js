import { Router } from 'express'
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    createReview,
    editReview,
    deleteReview,
    getReviews
} from '../controllers/review.controller.js'

const router = Router();

router.route('/create-review').post(verifyJWT, createReview)
router.route('/edit-review/:reviewId').put(verifyJWT, editReview)
router.route('/delete-review/:reviewId').delete(verifyJWT, deleteReview)
router.route('/get-reviews/:productId').get(getReviews)

export default router