import axios from "axios";
import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { TbCircleCheck, TbCircleX } from "react-icons/tb";
import Modal from "../../../utils/modal/Modal";
import "./ParticipationInvit.css";
import Reservation from "./reservation/Reservation";
import { userInfo } from "../../../constants/user";
import { getSuccessToast } from "../../../utils/toasts/Toast";
import { useNavigate } from "react-router";

//chi hed invitak bach tl3b match w kaskhl bavh t9bl wla la
const Invite = () => {
  const [usersInvitations, setUsersInvitations] = useState([]);
  const [showReservation, setSowReservation] = useState(false);
  const [reservation, setReservation] = useState(false);
  const backend_url = process.env.REACT_APP_BACKEND_INVITATIONS_URL;

  useEffect(() => {
    getInvitationNotAccepted();
  }, []);

  const getInvitationNotAccepted = useCallback(async () => {
    try {
      let response = await axios.get(`${backend_url}/${userInfo().id}`);
      setUsersInvitations(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const accepteInvitation = useCallback(async (userInvitId) => {
    try{
      await axios.put(`${backend_url}/accepterByInvite/${userInvitId}`);
      setUsersInvitations([])
      getInvitationNotAccepted();
      getSuccessToast('Invitation acceptée par succès')
    }catch(error){
      console.log(error);
    }
  }, []);

  const refuserInvitation = useCallback(async (userInvitId) => {
    try{
      await axios.delete(`${backend_url}/refuserInvit/${userInvitId}`);
      setUsersInvitations([])
      getInvitationNotAccepted();
      getSuccessToast('Invitation refusée par succès')
    }catch(error){
      console.log(error);
    }
  }, []);
  const navigate = useNavigate();
  function InviteComponent({ user, reservation, userInvitationId }) {
    return (
      <div className="invitation-participation">
        <div className="invitation-participation-userInfos" onClick={() =>
            navigate("/profile", {
              state: {
                id: user.id,
                forAuthUser: false,
              },
            })
          }>
          {user.image ? (
            <img
              src={user.image}
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
            {user.nomComplet}
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
      {usersInvitations.length > 0 && (
        <div className="invitations-participations">
          <div className="invitations-participations-title">
            Invitations pour des matches
          </div>
          <div className="invitations-participations-content">
            {usersInvitations.map((userInvitation) => (
              <InviteComponent
                key={userInvitation.id}
                user={userInvitation.invitation.invitant}
                reservation={userInvitation.invitation.annonce.reservation}
                userInvitationId={userInvitation.id}
              />
            ))}
          </div>
        </div>
      )}
      {showReservation && (
        <Modal openModal={setSowReservation} title="La réservation">
          <Reservation reservation={reservation} />
        </Modal>
      )}
    </>
  );
};

export default Invite;
