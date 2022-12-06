import React from "react";
import "./Terrain.css";

const Terrain = () => {
  return (
    <div className="terrain-component">
      <h3 className="terrain-title">Casablanca</h3>
      <img src="/images/Stade.jpg" alt="stade" className="terrain-image"/>
      <p className="terrain-prix">250 DH / heure</p>
      <button className="terrain-more">Détails</button>
    </div>
  );
};
export default Terrain;
