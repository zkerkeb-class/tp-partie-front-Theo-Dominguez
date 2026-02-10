import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pokemonService } from '../services/pokemonService';
import { sortService } from '../services/sortService';
import PokemonList from '../components/PokemonList';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';
import SortControls from '../components/SortControls';
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
  // États pour le tri
  const [allPokemons, setAllPokemons] = useState([]);
  const [sortedPokemons, setSortedPokemons] = useState([]);
  const [sortMode, setSortMode] = useState(false);
  const [currentSort, setCurrentSort] = useState('');
  const [loadingSort, setLoadingSort] = useState(false);

  useEffect(() => {
    loadPokemons(currentPage);
  }, [currentPage]);

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
    setSortMode(false);
    setCurrentSort('');
    setCurrentPage(1);
    loadPokemons(1);
  };

  const handleTypeSelect = async (type) => {
    if (!type) {
      // Retour au mode normal
      setSelectedType(null);
      setSortMode(false);
      setCurrentSort('');
      setCurrentPage(1);
      loadPokemons(1);
      return;
    }

    setSearchMode(false);
    setCurrentSort(''); // Désactiver le tri
    setLoadingSort(true);

    try {
      // Charger tous les pokémons si pas déjà en cache
      let all = [];
      const cached = sessionStorage.getItem('allPokemons');

      if (cached) {
        all = JSON.parse(cached);
      } else {
        all = await sortService.fetchAllPokemons();
        sessionStorage.setItem('allPokemons', JSON.stringify(all));
      }

      setAllPokemons(all);

      // Filtrer par type
      const filtered = all.filter((pokemon) =>
        pokemon.type.some(t => t.toLowerCase() === type.toLowerCase())
      );

      setFilteredPokemons(filtered);
      setSelectedType(type);
      setSortMode(true); // Activer le mode "tri" pour utiliser la pagination client-side
      setCurrentPage(1);
    } catch (err) {
      setError('Erreur lors du filtrage par type.');
      console.error(err);
    } finally {
      setLoadingSort(false);
    }
  };

  const applyTypeFilter = () => {
    // Cette fonction n'est plus nécessaire car le filtrage se fait dans handleTypeSelect
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Appliquer le tri selon l'option sélectionnée
  const applySorting = (pokemons, sortOption) => {
    const [field, order] = sortOption.split('-');

    switch (field) {
      case 'hp':
        return sortService.sortByHP(pokemons, order);
      case 'attack':
        return sortService.sortByAttack(pokemons, order);
      case 'defense':
        return sortService.sortByDefense(pokemons, order);
      case 'speed':
        return sortService.sortBySpeed(pokemons, order);
      case 'total':
        return sortService.sortByTotal(pokemons, order);
      default:
        return pokemons;
    }
  };

  // Charger et trier tous les pokémons
  const loadAllAndSort = async (sortOption) => {
    if (!sortOption) {
      // Retour au mode normal
      setSortMode(false);
      setCurrentSort('');
      loadPokemons(currentPage);
      return;
    }

    setLoadingSort(true);

    try {
      // Vérifier le cache sessionStorage
      let all = [];
      const cached = sessionStorage.getItem('allPokemons');

      if (cached) {
        all = JSON.parse(cached);
      } else {
        // Charger tous les pokémons
        all = await sortService.fetchAllPokemons();
        sessionStorage.setItem('allPokemons', JSON.stringify(all));
      }

      setAllPokemons(all);

      // Appliquer le tri
      const sorted = applySorting(all, sortOption);
      setSortedPokemons(sorted);
      setSortMode(true);
      setCurrentPage(1); // Revenir à la page 1
    } catch (err) {
      setError('Erreur lors du tri des pokémons.');
      console.error(err);
    } finally {
      setLoadingSort(false);
    }
  };

  // Handler de changement de tri
  const handleSortChange = (sortOption) => {
    setCurrentSort(sortOption);
    setSelectedType(null); // Désactiver le filtre de type
    setSearchMode(false); // Désactiver la recherche
    loadAllAndSort(sortOption);
  };

  // Déterminer quels pokémons afficher
  const getDisplayPokemons = () => {
    if (searchMode) {
      return filteredPokemons;
    } else if (sortMode) {
      // Pagination client-side des résultats triés ou filtrés
      const start = (currentPage - 1) * 20;
      const end = start + 20;
      // Si on a un filtre de type, utiliser filteredPokemons, sinon sortedPokemons
      const dataToDisplay = selectedType ? filteredPokemons : sortedPokemons;
      return dataToDisplay.slice(start, end);
    } else {
      return pokemons; // Pagination normale de l'API
    }
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
            <>
              <SortControls
                onSortChange={handleSortChange}
                currentSort={currentSort}
                isLoading={loadingSort}
              />

              <TypeFilter
                selectedType={selectedType}
                onTypeSelect={handleTypeSelect}
              />
            </>
          )}

          <PokemonList pokemons={getDisplayPokemons()} />

          {/* Pagination adaptée selon le mode */}
          {!searchMode && (
            <Pagination
              currentPage={currentPage}
              totalPages={sortMode
                ? Math.ceil((selectedType ? filteredPokemons.length : sortedPokemons.length) / 20)
                : totalPages
              }
              hasNext={sortMode
                ? currentPage * 20 < (selectedType ? filteredPokemons.length : sortedPokemons.length)
                : hasNext
              }
              hasPrev={sortMode
                ? currentPage > 1
                : hasPrev
              }
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
