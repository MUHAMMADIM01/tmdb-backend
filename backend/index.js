const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { Pool } = require("pg");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/movies", require("./routes/movieRoutes"));
app.use("/api/favorites", require("./routes/favoriteRoutes"));
app.use("/api/watchlist", require("./routes/watchlistRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
