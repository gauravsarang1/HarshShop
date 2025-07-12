import { ApiResponse } from "../utils/ApResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import db from "../models/index.js";

const { Wishlist, User } = db;

const createWishlist = AsyncHandler(async(req, res) => {
    const { productId } = req.body;
    if(!productId) {
        throw new ApiError(400, 'Product ID is required');
    }

    const wishlist = await Wishlist.create({
        UserId: req.user.id,
        ProductId: productId
    })

    if(!wishlist) {
        throw new ApiError(500, 'Failed to create wishlist');
    }

    res.status(201).json(
        new ApiResponse(201, wishlist, 'Wishlist created successfully')
    )
})

const getWishlist = AsyncHandler(async(req, res) => {
    const wishlist = await Wishlist.findAll({
        where: {
            UserId: req.user.id
        }
    })

    if(!wishlist) {
        throw new ApiError(404, 'Wishlist not found');
    }

    res.status(200).json(
        new ApiResponse(200, wishlist, 'Wishlist fetched successfully')
    )
})

const deleteWishlist = AsyncHandler(async(req, res) => {
    const { wishlistId } = req.params;
    if(!wishlistId) {
        throw new ApiError(400, 'Wishlist ID is required');
    }

    const wishlist = await Wishlist.findByPk(wishlistId);
    if(!wishlist) {
        throw new ApiError(404, 'Wishlist not found');
    }

    if(wishlist.UserId !== req.user.id && req.user.role !== 'Admin') {
        throw new ApiError(403, 'You are not authorized to delete this wishlist');
    }

    await wishlist.destroy();

    res.status(200).json(
        new ApiResponse(200, null, 'Wishlist deleted successfully')
    )
})

const getWishlistById = AsyncHandler(async(req, res) => {
    const { wishlistId } = req.params;
    if(!wishlistId) {
        throw new ApiError(400, 'Wishlist ID is required');
    }

    const wishlist = await Wishlist.findOne({
        where: {
            id: wishlistId,
            UserId: req.user.id
        }
    });
    if(!wishlist) {
        throw new ApiError(404, 'Wishlist not found');
    }

    res.status(200).json(
        new ApiResponse(200, wishlist, 'Wishlist fetched successfully')
    )
})

const deleteAllWishlist = AsyncHandler(async(req, res) => {
    const { userId } = req.params;
    if(!userId) {
        throw new ApiError(400, 'User ID is required');
    }

    if(req.user.role !== 'Admin' && req.user.id !== userId) {
        throw new ApiError(403, 'Not authorized to delete this wishlist');
    }

    const wishlist = await Wishlist.destroy({
        where: {
            UserId: userId
        }
    })

    if(!wishlist) {
        throw new ApiError(404, 'Wishlist not found');
    }

    res.status(200).json(
        new ApiResponse(200, null, 'Wishlist deleted successfully')
    )
})

const getWishlistByUserId = AsyncHandler(async(req, res) => {
    const { userId } = req.params;
    if(!userId) {
        throw new ApiError(400, 'User ID is required');
    }

    const user = await User.findByPk(userId);
    if(!user) {
        throw new ApiError(404, 'User not found');
    }

    if(user.id !== req.user.id && req.user.role !== 'Admin') {
        throw new ApiError(403, 'You are not authorized to get this wishlist');
    }

    const wishlist = await Wishlist.findAll({
        where: {
            UserId: userId
        }
    })

    if(!wishlist) {
        throw new ApiError(404, 'Wishlist not found');
    }

    res.status(200).json(
        new ApiResponse(200, wishlist, 'Wishlist fetched successfully')
    )
})

export { createWishlist, getWishlist, deleteWishlist, getWishlistById, deleteAllWishlist, getWishlistByUserId }
