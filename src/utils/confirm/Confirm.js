import React from "react";
import "./Confirm.css";

const Confirm = ({ title, parag, setShowConfirm, confirmClick }) => {
  return (
    <div className="confirm-background">
      <div className="confirm-container">
        <h2 className="confirm-title">{title}</h2>
        <p className="confirm-parag">{parag}</p>
        <div className="confirm-buttons">
          <button
            className="confirm-button confirm-btn-annuler"
            onClick={() => setShowConfirm(false)}
          >
            Annuler
          </button>
          <button
            className="confirm-button confirm-btn-confirmer"
            onClick={() => confirmClick()}
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
