import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
      const data = await res.json();
      setMovie(data);
    } catch (err) {
      console.error("Error fetching movie:", err);
    }
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/movies">⬅ Back to Movies</Link>
      <h2>{movie.title}</h2>
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          style={{ borderRadius: "10px", marginBottom: "20px" }}
        />
      )}
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> ⭐ {movie.vote_average} ({movie.vote_count} votes)</p>
      <p><strong>Overview:</strong> {movie.overview}</p>
    </div>
  );
}

export default MovieDetail;
