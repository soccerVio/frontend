import axios from "axios";
import React, { useCallback, useState } from "react";
import { userInfo } from "../../../constants/user";
import { customTime } from "../../../utils/functions/Function";
import "./AddReservation.css";

const AddReservation = ({ reservation, setReservation, terrain }) => {
  const [nomJoueur, setNomJoueur] = useState("");
  const [selectedJoueurs, setSelectedJoueurs] = useState([]);
  const [joueurs, setJoueurs] = useState([]);
  const [heuresDispo, setHeuresDispo] = useState([]);
  const [idxSelectedHr, setIdxSelectedHr] = useState(-1);

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

  const getReservations = useCallback(
    async (e) => {
      setReservation({ ...reservation, date: e.target.value });
      try {
        let response = await axios.get(
          `${process.env.REACT_APP_BACKEND_RESERVATIONS_URL}/${new Date(
            e.target.value
          )}/${terrain.id}`
        );
        setHeuresDispo(response.data);
      } catch (error) {}
    },
    [reservation, setReservation, terrain.id]
  );

  const heurePlusOne = useCallback((heure) => {
    let time = new Date("1970-01-01T" + heure);
    let min =
      time.getMinutes() > 9 ? time.getMinutes() : "0" + time.getMinutes();
    let hr =
      time.getHours() + 1 > 9
        ? time.getHours() + 1
        : "0" + (time.getHours() + 1);
    return `${hr}:${min}`;
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
            value="hommes"
            onChange={() => setReservation({ ...reservation, genre: "hommes" })}
          />{" "}
          Hommes
          <input
            type="radio"
            name="genre"
            className="add-reservation-genreF"
            value="femmes"
            onChange={() => setReservation({ ...reservation, genre: "femmes" })}
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
              setReservation({
                ...reservation,
                nbrJoueurManq: parseInt(e.target.value),
              })
            }
          />
        </div>

        <div className="add-reservation-info add-reservation-info-joueurs">
          <div>
            <label className="add-reservation-label">Les joueurs</label>
            <input
              type="text"
              autoComplete="off"
              name="nom-joueur"
              className="add-reservation-input"
              placeholder="Nom complet"
              value={nomJoueur}
              onChange={(e) => getUsers(e.target.value)}
            />
          </div>

          {selectedJoueurs.length !== 0 && (
            <div className="list-joueurs">
              {selectedJoueurs
                .filter(
                  (selectedJoueur) =>
                    selectedJoueur.id !== userInfo().id &&
                    !reservation.idJoueurs.includes(selectedJoueur.id)
                )
                .map((selectedJoueur) => (
                  <span
                    key={selectedJoueur.id}
                    onClick={() => {
                      setReservation({
                        ...reservation,
                        idJoueurs: [
                          ...reservation.idJoueurs,
                          selectedJoueur.id,
                        ],
                      });
                      setJoueurs([...joueurs, selectedJoueur]);
                      setNomJoueur("");
                      setSelectedJoueurs([]);
                    }}
                  >
                    {selectedJoueur.nomComplet}
                  </span>
                ))}
            </div>
          )}
        </div>
      </div>

      {joueurs.length !== 0 && (
        <div className="add-reservation-list-joueurs">
          {joueurs.map((joueur, index) => (
            <span
              key={joueur.id}
              className="add-reservation-joueur"
              onClick={() => {
                joueurs.splice(index, 1);
                reservation.idJoueurs.splice(index, 1);
                setJoueurs([...joueurs]);
                setReservation({
                  ...reservation,
                  idJoueurs: [...reservation.idJoueurs],
                });
              }}
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
          min={new Date().toISOString().split("T")[0]}
          value={reservation.date}
          onChange={getReservations}
        />
      </div>

      {reservation.date && (
        <div className="add-reservation-heuresDispo">
          {heuresDispo.map((heure, idx) => (
            <span
              className={
                idx === idxSelectedHr
                  ? "add-reservation-heure active"
                  : "add-reservation-heure"
              }
              key={heure}
              onClick={() => {
                if (heure !== reservation.heure) {
                  setReservation({ ...reservation, heure });
                  setIdxSelectedHr(idx);
                } else {
                  setIdxSelectedHr(-1);
                  setReservation({ ...reservation, heure: "" });
                }
              }}
            >
              {customTime(heure) + " - " + customTime(heurePlusOne(heure))}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddReservation;
