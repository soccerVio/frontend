import Inscription from "./views/authentification/Inscription";
import { Routes, Route } from "react-router-dom";
import Signin from "./views/authentification/Signin";
import Terrain from "./views/terrains/Terrains";
import DetailsTerrain from "./components/terrains/detailsTerrain/DetailsTerrain";
import "react-toastify/dist/ReactToastify.css";
import Accueil from "./views/accueil/Accueil";
import Header from "./components/layout/Header";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route element={<Header/>}>
        <Route path="/accueil" element={<Accueil />}></Route>
        <Route path="/terrains" element={<Terrain />}></Route>
        <Route
          path="/terrains/details"
          element={<DetailsTerrain />}
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
