import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 backdrop-blur-lg shadow-md fixed top-0 left-0 w-full py-4">
      <div className="container mx-auto flex justify-center">
        <h1 className="text-2xl font-semibold text-white">BidAtoZ</h1>
      </div>
    </nav>
  );
};

export default Navbar;
