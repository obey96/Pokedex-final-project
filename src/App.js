
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
  const [user, setUser] = useState(null); 
  const [favorites] = useState([]);


  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      
      

      const user = JSON.parse(localStorage.getItem('user'));

      if (user) {
        setUser(user)
      }
    } else {
    }
  }, []);


  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
