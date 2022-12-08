import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../layout/Header";
import "./DetailsTerrain.css";

const DetailsTerrain = () => {
  const params = useParams();
  const [terrain, setTerrain] = useState(null);

  useEffect(() => {
    getTerrain();
  }, []);

  const getTerrain = useCallback(async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_BACKEND_TERRAINS_URL}/${params.id}`
      );
      setTerrain(response.data);
    } catch (error) {
      console.log(error);
    }
  });

  const customTime = useCallback((time)=>{
    const times = time.split(':')
    return `${times[0]} : ${times[1]}`
  })

  return (
    <>
      <Header />
      {terrain && (
        <div className="detailsTerrain-cotainer">
          <img
            src={`data:${terrain.image.type};base64,${terrain.image.image}`}
            alt="stade"
            className="detailsTerrain-image"
          />
          <div className="detailsTerrain-content">
            <div className="detailsTerrain-row">
              <span>Ville : </span>
              <span>{terrain.ville}</span>
            </div>
            <div className="detailsTerrain-row">
              <span>Heure d'ouverture : </span>{customTime(terrain.heureO)}<span></span>
            </div>
            <div className="detailsTerrain-row">
              <span>Heure de fermeture : </span>{customTime(terrain.heureF)}<span></span>
            </div>
            <div className="detailsTerrain-row">
              <span>Prix par heure : </span>
              <span>{terrain.prixHr} DH</span>
            </div>
            <div className="detailsTerrain-row">
              <span>Joueurs par équipes : </span>
              <span>{terrain.nbrJoueur} joueurs</span>
            </div>
            <div className="detailsTerrain-row">
              <span>Propriétaire : </span>
              <span>{terrain.proprietaire.fullname}</span>
            </div>
            <div className="detailsTerrain-row">
              {terrain.avecDouche ? <span>Avec douche</span> : <span>Sans douche</span>}
            </div>
            <div className="detailsTerrain-row">
              {terrain.assure ? <span>Assuré</span> : <span>Pas assuré</span>}
            </div>
            <div className="detailsTerrain-row">
              <span>{terrain.description}</span>
            </div>
            <div className="detailsTerrain-row">
              <button className="detailsTerrain-btn">Réserver</button>
              <button className="detailsTerrain-btn detailsTerrain-btn-editer">
                Editer
              </button>
              <button className="detailsTerrain-btn detailsTerrain-btn-supprimer">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailsTerrain;
