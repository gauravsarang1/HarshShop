import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";
import { categories } from "../data/mockData";

// Vendor actions
export const fetchVendor = createAsyncThunk(
    'vendor/fetchVendor',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/users/me');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to fetch vendor');
        }
    }
);

// Products actions
export const addProduct = createAsyncThunk(
    'vendor/addProduct',
    async ({ productData }, { rejectWithValue }) => {
        console.log("productData", productData);
        try {
            const response = await api.post(`/products/list-product`, productData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to add product');
        }
    }
);

export const fetchAllProducts = createAsyncThunk(
    'vendor/fetchAllProducts', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`/products/get-products-by-vendor`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to fetch All products');
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'vendor/deleteProduct',
    async ({ brandId, productId }, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/products/delete-product/${brandId}/${productId}`);
            return { ...response.data.data, productId }; // Include productId for state update
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to delete product');
        }
    }
);

export const updateProduct = createAsyncThunk(
    'vendor/updateProduct',
    async ({ brandId, productId, productData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/products/update-product/${brandId}/${productId}`, productData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to update product');
        }
    }
);

export const updateProductImage = createAsyncThunk(
    'vendor/updateProductImage',
    async ({ brandId, productId, imageData }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            imageData.forEach((file) => {
                formData.append('images', file);
            });
            const response = await api.put(
                `/products/update-product-image/${brandId}/${productId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to update product images');
        }
    }
);

export const fetchProductByVendorAndCategory = createAsyncThunk(
    'vendor/fetchProductByVendorAndCategory',
    async ({ categoryId }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/products/get-product-by-vendor-and-category`, { categoryId });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to fetch product by vendor and category');
        }
    }
);

export const fetchProductByVendorAndSearch = createAsyncThunk(
    'vendor/fetchProductByVendorAndSearch',
    async ({ search }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/products/get-product-by-vendor-and-search`, { search });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to fetch product by vendor and search');
        }
    }
);

export const fetchProductByVendorAndCategoryAndSearch = createAsyncThunk(
    'vendor/fetchProductByVendorAndCategoryAndSearch',
    async ({ categoryId, search }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/products/get-product-by-vendor-and-category-and-search`, { categoryId, search });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to fetch product by vendor and category and search');
        }
    }
);

// Orders actions
export const fetchAllOrders = createAsyncThunk(
    'vendor/fetchAllOrders', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`/orders/get-orders-by-vendor`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to fetch All orders');
        }
    }
);

// Brands actions
export const fetchAllBrands = createAsyncThunk(
    'vendor/fetchAllBrands', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/brands/get-brands-by-vendor');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to fetch All brands');
        }
    }
);

export const createBrand = createAsyncThunk(
    'vendor/createBrand',
    async ( brandData , { rejectWithValue }) => {
        try {
            const response = await api.post('/brands/create-brand', brandData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to create brand');
        }
    }
)

export const deleteBrand = createAsyncThunk(
    'vendor/deleteBrand',
    async (brandId, { rejectWithValue }) => {
        
        try {
            const response = await api.delete(`/brands/${brandId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to delete brand');
        }
    }
);

export const updateBrand = createAsyncThunk(    
    'vendor/updateBrand',
    async ({brandId, brandData}, { rejectWithValue }) => {
        console.log('brandId', brandId)
        console.log('brandData', brandData)
        try {
            const response = await api.put(`/brands/${brandId}`, brandData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to update brand');
        }
    }
);

export const fetchOrderById = createAsyncThunk(
    'vendor/fetchOrderById',
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/orders/${orderId}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to fetch order');
        }
    }
);

// Fetch filtered orders
export const fetchFilteredOrdersByStatus = createAsyncThunk(
    'vendor/fetchFilteredOrdersByStatus',
    async ({ status }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/orders/get-vendor-filtered-orders`, { status });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to fetch filtered orders');
        }
    }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
    'vendor/updateOrderStatus',
    async ({ orderId, status }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/orders/update-order-status/${orderId}`, { status });
            console.log("response", response.data.data);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to update order status');
        }
    }
);

// Categories actions
export const fetchAllCategories = createAsyncThunk(
    'vendor/fetchAllCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/categories/get-all-categories');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to fetch All categories');
        }
    }
);

// Total products
export const fetchTotalProducts = createAsyncThunk(
    'vendor/fetchTotalProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/products/get-total-products');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to fetch total products');
        }
    }
);

// Total sales
export const fetchTotalSales = createAsyncThunk(
    'vendor/fetchTotalSales',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/orders/get-total-sales');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to fetch total sales');
        }
    }
);

// Total pending orders
export const fetchTotalPendingOrders = createAsyncThunk(
    'vendor/fetchTotalPendingOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/orders/get-total-pending-orders');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to fetch total pending orders');
        }
    }
);

// Total revenue
export const fetchTotalRevenue = createAsyncThunk(
    'vendor/fetchTotalRevenue',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/orders/get-total-revenue');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data?.message || 'Failed to fetch total revenue');
        }
    }
);

const vendorSlice = createSlice({
    name: 'vendor',
    initialState: {
        vendor: null,
        products: [],
        orders: [],
        brands: [],
        categories: [],
        loading: {
            products: false,
            orders: false,
            brands: false,
            stats: false,
            categories: false
        },
        error: {
            products: null,
            orders: null,
            brands: null,
            stats: null,
            categories: null
        },
        selectedProduct: null,
        selectedOrder: null,
        selectedBrand: null,
        stats: {
            totalProducts: 0,
            totalSales: 0,
            totalPendingOrders: 0,
            totalRevenue: 0
        }
    },
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
        clearSelectedOrder: (state) => {
            state.selectedOrder = null;
        },
        setSelectedBrand: (state, action) => {
            state.selectedBrand = action.payload;
        },
        clearSelectedBrand: (state) => {
            state.selectedBrand = null;
        }
    },
    extraReducers: (builder) => {
        builder
        // Vendor actions
        .addCase(fetchVendor.pending, (state) => {
            state.loading.products = true;
        })
        .addCase(fetchVendor.fulfilled, (state, action) => {
            state.vendor = action.payload;
            state.loading.products = false;
            state.error.products = null;
        })
        .addCase(fetchVendor.rejected, (state, action) => {
            state.error.products = action.payload;
            state.loading.products = false;
        })
        // Products reducers
        .addCase(addProduct.pending, (state) => {
            state.loading.products = true;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
            state.products.push(action.payload);
            state.loading.products = false;
            state.error.products = null;
        })
        .addCase(addProduct.rejected, (state, action) => {
            state.error.products = action.payload;
            state.loading.products = false;
        })
        .addCase(fetchAllProducts.pending, (state) => {
            state.loading.products = true;
        })
        .addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading.products = false;
            state.error.products = null;
        })
        .addCase(fetchAllProducts.rejected, (state, action) => {
            state.error.products = action.payload;
            state.loading.products = false;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.products = state.products.filter(product => product.id !== action.payload.productId);
            state.error.products = null;
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.error.products = action.payload;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            const index = state.products.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
            state.error.products = null;
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.error.products = action.payload;
        })
        .addCase(updateProductImage.fulfilled, (state, action) => {
            const index = state.products.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
            state.error.products = null;
        })
        .addCase(updateProductImage.rejected, (state, action) => {
            state.error.products = action.payload;
        })
        // Fetch product by vendor and category
        .addCase(fetchProductByVendorAndCategory.pending, (state) => {
            state.loading.products = true;
        })
        .addCase(fetchProductByVendorAndCategory.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading.products = false;
            state.error.products = null;
        })
        .addCase(fetchProductByVendorAndCategory.rejected, (state, action) => {
            state.error.products = action.payload;
            state.loading.products = false;
        })
        // Fetch product by vendor and search
        .addCase(fetchProductByVendorAndSearch.pending, (state) => {
            state.loading.products = true;
        })
        .addCase(fetchProductByVendorAndSearch.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading.products = false;
            state.error.products = null;
        })
        .addCase(fetchProductByVendorAndSearch.rejected, (state, action) => {
            state.error.products = action.payload;
            state.loading.products = false;
        })
        // Fetch product by vendor and category and search
        .addCase(fetchProductByVendorAndCategoryAndSearch.pending, (state) => {
            state.loading.products = true;
        })
        .addCase(fetchProductByVendorAndCategoryAndSearch.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading.products = false;
            state.error.products = null;
        })
        .addCase(fetchProductByVendorAndCategoryAndSearch.rejected, (state, action) => {
            state.error.products = action.payload;
            state.loading.products = false;
        })
        // Orders reducers
        .addCase(fetchAllOrders.pending, (state) => {
            state.loading.orders = true;
        })
        .addCase(fetchAllOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.loading.orders = false;
            state.error.orders = null;
        })
        .addCase(fetchAllOrders.rejected, (state, action) => {
            state.error.orders = action.payload;
            state.loading.orders = false;
        })
        // Brands reducers
        .addCase(fetchAllBrands.pending, (state) => {
            state.loading.brands = true;
        })
        .addCase(fetchAllBrands.fulfilled, (state, action) => {
            state.brands = action.payload;
            state.loading.brands = false;
            state.error.brands = null;
        })
        .addCase(fetchAllBrands.rejected, (state, action) => {
            state.error.brands = action.payload;
            state.loading.brands = false;
        })
        .addCase(createBrand.pending, (state) => {
            state.loading.brands = true;
        })
        .addCase(createBrand.fulfilled, (state, action) => {
            state.brands.push(action.payload);
            state.loading.brands = false;
            state.error.brands = null;
        })
        .addCase(createBrand.rejected, (state, action) => {
            state.error.brands = action.payload;
            state.loading.brands = false;
        })
        .addCase(deleteBrand.pending, (state) => {
            state.loading.brands = true;
        })
        .addCase(deleteBrand.fulfilled, (state, action) => {
            state.brands = state.brands.filter(brand => brand.id !== action.payload.id);
            state.loading.brands = false;
            state.error.brands = null;
        })
        .addCase(deleteBrand.rejected, (state, action) => {
            state.error.brands = action.payload;
            state.loading.brands = false;
        })
        .addCase(updateBrand.pending, (state) => {
            state.loading.brands = true;
        })
        .addCase(updateBrand.fulfilled, (state, action) => {
            state.brands = state.brands.map(brand => brand.id === action.payload.id ? action.payload : brand);
            state.loading.brands = false;
            state.error.brands = null;
        })
        .addCase(updateBrand.rejected, (state, action) => {
            state.error.brands = action.payload;
            state.loading.brands = false;
        })
        // Fetch order by vendor and id
        // Update order status
        .addCase(updateOrderStatus.pending, (state) => {
            state.loading.orders = true;
        })
                  .addCase(updateOrderStatus.fulfilled, (state, action) => {
              state.orders = state.orders.map(order => 
                order.id === action.payload.id ? action.payload : order
              );
              state.loading.orders = false;
              state.error.orders = null;
              state.selectedOrder = action.payload;
        })
        .addCase(updateOrderStatus.rejected, (state, action) => {
            state.error.orders = action.payload;
            state.loading.orders = false;
        })
        // Fetch order by id
        .addCase(fetchOrderById.pending, (state) => {
            state.loading.orders = true;
        })
        .addCase(fetchOrderById.fulfilled, (state, action) => {
            state.selectedOrder = action.payload;
            state.loading.orders = false;
            state.error.orders = null;
        })
        .addCase(fetchOrderById.rejected, (state, action) => {
            state.error.orders = action.payload;
            state.loading.orders = false;
        })
        // Fetch filtered orders
        .addCase(fetchFilteredOrdersByStatus.pending, (state) => {
            state.loading.orders = true;
            state.error.orders = null;
        })
        .addCase(fetchFilteredOrdersByStatus.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.loading.orders = false;
            state.error.orders = null;
        })
        .addCase(fetchFilteredOrdersByStatus.rejected, (state, action) => {
            state.error.orders = action.payload;
            state.loading.orders = false;
            state.orders = [];
        })
        // Stats reducers
        .addCase(fetchTotalProducts.pending, (state) => {
            state.loading.stats = true;
            state.error.stats = null;
        })
        .addCase(fetchTotalProducts.fulfilled, (state, action) => {
            state.stats.totalProducts = action.payload;
            state.loading.stats = false;
        })
        .addCase(fetchTotalProducts.rejected, (state, action) => {
            state.error.stats = action.payload;
            state.loading.stats = false;
        })

        .addCase(fetchTotalSales.pending, (state) => {
            state.loading.stats = true;
            state.error.stats = null;
        })
        .addCase(fetchTotalSales.fulfilled, (state, action) => {
            state.stats.totalSales = action.payload;
            state.loading.stats = false;
        })
        .addCase(fetchTotalSales.rejected, (state, action) => {
            state.error.stats = action.payload;
            state.loading.stats = false;
        })

        .addCase(fetchTotalPendingOrders.pending, (state) => {
            state.loading.stats = true;
            state.error.stats = null;
        })
        .addCase(fetchTotalPendingOrders.fulfilled, (state, action) => {
            state.stats.totalPendingOrders = action.payload;
            state.loading.stats = false;
        })
        .addCase(fetchTotalPendingOrders.rejected, (state, action) => {
            state.error.stats = action.payload;
            state.loading.stats = false;
        })

        .addCase(fetchTotalRevenue.pending, (state) => {
            state.loading.stats = true;
            state.error.stats = null;
        })
        .addCase(fetchTotalRevenue.fulfilled, (state, action) => {
            state.stats.totalRevenue = action.payload;
            state.loading.stats = false;
        })
        .addCase(fetchTotalRevenue.rejected, (state, action) => {
            state.error.stats = action.payload;
            state.loading.stats = false;
        })
        .addCase(fetchAllCategories.pending, (state) => {
            state.loading.categories = true;
        })
        .addCase(fetchAllCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.loading.categories = false;
            state.error.categories = null;
        })
        .addCase(fetchAllCategories.rejected, (state, action) => {
            state.error.categories = action.payload;
            state.loading.categories = false;
        });
    }
});

export const { setSelectedProduct, clearSelectedProduct, clearSelectedOrder, setSelectedBrand, clearSelectedBrand } = vendorSlice.actions;
export default vendorSlice.reducer;