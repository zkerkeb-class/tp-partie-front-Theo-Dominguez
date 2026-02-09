import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="pokeball-loader">
        <div className="pokeball-top"></div>
        <div className="pokeball-middle"></div>
        <div className="pokeball-bottom"></div>
        <div className="pokeball-button"></div>
      </div>
      <p className="loader-text">Chargement...</p>
    </div>
  );
};

export default Loader;
