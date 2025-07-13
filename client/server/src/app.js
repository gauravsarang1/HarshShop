import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
// Serve static files from the 'public' directory
app.use(express.static('public'));



//import routes
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import categoryRouter from './routes/category.routes.js'
import reviewRouter from './routes/review.routes.js'
import orderRouter from './routes/order.routes.js'
import orderItemRouter from './routes/orderItem.routes.js'
import cartRouter from './routes/cart.routes.js'
import cartItemRouter from './routes/cartItem.routes.js'
import addressRouter from './routes/address.routes.js'
import wishlistRouter from './routes/wishlist.routes.js'
import paymentRouter from './routes/payment.routes.js'
import brandRouter from './routes/brand.route.js'

//use routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/order-items', orderItemRouter)
app.use('/api/v1/carts', cartRouter)
app.use('/api/v1/cart-items', cartItemRouter)
app.use('/api/v1/addresses', addressRouter)
app.use('/api/v1/wishlists', wishlistRouter)
app.use('/api/v1/payments', paymentRouter)
app.use('/api/v1/brands', brandRouter)

// Define a simple API endpoint
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    error: err.errors || [],
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

const PORT = process.env.PORT || 5050;

// Export the app for testing or further configuration
export default app;