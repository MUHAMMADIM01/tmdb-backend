import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>🎬 Movie App</h2>
      <ul style={styles.links}>
        <li>
          <Link to="/" style={styles.link}>Home</Link>
        </li>
        <li>
          <Link to="/movies" style={styles.link}>Movies</Link>
        </li>
        <li>
          <Link to="/favorites" style={styles.link}>Favorites</Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#222",
    color: "#fff"
  },
  logo: {
    margin: 0,
  },
  links: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
    margin: 0,
    padding: 0
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold"
  }
};

export default Navbar;
