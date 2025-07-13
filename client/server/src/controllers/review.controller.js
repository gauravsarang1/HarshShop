import { ApiResponse } from "../utils/ApResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import db from "../models/index.js";

const { Review, Product } = db;

const createReview = AsyncHandler(async (req, res) => {
    const { productId, rating, comment } = req.body;

    if (!productId || !rating || !comment) {
        throw new ApiError(400, 'All fields are required');
    }

    const product = await Product.findByPk(productId);
    if (!product) {
        throw new ApiError(404, 'Product not found');
    }

    if(!req.user || !req.user.id) {
        throw new ApiError(401, 'Unauthorized');
    }

    console.log("current user", req.user)

    const review = await Review.create({
        ProductId: productId,
        rating,
        comment,
        UserId: req.user.id
    });

    res.status(201).json(
        new ApiResponse(201, review, 'Review created successfully')
    );
})

const editReview = AsyncHandler(async (req, res) => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    if (!(rating || comment)) {
        throw new ApiError(400, 'At least one field is required');
    }

    const review = await Review.findByPk(reviewId);
    if (!review) {
        throw new ApiError(404, 'Review not found');
    }

    if(review.UserId !== req.user.id && req.user.role !== 'Admin') {
        throw new ApiError(403, 'Unauthorized');
    }

    if(rating) review.rating = rating;
    if(comment) review.comment = comment;

    await review.save();

    res.status(200).json(
        new ApiResponse(200, review, 'Review updated successfully')
    );
})

const deleteReview = AsyncHandler(async (req, res) => {
    const { reviewId } = req.params;

    const review = await Review.findByPk(reviewId);
    if (!review) {
        throw new ApiError(404, 'Review not found');
    }

    if(review.UserId !== req.user.id && req.user.role !== 'Admin') {
        throw new ApiError(403, 'Unauthorized');
    }

    await review.destroy();

    res.status(200).json(
        new ApiResponse(200, null, 'Review deleted successfully')
    );
})


const getReviews = AsyncHandler(async (req, res) => {
    const { productId } = req.params;

    if(!productId) {
        throw new ApiError(400, 'Product ID is required');
    }

    const product = await Product.findByPk(productId);
    if(!product) {
        throw new ApiError(404, 'Product not found');
    }

    const reviews = await Review.findAll({
        where: {
            ProductId: productId
        }
    });
    
    res.status(200).json(
        new ApiResponse(200, reviews, 'Reviews fetched successfully')
    );
})

    
export { createReview, editReview, deleteReview, getReviews }