import React from "react";

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎬 Welcome to Movie App</h1>
      <p style={styles.subtitle}>
        Discover, search and save your favorite movies!
      </p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  title: {
    fontSize: "2.5rem",
    color: "#222",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#555",
    marginTop: "10px",
  },
};

export default Home;
