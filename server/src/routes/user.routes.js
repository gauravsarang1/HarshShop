import { Router } from 'express'
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    registerUser, 
    loginUser, 
    logoutUser,
    getUser,
    updateUserDetails,
    getAllUsers,
    deleteUser,
    refreshAccessToken
} from '../controllers/user.controller.js'

const router = Router()

// Public routes
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/refresh-token').post(refreshAccessToken)

// Protected routes
router.use(verifyJWT)

// User routes
router.route('/me').get(getUser)
router.route('/update').put(updateUserDetails)
router.route('/logout').post(logoutUser)

// Admin routes (protected by role check in controller)
router.route('/all').get(getAllUsers)
router.route('/:userId').delete(deleteUser)

export default router