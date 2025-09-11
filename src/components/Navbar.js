import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/movies" style={styles.link}>Movies</Link>
      <Link to="/favorites" style={styles.link}>Favorites</Link>
      <Link to="/login" style={styles.link}>Login</Link>
      <Link to="/register" style={styles.link}>Register</Link>
    </nav>
  );
}

const styles = {
  nav: { display: "flex", justifyContent: "center", gap: "20px", padding: "15px", backgroundColor: "#f5f5f5" },
  link: { textDecoration: "none", fontWeight: "bold", color: "#333" },
};

export default Navbar;
