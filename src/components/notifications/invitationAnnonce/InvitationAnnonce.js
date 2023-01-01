import React, { useState } from "react";
import { TbCircleCheck, TbCircleX } from "react-icons/tb";
import "./InvitationAnnonce.css";

const InvitationAnnonce = ({ itsInvitation }) => {
  const [showReservation, setSowReservation] = useState(false);
  const [showAnnnoce, setSowAnnnoce] = useState(false);

  function AnnonceInvitComponent() {
    return (
      <div className="invitation-annonce">
        <div className="invitation-annonce-userInfos">
          <img
            src="/images/userImage.jpg"
            alt="user"
            className="invitation-annonce-userImage"
          />
          <span className="invitation-annonce-userName">joueur joueur</span>
        </div>
        <div className="invitation-annonce-icons">
          <TbCircleCheck className="invitation-annonce-icon invitation-annonce-icon-accept" />
          <TbCircleX className="invitation-annonce-icon invitation-annonce-icon-refuse" />
        </div>

        <span className="invitation-annonce-view">
          Voir {itsInvitation ? " réservation" : " annonce"}
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="invitations-annonces">
        <div className="invitations-annonces-title">
          {itsInvitation
            ? " Invitations pour des matches"
            : " Réponses des annonces"}
        </div>
        <div className="invitations-annonces-content">
          <AnnonceInvitComponent />
          <AnnonceInvitComponent />
          <AnnonceInvitComponent />
          <AnnonceInvitComponent />
        </div>
      </div>
      {showAnnnoce}
    </>
  );
};

export default InvitationAnnonce;
