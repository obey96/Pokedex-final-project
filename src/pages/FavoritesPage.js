import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function FavoritesPage() {
  const [favoritePokemonData, setFavoritePokemonData] = useState([]);
  const [error, setError] = useState("");

  // Fetch the user's favorite Pokémon from the back-end
  useEffect(() => {
    const fetchFavoritePokemon = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/favorites", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Send JWT for authentication
          },
        });
        setFavoritePokemonData(response.data.favorites); // Assuming back-end returns a list of Pokémon names
      } catch (err) {
        setError("Failed to load favorite Pokémon. Please try again.");
        console.error(err);
      }
    };

    fetchFavoritePokemon();
  }, []);

  // Remove a Pokémon from favorites
  const removeFavorite = async (name) => {
    try {
      await axios.delete(`http://localhost:5000/api/favorites/${name}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Send JWT for authentication
        },
      });
      setFavoritePokemonData((prevData) =>
        prevData.filter((pokemon) => pokemon.name !== name)
      );
    } catch (err) {
      setError("Failed to remove Pokémon. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Your Favorite Pokémon</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {favoritePokemonData.length > 0 ? (
        <ul className="list-group">
          {favoritePokemonData.map((pokemonData, idx) => (
            <li
              key={idx}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <img
                src={pokemonData.sprite} // Assuming sprite URLs are returned by the back-end
                alt={pokemonData.name}
                className="img-fluid"
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
              />
              <Link
                to={`/pokemon/${pokemonData.name}`}
                className="text-capitalize"
              >
                {pokemonData.name}
              </Link>

              <button
                className="btn btn-outline-danger"
                onClick={() => removeFavorite(pokemonData.name)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center mt-4">You have no favorite Pokémon.</div>
      )}
    </div>
  );
}

export default FavoritesPage;
