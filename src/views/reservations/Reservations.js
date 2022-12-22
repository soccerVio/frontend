import FullCalendar from "@fullcalendar/react";
import React, { useCallback, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Reservations.css";
import Confirm from "../../utils/confirm/Confirm";

const Reservations = () => {
    const [showConfirm, setShowConfirm] = useState(false)
  let idReservation = 0;

  const eventClick = useCallback((info) => {
    idReservation = info.event.id;
    setShowConfirm(true)
  }, []);

  const annulerReservation = useCallback(()=>{
    console.log(idReservation);
    setShowConfirm(false)
  },[])

  return (
    <>
      <div className="reservations">
        <div className="reservations-calendrier">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={[
              { id: "1", title: "Joueur joueur", date: "2022-12-15 21:30:00" },
              { id: "2", title: "Joueur joueur", date: "2022-12-20 08:00:00" },
            ]}
            //eventContent={renderEventContent}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
            buttonText={{
              today: "Ajourd'hui",
              month: "Mois",
              week: "Semaine",
              day: "Jour",
            }}
            dayHeaderFormat={{ weekday: "long" }}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            eventClick={eventClick}
          />
        </div>
      </div>
      {showConfirm && <Confirm setShowConfirm={setShowConfirm} confirmClick={annulerReservation} />}
    </>
  );
};

export default Reservations;