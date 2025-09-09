// backend/index.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// ---- Fake in-memory DB (can be replaced with PostgreSQL) ----
let users = []; // { name, email, passwordHash }
let favorites = {}; // { userEmail: [movies] }

// ---- Register ----
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if email already exists
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already registered" });
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Save user
  users.push({ name, email, passwordHash });
  res.json({ message: "User registered successfully" });
});

// ---- Login ----
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Generate JWT token
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", token });
});

// ---- Middleware to protect routes ----
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = decoded; // decoded.email
    next();
  });
}

// ---- Protected Routes ----
app.get("/favorites", authMiddleware, (req, res) => {
  const userEmail = req.user.email;
  res.json({ favorites: favorites[userEmail] || [] });
});

app.post("/favorites", authMiddleware, (req, res) => {
  const userEmail = req.user.email;
  const { movie } = req.body;

  if (!favorites[userEmail]) {
    favorites[userEmail] = [];
  }
  favorites[userEmail].push(movie);

  res.json({ message: "Movie added to favorites", favorites: favorites[userEmail] });
});

// ---- Default ----
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
