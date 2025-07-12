import { ApiResponse } from "../utils/ApResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import db from "../models/index.js";

const { Cart, CartItem, Product, User } = db;

const updateCartItem = AsyncHandler(async(req, res) => {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    if(!cartItemId || !quantity) {
        throw new ApiError(400, 'Cart item ID and quantity are required');
    }

    const cartItem = await CartItem.findOne({
        where: { id: cartItemId },
        include: [{ model: Cart }]
    });

    if(!cartItem) {
        throw new ApiError(404, 'Cart item not found');
    }

    // Verify cart belongs to user
    if(cartItem.Cart.UserId !== req.user.id) {
        throw new ApiError(403, 'Not authorized to update this cart item');
    }

    if(quantity < 1) {
        // Remove item if quantity is 0
        await cartItem.destroy();
    } else {
        // Update quantity
        cartItem.quantity = quantity;
        await cartItem.save();
    }

    const updatedCart = await Cart.findOne({
        where: { id: cartItem.CartId },
        include: [{ model: CartItem, 
            include: [{ model: Product, attributes: ['id', 'name', 'price', 'discountedPrice', 'images'],
                include: [{ model: db.Brand, attributes: ['id', 'name'] }]
            }],
            order: [['createdAt', 'ASC']]
        }],
        attributes: ['id', 'totalPrice']
        
    });


    res.status(200).json(
        new ApiResponse(200, updatedCart, 'Cart updated successfully')
    );
});

const removeFromCart = AsyncHandler(async(req, res) => {
    const { cartItemId } = req.params;

    if(!cartItemId) {
        throw new ApiError(400, 'Cart item ID is required');
    }

    const cartItem = await CartItem.findOne({
        where: { id: cartItemId },
        include: [{ model: Cart }]
    });

    if(!cartItem) {
        throw new ApiError(404, 'Cart item not found');
    }

    // Verify cart belongs to user
    if(cartItem.Cart.UserId !== req.user.id) {
        throw new ApiError(403, 'Not authorized to remove this cart item');
    }

    await cartItem.destroy();

    res.status(200).json(
        new ApiResponse(200, null, 'Item removed from cart successfully')
    );
});

const clearCartItem = AsyncHandler(async(req, res) => {
    const { cartItemId } = req.params;
    if(!cartItemId) {
        throw new ApiError(400, 'Cart item ID is required');
    }
    const cartItem = await CartItem.findByPk(cartItemId);
    if(!cartItem) {
        throw new ApiError(404, 'Cart item not found');
    }
    await cartItem.destroy();
    res.status(200).json(
        new ApiResponse(200, null, 'Cart item cleared successfully')
    )
})

export { updateCartItem, removeFromCart, clearCartItem }