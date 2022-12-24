import React from "react";
import { TbCircleCheck, TbCircleX } from "react-icons/tb";
import "./Invitation.css";

const Invitation = () => {
  function InvitationComponent() {
    return (
      <div className="invitation">
        <div className="invitation-userInfos">
          <img
            src="/images/userImage.jpg"
            alt="user"
            className="invitation-userImage"
          />
          <span className="invitation-userName">joueur joueur</span>
        </div>
        <div className="invitation-icons">
          <TbCircleCheck className="invitation-icon invitation-icon-accept" />
          <TbCircleX className="invitation-icon invitation-icon-refuse" />
        </div>

        <span className="invitation-view">Voir invitation</span>
      </div>
    );
  }

  return (
    <div className="invitations">
      <div className="invitations-title">Invitations pour des matches</div>
      <div className="invitations-content">
        <InvitationComponent />
        <InvitationComponent />
        <InvitationComponent />
        <InvitationComponent />
        <InvitationComponent />
        <InvitationComponent />
      </div>
    </div>
  );
};

export default Invitation;
