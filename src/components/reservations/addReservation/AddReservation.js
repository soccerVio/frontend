import axios from "axios";
import React, { useCallback } from "react";
import { useState } from "react";
import "./AddReservation.css";

const AddReservation = ({ reservation, setReservation }) => {
  const [nomJoueur, setNomJoueur] = useState("");
  const [selectedJoueurs, setSelectedJoueurs] = useState([]);

  const getUsers = useCallback(async (nomJoueur) => {
    setNomJoueur(nomJoueur);
    if (nomJoueur !== "") {
      try {
        let response = await axios.get(
          `${process.env.REACT_APP_BACKEND_USERS_URL}${nomJoueur}`
        );
        setSelectedJoueurs(response.data);
      } catch (error) {
        console.log(error);
      }
    } else setSelectedJoueurs([]);
  }, []);

  return (
    <div className="add-reservation">
      <div className="add-reservation-infos">
        <div className="add-reservation-info">
          <label className="add-reservation-label">Reservation pour</label>
          <input
            type="radio"
            name="genre"
            className="add-reservation-genreH"
            value="homme"
            onChange={() => setReservation({ ...reservation, genre: "homme" })}
          />{" "}
          Hommes
          <input
            type="radio"
            name="genre"
            className="add-reservation-genreF"
            value="femme"
            onChange={() => setReservation({ ...reservation, genre: "femme" })}
          />{" "}
          Femmes
        </div>

        <div className="add-reservation-info">
          <label className="add-reservation-label">
            Nombre de joueurs manquants
          </label>
          <input
            type="number"
            min="0"
            className="add-reservation-input"
            onChange={(e) =>
              setReservation({ ...reservation, nbrJoueurManq: parseInt(e.target.value) })
            }
          />
        </div>

        <div className="add-reservation-info add-reservation-info-joueurs">
          <div>
            <label className="add-reservation-label">Les joueurs</label>
            <input
              type="text"
              name="nom-joueur"
              className="add-reservation-input"
              placeholder="Nom complet"
              value={nomJoueur}
              onChange={(e) => getUsers(e.target.value)}
            />
          </div>

          {selectedJoueurs.length !== 0 && (
            <div className="list-joueurs">
              {selectedJoueurs.map((nomJoueur) => (
                <span
                  key={nomJoueur.id}
                  onClick={() => {
                    setReservation({
                      ...reservation,
                      joueurs: [...reservation.joueurs, nomJoueur],
                    });
                    setNomJoueur("");
                    setSelectedJoueurs([]);
                  }}
                >
                  {nomJoueur.nomComplet}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {reservation.joueurs.length !== 0 && (
        <div className="add-reservation-list-joueurs">
          {reservation.joueurs.map((joueur, index) => (
            <span
              key={index}
              className="add-reservation-joueur"
              onClick={() => delete reservation.joueurs[index]}
            >
              {joueur.nomComplet}
            </span>
          ))}
        </div>
      )}

      <div className="add-reservation-date">
        <input
          type="date"
          className=" add-reservation-input add-reservation-date-input"
          value={reservation.date}
          onChange={(e) =>
            setReservation({ ...reservation, date: e.target.value })
          }
        />
      </div>

      {reservation.date && (
        <div className="add-reservation-heuresDispo">
          <span className="add-reservation-heure">08:00 - 09:00</span>
          <span className="add-reservation-heure">08:00 - 09:00</span>
          <span className="add-reservation-heure">08:00 - 09:00</span>
          <span className="add-reservation-heure">08:00 - 09:00</span>
          <span className="add-reservation-heure">08:00 - 09:00</span>
          <span className="add-reservation-heure">08:00 - 09:00</span>
          <span className="add-reservation-heure">08:00 - 09:00</span>
          <span className="add-reservation-heure">08:00 - 09:00</span>
          <span className="add-reservation-heure">08:00 - 09:00</span>
          <span className="add-reservation-heure">08:00 - 09:00</span>
        </div>
      )}
    </div>
  );
};

export default AddReservation;
