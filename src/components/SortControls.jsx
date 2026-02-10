import './SortControls.css';

const SortControls = ({ onSortChange, currentSort, isLoading }) => {
  return (
    <div className="sort-controls">
      <label htmlFor="sort-select">Trier par :</label>
      <select
        id="sort-select"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        disabled={isLoading}
      >
        <option value="">Sans tri (par défaut)</option>
        <option value="hp-desc">HP (plus élevé)</option>
        <option value="attack-desc">Attaque (plus élevée)</option>
        <option value="defense-desc">Défense (plus élevée)</option>
        <option value="speed-desc">Vitesse (plus élevée)</option>
        <option value="total-desc">Stats totales (plus élevées)</option>
      </select>
      {isLoading && <span className="sort-loading">Chargement...</span>}
    </div>
  );
};

export default SortControls;
