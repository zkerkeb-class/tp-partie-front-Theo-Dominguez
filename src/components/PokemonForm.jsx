import { useState } from 'react';
import '../styles/PokemonForm.css';
import '../styles/types.css';

const POKEMON_TYPES = [
  'Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice',
  'Dragon', 'Dark', 'Fairy', 'Normal', 'Fighting', 'Flying',
  'Poison', 'Ground', 'Rock', 'Bug', 'Ghost', 'Steel'
];

const PokemonForm = ({ initialData, onSubmit, onCancel, submitLabel = 'Sauvegarder' }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: {
        english: '',
        french: '',
        japanese: '',
        chinese: '',
      },
      type: [],
      base: {
        HP: 0,
        Attack: 0,
        Defense: 0,
        SpecialAttack: 0,
        SpecialDefense: 0,
        Speed: 0,
      },
      image: '',
    }
  );

  const [errors, setErrors] = useState({});

  const handleNameChange = (lang, value) => {
    setFormData({
      ...formData,
      name: {
        ...formData.name,
        [lang]: value,
      },
    });
  };

  const handleStatChange = (stat, value) => {
    const numValue = parseInt(value) || 0;
    setFormData({
      ...formData,
      base: {
        ...formData.base,
        [stat]: numValue,
      },
    });
  };

  const handleTypeToggle = (type) => {
    const currentTypes = [...formData.type];
    const index = currentTypes.indexOf(type);

    if (index > -1) {
      currentTypes.splice(index, 1);
    } else {
      if (currentTypes.length < 2) {
        currentTypes.push(type);
      }
    }

    setFormData({
      ...formData,
      type: currentTypes,
    });
  };

  const handleImageChange = (value) => {
    setFormData({
      ...formData,
      image: value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.english.trim()) {
      newErrors.english = 'Le nom anglais est requis';
    }
    if (!formData.name.french.trim()) {
      newErrors.french = 'Le nom français est requis';
    }
    if (!formData.name.japanese.trim()) {
      newErrors.japanese = 'Le nom japonais est requis';
    }
    if (!formData.name.chinese.trim()) {
      newErrors.chinese = 'Le nom chinois est requis';
    }

    if (formData.type.length === 0) {
      newErrors.type = 'Au moins un type est requis';
    }

    Object.entries(formData.base).forEach(([stat, value]) => {
      if (value < 0 || value > 255) {
        newErrors[stat] = `${stat} doit être entre 0 et 255`;
      }
    });

    if (!formData.image.trim()) {
      newErrors.image = 'L\'URL de l\'image est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form className="pokemon-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3>Noms</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>🇬🇧 Anglais *</label>
            <input
              type="text"
              value={formData.name.english}
              onChange={(e) => handleNameChange('english', e.target.value)}
              className={errors.english ? 'error' : ''}
            />
            {errors.english && <span className="error-text">{errors.english}</span>}
          </div>

          <div className="form-group">
            <label>🇫🇷 Français *</label>
            <input
              type="text"
              value={formData.name.french}
              onChange={(e) => handleNameChange('french', e.target.value)}
              className={errors.french ? 'error' : ''}
            />
            {errors.french && <span className="error-text">{errors.french}</span>}
          </div>

          <div className="form-group">
            <label>🇯🇵 Japonais *</label>
            <input
              type="text"
              value={formData.name.japanese}
              onChange={(e) => handleNameChange('japanese', e.target.value)}
              className={errors.japanese ? 'error' : ''}
            />
            {errors.japanese && <span className="error-text">{errors.japanese}</span>}
          </div>

          <div className="form-group">
            <label>🇨🇳 Chinois *</label>
            <input
              type="text"
              value={formData.name.chinese}
              onChange={(e) => handleNameChange('chinese', e.target.value)}
              className={errors.chinese ? 'error' : ''}
            />
            {errors.chinese && <span className="error-text">{errors.chinese}</span>}
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Types (maximum 2) *</h3>
        <div className="types-selector">
          {POKEMON_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              className={`type-badge type-${type.toLowerCase()} ${
                formData.type.includes(type) ? 'selected' : 'unselected'
              }`}
              onClick={() => handleTypeToggle(type)}
            >
              {type}
            </button>
          ))}
        </div>
        {errors.type && <span className="error-text">{errors.type}</span>}
      </div>

      <div className="form-section">
        <h3>Statistiques *</h3>
        <div className="form-grid">
          {Object.entries(formData.base).map(([stat, value]) => (
            <div key={stat} className="form-group">
              <label>{stat}</label>
              <input
                type="number"
                min="0"
                max="255"
                value={value}
                onChange={(e) => handleStatChange(stat, e.target.value)}
                className={errors[stat] ? 'error' : ''}
              />
              {errors[stat] && <span className="error-text">{errors[stat]}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="form-section">
        <h3>Image *</h3>
        <div className="form-group">
          <label>URL de l'image</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => handleImageChange(e.target.value)}
            placeholder="https://..."
            className={errors.image ? 'error' : ''}
          />
          {errors.image && <span className="error-text">{errors.image}</span>}
          {formData.image && (
            <div className="image-preview">
              <img src={formData.image} alt="Aperçu" />
            </div>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Annuler
        </button>
        <button type="submit" className="btn-submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default PokemonForm;
