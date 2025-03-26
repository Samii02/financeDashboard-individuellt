import React from "react";
import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <nav className="flex flex-row justify-evenly font-text">
      {/* Home link */}
      <NavLink
        to="/"
        className="rounded-2xl px-4 py-3 m-2 bg-accent hover:bg-accentHover  cursor-pointer shadow-md transform transition-transform duration-300 hover:scale-105"
      >
        {" "}
        Home
      </NavLink>
      {/* StocksAndAnalyses link */}
      <NavLink
        to="/StocksAndAnalyses"
        className="rounded-2xl px-4 py-3 m-2 bg-accent hover:bg-accentHover  cursor-pointer shadow-md transform transition-transform duration-300 hover:scale-105"
      >
        <span className="block md:hidden">Stocks</span>
        <span className="hidden md:block">Stock Charts</span>
      </NavLink>
      {/* Company link */}
      <NavLink
        to="/company"
        className="rounded-2xl px-4 py-3 m-2 bg-accent hover:bg-accentHover  cursor-pointer shadow-md transform transition-transform duration-300 hover:scale-105"
      >
        {" "}
        Company
      </NavLink>
    </nav>
  );
}

export default Navbar;
