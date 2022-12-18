import './App.css';
import Inscription from './views/authentification/Inscription';
import { Routes, Route } from "react-router-dom";
import Signin from './views/authentification/Signin';
import Header from './components/layout/Header';
import Terrain from './views/prop/terrains/Terrains';
import DetailsTerrain from './components/terrains/detailsTerrain/DetailsTerrain';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signin />}></Route>
      <Route path="/inscription" element={<Inscription />}></Route>
      <Route path="/home" element={<Header />}></Route>
      <Route path="/proprietaire/terrains" element={<Terrain />}></Route>
      <Route path="/proprietaire/terrains/details/:id" element={<DetailsTerrain />}></Route>
    </Routes>
  );
}

export default App;
