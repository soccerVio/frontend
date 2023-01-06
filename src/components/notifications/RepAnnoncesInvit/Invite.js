import React from "react";
import { useState } from "react";
import { TbCircleCheck, TbCircleX } from "react-icons/tb";
import Modal from "../../../utils/modal/Modal";
import "./ParticipationInvit.css";
import Reservation from "./reservation/Reservation";

//chi hed invitak bach tl3b match w kaskhl bavh t9bl wla la
const Invite = ({ invitations }) => {
  const [showReservation, setSowReservation] = useState(false);
  const [reservation, setReservation] = useState(false);

  function InviteComponent({user, reservation}) {
    return (
      <div className="invitation-participation">
        <div className="invitation-participation-userInfos">
          {user.image ? (
            <img
              src={user.image}
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
            {user.nomComplet}
          </span>
        </div>
        <div className="invitation-participation-icons">
          <TbCircleCheck className="invitation-participation-icon invitation-participation-icon-accept" />
          <TbCircleX className="invitation-participation-icon invitation-participation-icon-refuse"/>
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
    );
  }

  return (
    <>
      <div className="invitations-participations">
        <div className="invitations-participations-title">
           Invitations pour des matches
        </div>
        <div className="invitations-participations-content">
          {invitations.map((invitation) => (
            <InviteComponent
              key={invitation.id}
              user={invitation.invitant}
              reservation={invitation.annonce.reservation}
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

export default Invite;
