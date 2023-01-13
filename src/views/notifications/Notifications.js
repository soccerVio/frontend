import React from "react";
import Notification from "../../components/notifications/notification/Notification";
import "./Notifications.css";
import RepAnnonce from "../../components/notifications/RepAnnoncesInvit/RepAnnonces";
import Invite from "../../components/notifications/RepAnnoncesInvit/Invite";
import Invitation from "../../components/notifications/RepAnnoncesInvit/Invitation";

const Notifications = () => {

  return (
    <div className="notifications-container container-page">
      <Notification />
      <div className="invit-annonces">
        <RepAnnonce />
        <Invite/>
        <Invitation/>
      </div>
      
    </div>
  );
};

export default Notifications;
