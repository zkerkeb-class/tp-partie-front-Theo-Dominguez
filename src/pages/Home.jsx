import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pokemonService } from '../services/pokemonService';
import PokemonList from '../components/PokemonList';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    loadPokemons(currentPage);
  }, [currentPage]);

  useEffect(() => {
    applyTypeFilter();
  }, [pokemons, selectedType]);

  const loadPokemons = async (page) => {
    try {
      setLoading(true);
      setError(null);
      setSearchMode(false);
      const data = await pokemonService.getPokemons(page);
      setPokemons(data.pokemons);
      setTotalPages(data.totalPages);
      setHasNext(data.hasNext);
      setHasPrev(data.hasPrev);
    } catch (err) {
      setError('Erreur lors du chargement des Pokémon. Assurez-vous que le backend est démarré.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm || searchTerm.trim() === '') {
      handleClearSearch();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await pokemonService.searchPokemon(searchTerm.trim());
      const pokemonArray = Array.isArray(data) ? data : [data];
      setPokemons(pokemonArray);
      setFilteredPokemons(pokemonArray);
      setSearchMode(true);
      setSelectedType(null);
    } catch (err) {
      setError('Aucun Pokémon trouvé avec ce nom.');
      setPokemons([]);
      setFilteredPokemons([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchMode(false);
    setSelectedType(null);
    setCurrentPage(1);
    loadPokemons(1);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setSearchMode(false);
  };

  const applyTypeFilter = () => {
    if (!selectedType) {
      setFilteredPokemons(pokemons);
    } else {
      const filtered = pokemons.filter((pokemon) =>
        pokemon.type.some(t => t.toLowerCase() === selectedType.toLowerCase())
      );
      setFilteredPokemons(filtered);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateClick = () => {
    navigate('/create');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">
          <span className="pokeball-icon">⚪</span>
          Pokédex de Theo
        </h1>
        <button className="btn-create" onClick={handleCreateClick}>
          + Créer un Pokémon
        </button>
      </header>

      {loading && <Loader />}

      {error && (
        <div className="error-message">
          <p> {error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />

          {!searchMode && (
            <TypeFilter
              selectedType={selectedType}
              onTypeSelect={handleTypeSelect}
            />
          )}

          <PokemonList pokemons={filteredPokemons} />

          {!searchMode && !selectedType && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              hasNext={hasNext}
              hasPrev={hasPrev}
              onPageChange={handlePageChange}
            />
          )}

          {(selectedType || searchMode) && !loading && (
            <div className="filter-info">
              <p style={{ color: '#ffffff', fontSize: '18px', textAlign: 'center', fontWeight: '700' }}>
                {filteredPokemons.length} Pokémon{filteredPokemons.length > 1 ? 's' : ''} trouvé{filteredPokemons.length > 1 ? 's' : ''}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
