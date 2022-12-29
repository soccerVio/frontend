import React, { useCallback, useState } from "react";
import InvitationAdd from "../../components/annonces/invitation/Invitation";
import Modal from "../../utils/modal/Modal";
import "./Annoces.css";

const Annonces = () => {
  const [showInvitationAdd, setShowInvitationAdd] = useState(false);
  const [joueurs, setJoueurs] = useState([]);

  const addInvitation = useCallback(() => {}, []);

  function AnnonceComponent() {
    return (
      <div className="annonce-component">
        <div className="annonce-userInfos">
          <img
            src="/images/userImage.jpg"
            alt="user"
            className="annonce-userImage"
          />
          <span className="annonce-userName">joueur joueur</span>
        </div>
        <p className="annonce-description">
          description description description description description
          description description description description description
          description description description description description
          description description description description description
          description description description description description
        </p>
        <span>Date de réservation : 24/12/2012 à 21:00</span>
        <span>Nombre de joueurs manquants : 8 joueurs</span>
        <span>Dernier délai : 24/12/2012 à 21:00</span>
        <span
          className="annonce-reservationView"
          onClick={() => setShowInvitationAdd(true)}
        >
          Inviter des utilisateur
        </span>
        <span className="annonce-reservationView">Voir terrain</span>
        <button className="annonce-ParticiperBtn">Participer</button>
      </div>
    );
  }

  return (
    <>
      <div className="annonces-list">
        <AnnonceComponent />
        <AnnonceComponent />
        <AnnonceComponent />
      </div>
      {showInvitationAdd && (
        <Modal
          openModal={setShowInvitationAdd}
          title="Choisissez les joueurs"
          showRegisterBtn
          onEnregistClick={addInvitation}
        >
          <InvitationAdd joueurs={joueurs} setJoueurs={setJoueurs} />
        </Modal>
      )}
    </>
  );
};

export default Annonces;
