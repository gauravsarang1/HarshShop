import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/api';

// Async thunks
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.post('/carts/add-to-cart', 
        { productId}
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error adding to cart');
    }
  }
);

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/carts/get-cart', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error fetching cart');
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    console.log('cartItemId', cartItemId);
    console.log('quantity', quantity);
    try {
      const response = await api.put(`/cart-items/update-cart-item/${cartItemId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log('response', response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error updating cart item');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (cartItemId, { rejectWithValue }) => {
    try {
      await api.delete(`/cart-items/remove-from-cart/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return cartItemId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error removing from cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update cart item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cart = action.payload
      })
      // Remove from cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (state.cart?.CartItems) {
          state.cart.CartItems = state.cart.CartItems.filter(
            item => item.id !== action.payload
          );
        }
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer; 