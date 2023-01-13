import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { TbCircleCheck, TbCircleX } from "react-icons/tb";
import Modal from "../../../utils/modal/Modal";
import "./ParticipationInvit.css";
import Reservation from "./reservation/Reservation";
import { userInfo } from "../../../constants/user";
import { getSuccessToast, getErrorToast } from "../../../utils/toasts/Toast";
import { useNavigate } from "react-router";

//nas li participaw hna fin ki9blhum wla la dak li 7et annonce
const RepAnnonce = () => {
  const [showReservation, setSowReservation] = useState(false);
  const [reservation, setReservation] = useState(false);
  const [annonces, setAnnonces] = useState([]);

  const backend_url = process.env.REACT_APP_BACKEND_ANNONCES_URL;

  const userId = userInfo().id;

  useEffect(() => {
    getAnnoncesHaveParticip();
  }, []);

  const refuserAnnonce = useCallback(async (idParticipant, idAnnonce) => {
    try {
      await axios.put(
        `${backend_url}/refuserParticipation/${idParticipant}/${idAnnonce}`
      );
      setAnnonces([]);
      getAnnoncesHaveParticip();
      getSuccessToast("Participation refusée avec succès");
    } catch (error) {
      console.log(error);
    }
  }, []);

  const accepterAnnonce = useCallback(async (idParticipant, idAnnonce) => {
    try {
      await axios.put(
        `${backend_url}/accepterParticipation/${idParticipant}/${idAnnonce}`
      );
      setAnnonces([]);
      getAnnoncesHaveParticip();
      getSuccessToast("Participation accepté avec succès");
    } catch (error) {
      if(error.response.status === 400)
        getErrorToast("Le nombre de joueurs manquants est 0");
    }
  }, []);

  const getAnnoncesHaveParticip = useCallback(async () => {
    try {
      let response = await axios.get(`${backend_url}/annoncesJoueur/${userId}`);
      setAnnonces(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const navigate = useNavigate();
  function RepAnnonceComponent({ participants, reservation, idAnnonce }) {
    return participants.map((participant) => (
      <div className="invitation-participation" key={participant.id}>
        <div className="invitation-participation-userInfos"onClick={() =>
            navigate("/profile", {
              state: {
                id: participant.id,
                forAuthUser: false,
              },
            })
          }>
          {participant.image ? (
            <img
              src={participant.image}
              alt="user"
              className="invitation-participation-userImage"
            />
          ) : (
            <img
              src="/images/userImage.png"
              alt="user"
              className="invitation-participation-userImage"
            />
          )}
          <span className="invitation-participation-userName">
            {participant.nomComplet}
          </span>
        </div>
        <div className="invitation-participation-icons">
          <TbCircleCheck
            className="invitation-participation-icon invitation-participation-icon-accept"
            onClick={() => accepterAnnonce(participant.id, idAnnonce)}
          />
          <TbCircleX
            className="invitation-participation-icon invitation-participation-icon-refuse"
            onClick={() => refuserAnnonce(participant.id, idAnnonce)}
          />
        </div>

        <span
          className="invitation-participation-view"
          onClick={() => {
            setReservation(reservation);
            setSowReservation(true);
          }}
        >
          Voir réservation
        </span>
      </div>
    ));
  }

  return (
    <>
      {annonces.length > 0 && (
        <div className="invitations-participations">
          <div className="invitations-participations-title">
            Réponses à vos annonces
          </div>

          <div className="invitations-participations-content">
            {annonces.map((annonce) => (
              <RepAnnonceComponent
                key={annonce.id}
                participants={annonce.participants}
                reservation={annonce.reservation}
                idAnnonce={annonce.id}
              />
            ))}
          </div>
        </div>
      )}
      {showReservation && (
        <Modal openModal={setSowReservation} title="La réservation">
          <Reservation reservation={reservation} />
        </Modal>
      )}
    </>
  );
};

export default RepAnnonce;
