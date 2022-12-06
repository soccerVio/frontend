import React from "react";
import "./Terrain.css";

const Terrain = ({ville, prixHr, image}) => {
  return (
    <div className="terrain-component">
      <h3 className="terrain-title">{ville}</h3>
      <img src={`data:${image.type};base64,${image.image}`} alt="stade" className="terrain-image"/>
      <p className="terrain-prix">{prixHr} DH / heure</p>
      <button className="terrain-more">Voir plus</button>
    </div>
  );
};
export default Terrain;
