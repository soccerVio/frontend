import React from "react";
import { useNavigate } from "react-router-dom";
import "./Terrain.css";

const Terrain = ({ titre, prixHr, nbrJoueur, image, id }) => {
  const navigate = useNavigate();
  return (
    <div className="terrain-component">

      <img src={image} alt="stade" className="terrain-image" />
      
      <div className="terrain-infos">
        <h3 className="terrain-title">{titre}</h3>
        <p className="terrain-prix">{prixHr} DH / heure</p>
        <p className="terrain-nbrJoueur">{nbrJoueur} joueurs par équipe</p>
        
      </div>
      <button
        className="terrain-more"
        onClick={() =>
          navigate("/terrains/details", {
            state: {
              id,
            },
          })
        }
      >
        Voir plus
      </button>
      
    </div>
  );
};
export default Terrain;
