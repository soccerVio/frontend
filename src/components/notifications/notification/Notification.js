import axios from "axios";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../../../constants/user";
import "./Notification.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate()

  const backend_url = process.env.REACT_APP_BACKEND_BASE_URL
  useEffect(() => {
    getNotifications();
  }, []);

  const customDate = useCallback((date) => {
    let partsDate = date.split('T')
    let partsTime = partsDate[1].split(':')
    return `${partsDate[0]} à ${partsTime[0]}:${partsTime[1]}`
  }, []);

  const getNotifications = useCallback(async () => {
    try {
      let response = await axios.get(`${backend_url}notifications-storage/${userInfo().id}`);
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleNotifClick = useCallback(async (notification)=>{
    console.log(notification.id);
    try{
      await axios.put(`${backend_url}notifications-storage/read/${notification.id}`);
      if(notification.notificationType === "NEW_RESERVATION")
        navigate('/reservations')
    }catch(error){
      console.log(error);
    }
      
  }, [])

  function NotificationComponent({ notification }) {
    return (
      <div className={"notification " + (!notification.read && "bg-notReaded")} 
      onClick={()=>handleNotifClick(notification)}>
        {notification.userFrom.photoProfil ? (
          <img
            src={notification.userFrom.photoProfil}
            alt="user"
            className="notification-userImage"
          />
        ) : (
          <img
            src="/images/userImage.jpg"
            alt="user"
            className="notification-userImage"
          />
        )}
        <p className="notification-content">{notification.content}</p>
        <p className="notification-heures">{customDate(notification.dateEnvoie)}</p>
      </div>
    );
  }
  return (
    <>
      {notifications.length > 0 && (
        <div className="notifications">
          {notifications.map((notification) => (
            <NotificationComponent notification={notification} key={notification.id}/>
          ))}
        </div>
      )}
    </>
  );
};

export default Notification;
