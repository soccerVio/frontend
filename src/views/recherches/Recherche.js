import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isJoueur } from "../../constants/user";
import Map from "../../components/map/Map"

import "./Recherche.css";

const Recherche = () => {
  const navigate = useNavigate();
  const [latitude , setLatitude] = useState(0)
  const [longitude , setLongitude] = useState(0)

  useEffect(() => {
    if (!isJoueur()) navigate("/accueil");
    else{
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      });
    }

  }, []);

  const mapClick = useCallback((latitude, longitude)=>{
    setLatitude(latitude)
    setLongitude(longitude)
  },[])

  return (
    <div className="recherche">
      <div className="rechercher-creneaux">
        <div className="recherche-inputs">
          <label>Date de début</label>
          <input type="date" name="dateD" className="rechercher-input" />
        </div>
        <div className="recherche-inputs">
          <label>Date de fin</label>
          <input type="date" name="dateF" className="rechercher-input" />
        </div>
        <div className="recherche-inputs">
          <label>Heure de début</label>
          <input type="time" name="heureO" className="rechercher-input" />
        </div>
        <div className="recherche-inputs">
          <label>Heure de fin</label>
          <input type="time" name="heureF" className="rechercher-input" />
        </div>

        <button className="rechercher-button">Recherche</button>
      </div>
      <Map latitude={latitude} longitude={longitude} mapClick={mapClick} forSearch/>
    </div>
  );
};

export default Recherche;
