import axios from "axios";
import React, { useCallback, useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  FaFacebookSquare,
  FaGooglePlusSquare,
  FaTwitterSquare,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Authentification.css";
import { verifyObjectFieldsNotNull } from "../../utils/functions/Function";
import { getErrorToast } from "../../utils/toasts/Toast";

const Inscription = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    nomComplet: "",
    password: "",
    typeCompte: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const submitSignup = useCallback(async () => {
    if (verifyObjectFieldsNotNull(user)) {
      try {
        if (user.password !== confirmPassword) {
          setUser({ ...user, password: "" });
          setConfirmPassword("");
          getErrorToast("Le mot de passe n'est pas valid!");
        } else {
          await axios.post(
            `${process.env.REACT_APP_BACKEND_USERS_URL}sign-up`, user
          );
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 405)
          getErrorToast("Username ou email existe déja!");
        else
          getErrorToast("Désolé, un problème est survenu!");
      }
    } else getErrorToast("Entrez tous les champs!");
  }, [confirmPassword, navigate, user]);

  return (
    <div className="container-authentification">
      <div className="form-authentification">
        <h2 className="title-authentification">Créer un compte</h2>
        <div className="inputs-authentification">
          <input
            className="input-authentification"
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="inputs-authentification">
          <input
            className="input-authentification"
            type="text"
            name="username-signup"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <input
            className="input-authentification"
            type="text"
            name="nomComplet"
            placeholder="Nom complet"
            value={user.nomComplet}
            onChange={(e) => setUser({ ...user, nomComplet: e.target.value })}
          />
        </div>
        <div className="inputs-authentification">
          <input
            className="input-authentification"
            type="password"
            name="password-signup"
            placeholder="Mot de passe"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <input
            className="input-authentification"
            type="password"
            name="confirmPassword"
            placeholder="Confirm mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="inputs-authentification">
          <div
            className="radio-type"
            onChange={(e) => setUser({ ...user, typeCompte: e.target.value })}
          >
            <input
              type="radio"
              value="ROLE_PROPRIETAIRE"
              name="type"
              className="radio-signup"
            />
            <span className="radio-label-signup">Propriétaire</span>
            <input
              type="radio"
              value="ROLE_JOUEUR"
              name="type"
              className="radio-signup"
            />
            <span>Joueur</span>
          </div>
        </div>
        <button className="submit-authentification-btn" onClick={submitSignup}>
          Enregistrer
        </button>
        <p className="parag-authentification">Ou créer un compte par</p>
        <div className="icons-authentification">
          <FaFacebookSquare className="icon-authentification" />
          <FaGooglePlusSquare className="icon-authentification" />
          <FaTwitterSquare className="icon-authentification" />
        </div>

        <p className="last-parag-authentification">
          Vous avez un compte?{" "}
          <span onClick={() => navigate("/")}>Se connecter</span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Inscription;
