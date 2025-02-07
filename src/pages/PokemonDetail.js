import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; 
import axios from "axios";
import { API_URL } from "../Constants";

function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);  
  const [description, setDescription] = useState("");  
  const [evolutionChain, setEvolutionChain] = useState(null);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); 

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(response.data);

        
        const speciesResponse = await axios.get(response.data.species.url);
        setSpecies(speciesResponse.data);

        
        const descriptionEntry = speciesResponse.data.flavor_text_entries.find(
          entry => entry.language.name === "en"
        );
        const cleanedDescription = descriptionEntry
          ? descriptionEntry.flavor_text.replace(/\f/g, "")  
          : "No description available.";
        setDescription(cleanedDescription);

        
        const evolutionResponse = await axios.get(speciesResponse.data.evolution_chain.url);
        setEvolutionChain(evolutionResponse.data);

         
          const responseFavorites = await axios.get(`${API_URL}/getFavorites`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, 
            },
          });
          const favorites = responseFavorites.data.favorites
          if (favorites.some(fav => fav.pokemon_name === name.toLowerCase())) {
            setIsFavorite(true);
          }
        
      } catch (error) {
        setError("Failed to load Pokémon details. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchPokemonDetails();
  }, [name]);

  const toggleFavoriteStatus = async() => {
    try {


      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user.id
      const pokemonName = pokemon.name
      const data = {user_id: userId, pokemon_name: pokemonName,pokemon_sprite_url:pokemon.sprites?.front_default};

      // hard code enviroment variables
      const response = await axios.post(`${API_URL}/favorites`, data);

      if (response.status === 201) {
        setIsFavorite(!isFavorite); 

      }
      else if (response.status === 401) {

      }

    } catch(err) {
    console.error('error trying using toggle', err.message);
    
      
    }

    
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="card-title text-capitalize">{pokemon.name}</h1>
          <img
            src={pokemon.sprites?.front_default}
            alt={pokemon.name}
            className="img-fluid mb-3"
          />

          {/* Pokémon Description */}
          <h2>Description</h2>
          <p className="card-text">{description}</p>

          {/* Display Pokémon types */}
          <h2>Types</h2>
          <ul className="list-group">
            {pokemon.types.map((typeInfo, idx) => (
              <li key={idx} className="list-group-item text-capitalize">
                {typeInfo.type.name}
              </li>
            ))}
          </ul>

          {/* Display Pokémon stats */}
          <h2>Stats</h2>
          <ul className="list-group">
            {pokemon.stats.map((statInfo, idx) => (
              <li key={idx} className="list-group-item">
                <strong>{statInfo.stat.name}</strong>: {statInfo.base_stat}
              </li>
            ))}
          </ul>

          {/* Display Pokémon moves */}
          <h2>Moves</h2>
          <ul
            className="list-group mb-3"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {pokemon.moves.map((moveInfo, idx) => (
              <li key={idx} className="list-group-item text-capitalize">
                {moveInfo.move.name}
              </li>
            ))}
          </ul>

          {/* Display Pokémon species information */}
          {species && (
            <>
              <h2>Species Information</h2>
              <ul className="list-group">
                {species.color && (
                  <li className="list-group-item">
                    <strong>Color:</strong> {species.color.name}
                  </li>
                )}
                {species.shape && (
                  <li className="list-group-item">
                    <strong>Shape:</strong> {species.shape.name}
                  </li>
                )}
                {species.habitat && (
                  <li className="list-group-item">
                    <strong>Habitat:</strong> {species.habitat.name}
                  </li>
                )}
                {species.genera && (
                  <li className="list-group-item">
                    <strong>Genera:</strong> {species.genera[7].genus}
                  </li>
                )}
              </ul>
            </>
          )}

          {/* Display Evolution Chain */}
          {evolutionChain && (
            <>
              <h2>Evolution Chain</h2>
              <ul className="list-group">
                {evolutionChain.chain && (
                  <li className="list-group-item">
                    <strong>First Evolution:</strong> {evolutionChain.chain.species.name}
                  </li>
                )}
                {evolutionChain.chain.evolves_to && evolutionChain.chain.evolves_to.map((evolution, idx) => (
                  <li key={idx} className="list-group-item">
                    <strong>Next Evolution:</strong> {evolution.species.name}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Favorite button */}
          <button 
            className={`btn ${isFavorite ? 'btn-danger' : 'btn-primary'} mt-3`}
            onClick={toggleFavoriteStatus}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>

          {/* Add the Back to Pokédex Button */}
          <Link to="/" className="btn btn-secondary mt-3 ml-2">
            Back to Pokédex
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
