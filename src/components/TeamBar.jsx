import { useTeam } from '../contexts/TeamContext';
import './TeamBar.css';

const TeamBar = () => {
  const { team, removeFromTeam, clearTeam } = useTeam();

  if (team.length === 0) {
    return null;
  }

  return (
    <div className="team-bar">
      <div className="team-bar-content">
        <div className="team-bar-header">
          <h3 className="team-bar-title">
            Mon Équipe ({team.length}/6)
          </h3>
          <button className="btn-clear-team" onClick={clearTeam}>
            Vider l'équipe
          </button>
        </div>

        <div className="team-slots">
          {[...Array(6)].map((_, index) => {
            const pokemon = team[index];
            return (
              <div key={index} className={`team-slot ${pokemon ? 'filled' : 'empty'}`}>
                {pokemon ? (
                  <>
                    <img
                      src={pokemon.image}
                      alt={pokemon.name.french}
                      className="team-pokemon-image"
                    />
                    <button
                      className="btn-remove-pokemon"
                      onClick={() => removeFromTeam(pokemon.id)}
                      title="Retirer"
                    >
                      ×
                    </button>
                    <span className="team-pokemon-name">{pokemon.name.french}</span>
                  </>
                ) : (
                  <div className="empty-slot-icon">+</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamBar;
