import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pokemonService } from '../services/pokemonService';
import Loader from '../components/Loader';
import PokemonForm from '../components/PokemonForm';
import DeleteModal from '../components/DeleteModal';
import './PokemonDetail.css';
import '../styles/types.css';

const PokemonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    loadPokemon();
  }, [id]);

  const loadPokemon = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await pokemonService.getPokemonById(id);
      setPokemon(data);
    } catch (err) {
      setError('Pokémon non trouvé');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleImageError = (e) => {
    e.target.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleUpdate = async (formData) => {
    try {
      setLoading(true);
      await pokemonService.updatePokemon(id, formData);
      setSuccessMessage(' Pokémon modifié avec succès !');
      setTimeout(() => setSuccessMessage(''), 3000);
      await loadPokemon();
      setIsEditing(false);
    } catch (err) {
      setError('Erreur lors de la modification');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      await pokemonService.deletePokemon(id);
      setSuccessMessage(' Pokémon supprimé avec succès !');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError('Erreur lors de la suppression');
      console.error(err);
      setLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !pokemon) {
    return (
      <div className="detail-container">
        <div className="error-message">
          <p> {error}</p>
          <button className="btn-back" onClick={handleBack}>
            ← Retour à la liste
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <button className="btn-back" onClick={handleBack}>
        ← Retour à la liste
      </button>

      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
        </div>
      )}

      <div className="detail-card">
        <div className="detail-header">
          <h1 className="detail-title">{pokemon.name.french}</h1>
          <div className="detail-header-actions">
            <span className="detail-id">#{pokemon.id}</span>
            {!isEditing && (
              <>
                <button className="btn-edit" onClick={handleEdit}>
                   Modifier
                </button>
                <button className="btn-delete" onClick={handleDeleteClick}>
                   Supprimer
                </button>
              </>
            )}
          </div>
        </div>

        {isEditing ? (
          <PokemonForm
            initialData={pokemon}
            onSubmit={handleUpdate}
            onCancel={handleCancelEdit}
            submitLabel="Sauvegarder"
          />
        ) : (
          <div className="detail-content">
            <div className="detail-left">
              <img
                src={pokemon.image}
                alt={pokemon.name.french}
                className="detail-image"
                onError={handleImageError}
              />
              <div className="detail-types">
                {pokemon.type.map((type, index) => (
                  <span
                    key={index}
                    className={`type-badge type-${type.toLowerCase()}`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-right">
              <section className="detail-section">
                <h2>Noms</h2>
                <div className="names-grid">
                  <div className="name-item">
                    <span className="name-label">🇬🇧 Anglais:</span>
                    <span className="name-value">{pokemon.name.english}</span>
                  </div>
                  <div className="name-item">
                    <span className="name-label">🇫🇷 Français:</span>
                    <span className="name-value">{pokemon.name.french}</span>
                  </div>
                  <div className="name-item">
                    <span className="name-label">🇯🇵 Japonais:</span>
                    <span className="name-value">{pokemon.name.japanese}</span>
                  </div>
                  <div className="name-item">
                    <span className="name-label">🇨🇳 Chinois:</span>
                    <span className="name-value">{pokemon.name.chinese}</span>
                  </div>
                </div>
              </section>

              <section className="detail-section">
                <h2>Statistiques</h2>
                <div className="stats-grid">
                  {Object.entries(pokemon.base).map(([stat, value]) => (
                    <div key={stat} className="stat-item">
                      <div className="stat-header">
                        <span className="stat-name">{stat}</span>
                        <span className="stat-value">{value}</span>
                      </div>
                      <div className="stat-bar">
                        <div
                          className="stat-bar-fill"
                          style={{ width: `${(value / 255) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        pokemonName={pokemon.name.french}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default PokemonDetail;
