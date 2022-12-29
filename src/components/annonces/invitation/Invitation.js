import React, { useState } from "react";
import "./Invitation.css";

const Invitation = ({joueurs, setJoueurs}) => {
  const [nomJoueur, setNomJoueur] = useState("");

  return (
    <div className="add-invit">
      <div className="add-invit-input">
        <input
          type="text"
          placeholder="nom Complet"
          className="add-invit-input-nomJoueur"
          value={nomJoueur}
          onChange={(e) => setNomJoueur(e.target.value)}
        />
        {nomJoueur && (
          <div className="add-invit-joueurs">
            <span className="add-invit-nomJoueur">Joueur Joueur</span>
            <span className="add-invit-nomJoueur">Joueur Joueur</span>
            <span className="add-invit-nomJoueur">Joueur Joueur</span>
            <span className="add-invit-nomJoueur">Joueur Joueur</span>
            <span className="add-invit-nomJoueur">Joueur Joueur</span>
          </div>
        )}
      </div>

      {joueurs.length !== 0 && (
        <div className="add-invit-selectedJoueurs">
          <span className="add-invit-selectedJoueur">Joueur Joueur</span>
          <span className="add-invit-selectedJoueur">Joueur Joueur</span>
          <span className="add-invit-selectedJoueur">Joueur Joueur</span>
          <span className="add-invit-selectedJoueur">Joueur Joueur</span>
          <span className="add-invit-selectedJoueur">Joueur Joueur</span>
        </div>
      )}
    </div>
  );
};

export default Invitation;
