import React from "react";
import { useState } from "react";
import { TbCircleCheck, TbCircleX } from "react-icons/tb";
import Modal from "../../../utils/modal/Modal";
import "./ParticipationInvit.css";
import Reservation from "./reservation/Reservation";

//nas li participaw hna fin ki9blhum wla la dak li 7et annonce
const RepAnnonce = ({ annonces }) => {
  const [showReservation, setSowReservation] = useState(false);
  const [reservation, setReservation] = useState(false);

  function RepAnnonceComponent({ participants, reservation }) {
    return participants.map((participant) => (
      <div className="invitation-participation" key={participant.id}>
        <div className="invitation-participation-userInfos">
          {participant.image ? (
            <img
              src={participant.image}
              alt="user"
              className="invitation-participation-userImage"
            />
          ) : (
            <img
              src="/images/userImage.jpg"
              alt="user"
              className="invitation-participation-userImage"
            />
          )}
          <span className="invitation-participation-userName">
            {participant.nomComplet}
          </span>
        </div>
        <div className="invitation-participation-icons">
          <TbCircleCheck className="invitation-participation-icon invitation-participation-icon-accept" />
          <TbCircleX className="invitation-participation-icon invitation-participation-icon-refuse" />
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
            />
          ))}
        </div>
      </div>
      {showReservation && (
        <Modal openModal={setSowReservation} title="La réservation">
          <Reservation reservation={reservation} />
        </Modal>
      )}
    </>
  );
};

export default RepAnnonce;
