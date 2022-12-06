import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./Modal.css";

const Modal = ({ openModal, title, children, onEnregistClick }) => {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <AiOutlineCloseCircle
            className="modal-icon-close"
            onClick={() => openModal(false)}
          />
        </div>
        <hr />
        <div className="modal-body">{children}</div>
        <hr />
        <div className="modal-footer">
          <button
            className="modal-btn-close modal-btn"
            onClick={() => openModal(false)}
          >
            Annuler
          </button>
          <button className="modal-btn-enregistrer modal-btn" onClick={onEnregistClick}>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
