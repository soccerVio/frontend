import React, { useCallback, useEffect, useState } from "react";
import Modal from "../../utils/modal/Modal";
import "./Terrains.css";
import axios from "axios";
import Terrain from "../../components/terrains/liste/Terrain";
import AddTerrain from "../../components/terrains/addTerrain/AddTerrain";
import Map from "../../components/map/Map";
import {
  getErrorToast,
  getSuccessToast,
  getWaringToast,
} from "../../utils/toasts/Toast";
import { ToastContainer } from "react-toastify";
import { verifyObjectFieldsNotNull } from "../../utils/functions/Function";
import { isLogged, isProprietaire, userInfo } from "../../constants/user";
import { useNavigate } from "react-router-dom";

const Terrains = () => {
  const [openModalMap, setOpenModalMap] = useState(false);
  const [openModalTerrainForm, setOpenModalTerrainForm] = useState(false);
  const [images, setImages] = useState(null);
  const [terrains, setTerrains] = useState([]);
  const [terrain, setTerrain] = useState({
    titre: "", latitude: 0,
    longitude: 0, adresse: "",
    heureO: "", description: "",
    heureF: "", prixHr: 0,
    nbrJoueur: 0, avecDouche: false,
    assure: false, proprietaire: userInfo().id,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if(!isLogged())
      navigate("/")
    else
      getTerrains();
  }, []);

  const getTerrains = useCallback(async () => {
    try {
      let response = await axios.get(
        process.env.REACT_APP_BACKEND_TERRAINS_URL
      );
      response.data.length === 0
        ? getWaringToast("Il n'y a pas de terrains!")
        : setTerrains(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const enregistrerTerrain = useCallback(async () => {
    if (verifyObjectFieldsNotNull()) {
      const formData = new FormData();
      formData.append("terrain", JSON.stringify(terrain));
      for (let i = 0; i < images.length; i++)
        formData.append("images", images[i]);
      try {
        let response = await axios.post(
          `${process.env.REACT_APP_BACKEND_TERRAINS_URL}/ajout`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setOpenModalTerrainForm(false);
        setTerrains([response.data, ...terrains]);
        getSuccessToast("Terrain ajoutée avec succès");
      } catch (error) {
        getErrorToast("Désolé, un problème est survenu!");
      }
    } else getErrorToast("Entrez tous les champs!");
  }, [images, terrain, terrains]);

  return (
    <>
      <div className="terrains-prop">
        <div className="terrains-header">
        <input type='text' className="terrainList-recherche" placeholder="Recherche par titre ou adresse"/>
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
        >
          <Map terrain={terrain} setTerrain={setTerrain} />
        </Modal>
      )}
      {openModalTerrainForm && (
        <Modal
          openModal={setOpenModalTerrainForm}
          title="Les informations du terrain"
          onEnregistClick={enregistrerTerrain}
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
