import { pokemonService } from './pokemonService';

export const sortService = {
  // Récupérer tous les pokémons (itération sur toutes les pages)
  fetchAllPokemons: async () => {
    const allPokemons = [];
    let page = 1;
    let hasNext = true;

    try {
      while (hasNext) {
        const data = await pokemonService.getPokemons(page);
        allPokemons.push(...data.pokemons);
        hasNext = data.hasNext;
        page++;
      }

      return allPokemons;
    } catch (error) {
      console.error('Erreur lors du chargement de tous les pokémons:', error);
      throw error;
    }
  },

  // Trier par HP
  sortByHP: (pokemons, order = 'desc') => {
    return [...pokemons].sort((a, b) => {
      const hpA = a.base?.HP || 0;
      const hpB = b.base?.HP || 0;
      return order === 'desc' ? hpB - hpA : hpA - hpB;
    });
  },

  // Trier par Attack
  sortByAttack: (pokemons, order = 'desc') => {
    return [...pokemons].sort((a, b) => {
      const attackA = a.base?.Attack || 0;
      const attackB = b.base?.Attack || 0;
      return order === 'desc' ? attackB - attackA : attackA - attackB;
    });
  },

  // Trier par Defense
  sortByDefense: (pokemons, order = 'desc') => {
    return [...pokemons].sort((a, b) => {
      const defenseA = a.base?.Defense || 0;
      const defenseB = b.base?.Defense || 0;
      return order === 'desc' ? defenseB - defenseA : defenseA - defenseB;
    });
  },

  // Trier par Speed
  sortBySpeed: (pokemons, order = 'desc') => {
    return [...pokemons].sort((a, b) => {
      const speedA = a.base?.Speed || 0;
      const speedB = b.base?.Speed || 0;
      return order === 'desc' ? speedB - speedA : speedA - speedB;
    });
  },

  // Trier par total des stats
  sortByTotal: (pokemons, order = 'desc') => {
    return [...pokemons].sort((a, b) => {
      const totalA = a.base ? Object.values(a.base).reduce((sum, val) => sum + (val || 0), 0) : 0;
      const totalB = b.base ? Object.values(b.base).reduce((sum, val) => sum + (val || 0), 0) : 0;
      return order === 'desc' ? totalB - totalA : totalA - totalB;
    });
  },
};
