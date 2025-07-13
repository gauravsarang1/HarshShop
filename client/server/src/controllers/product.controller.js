import { ApiResponse } from "../utils/ApResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { uploadImageBuffer } from "../utils/UploadOnCludinary.js";
import { deleteFromCloudinary } from "../utils/DeleteFromCloudinary.js";
import db from "../models/index.js";
import { Op } from "sequelize";

const { Product, Category, User, Brand } = db;

const listProduct = AsyncHandler(async (req, res) => {
    if (req.user.role !== 'Admin' && req.user.role !== 'Vendor') {
        throw new ApiError(401, 'Only Admins and Vendors can list products');
    }

    const { name, description, price, stock, categoryId, brandId } = req.body;

    if (!name || !description || !price || !stock || !categoryId || !brandId) {
        throw new ApiError(401, 'All fields are required');
    }

    const existBrand = await Brand.findByPk(brandId);
    if(!existBrand) {
        throw new ApiError(404, 'Brand does not exists')
    }

    if(req.user.role === 'Vendor' && existBrand.UserId !== req.user.id) {
        throw new ApiError(401, 'You can only list products for your own brand');
    }

    

    /*if (!req.file || !req.file.buffer) {
        throw new ApiError(401, 'Product image is required');
    }*/

    const existCategory = await Category.findOne({
        where: { id: categoryId }
    })

    if(!existCategory) {
        throw new ApiError(404, 'Category does not exists')
    }

    if(!req.file) {
        throw new ApiError(401, 'Product image is required');
    }

    const uploadedImage = await uploadImageBuffer(req.file.buffer);

    if (!uploadedImage?.secure_url) {
        throw new ApiError(500, 'Image upload failed');
    }

    const product = await Product.create({
        name,
        description,
        price,
        stock,
        images: [uploadedImage.secure_url],
        CategoryId: existCategory.id,
        BrandId: existBrand.id,
        status: 'active'
    });

    if (!product) {
        throw new ApiError(500, 'Failed to list product');
    }

    res.status(201).json(
        new ApiResponse(201, product, 'Product listed successfully')
    );
});

const updateProduct = AsyncHandler(async(req, res) => {
    const { productId, brandId } = req.params;

    if(!productId || !brandId) {
        throw new ApiError(400, 'Product ID and brand ID are required');
    }

    if(req.user.role !== 'Admin' && req.user.role !== 'Vendor') {
        throw new ApiError(401, 'Only Admins and Vendors can update products');
    }

    const existBrand = await Brand.findByPk(brandId);
    if(!existBrand) {
        throw new ApiError(404, 'Brand does not exists')
    }

    if(req.user.role === 'Vendor' && existBrand.UserId !== req.user.id) {
        throw new ApiError(401, 'You can only update products for your own brand');
    }
    const product = await Product.findByPk(productId);
    if(!product) {
        throw new ApiError(404, 'Product not found');
    }

    const { name, description, price, stock, category } = req.body;

    if(category) {
        const existCategory = await Category.findOne({
            where: { name: category }
        })

        if(!existCategory) {
            throw new ApiError(404, 'Category does not exists')
        }

        product.CategoryId = existCategory.id;
    }

    if(name) product.name = name;
    if(description) product.description = description;
    if(price) product.price = price;
    if(stock) product.stock = stock;

    await product.save();

    const updatedProduct = await Product.findByPk(productId, {
        include: [
            {
                model: Category,
                attributes: ['id', 'name']
            }
        ]
    });

    res.status(200).json(
        new ApiResponse(200, updatedProduct, 'Product updated successfully')
    );
})

const updateProductImage = AsyncHandler(async(req, res) => {
    const { productId, brandId } = req.params;
    if(!productId || !brandId) {
        throw new ApiError(400, 'Product ID and brand ID are required');
    }

    if(req.user.role !== 'Admin' && req.user.role !== 'Vendor') {
        throw new ApiError(401, 'Only Admins and Vendors can update product images');
    }

    const existBrand = await Brand.findByPk(brandId);
    if(!existBrand) {
        throw new ApiError(404, 'Brand does not exists')
    }

    if(req.user.role === 'Vendor' && existBrand.UserId !== req.user.id) {
        throw new ApiError(401, 'You can only update product images for your own brand');
    }

    const product = await Product.findByPk(productId);
    if(!product) {
        throw new ApiError(404, 'Product not found');
    }

    if(!req.files || req.files.length === 0) {
        throw new ApiError(401, 'At least one image is required');
    }

    const imagesResult = [];

    for (const file of req.files) {
        const uploadedImage = await uploadImageBuffer(file.buffer);
        if (!uploadedImage?.secure_url) {
            throw new ApiError(500, 'Image upload failed');
        }
        imagesResult.push(uploadedImage.secure_url);
    }

    if (imagesResult.length === 0) {
        throw new ApiError(401, 'Failed to upload images');
    }

    // Initialize images array if it doesn't exist
    if (!product.images) {
        product.images = [];
    }

    // Ensure images is an array
    if (!Array.isArray(product.images)) {
        product.images = [];
    }

    // Add new images to the array
    product.images = [...product.images, ...imagesResult];

    // Save the updated product
    await product.save();

    // Fetch the updated product to ensure we have the latest data
    const updatedProduct = await Product.findByPk(productId, {
        include: [
            {
                model: Category,
                attributes: ['id', 'name']
            },
            {
                model: Brand,
                attributes: ['id', 'name', 'logo']
            }
        ]
    });

    res.status(200).json(
        new ApiResponse(200, updatedProduct, 'Product images updated successfully')
    );
})

const deleteProduct = AsyncHandler(async(req, res) => {
    const { productId, brandId } = req.params;
    if(!productId || !brandId) {
        throw new ApiError(400, 'Product ID and brand ID are required');
    }

    if(req.user.role !== 'Admin' && req.user.role !== 'Vendor') {
        throw new ApiError(401, 'Only Admins and Vendors can delete products');
    }

    const existBrand = await Brand.findByPk(brandId);
    if(!existBrand) {
        throw new ApiError(404, 'Brand does not exists')
    }

    if(req.user.role === 'Vendor' && existBrand.UserId !== req.user.id) {
        throw new ApiError(401, 'You can only delete products for your own brand');
    }

    const product = await Product.findByPk(productId);
    if(!product) {
        throw new ApiError(404, 'Product not found');
    }

    if (product.images && product.images.length > 0) {
        try {
          for (const imageUrl of product.images) {
            // Get everything after `/upload/` (e.g., 'v12345/folder/image.jpg')
            const afterUpload = imageUrl.split('/upload/')[1];
            if (!afterUpload) continue;
      
            // Remove version (starts with v and numbers)
            const segments = afterUpload.split('/');
            if (segments[0].startsWith('v')) {
              segments.shift();
            }
      
            // Remove file extension from last segment
            const last = segments.pop();
            const fileNameWithoutExt = last.split('.')[0];
            segments.push(fileNameWithoutExt);
      
            const publicId = segments.join('/');
      
            await deleteFromCloudinary(publicId);
          }
        } catch (error) {
          console.error("Cloudinary delete error:", error);
          throw new ApiError(500, 'Failed to delete product images');
        }
    }
      
    await product.destroy();

    res.status(200).json(
        new ApiResponse(200, null, 'Product deleted successfully')
    );
})

const getNewProducts = AsyncHandler(async(req, res) => {
    const products = await Product.findAll({
        order: [['createdAt', 'DESC']]
    })
    
    if(!products) {
        throw new ApiError(404, 'No products found');
    }

    res.status(200).json(
        new ApiResponse(200, products, 'Products fetched successfully')
    )
})

const getNewProductsByCategory = AsyncHandler(async(req, res) => {
    const { category } = req.params;
    if(!category) {
        throw new ApiError(400, 'Category is required');
    }

    const existCategory = await Category.findOne({
        where: { name: category }
    })

    if(!existCategory) {
        throw new ApiError(404, 'Category does not exists')
    }

    const products = await Product.findAll({
        where: {
            CategoryId: existCategory.id
        },
        order: [['createdAt', 'DESC']]
    })
})

const getProductById = AsyncHandler(async(req, res) => {
    const { productId } = req.params;
    if(!productId) {
        throw new ApiError(400, 'Product ID is required');
    }

    const product = await Product.findByPk(productId, {
        include: [
            {
                model: Category,
                attributes: ['id', 'name']
            },
            {
                model: Brand,
                attributes: ['id', 'name', 'logo']
            }
        ]
    });

    if(!product) {
        throw new ApiError(404, 'Product not found');
    }

    res.status(200).json(
        new ApiResponse(200, product, 'Product fetched successfully')
    );
})

const getAllProducts = AsyncHandler(async(req, res) => {
    const products = await Product.findAll({
        where: {
            status: 'active'
        }
    })

    if(!products) {
        throw new ApiError(404, 'No products found');
    }

    res.status(200)
    .json(
        new ApiResponse(200, products, 'Products fetched successfully')
    )
})

const getProductByCategory = AsyncHandler(async(req, res) => {
    const { category } = req.params;

    if(!category) {
        throw new ApiError(400, 'Category is required');
    }

   const existCategory = await Category.findOne({
    where: { name: category }
   })

   if(!existCategory) {
    throw new ApiError(404, 'Category does not exists')
   }

   const products = await Product.findAll({
    where: {
        CategoryId: existCategory.id
    }
   })

   res.status(200).json(
    new ApiResponse(200, products, 'Products fetched successfully')
   )
})

const getProductByCategoryId = AsyncHandler(async(req, res) => {
    const { categoryId } = req.params;
    if(!categoryId) {
        throw new ApiError(400, 'Category ID is required');
    }

    const existCategory = await Category.findByPk(categoryId);
    if(!existCategory) {
        throw new ApiError(404, 'Category does not exists')
    }

    const products = await Product.findAll({
        where: {
            CategoryId: existCategory.id
        },
        include: [
            {
                model: db.Category,
                attributes: ['id', 'name']
            },
            {
                model: db.Brand,
                attributes: ['id', 'name', 'logo']
            }
        ]
    })

    res.status(200).json(
        new ApiResponse(200, products, 'Products fetched successfully')
    )
})

const getProductByCategoryAndPrice = AsyncHandler(async(req, res) => {
    const { category, minPrice, maxPrice } = req.params;
    if(!category || !minPrice || !maxPrice) {
        throw new ApiError(400, 'Category, minPrice and maxPrice are required');
    }

    const existCategory = await Category.findOne({
        where: { name: category }
    })

    if(!existCategory) {
        throw new ApiError(404, 'Category does not exists')
    }

    const products = await Product.findAll({
        where: {
            CategoryId: existCategory.id,
            droppedPrice: {
                [Op.between]: [minPrice, maxPrice]
            }
        }
    })

    res.status(200).json(
        new ApiResponse(200, products, 'Products fetched successfully')
    )
})

const getProductByCategoryAndSearch = AsyncHandler(async(req, res) => {
    const { category, search } = req.params;
    if(!category || !search) {
        throw new ApiError(400, 'Category and search are required');
    }

    const existCategory = await Category.findOne({
        where: { name: category }
    })

    if(!existCategory) {
        throw new ApiError(404, 'Category does not exists')
    }

    const products = await Product.findAll({
        where: {
            CategoryId: existCategory.id,
            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    description: {
                        [Op.like]: `%${search}%`
                    }
                }
            ]
        }
    })

    res.status(200).json(
        new ApiResponse(200, products, 'Products fetched successfully')
    )
})

const getProductByCategoryAndPriceAndSearch = AsyncHandler(async(req, res) => {
    const { category, minPrice, maxPrice, search } = req.params;
    if(!category || !minPrice || !maxPrice || !search) {
        throw new ApiError(400, 'Category, minPrice, maxPrice and search are required');
    }

    const existCategory = await Category.findOne({
        where: { name: category }
    })

    if(!existCategory) {
        throw new ApiError(404, 'Category does not exists')
    }

    const products = await Product.findAll({
        where: {
            CategoryId: existCategory.id,
            droppedPrice: {
                [Op.between]: [minPrice, maxPrice]
            },
            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    description: {
                        [Op.like]: `%${search}%`
                    }
                }
            ]
        }
    })

    res.status(200).json(
        new ApiResponse(200, products, 'Products fetched successfully')
    )
})



const getProductByPrice = AsyncHandler(async(req, res) => {
    const { minPrice, maxPrice } = req.query;
    if(!minPrice || !maxPrice) {
        throw new ApiError(400, 'Both minPrice and maxPrice are required');
    }

    const products = await Product.findAll({
        where: {
            droppedPrice: {
                [Op.between]: [minPrice, maxPrice]
            }
        }
    })

    res.status(200).json(
        new ApiResponse(200, products, 'Products fetched successfully')
    )
})

const getProductBySearch = AsyncHandler(async(req, res) => {
    const { search } = req.query;
    if(!search) {
        throw new ApiError(400, 'Search is required');
    }

    const products = await Product.findAll({
        where: {
            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    description: {
                        [Op.like]: `%${search}%`
                    }
                }
            ]
        }
    })

    res.status(200).json(
        new ApiResponse(200, products, 'Products fetched successfully')
    )
    
})

const getProductByPriceAndSearch = AsyncHandler(async(req, res) => {
    const { minPrice, maxPrice, search } = req.params;
    if(!minPrice || !maxPrice || !search) {
        throw new ApiError(400, 'MinPrice, maxPrice and search are required');
    }

    const products = await Product.findAll({
        where: {
            droppedPrice: {
                [Op.between]: [minPrice, maxPrice]
            },
            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    description: {
                        [Op.like]: `%${search}%`
                    }
                }
            ]
        }
    })

    res.status(200).json(
        new ApiResponse(200, products, 'Products fetched successfully')
    )
})


const getProductByVendor = AsyncHandler(async(req, res) => {
    const { id: vendorId } = req.user;

    const user = await User.findOne({
        where: {
            id: vendorId,
            role: 'Vendor'
        }
    });
    if(!user) {
        throw new ApiError(404, 'Vendor not found');
    }

    const existBrands = await Brand.findAll({
        where: {
            UserId: user.id
        }
    })

    if(!existBrands) {
        throw new ApiError(404, 'Brand not found');
    }
    

    const products = await Product.findAll({
        where: {
            BrandId: {
                [Op.in]: existBrands.map(brand => brand.id)
            }
        },
        include: [
            {
                model: Category,
                attributes: ['id', 'name']
            },
            {
                model: Brand,
                attributes: ['id', 'name', 'logo']
            }
        ]
    })

    res.status(200).json(
        new ApiResponse(200, products, 'Products fetched successfully')
    )
})

const getProductByVendorAndCategory = AsyncHandler(async(req, res) => {
    const { id: vendorId} = req.user;
    if(!vendorId) {
        throw new ApiError(400, 'Vendor ID is required');
    }

    const user = await User.findByPk(vendorId);
    if(!user) {
        throw new ApiError(404, 'Vendor not found');
    }

    const { categoryId } = req.body;
    if(!categoryId) {
        throw new ApiError(400, 'Category ID is required');
    }

    const existCategory = await Category.findOne({
        where: { id: categoryId }
    })

    if(!existCategory) {
        throw new ApiError(404, 'Category does not exists')
    }

    const existBrand = await Brand.findAll({
        where: {
            UserId: vendorId
        },
        attributes: ['id']
    })

    const brandIds = existBrand.map(brand => brand.id);

    const products = await Product.findAll({
        where: {
            BrandId: {
                [Op.in]: brandIds
            },
            CategoryId: existCategory.id
        },
        include: [
            {
                model: Category,
                attributes: ['id', 'name']
            },
            {
                model: Brand,
                attributes: ['id', 'name', 'logo']
            }
        ]
    })

    res.status(200).json(
        new ApiResponse(200, products, 'Products fetched successfully')
    )
})


const getProductByVendorAndSearch = AsyncHandler(async(req, res) => {
    const { id: vendorId} = req.user;
    if(!vendorId) {
        throw new ApiError(400, 'Vendor ID is required');
    }

    const { search } = req.body;
    if(!search) {
        throw new ApiError(400, 'Search is required');
    }

    const user = await User.findByPk(vendorId);
    if(!user) {
        throw new ApiError(404, 'Vendor not found');
    }

    const existBrand = await Brand.findAll({
        where: {
            UserId: vendorId
        },
        attributes: ['id']
    })

    const brandIds = existBrand.map(brand => brand.id);

    const products = await Product.findAll({
        where: {
            BrandId: {
                [Op.in]: brandIds
            },
            [Op.or]: [
                {
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                },
                {
                    description: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            ]
        }
    })

    res.status(200).json(
        new ApiResponse(200, products, 'Products fetched successfully')
    )
})


const getProductByVendorAndCategoryAndSearch = AsyncHandler(async(req, res) => {
    const { id: vendorId} = req.user;
    if(!vendorId) {
        throw new ApiError(400, 'Vendor ID is required');
    }

    const { categoryId, search } = req.body;
    if(!categoryId || !search) {
        throw new ApiError(400, 'Category ID and search are required');
    }

    const existCategory = await Category.findOne({
        where: { id: categoryId }
    })

    if(!existCategory) {
        throw new ApiError(404, 'Category does not exists')
    }

    const user = await User.findByPk(vendorId);
    if(!user) {
        throw new ApiError(404, 'Vendor not found');
    }

    const existBrand = await Brand.findAll({
        where: {
            UserId: vendorId
        },
        attributes: ['id']
    })

    const brandIds = existBrand.map(brand => brand.id);

    const products = await Product.findAll({
        where: {
            CategoryId: existCategory.id,
            BrandId: {
                [Op.in]: brandIds
            },
            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${search}%`
                    }
                },
                {
                    description: {
                        [Op.like]: `%${search}%`
                    }
                }
            ]
        }
    })

    res.status(200).json(
        new ApiResponse(200, products, 'Products fetched successfully')
    )
})

const getTotalProducts = AsyncHandler(async(req, res) => {
    const { id: vendorId } = req.user;
    if(!vendorId) {
        throw new ApiError(400, 'Vendor ID is required');
    }

    const user = await User.findByPk(vendorId);
    if(!user) {
        throw new ApiError(404, 'Vendor not found');
    }

    const existBrand = await Brand.findAll({
        where: {
            UserId: vendorId
        },
        attributes: ['id']
    })

    const brandIds = existBrand.map(brand => brand.id);

    const products = await Product.findAll({
        where: {
            BrandId: {
                [Op.in]: brandIds
            }
        }
    })

    const totalProducts = products.length;

    res.status(200).json(
        new ApiResponse(200, totalProducts, 'Total products fetched successfully')
    )
})

export {
    listProduct,
    updateProduct,
    updateProductImage,
    deleteProduct,
    getProductById,
    getNewProducts,
    getNewProductsByCategory,
    getAllProducts,
    getProductByCategory,
    getProductByCategoryId,
    getProductByCategoryAndPrice,
    getProductByCategoryAndSearch,
    getProductByCategoryAndPriceAndSearch,
    getProductByPrice,
    getProductByPriceAndSearch,
    getProductBySearch,
    getProductByVendor,
    getProductByVendorAndCategory,
    getProductByVendorAndSearch,
    getProductByVendorAndCategoryAndSearch,
    getTotalProducts
}