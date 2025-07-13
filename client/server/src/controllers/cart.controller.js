import { ApiResponse } from "../utils/ApResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import db from "../models/index.js";

const { Cart, CartItem, Product, User, Brand } = db;

const addToCart = AsyncHandler(async(req, res) => {
    const { productId } = req.body;
    if(!productId) {
        throw new ApiError(400, 'Product ID is required');
    }

    const product = await Product.findByPk(productId);
    if(!product) {
        throw new ApiError(404, 'Product not found');
    }

    // Find or create user's cart
    let [cart] = await Cart.findOrCreate({
        where: { UserId: req.user.id }
    });

    // Check if product already exists in cart
    let cartItem = await CartItem.findOne({
        where: {
            CartId: cart.id,
            ProductId: productId
        }
    });

    if(cartItem) {
        // Update quantity if product already in cart
        cartItem.quantity += 1;
        await cartItem.save();
    } else {
        // Create new cart item if product not in cart
        cartItem = await CartItem.create({
            CartId: cart.id,
            ProductId: productId,
            quantity: 1
        });
    }

    // Get updated cart with all items
    {/*const updatedCart = await Cart.findOne({
        where: { id: cart.id },
        include: [{
            model: CartItem,
            include: [{
                model: Product,
                attributes: ['id', 'name', 'price', 'discountedPrice', 'images']
            }]
        }]
    });*/}

    res.status(200).json(
        new ApiResponse(200, cartItem, 'Product added to cart successfully')
    );
});

const getCart = AsyncHandler(async(req, res) => {
    const cart = await Cart.findOne({
        where: { UserId: req.user.id },
        include: [{
            model: CartItem,
            include: [{
                model: Product,
                attributes: ['id', 'name', 'price', 'discountedPrice', 'images'],
                include: [{
                    model: Brand,
                    attributes: ['id', 'name']
                }]
            }],
        }]
    });

    if(!cart) {
        return res.status(200).json(
            new ApiResponse(200, { items: [] }, 'Cart is empty')
        );
    }

    res.status(200).json(
        new ApiResponse(200, cart, 'Cart fetched successfully')
    );
});

const clearCart = AsyncHandler(async(req, res) => {
    const cart = await Cart.findOne({
        where: { UserId: req.user.id }
    });

    if(cart) {
        await CartItem.destroy({
            where: { CartId: cart.id }
        });
    }

    res.status(200).json(
        new ApiResponse(200, null, 'Cart cleared successfully')
    );
});

export {
    addToCart,
    getCart,
    clearCart
}