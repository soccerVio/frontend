import React, { useCallback, useEffect, useState } from "react";
import Header from "../../../components/layout/Header";
import Modal from "../../../utils/modal/Modal";
import "./Terrains.css";
import axios from "axios";
import Terrain from "../../../components/terrains/liste/Terrain";
import AddTerrain from "../../../components/terrains/addTerrain/AddTerrain";
import Map from "../../../components/map/Map";

const Terrains = () => {
  const [openModalMap, setOpenModalMap] = useState(false);
  const [openModalTerrainForm, setOpenModalTerrainForm] = useState(false);
  const [image, setImage] = useState(null);
  const [terrains, setTerrains] = useState([]);
  const [terrain, setTerrain] = useState({
    latitude: 0,
    longitude: 0,
    ville: "",
    heureO: "",
    description: "",
    heureF: "",
    prixHr: 0,
    nbrJoueur: 0,
    avecDouche: false,
    assure: false,
    proprietaire: 10,
  });

  useEffect(() => {
    getTerrains();
  }, []);

  const getTerrains = useCallback(async () => {
    try {
      let response = await axios.get(
        process.env.REACT_APP_BACKEND_TERRAINS_URL
      );
      setTerrains(response.data);
    } catch (error) {
      console.log(error);
    }
  });

  const enregistrerTerrein = useCallback(async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("terrain", JSON.stringify(terrain));
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_BACKEND_TERRAINS_URL}/ajout`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setOpenModalTerrainForm(false);
      setTerrains([response.data, ...terrains]);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Header />
      <div className="terrains-prop">
        <div className="terrains-ajout">
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
        </div>

        <div className="terrain-liste">
          {terrains.map((terrain) => (
            <Terrain
              key={terrain.id}
              ville={terrain.ville}
              prixHr={terrain.prixHr}
              image={terrain.image}
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
          onEnregistClick={enregistrerTerrein}
        >
          <AddTerrain
            terrain={terrain}
            setImage={setImage}
            setTerrain={setTerrain}
          />
        </Modal>
      )}
    </>
  );
};

export default Terrains;
