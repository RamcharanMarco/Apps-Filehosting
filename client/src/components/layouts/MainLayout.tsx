import { Outlet } from "react-router-dom";
import MainNavbar from "../navbar/MainNavbar";
import Footer from "../footer/Footer";

const MainLayout = () => {
  return (
    <div className="mainLayout">
      <MainNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
