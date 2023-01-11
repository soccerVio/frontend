import React from "react";
import "./Accueil.css";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const Accueil = () => {
  return (
    <div className="container-page container-accueil">
      <div className="accueil">
        <div className="overlay"></div>
        <div className="accueil-content">
          <h1 className="accueil-title">
            <p className="up">BONJOUR!</p>
            <p className="down">Bienvenue à SoccerVio</p>
          </h1>
          <p className="accueil-subtitle">RESERVEZ ET JOUEZ AVEC VOS AMIS</p>
        </div>
      </div>

      <div className="accueil-apropos">
        <img
          alt="player"
          src="/images/player.jpg"
          className="accueil-apropos-image"
        />
        <div className="accueil-apropos-content">
          <p className="accueil-apropos-content-title">A PROPOS DE NOUS</p>
          <p className="accueil-apropos-content-parag">
            Dans chaque ville, rue et partout, on trouve des gens qui veulent
            jouer au football avec leurs amis, ce qui est devenu un peu
            difficile maintenant, car il est devenu difficile de trouver un
            terrain vacant pour jouer, ou même des gens avec qui jouer, et
            parfois vous trouver le terrain, mais l'équipe est incomplète. Même
            le propriétaire du terrain n'est pas connu dans toute la ville où se
            trouve le terrain, en particulier les terrain éloignés des zones
            résidentielles. Toutes ces difficultés sont résolues par notre
            application SoccerVio où il sera facile pour chacun de trouver un
            terrain proche de son domicile ou de trouver une équipe incomplète
            pour jouer, ainsi que les propriétaires des terrains, leurs terrains
            seront deviennent visibles par des personnes à plusieurs endroits.
          </p>
        </div>
      </div>

      <div className="accueil-services">
        <p className="accueil-services-title">NOS SERVICES</p>
        <div className="accueil-services-content">
          <div className="accueil-service">
            <img
              alt="terrain"
              src="/images/stade.png"
              className="accueil-service-icon"
            />
            <p className="accueil-service-name">Terrains</p>
            <p className="accueil-service-parag">
              Notre application vous offre une gestion complète de tous vos
              terrains
            </p>
          </div>
          <div className="accueil-service">
            <img
              alt="terrain"
              src="/images/reservation.png"
              className="accueil-service-icon"
            />
            <p className="accueil-service-name">Reservations</p>
            <p className="accueil-service-parag">
              Notre application vous permet de réserver des terrain le plus
              proche de vous
            </p>
          </div>
          <div className="accueil-service">
            <img
              alt="terrain"
              src="/images/match.png"
              className="accueil-service-icon"
            />
            <p className="accueil-service-name">Matchs</p>
            <p className="accueil-service-parag">
              Notre application vous permet de jouer des match après la
              réservation du terrain
            </p>
          </div>
          <div className="accueil-service">
            <img
              alt="terrain"
              src="/images/invitation.png"
              className="accueil-service-icon"
            />
            <p className="accueil-service-name">Invitations</p>
            <p className="accueil-service-parag">
              Notre application vous permet d'inviter vos amis pour jouer des
              matchs
            </p>
          </div>
        </div>
      </div>

      <div className="accueil-chiffres">
        <p className="accueil-chiffres-title">NOS CHIFFRES</p>
        <div className="accueil-chiffres-content">
          <div className="accueil-chiffre">
            <img
              alt="terrain"
              src="/images/stade.png"
              className="accueil-chiffre-icon"
            />
            <p className="accueil-chiffre-name">Terrains</p>
            <p className="accueil-chiffre-parag">70</p>
          </div>
          <div className="accueil-chiffre">
            <img
              alt="terrain"
              src="/images/reservation.png"
              className="accueil-chiffre-icon"
            />
            <p className="accueil-chiffre-name">Reservations</p>
            <p className="accueil-chiffre-parag">240</p>
          </div>
          <div className="accueil-chiffre">
            <img
              alt="terrain"
              src="/images/match.png"
              className="accueil-chiffre-icon"
            />
            <p className="accueil-chiffre-name">Matchs</p>
            <p className="accueil-chiffre-parag">180</p>
          </div>
          <div className="accueil-chiffre">
            <img
              alt="terrain"
              src="/images/invitation.png"
              className="accueil-chiffre-icon"
            />
            <p className="accueil-chiffre-name">Invitations</p>
            <p className="accueil-chiffre-parag">320</p>
          </div>
        </div>
      </div>

      <div className="accueil-footer">
        <div className="accueil-footer-coyright">Copyright 2023 © DevCRUD</div>
        <div className="accueil-footer-socialMedia">
          <FiFacebook className="accueil-footer-socialMedia-icon" />
          <FiTwitter className="accueil-footer-socialMedia-icon" />
          <FiInstagram className="accueil-footer-socialMedia-icon" />
          <FaWhatsapp className="accueil-footer-socialMedia-icon" />
        </div>
      </div>
    </div>
  );
};

export default Accueil;
