import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTeam } from '../contexts/TeamContext';
import '../styles/PokemonCard.css';
import '../styles/types.css';

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [notification, setNotification] = useState(null);
  const { addToTeam, isInTeam } = useTeam();

  const handleClick = (e) => {
    if (e.target.closest('.btn-add-team')) {
      return;
    }
    navigate(`/pokemon/${pokemon.id}`);
  };

  const handleAddToTeam = (e) => {
    e.stopPropagation();
    const result = addToTeam(pokemon);
    setNotification(result);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleImageError = (e) => {
    e.target.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const primaryType = pokemon.type[0]?.toLowerCase() || 'normal';
  const secondaryType = pokemon.type[1]?.toLowerCase();

  const hp = pokemon.base?.HP || 60;

  const getStage = () => {
    if (pokemon.id <= 151) {
      if ([1, 4, 7, 25, 133].includes(pokemon.id)) return 'BASIC';
      if ([2, 5, 8, 26].includes(pokemon.id)) return 'STAGE 1';
      if ([3, 6, 9].includes(pokemon.id)) return 'STAGE 2';
    }
    return 'BASIC';
  };

  const stage = getStage();

  const attacks = [
    { name: 'Charge', damage: 20, cost: 1 },
    { name: pokemon.name.french + ' Attack', damage: 50, cost: 2 }
  ];

  const inTeam = isInTeam(pokemon.id);

  return (
    <div
      className={`pokemon-card pokemon-card-${primaryType}`}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
      }}
    >
      {notification && (
        <div className={`card-notification ${notification.success ? 'success' : 'error'}`}>
          {notification.message}
        </div>
      )}
      <div className="card-yellow-border">
        <div className="card-content">

          <div className="card-header">
            <span className="card-stage">{stage}</span>
            <h2 className="card-pokemon-name">{pokemon.name.french}</h2>
            <div className="card-hp-section">
              <span className="hp-label">HP</span>
              <span className="hp-value">{hp}</span>
              <span className={`energy-symbol energy-${primaryType}`}></span>
            </div>
          </div>

          <div className="card-illustration-frame">
            <div className="illustration-content">
              <img
                src={pokemon.image}
                alt={pokemon.name.french}
                className="card-pokemon-image"
                onError={handleImageError}
              />
            </div>
            <div className="illustration-info-bar">
              <span className="pokemon-species">Pokémon {primaryType}</span>
              <span className="pokemon-stats">Length: 1.0m Weight: {10 + pokemon.id}kg</span>
            </div>
          </div>

          <div className="card-attacks-section">
            {attacks.slice(0, 2).map((attack, index) => (
              <div key={index} className="attack-row">
                <div className="attack-cost">
                  {[...Array(attack.cost)].map((_, i) => (
                    <span key={i} className={`energy-symbol-small energy-${primaryType}`}></span>
                  ))}
                </div>
                <span className="attack-name">{attack.name}</span>
                <span className="attack-damage">{attack.damage}</span>
              </div>
            ))}
          </div>

          <div className="card-footer">
            <div className="footer-stats">
              <div className="stat-item">
                <span className="stat-label">weakness</span>
                <span className={`weakness-symbol energy-${secondaryType || 'water'}`}></span>
              </div>
              <div className="stat-item">
                <span className="stat-label">resistance</span>
                <span className="resistance-symbol">—</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">retreat cost</span>
                <span className={`retreat-symbol energy-colorless`}></span>
              </div>
            </div>

            <div className="flavor-text-box">
              <p className="flavor-text">
                Ce Pokémon a été créé par manipulation génétique. Cependant, bien que la science ait réussi à créer son corps, elle a échoué à lui donner un cœur sensible.
              </p>
            </div>

            <div className="card-number-rarity">
              <span className="card-number">#{pokemon.id.toString().padStart(3, '0')}/151</span>
              <span className="rarity-symbol">★</span>
            </div>
          </div>

        </div>
      </div>

      <button
        className={`btn-add-team ${inTeam ? 'in-team' : ''}`}
        onClick={handleAddToTeam}
        disabled={inTeam}
      >
        {inTeam ? '✓ Dans l\'équipe' : '+ Ajouter à l\'équipe'}
      </button>
    </div>
  );
};

export default PokemonCard;
