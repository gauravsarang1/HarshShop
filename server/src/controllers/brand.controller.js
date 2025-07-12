import { ApiResponse } from "../utils/ApResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { uploadImageBuffer } from "../utils/UploadOnCludinary.js";
import { deleteFromCloudinary } from "../utils/DeleteFromCloudinary.js"
import { Op, where } from "sequelize";

import db from "../models/index.js";

const { Brand, Category, Product } = db;

const createBrand = AsyncHandler(async (req, res) => {
    const { 
            name, 
            description,
            story,
            values,
            category,
            stats,
            sociallinks 
        } = req.body;


        if (!name || !description) {
            throw new ApiError(400, "All fields are required");
        }

        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            throw new ApiError(401, "Authentication required");
        }

        {/*const existingCategory = await db.Category.findOne({
            where: { id: category}
        })

        if(!existingCategory) {
            throw new ApiError(404, `Category not found with id ${category}` )
        }

        const existingBrand = await Brand.findOne({ where: { name: name.toLowerCase() } });
        if (existingBrand) {
            throw new ApiError(400, "Brand already exists");
        }*/}

        let files = req.files;
        if (!files || !files.logo || !files.logo[0] || !files.logo[0].buffer) {
            throw new ApiError(400, "Logo is required");
        }

        const logo = files.logo[0].buffer;
        const coverImage = files?.coverImage?.[0]?.buffer || null;

        const logoUrl = await uploadImageBuffer(logo, "logo");
        if (!logoUrl || !logoUrl.secure_url) {
            throw new ApiError(500, "Failed to upload logo");
        }

        let coverImageUrl = null;
        if (coverImage) {
            coverImageUrl = await uploadImageBuffer(coverImage, "coverImage");
            if (!coverImageUrl || !coverImageUrl.secure_url) {
                coverImageUrl = null;
            }
        }

        const brand = await Brand.create({
            name: name.toLowerCase(),
            description,
            story,
            values,
            stats,
            sociallinks,
            CategoryId: 1, // Using the category field from the model
            coverImage: coverImageUrl ? coverImageUrl.secure_url : null,
            logo: logoUrl.secure_url,
            UserId: req.user.id, // Using proper association field name
        });

        if (!brand) {
            throw new ApiError(500, "Failed to create brand");
        }

        return res.status(201).json(
            new ApiResponse(201, brand, "Brand created successfully")
        );
});

const getBrands = AsyncHandler(async (req, res) => {
    const brands = await Brand.findAll();

    if (!brands || brands.length === 0) {
        throw new ApiError(404, "No brands found");
    }

    await Promise.all(brands.map(async (brand) => {
        const products = await db.Product.findAll({
            where: { BrandId: brand.id },
            attributes: ['id',]
        })
        brand.products = products.length || 0; // Ensure products is a number
        await brand.save();
    }));

    const updatedBrands = await Brand.findAll({
        include: [{
            model: db.Category,
            attributes: ['id', 'name']
        }]
    })

    return res
        .status(200)
        .json(new ApiResponse(200, updatedBrands, "Brands fetched successfully"));
});


const getBrandById = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const brand = await Brand.findByPk(id);
    if (!brand) {
        throw new ApiError(404, "Brand not found");
    }
    return res.status(200).json(new ApiResponse(200, brand, "Brand fetched successfully"));
});

const getBrandByCategoryId = AsyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const brands = await Brand.findAll({ where: { category: {
        [Op.contains]: [categoryId]
    } } });
    return res.status(200).json(new ApiResponse(200, brands, "Brands fetched successfully"));
});

const getBrandByUserId = AsyncHandler(async (req, res) => {
    const { id: vendorId } = req.user;
    const brands = await Brand.findAll({ where: { UserId: vendorId } });
    return res.status(200).json(new ApiResponse(200, brands, "Brands fetched successfully"));
});

const getBrandByName = AsyncHandler(async (req, res) => {
    const { name } = req.params;
    const brands = await Brand.findAll({ where: { name: {
        [Op.like]: `%${name}%`
    } } });
    return res.status(200).json(new ApiResponse(200, brands, "Brands fetched successfully"));
});


const updateBrand = AsyncHandler(async (req, res) => {
    const { name, description, categoryId, story, values, sociallinks, stats } = req.body;
    const { id } = req.params;
    const brand = await Brand.findByPk(id);
    if (!brand) {
        throw new ApiError(404, "Brand not found");
    }
    
    if(req.user.id !== brand.UserId && req.user.role !== "admin") {
        throw new ApiError(403, "You are not authorized to update this brand");
    }

    if(name) brand.name = name;
    if(description) brand.description = description;
    if(story) brand.story = story;
    if(values) brand.values = values;
    if(sociallinks) brand.sociallinks = sociallinks;
    if(stats) brand.stats = stats;
    if(categoryId) brand.CategoryId = categoryId;
    
    await brand.save();

    return res.status(200).json(new ApiResponse(200, brand, "Brand updated successfully"));
})


const updateBrandLogo = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const brand = await Brand.findByPk(id);
    if (!brand) {
        throw new ApiError(404, "Brand not found");
    }

    if(req.user.id !== brand.UserId && req.user.role !== "admin") {
        throw new ApiError(403, "You are not authorized to update this brand");
    }

    try {
        if(brand.logo) {
            const cloudinaryUrl = brand.logo
            const relativePath = cloudinaryUrl.split("/upload/")[1];
            const segments = relativePath.split("/");
            segments.shift();
            const publicId = segments.join("/").split(".")[0];
            const result = await deleteFromCloudinary(publicId);
            if(result.result === "ok") {
                brand.logo = null;
            }
            else {
                throw new ApiError(500, "Failed to delete logo");
            }
        }

        let file = req.file

        if(file) {
            const logo = file.buffer;
            const logoUrl = await uploadImageBuffer(logo, "logo");
            brand.logo = logoUrl.secure_url;
            await brand.save();
            return res.status(200).json(new ApiResponse(200, brand, "Brand logo updated successfully"));
        }
        else {
            throw new ApiError(400, "Logo is required");
        }
    } catch (error) {
        throw new ApiError(500, "Failed to update brand logo");
    }
})


const updateBrandCoverImage = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const brand = await Brand.findByPk(id);
    if (!brand) {
        throw new ApiError(404, "Brand not found");
    }

    if(req.user.id !== brand.UserId && req.user.role !== "admin") {
        throw new ApiError(403, "You are not authorized to update this brand");
    }

    try {
        if(brand.coverImage) {
            const cloudinaryUrl = brand.coverImage
            const relativePath = cloudinaryUrl.split("/upload/")[1];
            const segments = relativePath.split("/");
            segments.shift();
            const publicId = segments.join("/").split(".")[0];
            const result = await deleteFromCloudinary(publicId);
            if(result.result === "ok") {
                brand.coverImage = null;
            }
            else {
                throw new ApiError(500, "Failed to delete cover image");
            }
        }

        let file = req.file
       if(file) {
        const coverImage = file.buffer;
        const coverImageUrl = await uploadImageBuffer(coverImage, "coverImage");
        brand.coverImage = coverImageUrl.secure_url;
        await brand.save();
        return res.status(200).json(new ApiResponse(200, brand, "Brand cover image updated successfully"));
       }
       else {
        throw new ApiError(400, "Cover image is required");
       }
    } catch (error) {
        throw new ApiError(500, "Failed to update brand cover image");
    }
})

const deleteBrand = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const brand = await Brand.findByPk(id);
    if (!brand) {
        throw new ApiError(404, "Brand not found");
    }

    if(req.user.id !== brand.UserId && req.user.role !== "admin") {
        throw new ApiError(403, "You are not authorized to delete this brand");
    }

    try {
        if(brand.logo) {
            const cloudinaryUrl = brand.logo
            const relativePath = cloudinaryUrl.split("/upload/")[1];
            const segments = relativePath.split("/");
            segments.shift();
            const publicId = segments.join("/").split(".")[0];
            const result = await deleteFromCloudinary(publicId);
            if(result.result === "ok") {
                brand.logo = null;
            }
            else {
                throw new ApiError(500, "Failed to delete logo");
            }
        }
    
        if(brand.coverImage) {
            const cloudinaryUrl = brand.coverImage
            const relativePath = cloudinaryUrl.split("/upload/")[1];
            const segments = relativePath.split("/");
            segments.shift();
            const publicId = segments.join("/").split(".")[0];
            const result = await deleteFromCloudinary(publicId);
            if(result.result === "ok") {
                brand.coverImage = null;
            }
            else {
                throw new ApiError(500, "Failed to delete cover image");
            }
        }
    } catch (error) {
        throw new ApiError(500, "Failed to delete brand");
    }

    await brand.destroy();
    return res.status(200).json(new ApiResponse(200, brand, "Brand deleted successfully"));
})

const getBrandProducts = AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const brand = await Brand.findByPk(id);
    if (!brand) {
        throw new ApiError(404, "Brand not found");
    }

    const products = await Product.findAll({ where: { BrandId: id } });
    if(!products) {
        throw new ApiError(404, "No products found");
    }
    return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
})

const getBrandByProductId = AsyncHandler(async (req, res) => {
    const { productId } = req.params;
    const brand = await Brand.findOne({ where: { products: {
        [Op.contains]: [productId]
    } } });
    return res.status(200).json(new ApiResponse(200, brand, "Brand fetched successfully"));
})

export { 
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
};