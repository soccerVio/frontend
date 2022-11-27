import './App.css';
import Signup from './views/authentification/Signup';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />}></Route>
    </Routes>
  );
}

export default App;
