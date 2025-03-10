import React from "react";
import logo from "../assets/logo2.webp";

const Navbar = () => {
  return (
    <nav className="bg-black backdrop-blur-lg shadow-md fixed top-0 left-0 w-full z-50 py-2">
      <div className="container mx-auto flex justify-center">
        <img src={logo} className="h-12 mix-blend-screen"/>
        <h1 className="text-2xl font-semibold text-white mt-1">BidAtoZ</h1>
      </div>
    </nav>
  );
};

export default Navbar;
