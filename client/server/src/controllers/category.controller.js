import { ApiResponse } from "../utils/ApResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { uploadImageBuffer } from "../utils/UploadOnCludinary.js";
import { deleteFromCloudinary } from "../utils/DeleteFromCloudinary.js";
import db from "../models/index.js";
import { Op } from "sequelize";

const { Category } = db;

const addCategory = AsyncHandler(async(req, res) => {
    if(req.user.role !== 'Admin' && req.user.role !== 'Vendor') {
        throw new ApiError(401, 'UnAuthorized rquest for adding category')
    }

    const { name, desc, trending } = req.body

    if(!name) {
        throw new ApiError(400, 'Catgory Name must be required')
    }

    const existingCategory = await Category.findOne({
        where: { name }
    })

    if(existingCategory) {
        throw new ApiError(409, 'Category already exists')
    }

    let image = null;
    if(req.file) {
        const imageUrl = await uploadImageBuffer(req.file.buffer, 'category');
        if(!imageUrl.secure_url) {
            throw new ApiError(400, 'Failed to upload image');
        }
        image = imageUrl.secure_url;
    }

    const category = await Category.create({
        name,
        image: image || null,
        desc: desc || null,
        trending: trending || false
    })

    res.status(201)
    .json(
        new ApiResponse(201, category, 'Category created successFully')
    )
})

const getAllCategories = AsyncHandler(async(req, res) => {
    const categories = await Category.findAll()

    res.status(200)
    .json(
        new ApiResponse(200, categories, 'Categories fetched successfully')
    )
})

const getCategoryById = AsyncHandler(async(req, res) => {
    const { categoryId } = req.params;
    if(!categoryId) {
        throw new ApiError(400, 'Category ID is required');
    }
    
    const category = await Category.findByPk(categoryId);
    if(!category) {
        throw new ApiError(404, 'Category not found');
    }

    res.status(200).json(
        new ApiResponse(200, category, 'Category fetched successfully')
    )
})

const getCategoryByName = AsyncHandler(async(req, res) => {
    const { name } = req.params;
    if(!name) {
        throw new ApiError(400, 'Category name is required');
    }
    const category = await Category.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name.trim()}%`
            }
        }
    })

    if(!category) {
        throw new ApiError(404, 'Category not found');
    }

    res.status(200).json(
        new ApiResponse(200, category, 'Category fetched successfully')
    )
})

const updateCategory = AsyncHandler(async(req, res) => {
    const { categoryId } = req.params;
    if(!categoryId) {
        throw new ApiError(400, 'Category ID is required');
    }

    const { name, desc, trending } = req.body;

    if(req.user.role !== 'Admin') {
        throw new ApiError(401, 'UnAuthorized rquest for updating category')
    }

    const category = await Category.findByPk(categoryId);
    if(!category) {
        throw new ApiError(404, 'Category not found');
    }

    if(name) category.name = name;
    if(desc) category.desc = desc;
    if(trending) category.trending = trending;
    await category.save();

    res.status(200).json(
        new ApiResponse(200, category, 'Category updated successfully')
    )
})

const deleteCategory = AsyncHandler(async(req, res) => {
    const { categoryId } = req.params;
    if(!categoryId) {
        throw new ApiError(400, 'Category ID is required');
    }

    if(req.user.role !== 'Admin') {
        throw new ApiError(401, 'UnAuthorized rquest for deleting category')
    }

    const category = await Category.findByPk(categoryId);
    
    if(!category) {
        throw new ApiError(404, 'Category not found');
    }

    if(category.image) {
        try {
            const afterUpload = category.image.split('/upload/')[1];
            if (!afterUpload) return;
      
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
        } catch (error) {
            throw new ApiError(500, 'Failed to delete category image');
        }
    }

    await category.destroy();

    res.status(200).json(
        new ApiResponse(200, null, 'Category deleted successfully')
    )
})

const getTrendingCategories = AsyncHandler(async(req, res) => {
    const categories = await Category.findAll({
        where: {
            trending: true
        }
    })

    res.status(200).json(
        new ApiResponse(200, categories, 'Trending categories fetched successfully')
    )
})

const addImageToCategory = AsyncHandler(async(req, res) => {
    const { categoryId } = req.params;
    if(!categoryId) {
        throw new ApiError(400, 'Category ID is required');
    }

    const category = await Category.findByPk(categoryId);
    if(!category) {
        throw new ApiError(404, 'Category not found');
    }

    if(!req.file) {
        throw new ApiError(400, 'Image is required');
    }

    const imageUrl = await uploadImageBuffer(req.file.buffer, 'category');
    if(!imageUrl.secure_url) {
        throw new ApiError(400, 'Failed to upload image');
    }

    category.image = imageUrl.secure_url;
    await category.save();

    res.status(200).json(
        new ApiResponse(200, category, 'Image added to category successfully')
    )
})

export {
     addCategory,
     getAllCategories,
     updateCategory, 
     deleteCategory, 
     getCategoryById, 
     getCategoryByName, 
     getTrendingCategories, 
     addImageToCategory 
}