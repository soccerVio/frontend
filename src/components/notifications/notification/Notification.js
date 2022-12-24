import React from "react";
import "./Notification.css";

const Notification = () => {
  function NotificationComponent() {
    return (
      <div className="notification">
        
        <img
          src="/images/userImage.jpg"
          alt="user"
          className="notification-userImage"
        />
        <p className="notification-content">
          notification notification notification notification notification
          notification notification notification notification notification
          notification notification notification notification notification
        </p>
        <p className="notification-heures">Il y a 2 heures</p>
      </div>
    );
  }
  return (<div className="notifications">
    <NotificationComponent/>
    <NotificationComponent/>
    <NotificationComponent/>
  </div>);
};

export default Notification;
