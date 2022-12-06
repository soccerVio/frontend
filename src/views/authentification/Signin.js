import axios from "axios";
import React, { useCallback, useState } from "react";
import {
  FaFacebookSquare,
  FaGooglePlusSquare,
  FaTwitterSquare,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Authentification.css";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitSignin = useCallback(async () => {
    try {
      let response = await axios.post(`${process.env.REACT_APP_BACKEND_USERS_URL}sign-in`, {
        username: username,
        password: password,
      });
      console.log(response.data)
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div className="container-authentification">
      <div className="form-authentification form-sigin">
        <h2 className="title-authentification">Sign in</h2>
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
        <div className="inputs-authentification">
          <input
            className="input-authentification "
            type="password"
            name="password-signin"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="submit-authentification-btn submit-signin-btn" onClick={submitSignin}>
          Submit
        </button>
        <p className="parag-authentification">Or Sign in with</p>
        <div className="icons-authentification icons-signin">
          <FaFacebookSquare className="icon-authentification" />
          <FaGooglePlusSquare className="icon-authentification" />
          <FaTwitterSquare className="icon-authentification" />
        </div>

        <p className="last-parag-authentification">
          You don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
