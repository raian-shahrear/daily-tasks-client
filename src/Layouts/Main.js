import React from "react";
import NavBar from "../Pages/Others/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Others/Footer/Footer";

const Main = () => {
  return (
    <div>
      <NavBar />
      <div className="dark:bg-gray-900">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Main;
