import { useEffect } from "react";
import { Outlet , useNavigate} from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { useSelector } from "react-redux";
import { useFetchUser } from "./hooks/useFetchUser";
import Vendor from "./pages/vendor/Vendor";
import Admin from "./pages/admin/Admin";

const AppContent = () => {
 
  // Initialize user fetching
  useFetchUser();

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-160px)]">
        <Outlet /> {/* This is where page content goes */}
      </main>
      <Footer />
    </>
  );
};

export default AppContent;