import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import cartReducer from '../features/cartSlice';
import orderReducer from '../features/orderSlice';
import vendorReducer from '../features/vendorSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        order: orderReducer,
        vendor: vendorReducer,
    },
});

export default store;