import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#222", color: "#fff" }}>
      <Link to="/" style={{ marginRight: "1rem", color: "white" }}>Movies</Link>
      <Link to="/favorites" style={{ marginRight: "1rem", color: "white" }}>Favorites</Link>
      <Link to="/watchlist" style={{ marginRight: "1rem", color: "white" }}>Watchlist</Link>
      <Link to="/login" style={{ marginRight: "1rem", color: "white" }}>Login</Link>
      <Link to="/register" style={{ color: "white" }}>Register</Link>
    </nav>
  );
}

export default Navbar;
