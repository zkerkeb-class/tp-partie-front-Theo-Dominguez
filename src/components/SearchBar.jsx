import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onClear }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onClear();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder="Rechercher un Pokémon par son nom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn-search" onClick={handleSearch}>
           Rechercher
        </button>
        {searchTerm && (
          <button className="btn-clear" onClick={handleClear}>
             Effacer
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
