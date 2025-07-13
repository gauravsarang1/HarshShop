import { createBrowserRouter } from "react-router-dom";
import  AppContent from "./AppContent";
import HomePage from "./pages/home/HomePage";
import Categories from "./pages/categories/Categories";
import ExploreCategory from "./pages/categories/ExploreCategory";
import Deals from "./pages/deals/Deals";
import NewArrivals from "./pages/newArrivals/NewArrivals";
import Brands from "./pages/brands/Brands";
import BrandCollection from "./pages/brands/BrandCollection";
import ProductsPage from "./pages/product/ProductsPage";
import ProductPreview from "./pages/product/ProductPreview";
import NotFound from "./pages/not-found";
import Login from "./auth/Login";
import AuthLayout from "./auth/AuthLayout";
import Register from "./auth/Register";
import CartPage from "./pages/cart/CartPage";
import OrderPage from "./pages/order/OrderPage";
import OrderDetails from "./pages/order/OrderDetails";
import Vendor from "./pages/vendor/Vendor";
import Admin from "./pages/admin/Admin";


const router = createBrowserRouter([
  {
    path: "/",
    element: <AppContent />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "category/:categoryId",
        element: <ExploreCategory />,
      },
      {
        path: "deals",
        element: <Deals />,
      },
      {
        path: "new-arrivals",
        element: <NewArrivals />,
      },
      {
        path: "brands",
        element: <Brands />,
      },
      {
        path: "brand/:brandId",
        element: <BrandCollection />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "product/:productId",
        element: <ProductPreview />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "orders",
        element: <OrderPage />,
      },
      {
        path: "orders/:orderId",
        element: <OrderDetails />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      // Add more auth routes here (e.g., register, forgot-password)
    ],
  },
  {
    path: "/vendor",
    element: <Vendor />
  },
  {
    path: "/admin",
    element: <Admin />
  },
]);

export default router;
