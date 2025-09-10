import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY; 
const BASE_URL = "https://api.themoviedb.org/3";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("popularity.desc");

  useEffect(() => {
    fetchMovies();
  }, [filter]);

  const fetchMovies = async () => {
    let url = `${BASE_URL}/discover/movie?sort_by=${filter}&api_key=${API_KEY}`;

    if (query) {
      url = `${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Movies</h2>

      {/* 🔍 Search */}
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "8px", width: "200px", marginRight: "10px" }}
        />
        <button type="submit">Search</button>
      </form>

      {/* 🎛 Filters */}
      <div style={{ marginBottom: "20px" }}>
        <label>Filter by: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="popularity.desc">Popularity</option>
          <option value="vote_average.desc">Top Rated</option>
          <option value="release_date.desc">Newest</option>
        </select>
      </div>

      {/* 🎬 Movie List */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px" }}>
            <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none", color: "black" }}>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              ) : (
                <div style={{ height: "300px", background: "#ccc" }}></div>
              )}
              <h4>{movie.title}</h4>
              <p>⭐ {movie.vote_average}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
