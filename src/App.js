import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import Favorites from "./pages/Favorites";
// Home page, connect
// import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar to Movies Page */}
      <Routes>
        {/* Movies list page */}
        <Route path="/movies" element={<Movies />} />

        {/* Single movie detail */}
        <Route path="/movies/:id" element={<MovieDetail />} />

        {/* Favorites page */}
        <Route path="/favorites" element={<Favorites />} />
        {/* Homepage */}
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
