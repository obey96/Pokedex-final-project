import React from "react";
import { Link } from "react-router-dom";

function Navbar({ favoritesCount }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Pokédex
        </Link>
        <div className="d-flex justify-content-end">
          {/* Favorite button with count */}
          <Link to="/favorites" className="btn btn-outline-danger">
            Favorites ({favoritesCount})
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
