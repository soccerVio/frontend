import axios from "axios";
import React, { useCallback, useState } from "react";
import {
  FaFacebookSquare,
  FaGooglePlusSquare,
  FaTwitterSquare,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Authentification.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

  const submitSignup = useCallback(async () => {
    try {
      if (password != confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The password is not equal to comfirm password!",
        });
        setPassword("");
        setConfirmPassword("");
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_USERS_URL}sign-up`, {
          email: email,
          username: username,
          fullname: fullname,
          password: password,
          type: type,
          gender: gender,
        });
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: "Your accont is created.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (error) {
      if (error.response.status == 400)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "All fields must be valid!",
        });
      else
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sorry something went wrong!",
        });
    }
  });

  return (
    <div className="container-authentification">
      <div className="form-authentification">
        <h2 className="title-authentification">Create account</h2>
        <div className="inputs-authentification">
          <input
            className="input-authentification"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputs-authentification">
          <input
            className="input-authentification"
            type="text"
            name="username-signup"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="input-authentification"
            type="text"
            name="fullname"
            placeholder="Fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="inputs-authentification">
          <input
            className="input-authentification"
            type="password"
            name="password-signup"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="input-authentification"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="inputs-authentification">
          <div className="radio-type" onChange={(e) => setType(e.target.value)}>
            <input type="radio" value="ROLE_PROPRIETAIRE" name="type" className="radio-signup"/>
            <span className="radio-label-signup">Propriétaire</span>  
            <input type="radio" value="ROLE_JOUEUR" name="type" className="radio-signup"/>
            <span>Joueur</span>
          </div>
          <div
            className="radio-gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <input type="radio" name="gender" value="Male"  className="radio-signup"/>
            <span className="radio-label-signup">Male</span>
            <input type="radio" name="gender" value="Female"  className="radio-signup"/>
            <span>Female</span> 
          </div>
        </div>
        <button className="submit-authentification-btn" onClick={submitSignup}>
          Submit
        </button>
        <p className="parag-authentification">Or create account with</p>
        <div className="icons-authentification">
          <FaFacebookSquare className="icon-authentification" />
          <FaGooglePlusSquare className="icon-authentification" />
          <FaTwitterSquare className="icon-authentification" />
        </div>

        <p className="last-parag-authentification">
          Did you have an account?{" "}
          <span onClick={() => navigate("/")}>Sign in</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
