import { Router } from "express";
import { 
    listProduct,
    updateProduct,
    updateProductImage,
    deleteProduct,
    getAllProducts,
    getProductById,
    getNewProducts,
    getNewProductsByCategory,
    getProductByCategory,
    getProductByCategoryId,
    getProductByPrice,
    getProductBySearch,
    getProductByCategoryAndPrice,
    getProductByCategoryAndSearch,
    getProductByCategoryAndPriceAndSearch,
    getProductByPriceAndSearch,
    getProductByVendor,
    getProductByVendorAndCategory,
    getProductByVendorAndSearch,
    getProductByVendorAndCategoryAndSearch,
    getTotalProducts
} from "../controllers/product.controller.js";
import { verifyJWT, optionalAuth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route('/list-product').post(verifyJWT, upload.single('image'), listProduct)
router.route('/update-product/:brandId/:productId').put(verifyJWT, updateProduct)
router.route('/update-product-image/:brandId/:productId').put(verifyJWT, upload.array('images', 4), updateProductImage)
router.route('/delete-product/:brandId/:productId').delete(verifyJWT, deleteProduct)
router.route('/all-products').get(getAllProducts)
router.route('/get-product/:productId').get(getProductById)
router.route('/get-new-products').get(getNewProducts)
router.route('/get-new-products-by-category/:category').get(getNewProductsByCategory)
router.route('/get-product-by-category/:category').get(getProductByCategory)
router.route('/get-products-by-category-id/:categoryId').get(getProductByCategoryId)
router.route('/get-product-by-price').get(getProductByPrice)
router.route('/get-product-by-search').get(getProductBySearch)
router.route('/get-product-by-category-and-price/:category/:minPrice/:maxPrice').get(getProductByCategoryAndPrice)
router.route('/get-product-by-category-and-search/:category').post(getProductByCategoryAndSearch)
router.route('/get-product-by-category-and-price-and-search/:category/:minPrice/:maxPrice/:search').get(getProductByCategoryAndPriceAndSearch)
router.route('/get-product-by-price-and-search/:minPrice/:maxPrice/:search').get(getProductByPriceAndSearch)

// Vendor routes
router.use(verifyJWT);

router.route('/get-products-by-vendor').get(getProductByVendor)
router.route('/get-product-by-vendor-and-category').post(getProductByVendorAndCategory)
router.route('/get-product-by-vendor-and-search').post(getProductByVendorAndSearch)
router.route('/get-product-by-vendor-and-category-and-search').post(getProductByVendorAndCategoryAndSearch)
router.route('/get-total-products').get(getTotalProducts)

export default router