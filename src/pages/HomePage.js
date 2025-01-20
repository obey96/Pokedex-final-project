
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const [pokemons, setPokemons] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [spriteCache, setSpriteCache] = useState({});
  const navigate = useNavigate();

  
  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate("/login");
    } 
  }, []);

 
  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1010&offset=0");
        setPokemons(response.data.results); 
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setError("Failed to load Pokémon data. Please try again later.");
      } finally {
        setLoading(false); 
      }
    }
    fetchPokemons();
  }, []);

 
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

  
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
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

