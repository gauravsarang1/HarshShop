# HarshShop Backend API 🛍️

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)](https://sequelize.org/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)

---

## 🚀 Features

- User registration and authentication
- JWT-based authorization
- User profile management
- Role-based access control (User/Admin)

* Product listing and details
* Category management
* Product search and filtering
* Product reviews and ratings

- Add/remove items
- Update quantities
- Cart persistence
- Cart item management

* Create orders
* Order history
* Order status tracking
* Order items management

- Payment initiation
- Admin payment confirmation
- Payment status tracking
- Payment history

* Wishlist management
* Address management
* Admin dashboard functionalities
* Image upload and management

---

## 🔗 API Endpoints

All routes are prefixed with `/api/v1/`

```http
POST   /users/register    # Register new user
POST   /users/login       # User login
POST   /users/logout      # User logout
```

```http
GET    /users/me              # Get user profile
PUT    /users/update          # Update user details
GET    /users/all             # Get all users (Admin)
DELETE /users/:userId         # Delete user (Admin)
```

```http
GET    /products              # Get all products
GET    /products/:productId   # Get product details
POST   /products              # Add product (Admin)
PUT    /products/:productId   # Update product (Admin)
DELETE /products/:productId   # Delete product (Admin)
```

```http
GET    /categories              # Get all categories
POST   /categories              # Add category (Admin)
PUT    /categories/:categoryId  # Update category (Admin)
DELETE /categories/:categoryId  # Delete category (Admin)
```

```http
GET    /cart              # Get user's cart
POST   /cart              # Add to cart
DELETE /cart              # Clear cart
```

```http
POST   /orders/create          # Create order
GET    /orders/user-orders     # Get user's orders
PUT    /orders/cancel/:orderId # Cancel order
GET    /orders/all             # Get all orders (Admin)
PUT    /orders/status/:orderId # Update order status (Admin)
```

```http
POST   /payments/initiate     # Initiate payment
POST   /payments/confirm      # Confirm payment (Admin)
GET    /payments/status/:id   # Get payment status
GET    /payments/user         # Get user's payments
GET    /payments/all          # Get all payments (Admin)
```

```http
POST   /reviews                # Add review
PUT    /reviews/:reviewId      # Update review
DELETE /reviews/:reviewId      # Delete review
GET    /reviews/:productId     # Get product reviews
```

---

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL or MySQL
- Cloudinary account
- npm or yarn

### Installation Steps

```bash
git clone <repository-url>
cd server
npm install
```

### Environment Setup

Create a `.env` file:

```env
PORT=5050
CORS_ORIGIN=http://localhost:3000
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=1d
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### Initialize Database

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

### Start Server

```bash
npm run dev       # Development
npm start         # Production
```

---

## 📊 Database Schema

| Entity     | Description               |
| ---------- | ------------------------- |
| Users      | Authentication & profiles |
| Products   | Product listings & info   |
| Categories | Grouping products         |
| Orders     | Tracks purchases          |
| OrderItems | Items within an order     |
| Payments   | Payment records           |
| CartItems  | Items in user's cart      |
| Reviews    | Product reviews           |
| Addresses  | Shipping addresses        |
| Wishlist   | User wishlists            |

---

## 🔧 Middlewares Used

| Middleware        | Purpose                     |
| ----------------- | --------------------------- |
| `verifyJWT`       | Authentication check        |
| `AsyncHandler`    | Async error handler wrapper |
| `upload.single()` | File upload via Multer      |

---

## 🔝 Example API Response

```json
{
  "statusCode": 200,
  "data": {
    "id": "123",
    "email": "user@example.com"
  },
  "message": "Login successful"
}
```

---

## 🔒 Authentication Format

```http
Authorization: Bearer <your-token>
```

---

## 📁 File Upload

- **Handler**: Multer
- **Storage**: Cloudinary
- **Supported Formats**: JPEG, PNG, WebP
- **Size Limit**: 5MB

---

## ⚡ Rate Limiting

| Endpoint Type | Limit (per 15 min) |
| ------------- | ------------------ |
| Public        | 100 requests       |
| Authenticated | 1000 requests      |

---

## 🤝 Contributing

1. Fork the repo
2. Create your branch: `git checkout -b feature/FeatureName`
3. Commit changes: `git commit -m 'Add FeatureName'`
4. Push to branch: `git push origin feature/FeatureName`
5. Open Pull Request

---

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

## 🛍️ Project Scripts

| Script        | Description         |
| ------------- | ------------------- |
| `npm run dev` | Start in dev mode   |
| `npm start`   | Start in production |

---

## 🧰 Tech Stack

- Node.js + Express.js
- PostgreSQL (Sequelize ORM)
- Cloudinary + Multer for image upload
- JWT for authentication
- Rate limiting via `express-rate-limit`

---

## 📚 Coming Soon

- Swagger / OpenAPI Docs
- Live demo deployment link
- Postman collection download
- Architecture diagram

---

