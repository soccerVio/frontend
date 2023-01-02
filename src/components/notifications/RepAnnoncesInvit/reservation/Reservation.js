import React from "react";
import { useNavigate } from "react-router-dom";
import { customTime } from "../../../../utils/functions/Function";
import "./Reservation.css";

const Reservation = ({ reservation }) => {
  const navigate = useNavigate();

  return (
    <div className="notif-reservations">
      <p>
        <span className="notif-reservations-title">Date de réservation : </span>
        {reservation.date.split("T")[0]} à {customTime(reservation.heure)}
      </p>

      <p>
        <span className="notif-reservations-title">Réservé par : </span>
        <span className="notif-reservations-link">
          {reservation.reservePar.nomComplet}
        </span>
      </p>

      {reservation.nbrJoueurManq > 0 && (
        <p>
          <span className="notif-reservations-title">
            Nombre de joueur manquant :{" "}
          </span>
          {reservation.nbrJoueurManq} joueurs
        </p>
      )}

      <p>
        <span className="notif-reservations-title">Terrain : </span>
        <span
          className="notif-reservations-link"
          onClick={() =>
            navigate("/terrains/details", {
              state: {
                id: reservation.terrain.id,
              },
            })
          }
        >
          {reservation.terrain.titre}
        </span>
      </p>

      <p>
        <span className="notif-reservations-title">
          Les joueurs du match :{" "}
        </span>
        {reservation.joueurs.map((joueur) => (
          <span
            className="notif-reservations-link notif-reservations-joueur"
            key={joueur.id}
          >
            {joueur.nomComplet}
          </span>
        ))}
      </p>

      <p>Match pour les {reservation.genre}</p>
    </div>
  );
};

export default Reservation;
