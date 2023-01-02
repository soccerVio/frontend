import React, { useCallback, useEffect, useState } from "react";
import Notification from "../../components/notifications/notification/Notification";
import "./Notifications.css";
import RepAnnonce from "../../components/notifications/RepAnnoncesInvit/RepAnnonces";
import Invite from "../../components/notifications/RepAnnoncesInvit/Invite";
import Invitation from "../../components/notifications/RepAnnoncesInvit/Invitation";
import axios from "axios";

const Notifications = () => {
  const [invitations, setInvitations] = useState([]);
  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    getInvitations();
    getAnnonces();
  }, []);

  const getInvitations = useCallback(async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_BACKEND_INVITATIONS_URL}`);
      setInvitations(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getAnnonces = useCallback(async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_BACKEND_ANNONCES_URL}`);
      setAnnonces(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="notifications-container">
      <Notification />
      <div className="invit-annonces">
        <RepAnnonce annonces={annonces}/>
        <Invite invitations={invitations} />
        <Invitation invitations={invitations} />
      </div>
      
    </div>
  );
};

export default Notifications;
