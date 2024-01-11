import { Outlet } from "react-router-dom";
import UserNavbar from "../navbar/UserNavbar";
import Footer from "../footer/Footer";

const UserLayout = () => {

  return (
    <div className="userLayout">
      <UserNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;