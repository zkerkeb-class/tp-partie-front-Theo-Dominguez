import '../styles/types.css';
import './TypeFilter.css';

const POKEMON_TYPES = [
  'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice',
  'Dragon', 'Dark', 'Fairy', 'Normal', 'Fighting', 'Flying',
  'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel'
];

const TypeFilter = ({ selectedType, onTypeSelect }) => {
  return (
    <div className="type-filter">
      <h3 className="filter-title">Filtrer par type</h3>
      <div className="filter-types">
        <button
          className={`filter-type-btn ${!selectedType ? 'active' : ''}`}
          onClick={() => onTypeSelect(null)}
        >
          Tous
        </button>
        {POKEMON_TYPES.map((type) => (
          <button
            key={type}
            className={`type-badge type-${type.toLowerCase()} filter-type-badge ${
              selectedType === type ? 'active' : ''
            }`}
            onClick={() => onTypeSelect(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TypeFilter;
