import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken';
import { AsyncHandler } from '../utils/AsyncHandler.js';
import db from '../models/index.js';

const { User } = db;

const verifyJWT = AsyncHandler(async (req, _, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies.accessToken;

    if (!token) {
        throw new ApiError(401, 'Unauthorized access, token is required');
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findByPk(decoded.id, {
            attributes: { exclude: ['password', 'refreshToken'] }
        });

        if (!user) {
            throw new ApiError(401, 'Unauthorized access, user not found');
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, 'TokenExpiredError');
        }
        throw new ApiError(401, 'Unauthorized access, invalid token');
    }
});

// Middleware to verify vendor role
const verifyVendor = AsyncHandler(async (req, _, next) => {
    if (!req.user) {
        throw new ApiError(401, 'Unauthorized access');
    }

    if (req.user.role !== 'vendor') {
        throw new ApiError(403, 'Access forbidden. Vendor role required.');
    }

    // Check if vendor has an associated brand
    const brand = await db.Brand.findOne({
        where: { userId: req.user.id }
    });

    if (!brand) {
        throw new ApiError(403, 'Vendor has no associated brand');
    }

    req.user.brandId = brand.id; // Attach brandId for convenience
    next();
});

export const optionalAuth = AsyncHandler(async (req, _, next) => {
    const token = req.cookies.accessToken || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findOne({
            where: { email: decoded.email },
            attributes: { exclude: ['password', 'refreshToken'] },
        });

        req.user = user || null;
    } catch (error) {
        req.user = null; // invalid token
    }

    next(); // Always call next
});

export { verifyJWT, verifyVendor };
