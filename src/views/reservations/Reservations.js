import FullCalendar from "@fullcalendar/react";
import React, { useCallback, useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Reservations.css";
import Confirm from "../../utils/confirm/Confirm";
import { isJoueur, isProprietaire, userInfo } from "../../constants/user";
import axios from "axios";
import { getSuccessToast, getWaringToast } from "../../utils/toasts/Toast";
import { ToastContainer } from "react-toastify";

const Reservations = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [events, setEvents] = useState([]);
  let idReservation = 0;
  const backend_url = process.env.REACT_APP_BACKEND_RESERVATIONS_URL;

  useEffect(() => {
    getReservations();
  }, []);

  const getReservations = useCallback(async () => {
    try {
      const userId = userInfo().id;
      let response;

      if (isJoueur())
        response = await axios.get(`${backend_url}/joueur/${userId}`);
      else if (isProprietaire())
        response = await axios.get(`${backend_url}/proprietaire/${userId}`);

      let events = [];
      for (let i = 0; i < response.data.length; i++)
        events[i] = {
          id: response.data[i].id,
          title: response.data[i].terrain.titre,
          date: `${response.data[i].date.split("T")[0]} ${
            response.data[i].heure
          }`,
        };

      setEvents(events);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const eventClick = useCallback((info) => {
    if (info.event.start >= new Date()) {
      idReservation = info.event.id;
      setShowConfirm(true);
    } else getWaringToast("Chosissez une date convenable!");
  }, []);

  const annulerReservation = useCallback(async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_RESERVATIONS_URL}/delete/${idReservation}`
      );
      getSuccessToast("Réservation annulée avec succès");
      setShowConfirm(false);
      setEvents([{ id: "", title: "", date: "" }]);
      getReservations();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container-page">
      <ToastContainer />
      <div className="reservations">
        <div className="reservations-calendrier">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
            buttonText={{
              today: "ajourd'hui",
              month: "mois",
              week: "semaine",
              day: "jour",
            }}
            dayHeaderFormat={{ weekday: "long" }}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            locale="fr"
            eventClick={eventClick}
          />
        </div>
      </div>
      {showConfirm && (
        <Confirm
          setShowConfirm={setShowConfirm}
          confirmClick={annulerReservation}
          title="Vous êtes sur?"
          parag="Si vous annuler la réservation vous ne pouvez revenir en arrière"
        />
      )}
    </div>
  );
};

export default Reservations;
