import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/Home";
import Docs from "../pages/Docs";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UserLayout from "../components/layouts/UserLayout";
import Dashboard from "../pages/Dashboard";
import Buckets from "../pages/Buckets";
import Bucket from "../pages/Bucket";
import Settings from "../pages/Settings";

const Router = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="docs" element={<Docs />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/console/:id/" element={<UserLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="buckets" element={<Buckets />} />
          <Route path="buckets/:bucketid" element={<Bucket />} />
        </Route>
      </Routes> 
    </BrowserRouter>
  );
};

export default Router;
