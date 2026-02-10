import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pokemonService } from '../services/pokemonService';
import PokemonForm from '../components/PokemonForm';
import Loader from '../components/Loader';
import './CreatePokemon.css';

const CreatePokemon = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      const newPokemon = await pokemonService.createPokemon(formData);
      navigate(`/pokemon/${newPokemon.id}`);
    } catch (err) {
      setError('Erreur lors de la création du Pokémon');
      console.error(err);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="create-container">
      <button className="btn-back" onClick={handleCancel}>
        ← Retour à la liste
      </button>

      {error && (
        <div className="error-message">
          <p> {error}</p>
        </div>
      )}

      <div className="create-card">
        <div className="create-header">
          <h1 className="create-title"> Créer un nouveau Pokémon</h1>
          <p className="create-subtitle">
            Remplissez tous les champs pour ajouter un nouveau Pokémon au Pokédex
          </p>
        </div>

        <PokemonForm
          onSubmit={handleCreate}
          onCancel={handleCancel}
          submitLabel="Créer le Pokémon"
        />
      </div>
    </div>
  );
};

export default CreatePokemon;
