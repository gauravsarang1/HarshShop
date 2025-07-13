import { ApiResponse } from "../utils/ApResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import db from "../models/index.js";

const { Address, User } = db;

const createAddress = AsyncHandler(async(req, res) => {
    const { fullName, address1, address2, city, state, postalCode } = req.body;
    if(!fullName || !address1 || !city || !state || !postalCode) {
        throw new ApiError(400, 'All fields are required');
    }

    const address = await Address.create({
        fullName,
        address1,
        address2,
        city,
        state,
        postalCode
    })

    if(!address) {
        throw new ApiError(500, 'Failed to create address');
    }

    res.status(201).json(
        new ApiResponse(201, address, 'Address created successfully')
    )
})

const getUserAddress = AsyncHandler(async(req, res) => {
    const { userId } = req.params;
    if(!userId) {
        throw new ApiError(400, 'User ID is required');
    }

    const user = await User.findByPk(userId);
    if(!user) {
        throw new ApiError(404, 'User not found');
    }

    const addresses = await Address.findAll({
        where: {
            UserId: userId
        }
    })

    if(!addresses) {
        throw new ApiError(404, 'No addresses found');
    }

    res.status(200).json(
        new ApiResponse(200, addresses, 'Addresses fetched successfully')
    )
})

const updateAddress = AsyncHandler(async(req, res) => {
    const { addressId } = req.params;
    const { fullName, address1, address2, city, state, postalCode } = req.body;
    if(!fullName || !address1 || !city || !state || !postalCode) {
        throw new ApiError(400, 'All fields are required');
    }

    const address = await Address.findByPk(addressId);
    if(!address) {
        throw new ApiError(404, 'Address not found');
    }
    
    if(address.UserId !== req.user.id && req.user.role !== 'Admin') {
        throw new ApiError(403, 'You are not authorized to update this address');
    }

    if(fullName) address.fullName = fullName;
    if(address1) address.address1 = address1;
    if(address2) address.address2 = address2;
    if(city) address.city = city;
    if(state) address.state = state;
    if(postalCode) address.postalCode = postalCode;

    await address.save();

    res.status(200).json(
        new ApiResponse(200, address, 'Address updated successfully')
    )
})

const deleteAddress = AsyncHandler(async(req, res) => {
    const { addressId } = req.params;
    if(!addressId) {
        throw new ApiError(400, 'Address ID is required');
    }

    const address = await Address.findByPk(addressId);
    if(!address) {
        throw new ApiError(404, 'Address not found');
    }

    if(address.UserId !== req.user.id && req.user.role !== 'Admin') {
        throw new ApiError(403, 'You are not authorized to delete this address');
    }

    await address.destroy();

    res.status(200).json(
        new ApiResponse(200, null, 'Address deleted successfully')
    )
})

const getAddressById = AsyncHandler(async(req, res) => {
    const { addressId } = req.params;
    if(!addressId) {
        throw new ApiError(400, 'Address ID is required');
    }

    const address = await Address.findByPk(addressId);
    if(!address) {
        throw new ApiError(404, 'Address not found');
    }

    if(address.UserId !== req.user.id && req.user.role !== 'Admin') {
        throw new ApiError(403, 'You are not authorized to get this address');
    }

    res.status(200).json(
        new ApiResponse(200, address, 'Address fetched successfully')
    )
})

export { createAddress, getUserAddress, updateAddress, deleteAddress, getAddressById }