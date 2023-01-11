import React, { useCallback, useEffect, useState } from "react";
import Modal from "../../utils/modal/Modal";
import "./Terrains.css";
import axios from "axios";
import Terrain from "../../components/terrains/liste/Terrain";
import AddTerrain from "../../components/terrains/addTerrain/AddTerrain";
import Map from "../../components/map/Map";
import { getErrorToast, getSuccessToast, getWaringToast } from "../../utils/toasts/Toast";
import { ToastContainer } from "react-toastify";
import { customTime } from "../../utils/functions/Function";
import { isLogged, isProprietaire, userInfo, isJoueur, } from "../../constants/user";
import { useNavigate } from "react-router-dom";

const Terrains = () => {
  const [openModalMap, setOpenModalMap] = useState(false);
  const [openModalTerrainForm, setOpenModalTerrainForm] = useState(false);
  const [images, setImages] = useState(null);
  const [terrains, setTerrains] = useState([]);
  const [terrain, setTerrain] = useState({
    titre: "", adresse: "", latitude: 0, longitude: 0,
    heureO: "", heureF: "",  prixHr: 0, nbrJoueur: 5,
    avecDouche: false,assure: false, description: "",
    dureeMatchHr: 0, dureeMatchMin: 0, proprietaire: userInfo().id,
    
  });

  const backend_url = process.env.REACT_APP_BACKEND_TERRAINS_URL;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged()) navigate("/");
    else {
      if (isJoueur()) getTerrains();
      else if (isProprietaire()) getTerrains(userInfo().id);
    }
  }, []);

  const getTerrains = useCallback(async (idProp) => {
    try {
      let response = idProp
        ? await axios.get(`${backend_url}/proprietaire/${idProp}`)
        : await axios.get(backend_url);
      response.data.length === 0
        ? getWaringToast("Il n'y a pas de terrains!")
        : setTerrains(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const enregistrerTerrain = useCallback(async () => {
    if (terrain.titre !== "" && terrain.adresse !== "" &&
          terrain.heureO !== "" && terrain.heureF !== "" && 
          (terrain.dureeMatchHr !== 0 || terrain.dureeMatchMin !== 0) &&
          images !== null  ){
      if (terrain.prixHr < 0) 
        getErrorToast("Entrez un prix correcte!");
      else {
        if (customTime(terrain.heureF) <= customTime(terrain.heureO))
          getErrorToast("Entrez des heures d'ouverture et de fermeture correctes!");
        else {
          const formData = new FormData();
          formData.append("terrain", JSON.stringify(terrain));
          for (let i = 0; i < images.length; i++)
            formData.append("images", images[i]);
            console.log(terrain);
          /*try {
            let response = await axios.post(`${backend_url}/ajout`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            setOpenModalTerrainForm(false);
            setTerrains([response.data, ...terrains]);
            getSuccessToast("Terrain ajouté avec succès");
          } catch (error) {
            getErrorToast("Désolé, un problème est survenu!");
          }*/
        }
      }
    } else getErrorToast("Entrez tous les champs!");
  }, [images, terrain, terrains]);

  const mapClick = useCallback((latitude, longitude) => {
    setTerrain({
      ...terrain,
      latitude,
      longitude,
    });
  }, []);

  const searchByAdresse = useCallback(async (e) => {
    if (e.target.value !== "" && e.target.value !== null) {
      try {
        let response = await axios.get(`${backend_url}/search/${e.target.value}`);
        setTerrains(response.data);
      } catch (error) {
        console.log(error);
      }
    } else getTerrains();
  }, []);

  return (
    <>
      <div className="terrains-prop">
        <div className="terrains-header">
          <input
            type="text"
            className="terrainList-recherche"
            placeholder="Recherche par adresse"
            onChange={searchByAdresse}
          />
          {isProprietaire() ? (
            <button
              className="terrains-ajout-btn"
              onClick={() => {
                navigator.geolocation.getCurrentPosition(function (position) {
                  setTerrain({
                    ...terrain,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  });
                });
                setOpenModalMap(true);
              }}
            >
              Ajouter
            </button>
          ) : null}
        </div>

        <div className="terrain-liste">
          {terrains.map((terrain) => (
            <Terrain
              key={terrain.id}
              titre={terrain.titre}
              prixHr={terrain.prixHr}
              nbrJoueur={terrain.nbrJoueur}
              image={terrain.images[0]}
              id={terrain.id}
            />
          ))}
        </div>
      </div>
      {openModalMap && (
        <Modal
          openModal={setOpenModalMap}
          title="Choisir l'emplacement du terrain"
          onEnregistClick={async () => {
            setOpenModalMap(false);
            setOpenModalTerrainForm(true);
          }}
          showRegisterBtn
        >
          <Map
            latitude={terrain.latitude}
            longitude={terrain.longitude}
            mapClick={mapClick}
          />
        </Modal>
      )}
      {openModalTerrainForm && (
        <Modal
          openModal={setOpenModalTerrainForm}
          title="Les informations du terrain"
          onEnregistClick={enregistrerTerrain}
          showRegisterBtn
        >
          <AddTerrain
            terrain={terrain}
            setImages={setImages}
            setTerrain={setTerrain}
          />
        </Modal>
      )}

      <ToastContainer />
    </>
  );
};

export default Terrains;
