import React from "react";
import { FaFacebookSquare, FaGooglePlusSquare, FaTwitterSquare } from 'react-icons/fa';
import './Signup.css'

const Signup = () => {
    return(
        <div className="container-signup">
            <div className="form-signup">
                <h2 className="title-signup">Create account</h2>
                <div className="inputs-signup">
                    <input className="input-signup" type="email" name="email" id="email" placeholder="Email"/>
                </div>
                <div className="inputs-signup">
                    <input className="input-signup" type="text" name="username" id="username" placeholder="Username"/>
                    <input className="input-signup" type="text" name="fullname" id="fullname" placeholder="Fullname"/>
                </div>
                <div className="inputs-signup">
                    <input className="input-signup" type="password" name="password" id="password" placeholder="Password"/>
                    <input className="input-signup" type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password"/>
                </div>
                <div className="inputs-signup">
                    <div className="radio-type">
                        <input type="radio" name="type" id="type" value="Propriétaire"/>Propriétaire
                        <input type="radio" name="type" id="type" value="Joueur"/>Joueur
                    </div>
                    <div className="radio-gender">
                        <input type="radio" name="gender" id="gender" value="Male"/>Male
                        <input type="radio" name="gender" id="gender" value="Female"/>Female
                    </div>
                </div>
                <button className="submit-signup-btn">Submit</button>
                <p className="parag-singup">Or create account with</p>
                <div className="icons-signup">
                    <FaFacebookSquare className="icon-signup"/>
                    <FaGooglePlusSquare className="icon-signup"/>
                    <FaTwitterSquare className="icon-signup"/>
                </div>

                <p className="last-parag-singup">Did you have an account? <span>Sign in</span></p>
            </div>
        </div>
    )
}

export default Signup;