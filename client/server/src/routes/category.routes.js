import { Router } from "express";
import { verifyJWT, optionalAuth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { 
    addCategory,
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    updateCategory,
    deleteCategory,
    getTrendingCategories,
    addImageToCategory
} from "../controllers/category.controller.js";

const router = Router();

router.route('/add-category').post(verifyJWT, upload.single('image'), addCategory)
router.route('/get-all-categories').get(getAllCategories)
router.route('/category/:categoryId').get(getCategoryById)
router.route('/get-category/:name').get(getCategoryByName)
router.route('/update-category/:categoryId').put(verifyJWT, updateCategory)
router.route('/delete-category/:categoryId').delete(verifyJWT, deleteCategory)
router.route('/trending-categories').get(getTrendingCategories)
router.route('/add-image-to-category/:categoryId').post(verifyJWT, upload.single('image'), addImageToCategory)

export default router