import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [pokemons, setPokemons] = useState([]); // State for all Pokémon
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [spriteCache, setSpriteCache] = useState({}); // Cache for sprites to avoid duplicate requests

  // Fetch Pokémon data from API
  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1010&offset=0");
        setPokemons(response.data.results); // Save Pokémon data
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setError("Failed to load Pokémon data. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    }
    fetchPokemons();
  }, []);

  // Fetch sprite for a specific Pokémon
  const fetchSprite = async (pokemon) => {
    if (!spriteCache[pokemon.name]) {
      try {
        const response = await axios.get(pokemon.url);
        setSpriteCache((prevCache) => ({
          ...prevCache,
          [pokemon.name]: response.data.sprites.front_default,
        }));
      } catch (error) {
        console.error("Error fetching sprite for", pokemon.name);
      }
    }
  };

  // Filter Pokémon based on the search term
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Render loading or error state if applicable
  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Pokédex</h1>

      {/* Search bar for filtering Pokémon */}
      <input
        type="text"
        placeholder="Search Pokémon"
        className="form-control mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Show the Pokémon list only if the search term is not empty */}
      {searchTerm && (
        <ul className="list-group">
          {filteredPokemons.length > 0 ? (
            filteredPokemons.map((pokemon, idx) => (
              <li
                key={idx}
                className="list-group-item d-flex align-items-center"
                onMouseEnter={() => fetchSprite(pokemon)} // Lazy load sprite on hover
              >
                {/* Display sprite next to the Pokémon name */}
                {spriteCache[pokemon.name] && (
                  <img
                    src={spriteCache[pokemon.name]}
                    alt={pokemon.name}
                    className="img-fluid mr-2"
                    style={{ width: "30px", height: "30px" }}
                  />
                )}
                <Link to={`/pokemon/${pokemon.name}`} className="text-capitalize">
                  {pokemon.name}
                </Link>
              </li>
            ))
          ) : (
            <div className="text-center mt-4">No Pokémon found.</div>
          )}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
