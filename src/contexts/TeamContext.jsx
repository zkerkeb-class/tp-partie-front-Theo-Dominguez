import { createContext, useContext, useState, useEffect } from 'react';

const TeamContext = createContext();

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState(() => {
    const savedTeam = localStorage.getItem('pokemonTeam');
    return savedTeam ? JSON.parse(savedTeam) : [];
  });

  useEffect(() => {
    localStorage.setItem('pokemonTeam', JSON.stringify(team));
  }, [team]);

  const addToTeam = (pokemon) => {
    if (team.length >= 6) {
      return { success: false, message: 'Votre équipe est complète (6 Pokémon max)' };
    }

    if (team.some(p => p.id === pokemon.id)) {
      return { success: false, message: 'Ce Pokémon est déjà dans votre équipe' };
    }

    setTeam([...team, pokemon]);
    return { success: true, message: `${pokemon.name.french} a été ajouté à votre équipe !` };
  };

  const removeFromTeam = (pokemonId) => {
    setTeam(team.filter(p => p.id !== pokemonId));
  };

  const clearTeam = () => {
    setTeam([]);
  };

  const isInTeam = (pokemonId) => {
    return team.some(p => p.id === pokemonId);
  };

  return (
    <TeamContext.Provider value={{ team, addToTeam, removeFromTeam, clearTeam, isInTeam }}>
      {children}
    </TeamContext.Provider>
  );
};
