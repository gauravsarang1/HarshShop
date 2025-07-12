import db from '../models/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AsyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApResponse.js'
import { uploadImageBuffer } from '../utils/UploadOnCludinary.js'

const { User } = db

const generateAccessAndRefreshToken = async(userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new ApiError(404, "User not found");

    const accessToken = user.getAccessToken();
    const refreshToken = user.getRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
}

const registerUser = AsyncHandler(async(req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(400, 'All fields are required');
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new ApiError(400, 'User already exists');
    }

    const user = await User.create({ name, email, password })

    if (!user) {
        throw new ApiError(500, 'Failed to register user');
    }

    const newUser = await User.findOne({
        where: { id: user.id},
        attributes: {
            exclude: ['password', 'refreshToken']
        }
    })

    res.status(200).json(new ApiResponse(200, newUser, 'Registration successful'));
});

const loginUser = AsyncHandler(async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, 'All fields are required');
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new ApiError(404, 'Login failed, user not found');
    }

    console.log( "password", password);

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(400, 'Password is incorrect');
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user.id);

    const loggedInUser = await User.findOne({
        where: { email },
        attributes: { exclude: ['password', 'refreshToken'] }
    });

    const options = {
        httpOnly: true,
        secure: true,
    };

    res.status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(new ApiResponse(200, {
            user: loggedInUser,
            accessToken,
        }, 'Login successful'));
});

const getUser = AsyncHandler(async(req, res) => {
    const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password', 'refreshToken'] }
    });
    
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    res.status(200).json(
        new ApiResponse(200, user, 'User fetched successfully')
    );
});

const updateUserDetails = AsyncHandler(async(req, res) => {
    const { name, email } = req.body;

    if(!(name || email)) {
        throw new ApiError(400, 'At least one field is required');
    }

    const user = await User.findByPk(req.user.id);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    if(req.user.role !== 'Admin' && user.id !== req.user.id) {
        throw new ApiError(403, 'Not authorized to update this user');
    }

    if(name) user.name = name;
    if(email) user.email = email;

    await user.save();

    res.status(200).json(
        new ApiResponse(200, user, 'User details updated successfully')
    );
})

const logoutUser = AsyncHandler(async(req, res) => {
    const user = await User.findByPk(req.user.id);
    if (!user) {
        throw new ApiError(404, 'Logout failed, user not found');
    }

    // Clear the refresh token in the database
    user.refreshToken = null;
    await user.save();

    const options = {
        httpOnly: true,
        secure: true,
    };
    
    // Clear cookies if they exist
    res.clearCookie('accessToken', options);
    res.clearCookie('refreshToken', options);

    res.status(200).json(
        new ApiResponse(200, null, 'Logout successful')
    );
});

const getAllUsers = AsyncHandler(async(req, res) => {
    if(req.user.role !== 'Admin') {
        throw new ApiError(403, 'Not authorized to access all users');
    }

    const users = await User.findAll({
        attributes: { exclude: ['password', 'refreshToken'] }
    });

    res.status(200).json(
        new ApiResponse(200, users, 'Users fetched successfully')
    );
});

const deleteUser = AsyncHandler(async(req, res) => {

    const { userId } = req.params;
    if(!userId) {
        throw new ApiError(400, 'User ID is required');
    }

    if(req.user.role !== 'Admin' && req.user.id !== userId) {
        throw new ApiError(403, 'Not authorized to delete this user');
    }

    const user = await User.findByPk(userId);
    if(!user) {
        throw new ApiError(404, 'User not found');
    }

    if(user.role === 'Admin') {
        throw new ApiError(400, 'Cannot delete admin users');
    }

    await user.destroy();

    res.status(200).json(
        new ApiResponse(200, null, 'User deleted successfully')
    );
});

const refreshAccessToken = AsyncHandler(async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findByPk(decodedToken.id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        /*if (incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }*/

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user.id);

        const options = {
            httpOnly: true,
            secure: true
        };

        res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200, 
                    { accessToken },
                    "Access token refreshed"
                )
            );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

export {
    registerUser,
    loginUser,
    getUser,
    updateUserDetails,
    logoutUser,
    getAllUsers,
    deleteUser,
    refreshAccessToken
}
