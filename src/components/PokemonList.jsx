import PokemonCard from './PokemonCard';
import '../styles/PokemonList.css';

const PokemonList = ({ pokemons }) => {
  if (!pokemons || pokemons.length === 0) {
    return (
      <div className="pokemon-list-empty">
        <p>Aucun Pokémon trouvé</p>
      </div>
    );
  }

  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
