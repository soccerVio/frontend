import './App.css';
import Signup from './views/authentification/Signup';
import { Routes, Route } from "react-router-dom";
import Signin from './views/authentification/Signin';
import Menu from './utils/components/Menu';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signin />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/home" element={<Menu />}></Route>
    </Routes>
  );
}

export default App;
