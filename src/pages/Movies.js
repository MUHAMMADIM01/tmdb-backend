import React, { useEffect, useState } from "react";
import { fetchMovies, addFavorite, addWatchlist } from "../services/api";

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const res = await fetchMovies();
      setMovies(res.data.results);
    };
    getMovies();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Movies</h2>
      {movies.map((movie) => (
        <div key={movie.id} style={{ marginBottom: "1rem" }}>
          <h4>{movie.title}</h4>
          <button onClick={() => addFavorite(movie.id)}>❤️ Add to Favorites</button>
          <button onClick={() => addWatchlist(movie.id)}>📌 Add to Watchlist</button>
        </div>
      ))}
    </div>
  );
}

export default Movies;
