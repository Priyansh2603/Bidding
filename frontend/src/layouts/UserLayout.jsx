import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="mt-16 p-4"> {/* Push content below the fixed navbar */}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
