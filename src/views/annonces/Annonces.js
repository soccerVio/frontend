import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InvitationAdd from "../../components/annonces/invitation/Invitation";
import { userInfo } from "../../constants/user";
import { customTime } from "../../utils/functions/Function";
import { getSuccessToast, getWaringToast } from "../../utils/toasts/Toast";
import Modal from "../../utils/modal/Modal";
import "./Annoces.css";
import { ToastContainer } from "react-toastify";

const Annonces = () => {
  const [showInvitationAdd, setShowInvitationAdd] = useState(false);
  const [inviteIds, setInviteIds] = useState([]);
  const [annonces, setAnnonces] = useState([]);
  const [annonceId, setAnnonceId] = useState([]);
  const navigate = useNavigate();

  const userId = userInfo().id;

  const addInvitation = useCallback(async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_INVITATIONS_URL}/add`, {
        invitantId: userId,
        inviteIds,
        annonceId,
      });
      getSuccessToast("Invitation ajoutée avec succès");
      setShowInvitationAdd(false);
    } catch (error) {
      console.log(error);
    }
  }, [annonceId, inviteIds]);

  useEffect(() => {
    getAnnonces();
  }, []);

  const getAnnonces = useCallback(async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_BACKEND_ANNONCES_URL}`);
      if (response.data.length > 0) setAnnonces(response.data);
      else getWaringToast("Il n ya aucune annonce!");
    } catch (error) {
      console.log(error);
    }
  }, []);

  const participer = useCallback(async (idAnnonce) => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_ANNONCES_URL}/participer/${userId}/${idAnnonce}`);
      getSuccessToast("Participation ajouté avec succès");
    } catch (error) {
      console.log(error);
    }
  }, []);

  function AnnonceComponent({ annonce }) {
    return (
      <div className="annonce-component container-page">
        <div className="annonce-userInfos">
          {annonce.reservation.reservePar.image ? (
            <img
              src={annonce.reservation.reservePar.image}
              alt="user"
              className="annonce-userImage"
            />
          ) : (
            <img
              src="/images/userImage.png"
              alt="user"
              className="annonce-userImage"
            />
          )}
          <span className="annonce-userName">
            {annonce.reservation.reservePar.nomComplet}
          </span>
        </div>
        <p className="annonce-description">{annonce.description}</p>
        <span>Match pour les {annonce.reservation.genre}</span>
        <span>
          Date de réservation : {annonce.reservation.date.split("T")[0]} à{" "}
          {customTime(annonce.reservation.heure)}
        </span>
        {annonce.reservation.nbrJoueurManq > 0 && (
          <>
            <span>
              Nombre de joueurs manquants : {annonce.reservation.nbrJoueurManq}{" "}
              joueurs
            </span>
            <span
              className="annonce-reservationView"
              onClick={() => {
                setShowInvitationAdd(true);
                setAnnonceId(annonce.id);
              }}
            >
              Inviter des utilisateurs
            </span>
          </>
        )}
        <span
          className="annonce-reservationView"
          onClick={() =>
            navigate("/terrains/details", {
              state: {
                id: annonce.reservation.terrain.id,
              },
            })
          }
        >
          Voir terrain
        </span>
        <button
          className="annonce-ParticiperBtn"
          onClick={() => participer(annonce.id)}
        >
          Participer
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="annonces-list">
        {annonces.map((annonce) => (
          <AnnonceComponent key={annonce.id} annonce={annonce} />
        ))}
      </div>
      {showInvitationAdd && (
        <Modal
          openModal={setShowInvitationAdd}
          title="Choisissez les joueurs"
          showRegisterBtn
          onEnregistClick={addInvitation}
        >
          <InvitationAdd inviteIds={inviteIds} setInviteIds={setInviteIds} />
        </Modal>
      )}
      <ToastContainer />
    </>
  );
};

export default Annonces;
