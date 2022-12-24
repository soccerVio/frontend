import React from "react";
import "./Annoces.css";

const Annonces = () => {
  function AnnonceComponent() {
    return (
      <div className="annonce-component">
        <div className="annonce-userInfos">
          <img src="/images/userImage.jpg" alt="user" className="annonce-userImage" />
          <span className="annonce-userName">joueur joueur</span>
        </div>
        <p className="annonce-description">
          description description description description description
          description description description description description
          description description description description description
          description description description description description
          description description description description description
        </p>
        <span>Dernier délai : 24/12/2012 à 21:00</span>
        <span className="annonce-reservationView">voir la réservation</span>
        <button className="annonce-ParticiperBtn">Participer</button>
      </div>
    );
  }

  return (
    <div className="annonces-list">
      <AnnonceComponent />
      <AnnonceComponent />
      <AnnonceComponent />
    </div>
    
  );
};

export default Annonces;
