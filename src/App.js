import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";

// idan kana da Navbar ko Home page, zaka iya import su nan ma
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";

function App() {
  return (
    <Router>
      {/* <Navbar />  // zaɓi ne idan kana da navbar component */}
      <Routes>
        {/* Movies list + search + filters */}
        <Route path="/movies" element={<Movies />} />

        {/* Single movie detail page */}
        <Route path="/movies/:id" element={<MovieDetail />} />

        {/* idan kana da homepage */}
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
