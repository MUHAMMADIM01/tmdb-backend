const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Vercel/Heroku db url
});

app.use(cors());
app.use(express.json());

// =============== AUTH MIDDLEWARE ===============
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// =============== EXISTING ROUTES (register/login) ===============
// app.post("/register", ...)  etc.
// app.post("/login", ...)

// =============== FAVORITES ROUTES ===============
app.post("/favorites/add", authenticateToken, async (req, res) => {
  const { movie_id, movie_title } = req.body;
  try {
    await pool.query(
      "INSERT INTO favorites (user_id, movie_id, movie_title) VALUES ($1, $2, $3)",
      [req.user.id, movie_id, movie_title]
    );
    res.json({ message: "Movie added to favorites!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/favorites", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM favorites WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/favorites/:id", authenticateToken, async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM favorites WHERE id = $1 AND user_id = $2",
      [req.params.id, req.user.id]
    );
    res.json({ message: "Movie removed from favorites!" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// =============== WATCHLIST ROUTES ===============
app.post("/watchlist/add", authenticateToken, async (req, res) => {
  const { movie_id, movie_title } = req.body;
  try {
    await pool.query(
      "INSERT INTO watchlist (user_id, movie_id, movie_title) VALUES ($1, $2, $3)",
      [req.user.id, movie_id, movie_title]
    );
    res.json({ message: "Movie added to watchlist!" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/watchlist", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM watchlist WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/watchlist/:id", authenticateToken, async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM watchlist WHERE id = $1 AND user_id = $2",
      [req.params.id, req.user.id]
    );
    res.json({ message: "Movie removed from watchlist!" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// =============== SERVER START ===============
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
