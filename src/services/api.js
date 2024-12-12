import axios from "axios";

const API_BASE = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(limit = 50) {
  const response = await axios.get(`${API_BASE}/pokemon?limit=${limit}`);
  return response.data.results;
}

export async function fetchPokemonDetail(name) {
  const response = await axios.get(`${API_BASE}/pokemon/${name}`);
  return response.data;
}
