import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function FavoritesPage({ favorites, toggleFavorite }) {
  const [favoritePokemonData, setFavoritePokemonData] = useState([]);

  // Fetch detailed data for each favorite Pokémon
  useEffect(() => {
    const fetchFavoriteData = async () => {
      const fetchData = await Promise.all(
        favorites.map(async (pokemon) => {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          return {
            name: pokemon.name,
            sprite: response.data.sprites.front_default,
          };
        })
      );
      setFavoritePokemonData(fetchData);
    };

    if (favorites.length > 0) {
      fetchFavoriteData();
    }
  }, [favorites]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Your Favorite Pokémon</h1>
      {favorites.length > 0 ? (
        <ul className="list-group">
          {favoritePokemonData.map((pokemonData, idx) => (
            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
              {/* Display Pokémon sprite */}
              <img
                src={pokemonData.sprite}
                alt={pokemonData.name}
                className="img-fluid"
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
              />
              <Link to={`/pokemon/${pokemonData.name}`} className="text-capitalize">
                {pokemonData.name}
              </Link>

              {/* Remove from Favorites button */}
              <button
                className="btn btn-outline-danger"
                onClick={() => toggleFavorite({ name: pokemonData.name })} // Calls toggleFavorite to remove from favorites
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
