import axios from "axios";
import React, { useCallback, useState } from "react";
import { customTime } from "../../../utils/functions/Function";
import "./AddReservation.css";

const AddReservation = ({ reservation, setReservation, terrain }) => {
  const [nomJoueur, setNomJoueur] = useState("");
  const [selectedJoueurs, setSelectedJoueurs] = useState([]);
  const [joueurs, setJoueurs] = useState([]);
  const [heuresDispo, setHeuresDispo] = useState([]);

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

  const getReservations = useCallback(async (e) => {
    setReservation({ ...reservation, date: new Date(e.target.value)});
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_BACKEND_RESERVATIONS_URL}/${new Date(
          e.target.value
        )}/${terrain.id}`
      );
      setHeuresDispo(response.data);
    } catch (error) {}
  }, [reservation, setReservation, terrain.id]);

  const heurePlusOne = useCallback((heure) => {
    let time = new Date("1970-01-01T" + heure);
    if (time.getMinutes() > 9)
      return `${time.getHours() + 1}:${time.getMinutes()}`;
    return `${time.getHours() + 1}:0${time.getMinutes()}`;
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
              name="nom-joueur"
              className="add-reservation-input"
              placeholder="Nom complet"
              value={nomJoueur}
              onChange={(e) => getUsers(e.target.value)}
            />
          </div>

          {selectedJoueurs.length !== 0 && (
            <div className="list-joueurs">
              {selectedJoueurs.map((selectedJoueur) => (
                <span
                  key={selectedJoueur.id}
                  onClick={() => {
                    setReservation({
                      ...reservation,
                      idJoueurs: [...reservation.idJoueurs, selectedJoueur.id],
                    });
                    setJoueurs([...joueurs, selectedJoueur])
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
                joueurs.splice(index, 1)
                reservation.idJoueurs.splice(index, 1)
                setJoueurs([...joueurs])
                setReservation({
                  ...reservation,
                  idJoueurs: [...reservation.idJoueurs],
                })
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
          value={reservation.date}
          onChange={getReservations}
        />
      </div>

      {reservation.date && (
        <div className="add-reservation-heuresDispo">
          {heuresDispo.map((heure) => (
            <span
              className="add-reservation-heure"
              key={heure}
              onClick={()=>setReservation({...reservation, heure})}
            >
              {customTime(heure) + " - " + heurePlusOne(heure)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddReservation;
