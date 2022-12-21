import React from "react";
import { useNavigate } from "react-router-dom";
import "./Terrain.css";

const Terrain = ({ titre, prixHr, nbrJoueur, image, id }) => {
  const navigate = useNavigate();
  return (
    <div
      className="terrain-component"
      onClick={() =>
        navigate("/terrains/details", {
          state: {
            id,
          },
        })
      }
    >
      <h3 className="terrain-title">{titre}</h3>
      <img
        src={`data:${image.type};base64,${image.content}`}
        alt="stade"
        className="terrain-image"
      />
      <p className="terrain-prix">{prixHr} DH / heure</p>
      <p className="terrain-nbrJoueur">{nbrJoueur} joueurs par équipe</p>
      <button className="terrain-more">Voir plus</button>
    </div>
  );
};
export default Terrain;
