import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { TbCircleCheck, TbCircleX } from "react-icons/tb";
import { userInfo } from "../../../constants/user";
import Modal from "../../../utils/modal/Modal";
import { getSuccessToast } from "../../../utils/toasts/Toast";
import "./ParticipationInvit.css";
import Reservation from "./reservation/Reservation";

//men be3d ma dak invité ki9bl tidkhl mol annonce y9bl dak soyed li t invita
const Invitation = () => {
  const [usersInvitations, setUsersInvitations] = useState([]);
  const [showReservation, setSowReservation] = useState(false);
  const [reservation, setReservation] = useState(false);
  const backend_url = process.env.REACT_APP_BACKEND_INVITATIONS_URL;

  useEffect(() => {
    getInvitationAccepted();
  }, []);

  const getInvitationAccepted = useCallback(async () => {
    try {
      let response = await axios.get(
        `${backend_url}/acceptedInivts/${userInfo().id}`
      );
      setUsersInvitations(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const accepteInvitation = useCallback(async (userInvitId) => {
    try {
      await axios.put(`${backend_url}/accepterByProp/${userInvitId}`);
      setUsersInvitations([])
      getInvitationAccepted();
      getSuccessToast('Invitation acceptée par succès')
    } catch (error) {
      console.log(error);
    }
  }, []);

  const refuserInvitation = useCallback(async (userInvitId) => {
    try{
      await axios.delete(`${backend_url}/refuserInvit/${userInvitId}`);
      setUsersInvitations([])
      getInvitationAccepted();
      getSuccessToast('Invitation refusée par succès')
    }catch(error){
      console.log(error);
    }
  }, []);

  function InvitationComponent({ invite, reservation, userInvitationId }) {
    return (
      <div className="invitation-participation">
        <div className="invitation-participation-userInfos">
          {invite.image ? (
            <img
              src={invite.image}
              alt="user"
              className="invitation-participation-userImage"
            />
          ) : (
            <img
              src="/images/userImage.png"
              alt="user"
              className="invitation-participation-userImage"
            />
          )}
          <span className="invitation-participation-userName">
            {invite.nomComplet}
          </span>
        </div>
        <div className="invitation-participation-icons">
          <TbCircleCheck
            className="invitation-participation-icon invitation-participation-icon-accept"
            onClick={() => accepteInvitation(userInvitationId)}
          />
          <TbCircleX className="invitation-participation-icon invitation-participation-icon-refuse" onClick={()=>refuserInvitation(userInvitationId)}/>
        </div>

        <span
          className="invitation-participation-view"
          onClick={() => {
            setReservation(reservation);
            setSowReservation(true);
          }}
        >
          Voir réservation
        </span>
      </div>
    );
  }

  return (
    <>
      {usersInvitations.length > 0 && <div className="invitations-participations">
        <div className="invitations-participations-title">
          Joueurs invités à vos réserations
        </div>
        <div className="invitations-participations-content">
          {usersInvitations.map((userInvitation) => (
            <InvitationComponent
              key={userInvitation.id}
              invite={userInvitation.invite}
              reservation={userInvitation.invitation.annonce.reservation}
              userInvitationId={userInvitation.id}
            />
          ))}
        </div>
      </div>}
      {showReservation && (
        <Modal openModal={setSowReservation} title="La réservation">
          <Reservation reservation={reservation} />
        </Modal>
      )}
    </>
  );
};

export default Invitation;
