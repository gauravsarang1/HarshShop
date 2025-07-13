import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    createBrand,
    getBrands,
    deleteBrand,
    getBrandById,
    getBrandByCategoryId,
    getBrandByUserId,
    getBrandByName,
    updateBrand,
    updateBrandLogo,
    updateBrandCoverImage,
    getBrandProducts,
    getBrandByProductId
} 
from "../controllers/brand.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Public routes
router.route("/get-all-brands").get(getBrands);
router.route("/get-brand-by-id/:brandId").get(getBrandById);

// Protected routes (all routes defined after this line will require JWT)
router.use(verifyJWT);

// Specific routes first

router.route("/create-brand").post(upload.fields([{ name: "logo", maxCount: 1 }, { name: "coverImage", maxCount: 1 }]), createBrand);
router.route("/get-brands-by-vendor").get(getBrandByUserId);
router.route("/category/:categoryId").get(getBrandByCategoryId);
router.route("/name/:name").get(getBrandByName);
router.route("/products/:id").get(getBrandProducts);
router.route("/product/:productId").get(getBrandByProductId);

// Parameterized routes last
router.route("/:id/logo").put(upload.single("logo"), updateBrandLogo);
router.route("/:id/coverImage").put(upload.single("coverImage"), updateBrandCoverImage);
router.route("/:id").put(upload.fields([{ name: "logo", maxCount: 1 }, { name: "coverImage", maxCount: 1 }]), updateBrand).delete(deleteBrand)

export default router;