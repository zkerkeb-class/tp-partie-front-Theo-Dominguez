const API_URL = 'http://localhost:3000';

export const pokemonService = {
  // Récupérer la liste avec pagination
  getPokemons: async (page = 1) => {
    try {
      const response = await fetch(`${API_URL}/pokemons?page=${page}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des Pokémon');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur getPokemons:', error);
      throw error;
    }
  },

  // Récupérer un Pokémon par ID
  getPokemonById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/pokemons/${id}`);
      if (!response.ok) {
        throw new Error('Pokémon non trouvé');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur getPokemonById:', error);
      throw error;
    }
  },

  // Rechercher par nom
  searchPokemon: async (name) => {
    try {
      const response = await fetch(`${API_URL}/pokemons/search/${name}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la recherche');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur searchPokemon:', error);
      throw error;
    }
  },

  // Créer un Pokémon
  createPokemon: async (pokemonData) => {
    try {
      const response = await fetch(`${API_URL}/pokemons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pokemonData),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la création du Pokémon');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur createPokemon:', error);
      throw error;
    }
  },

  // Modifier un Pokémon
  updatePokemon: async (id, pokemonData) => {
    try {
      const response = await fetch(`${API_URL}/pokemons/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pokemonData),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la modification du Pokémon');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur updatePokemon:', error);
      throw error;
    }
  },

  // Supprimer un Pokémon
  deletePokemon: async (id) => {
    try {
      const response = await fetch(`${API_URL}/pokemons/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du Pokémon');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur deletePokemon:', error);
      throw error;
    }
  },

  // Filtrer par type avec pagination
  getPokemonsByType: async (type, page = 1) => {
    try {
      const response = await fetch(`${API_URL}/pokemons?type=${type}&page=${page}`);
      if (!response.ok) {
        throw new Error('Erreur lors du filtrage par type');
      }
      return await response.json();
    } catch (error) {
      console.error('Erreur getPokemonsByType:', error);
      throw error;
    }
  },
};
