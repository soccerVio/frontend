import axios from "axios";
import React, { useCallback, useState, useRef, useEffect } from "react";
import {
    FaFacebookSquare,
    FaGooglePlusSquare,
    FaTwitterSquare }
      from "react-icons/fa";
import { BiShow, BiHide } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./Authentification.css";
import { ToastContainer } from "react-toastify";
import { getErrorToast } from "../../utils/toasts/Toast";
import { isLogged } from "../../constants/user";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const passwordInput = useRef();

  const navigate = useNavigate();

  useEffect(()=>{
    if(isLogged())
      navigate('/accueil')
  },[navigate])

  const submitSignin = useCallback(async () => {  
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BACKEND_USERS_URL}sign-in`,
        {
          username: username,
          password: password,
        }
      );
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('token', response.data.token)
      navigate("/accueil");
    } catch (error) {
      let titleError =
        error.response.status === 403
          ? "Username ou mot de passe sont incorrects!"
          : "Désolé, un problème est survenu!";
      getErrorToast(titleError);
    }
  },[username, password, navigate]);


  return (
    <div className="container-authentification">
      <div className="form-authentification form-sigin">
        <h2 className="title-authentification">Se connecter</h2>
        <div className="inputs-authentification">
          <input
            className="input-authentification "
            type="text"
            name="username-signin"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="inputs-authentification inputs-password">
          {!showPassword ? (
            <BiShow
              className="show-hide-password"
              onClick={() => setShowPassword(true)}
            />
          ) : (
            <BiHide
              className="show-hide-password"
              onClick={() => setShowPassword(false)}
            />
          )}
          <input
            className="input-authentification "
            type={showPassword ? "text" : "password"}
            name="password-signin"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordInput}
          />
        </div>
        <button
          className="submit-authentification-btn submit-signin-btn"
          onClick={submitSignin}
        >
          Se connecter
        </button>
        <p className="parag-authentification">Ou se connecter par</p>
        <div className="icons-authentification icons-signin">
          <FaFacebookSquare className="icon-authentification" />
          <FaGooglePlusSquare className="icon-authentification" />
          <FaTwitterSquare className="icon-authentification" />
        </div>

        <p className="last-parag-authentification">
          Vous n'avez pas un compte?{" "}
          <span onClick={() => navigate("/inscription")}>Créer un compte</span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
