import React from "react";
import { useNavigate } from "react-router-dom";
import "./Terrain.css";

const Terrain = ({ville, prixHr, image, id}) => {
  const navigate = useNavigate()

  return (
    <div className="terrain-component" onClick={()=>navigate('/proprietaire/terrains/details/'+id)}>
      <h3 className="terrain-title">{ville}</h3>
      <img src={`data:${image.type};base64,${image.image}`} alt="stade" className="terrain-image"/>
      <p className="terrain-prix">{prixHr} DH / heure</p>
      <button className="terrain-more">Voir plus</button>
    </div>
  );
};
export default Terrain;
