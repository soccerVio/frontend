import React, { useState, useEffect, useCallback } from 'react';
import './Profile.css';
import axios from 'axios';
import { userInfo } from '../../constants/user';
import Modal from '../../utils/modal/Modal';
import { get } from 'http';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    getUser();
  }, []);

  const getUser = useCallback(async () => {
    
    try {
      let response = await axios.get(`http://localhost:8081/api/v1/users/id/${userInfo().id}`);
      setUser(response.data);
      // console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const editUser = useCallback(async () => {
    if(password !== ''){
      if(password !== confirmPassword)
        //MSG ERROR
        console.log('error');
      else{
        try {
          setShowModal(false);
        } catch (e) {
          console.log(e);
        }
      }
    }
    
  }, []);

  return (
    <>
      {user && (
        <div className="container-page-with-bg">
          <div className="container-profil">
            <img className="profil-pic" src="/images/player.jpg" />
            <div className="profil-content">
              <div className="profil-info">
                <span className="font">Nom Complet :</span>
                {user.nomComplet}
              </div>
              <div className="profil-info">
                <span className="font">Nom d'utlisateur :</span>
                {user.username}
              </div>
              <div className="profil-info">
                <span className="font">Email :</span>
                {user.email}
              </div>
              <div className="profil-info">
                <span className="font">Numéro de Téléphone :</span> {user.numTel}
              </div>
              <div className="profil-info">
                <span className="font">Date de création : </span>
                {user.dateCreation.split('T')[0]}
              </div>
              <div className="profil-info">
                <button className="profil-edit-btn" onClick={() => setShowModal(true)}>
                  Editer Profile
                </button>
              </div>
            </div>
          </div>
          {showModal && (
            <Modal openModal={setShowModal} title="Modifier le profil" onEnregistClick={editUser} showRegisterBtn>
              <div className="edit-user">
                <div className="user-form-input">
                  <label>Nom Complet :</label>
                  <input className="form-input" type="text" value={user.nomComplet} />
                </div>
                <div className="user-form-input">
                  <label>Nom d'utlisateur :</label>
                  <input className="form-input" type="text" value={user.username} />
                </div>
                <div className="user-form-input">
                  <label>Email :</label>
                  <input className="form-input" type="text" value={user.email} />
                </div>

                <div className="user-form-input">
                  <label>Numéro de Téléphone :</label>
                  <input className="form-input" type="text" value={user.numTel} />
                </div>
                <div className="user-form-input">
                  <label>Mot de passe :</label>
                  <input className="form-input" type="password" value={password} />
                </div>
                <div className="user-form-input">
                  <label>Confirm mot de passe :</label>
                  <input className="form-input" type="password" value={confirmPassword} />
                </div>
              </div>
            </Modal>
          )}
        </div>
      )}
    </>
  );
};
export default Profile;
