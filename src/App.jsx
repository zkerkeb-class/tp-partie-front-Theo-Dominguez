import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import PokemonDetail from './pages/PokemonDetail'
import CreatePokemon from './pages/CreatePokemon'
import TeamBar from './components/TeamBar'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/create" element={<CreatePokemon />} />
      </Routes>
      <TeamBar />
    </div>
  )
}

export default App
