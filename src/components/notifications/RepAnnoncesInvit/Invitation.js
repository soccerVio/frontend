import React from "react";
import { useState } from "react";
import { TbCircleCheck, TbCircleX } from "react-icons/tb";
import Modal from "../../../utils/modal/Modal";
import "./ParticipationInvit.css";
import Reservation from "./reservation/Reservation";

//men be3d ma dak invité ki9bl tidkhl mol annonce y9bl dak soyed li t invita
const Invitation = ({ invitations }) => {
  const [showReservation, setSowReservation] = useState(false);
  const [reservation, setReservation] = useState(false);

  function InvitationComponent({ usersInvit, reservation }) {
    return usersInvit.map(userInvit =>
      <div className="invitation-participation" key={userInvit.id}>
        <div className="invitation-participation-userInfos">
          {userInvit.invite.image ? (
            <img
              src={userInvit.invite.image}
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
            {userInvit.invite.nomComplet}
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
    )
    
  }

  return (
    <>
      <div className="invitations-participations">
        <div className="invitations-participations-title">
          Joueurs invités à vos réserations
        </div>
        <div className="invitations-participations-content">
          {invitations.map((invitation) => (
            <InvitationComponent
              key={invitation.id}
              usersInvit={invitation.invites}
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

export default Invitation;
