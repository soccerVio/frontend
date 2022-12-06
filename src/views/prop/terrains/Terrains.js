import React, { useCallback, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import Header from "../../../components/layout/Header";
import Modal from "../../../utils/modal/Modal";
import "./Terrains.css";
import cities from "../../../files/cities.json";
import CostumSwitch from "../../../utils/modal/switch/CustomSwitch";
import axios from "axios";
import Terrain from "../../../components/terrains/Terrain";

const Terrains = () => {
  const [openModalMap, setOpenModalMap] = useState(false);
  const [openModalTerrainForm, setOpenModalTerrainForm] = useState(false);
  const [image, setImage] = useState(null);
  const [terrain, setTerrain] = useState({
    latitude: 0,
    longitude: 0,
    ville: "",
    heureO: "",
    heureF: "",
    prixHr: 0,
    nbrJoueur: 0,
    avecDouche: false,
    assure: false,
    proprietaire: 10,
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const enregistrerTerrein = useCallback(async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("terrain", JSON.stringify(terrain));
    try {
      let response = await axios.post(
        "http://localhost:8080/api/v1/terrains/ajout",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setOpenModalTerrainForm(false);
      console.log(response.data);
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
          <Terrain />
          <Terrain />
          <Terrain />
          <Terrain />
          <Terrain />
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
          {isLoaded ? (
            <GoogleMap
              zoom={10}
              center={{ lat: terrain.latitude, lng: terrain.longitude }}
              mapContainerClassName="map-container"
              onClick={(e) => {
                setTerrain({
                  ...terrain,
                  latitude: e.latLng.lat(),
                  longitude: e.latLng.lng(),
                });
              }}
            >
              <MarkerF
                position={{ lat: terrain.latitude, lng: terrain.longitude }}
              />
            </GoogleMap>
          ) : (
            "Loading"
          )}
        </Modal>
      )}
      {openModalTerrainForm && (
        <Modal
          openModal={setOpenModalTerrainForm}
          title="Les informations du terrain"
          onEnregistClick={enregistrerTerrein}
        >
          <div className="modal-form">
            <div className="modal-form-row">
              <div className="modal-form-halfRow">
                <label className="modal-form-label" htmlFor="image">
                  Image du terrain
                </label>
                <input
                  type="file"
                  id="image"
                  className="modal-form-input modal-form-input-file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <div className="modal-form-halfRow">
                <label className="modal-form-label" htmlFor="ville">
                  Ville
                </label>
                <select
                  id="ville"
                  className="modal-form-input"
                  value={terrain.ville}
                  onChange={(e) =>
                    setTerrain({ ...terrain, ville: e.target.value })
                  }
                >
                  <option disabled value="">
                    Choisissez la ville du terrain
                  </option>
                  {cities.names.map((name) => (
                    <option value={name} key={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="modal-form-row">
              <div className="modal-form-halfRow">
                <label className="modal-form-label" htmlFor="heureO">
                  Heure d'ouverture
                </label>
                <input
                  type="time"
                  id="heureO"
                  className="modal-form-input"
                  value={terrain.heureO}
                  onChange={(e) =>
                    setTerrain({ ...terrain, heureO: e.target.value + ":00" })
                  }
                />
              </div>

              <div className="modal-form-halfRow">
                <label className="modal-form-label" htmlFor="heureF">
                  Heure de fermeture
                </label>
                <input
                  type="time"
                  id="heureF"
                  className="modal-form-input"
                  value={terrain.heureF}
                  onChange={(e) =>
                    setTerrain({ ...terrain, heureF: e.target.value + ":00" })
                  }
                />
              </div>
            </div>

            <div className="modal-form-row">
              <div className="modal-form-halfRow">
                <label className="modal-form-label" htmlFor="prixHr">
                  Prix par heure
                </label>
                <input
                  type="number"
                  id="prixHr"
                  className="modal-form-input"
                  value={terrain.prixHr}
                  onChange={(e) =>
                    setTerrain({
                      ...terrain,
                      prixHr: parseFloat(e.target.value),
                    })
                  }
                />
              </div>

              <div className="modal-form-halfRow">
                <label className="modal-form-label" htmlFor="nbrJoueur">
                  Joueur par équipe
                </label>
                <input
                  type="number"
                  id="nbrJoueur"
                  className="modal-form-input"
                  value={terrain.nbrJoueur}
                  onChange={(e) =>
                    setTerrain({
                      ...terrain,
                      nbrJoueur: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="modal-form-row">
              <div className="modal-form-halfRow modal-form-switch">
                <label htmlFor="douche" className="modal-form-switch-label">
                  Avec douche
                </label>
                <CostumSwitch
                  setChecked={(e) => setTerrain({ ...terrain, avecDouche: e })}
                  checked={terrain.avecDouche}
                  id="douche"
                />
              </div>

              <div className="modal-form-halfRow modal-form-switch">
                <label htmlFor="assure" className="modal-form-switch-label">
                  Assuré
                </label>
                <CostumSwitch
                  setChecked={(e) => setTerrain({ ...terrain, assure: e })}
                  checked={terrain.assure}
                  id="assure"
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Terrains;
