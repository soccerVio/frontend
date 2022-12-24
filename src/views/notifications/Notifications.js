import React from "react";
import Invitation from "../../components/notifications/invitation/Invitation";
import Notification from "../../components/notifications/notification/Notification";
import "./Notifications.css";

const Notifications = () => {
  
  return (
    <div className="notifications-container">
      <Notification />
      <Invitation />
    </div>
  );
};

export default Notifications;
