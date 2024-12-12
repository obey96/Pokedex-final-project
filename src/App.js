import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PokemonDetail from "./pages/PokemonDetail";
import FavoritesPage from "./pages/FavoritesPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [favorites, setFavorites] = useState([]);

  // Load favorite Pokémon from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Update localStorage whenever favorites state changes
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]); // Only run when favorites state changes

  // Handle favoriting or unfavoriting a Pokémon
  const toggleFavorite = (pokemon) => {
    let updatedFavorites;
    const isFavorite = favorites.find((fav) => fav.name === pokemon.name);

    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favorites.filter((fav) => fav.name !== pokemon.name);
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, pokemon];
    }

    setFavorites(updatedFavorites);
  };

  return (
    <Router>
      <Navbar favoritesCount={favorites.length} />
      <Routes>
        <Route path="/" element={<HomePage toggleFavorite={toggleFavorite} favorites={favorites} />} />
        <Route path="/pokemon/:name" element={<PokemonDetail toggleFavorite={toggleFavorite} favorites={favorites} />} />
        <Route path="/favorites" element={<FavoritesPage favorites={favorites} toggleFavorite={toggleFavorite} />} />
      </Routes>
    </Router>
  );
}

export default App;
