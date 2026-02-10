import '../styles/Modal.css';

const DeleteModal = ({ isOpen, pokemonName, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>⚠️ Confirmer la suppression</h2>
        </div>
        <div className="modal-body">
          <p>
            Êtes-vous sûr de vouloir supprimer <strong>{pokemonName}</strong> ?
          </p>
          <p className="modal-warning">Cette action est irréversible.</p>
        </div>
        <div className="modal-actions">
          <button className="btn-modal-cancel" onClick={onCancel}>
            Annuler
          </button>
          <button className="btn-modal-confirm" onClick={onConfirm}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
