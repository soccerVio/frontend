import React from "react";
import "./Confirm.css";

const Confirm = ({ setShowConfirm, deleteClick }) => {
  return (
    <div className="confirm-background">
      <div className="confirm-container">
        <h2 className="confirm-title">Vous êtes sur?</h2>
        <p className="confirm-parag">
          Si vous confirmez vous ne pouvez revenire en arrière
        </p>
        <div className="confirm-buttons">
          <button
            className="confirm-button confirm-btn-annuler"
            onClick={() => setShowConfirm(false)}
          >
            Annuler
          </button>
          <button className="confirm-button confirm-btn-confirmer" onClick={()=>deleteClick()}>
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
