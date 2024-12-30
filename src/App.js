// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import HomePage from "./pages/HomePage";
// import PokemonDetail from "./pages/PokemonDetail";
// import FavoritesPage from "./pages/FavoritesPage";
// import "bootstrap/dist/css/bootstrap.min.css";

// function App() {
//   const [user, setUser] = useState(null); // To track logged-in user
//   const [favorites, setFavorites] = useState([]);


//   // Load favorite Pokémon from localStorage
//   useEffect(() => {
//     const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
//     setFavorites(storedFavorites);
//   }, []);

//   // Update localStorage whenever favorites state changes
//   useEffect(() => {
//     if (favorites.length > 0) {
//       localStorage.setItem("favorites", JSON.stringify(favorites));
//     }
//   }, [favorites]); // Only run when favorites state changes

//   // Handle favoriting or unfavoriting a Pokémon
//   const toggleFavorite = (pokemon) => {
//     let updatedFavorites;
//     const isFavorite = favorites.find((fav) => fav.name === pokemon.name);

//     if (isFavorite) {
//       // Remove from favorites
//       updatedFavorites = favorites.filter((fav) => fav.name !== pokemon.name);
//     } else {
//       // Add to favorites
//       updatedFavorites = [...favorites, pokemon];
//     }

//     setFavorites(updatedFavorites);
//   };

//   return (
//     <Router>
//       <Navbar favoritesCount={favorites.length} />
//       <Routes>
//         <Route path="/" element={<HomePage toggleFavorite={toggleFavorite} favorites={favorites} />} />
//         <Route path="/pokemon/:name" element={<PokemonDetail toggleFavorite={toggleFavorite} favorites={favorites} />} />
//         <Route path="/favorites" element={<FavoritesPage favorites={favorites} toggleFavorite={toggleFavorite} />} />
//         {/* {<Route path="/" element={<FavoritesPage favorites={favorites} toggleFavorite={toggleFavorite} />} />} */}
//       </Routes>
//     </Router>
//   );
// }
// export default App;


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import PokemonDetail from "./pages/PokemonDetail";
import FavoritesPage from "./pages/FavoritesPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null); // To track logged-in user
  const [favorites, setFavorites] = useState([]);

  // Check if user is logged in on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ username: localStorage.getItem("username") });
    }
  }, []);

  // Protect routes that require authentication
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/pokemon/:name"
          element={
            <PrivateRoute>
              <PokemonDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage favorites={favorites} />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
