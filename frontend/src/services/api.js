import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Add token if available
API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

// Auth
export const loginUser = (formData) => API.post("/auth/login", formData);
export const registerUser = (formData) => API.post("/auth/register", formData);

// Movies
export const fetchMovies = () => API.get("/movies");
export const addFavorite = (movieId) => API.post(`/favorites/${movieId}`);
export const addWatchlist = (movieId) => API.post(`/watchlist/${movieId}`);
