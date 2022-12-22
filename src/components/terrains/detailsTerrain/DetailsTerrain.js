import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { isJoueur, isProprietaire } from "../../../constants/user";
import Confirm from "../../../utils/confirm/Confirm";
import Modal from "../../../utils/modal/Modal";
import { getErrorToast, getSuccessToast } from "../../../utils/toasts/Toast";
import AddTerrain from "../addTerrain/AddTerrain";
import "./DetailsTerrain.css";

const DetailsTerrain = () => {
  const { state } = useLocation();
  const [terrain, setTerrain] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState(null)
  const backend_url = process.env.REACT_APP_BACKEND_TERRAINS_URL;

  const navigate = useNavigate();

  useEffect(() => {
    getTerrain();
  }, []);

  const getTerrain = useCallback(async () => {
    try {
      let response = await axios.get(`${backend_url}/${state.id}`);
      setTerrain(response.data);
      setMainImage(response.data.images[0]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteTerrain = useCallback(async () => {
    try {
      await axios.delete(`${backend_url}/${terrain.id}`);
      navigate("/terrains");
    } catch (error) {
      getErrorToast("impossible de supprimer le terrain!");
    }
    setShowConfirm(false);
  }, [terrain]);

  const customTime = useCallback((time) => {
    const times = time.split(":");
    return `${times[0]} : ${times[1]}`;
  }, []);

  const customDate = useCallback((date)=>{
    return date.split('T')[0]
  },[])

  const updateTerrain = useCallback(async () => {
    const formData = new FormData();
    formData.append("terrain", JSON.stringify(terrain));
    if(images !== null){
      for (let i = 0; i < images.length; i++)
        formData.append("images", images[i]);
    }
    try{
      await axios.put(`${process.env.REACT_APP_BACKEND_TERRAINS_URL}/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      setShowModal(false)
      getSuccessToast('Terrain modifié avec succès')
    }catch(error){
      console.log(error);
    }
  }, [terrain, images]);

  return (
    <>
      {terrain && (
        <div className="detailsTerrain-container">
          <div className="detailsTerrain-images">
            <img
              src={`data:${mainImage.type};base64,${mainImage.content}`}
              alt="stade"
              className="detailsTerrain-mainImage"
            />
            <div className="detailsTerrain-otherImages">
              {terrain.images.map((image) => (
                <img
                  src={`data:${image.type};base64,${image.content}`}
                  alt="stade"
                  className="detailsTerrain-smallImage"
                  key={image.id}
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
          </div>
          <div className="detailsTerrain-content">
            <div className="detailsTerrain-row">
              <h2 className="detailsTerrain-titre">{terrain.titre}</h2>
            </div>
            <div className="detailsTerrain-row">
              <span>Adresse : </span>
              <span>{terrain.adresse}</span>
            </div>
            <div className="detailsTerrain-row">
              <span>Date de création : </span>
              <span>{customDate(terrain.dateCreation)}</span>
            </div>
            <div className="detailsTerrain-row">
              <span>Heure d'ouverture : </span>
              {customTime(terrain.heureO)}
              <span></span>
            </div>
            <div className="detailsTerrain-row">
              <span>Heure de fermeture : </span>
              {customTime(terrain.heureF)}
              <span></span>
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
              <span>{terrain.proprietaire.nomComplet}</span>
            </div>
            <div className="detailsTerrain-row">
              {terrain.avecDouche ? (
                <span>Avec douche</span>
              ) : (
                <span>Sans douche</span>
              )}
            </div>
            <div className="detailsTerrain-row">
              {terrain.assure ? (
                <span>Avec assurance</span>
              ) : (
                <span>Sans assurance</span>
              )}
            </div>
            <div className="detailsTerrain-row">
              <span className="detailsTerrain-description">
                {terrain.description}
              </span>
            </div>
            <div className="detailsTerrain-row">
              {isJoueur() && (
                <button className="detailsTerrain-btn">Réserver</button>
              )}
              {isProprietaire() && (
                <>
                  <button
                    className="detailsTerrain-btn detailsTerrain-btn-editer"
                    onClick={() => setShowModal(true)}
                  >
                    Editer
                  </button>
                  <button
                    className="detailsTerrain-btn detailsTerrain-btn-supprimer"
                    onClick={() => setShowConfirm(true)}
                  >
                    Supprimer
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {showConfirm && (
        <Confirm setShowConfirm={setShowConfirm} confirmClick={deleteTerrain} />
      )}
      {showModal && (
        <Modal
          openModal={setShowModal}
          title="La modification du terrain"
          onEnregistClick={updateTerrain}
        >
          <AddTerrain terrain={terrain} setTerrain={setTerrain} setImages={setImages}/>
        </Modal>
      )}
      <ToastContainer/>
    </>
  );
};

export default DetailsTerrain;
