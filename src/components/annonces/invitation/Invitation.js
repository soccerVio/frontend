import axios from "axios";
import React, { useState } from "react";
import { useCallback } from "react";
import "./Invitation.css";
import { userInfo } from "../../../constants/user";

const Invitation = ({ inviteIds, setInviteIds, propAnnonce }) => {
  const [invites, setInvites] = useState([]);
  const [nomJoueur, setNomJoueur] = useState("");
  const [selectedJoueurs, setSelectedJoueurs] = useState([]);
  const userId = userInfo().id;

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
    <div className="add-invit">
      <div className="add-invit-input">
        <input
          type="text"
          placeholder="nom Complet"
          className="add-invit-input-nomJoueur"
          value={nomJoueur}
          onChange={(e) => getUsers(e.target.value)}
        />

        {selectedJoueurs.length > 0 && (
          <div className="add-invit-joueurs">
            {selectedJoueurs
              .filter(
                (selectedJoueur) =>
                  selectedJoueur.id !== userId &&
                  !inviteIds.includes(selectedJoueur.id) &&
                  selectedJoueur.id !== propAnnonce
              )
              .map((selectedJoueur) => (
                <span
                  className="add-invit-nomJoueur"
                  key={selectedJoueur.id}
                  onClick={() => {
                    setInviteIds([...inviteIds, selectedJoueur.id]);
                    setInvites([...invites, selectedJoueur]);
                    setSelectedJoueurs([]);
                    setNomJoueur("");
                  }}
                >
                  {selectedJoueur.nomComplet}
                </span>
              ))}
          </div>
        )}
      </div>

      {invites.length !== 0 && (
        <div className="add-invit-selectedJoueurs">
          {invites.map((invite, index) => (
            <span
              key={invite.id}
              className="add-invit-selectedJoueur"
              onClick={() => {
                invites.splice(index, 1);
                inviteIds.splice(index, 1);
                setInvites([...invites]);
                setInviteIds(inviteIds);
              }}
            >
              {invite.nomComplet}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Invitation;
