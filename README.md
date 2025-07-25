# HarshShop - Full Stack E-commerce Platform 🛍️

A modern e-commerce platform built with React (frontend) and Node.js (backend).

## 🌟 Project Overview

HarshShop is a full-stack e-commerce application that provides:
- Multi-vendor marketplace functionality
- Product catalog management
- User authentication & authorization
- Order processing & management
- Brand & category management
- File uploads with Cloudinary integration
- Secure payment processing

## 🏗️ Architecture

### Frontend (Client)
- **Tech Stack**: React 19, Vite, TailwindCSS
- **State Management**: Redux Toolkit
- **UI Components**: Radix UI, Framer Motion
- **Form Handling**: React Hook Form, Zod
- **HTTP Client**: Axios

### Backend (Server)
- **Runtime**: Node.js with Express
- **Database**: PostgreSQL with Sequelize ORM
- **File Storage**: Cloudinary
- **Security**: JWT, bcrypt
- **API Format**: RESTful

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn
- Cloudinary account

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd HarshShop
```

2. **Frontend Setup**
```bash
cd client
npm install
npm run dev
```

3. **Backend Setup**
```bash
cd server
npm install
npm run dev
```

## 📁 Project Structure
```
HarshShop/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Route components
│   │   ├── features/     # Redux slices
│   │   └── api/          # API integration
│   └── package.json
│
└── server/                # Backend Node.js application
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── models/       # Sequelize models
    │   ├── routes/       # Express routes
    │   └── middlewares/  # Custom middlewares
    └── package.json
```

## ⚙️ Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

### Backend (.env)
```env
PORT=8000
POSTGRES_URL=postgresql://user:password@localhost:5432/harshshop
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📦 Key Dependencies

### Frontend
- @reduxjs/toolkit: State management
- framer-motion: Animations
- @radix-ui: UI components
- axios: HTTP client
- react-hook-form: Form handling
- zod: Schema validation

### Backend
- express: Web framework
- sequelize: ORM
- pg: PostgreSQL client
- jsonwebtoken: JWT authentication
- bcrypt: Password hashing
- multer: File upload handling
- cloudinary: Cloud storage
- cors: Cross-origin resource sharing

## 🔒 Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Secure cookie handling
- CORS configuration
- Input validation
- File upload restrictions

## 🛠️ Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

### Backend
```bash
npm run dev      # Start development server with nodemon
npm run start    # Start production server
```

## 👥 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the ISC License.

## 👤 Author
**Gaurav Sarang**

## 🙏 Acknowledgments
- React Team
- Node.js Community
- Sequelize Team
- Cloudinary
- All contributors
