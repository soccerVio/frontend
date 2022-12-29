import React from "react";
import InvitationAnnonce from "../../components/notifications/invitationAnnonce/InvitationAnnonce";
import Notification from "../../components/notifications/notification/Notification";
import "./Notifications.css";

const Notifications = () => {
  
  return (
    <div className="notifications-container">
      <Notification />
      <div className="invit-annonces">
        <InvitationAnnonce itsInvitation/>
        <InvitationAnnonce />
      </div>
      
    </div>
  );
};

export default Notifications;
