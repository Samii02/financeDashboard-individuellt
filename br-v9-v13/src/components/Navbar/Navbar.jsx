import React from "react";
import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <nav className="">
      <NavLink to="/" className="">
        {" "}
        home
      </NavLink>
      <NavLink to="/playlist" className="">
        Playlists
      </NavLink>
      <NavLink to="/company" className="">
        {" "}
        Company
      </NavLink>
      <NavLink to="/contact" className="">
        {" "}
        Contact
      </NavLink>
    </nav>
  );
}

export default Navbar;
