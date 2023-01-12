import React from "react";
import CostumSwitch from "../../../utils/switch/CustomSwitch";
import "./AddTerrain.css";

const AddTerrain = ({ terrain, setImages, setTerrain }) => {
  return (
    <div className="modal-form">
      <div className="modal-form-rowComp">
        <label className="modal-form-label" htmlFor="titre">
          Titre
        </label>
        <input
          id="titre"
          type="text"
          className="modal-form-input"
          value={terrain.titre}
          onChange={(e) =>
            setTerrain({
              ...terrain,
              titre: e.target.value,
            })
          }
        />
      </div>

      <div className="modal-form-row">
        <div className="modal-form-halfRow">
          <label className="modal-form-label" htmlFor="image">
            Images du terrain
          </label>
          <input
            type="file"
            id="image"
            className="modal-form-input modal-form-input-file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(e.target.files)}
          />
        </div>

        <div className="modal-form-halfRow">
          <label className="modal-form-label" htmlFor="adresse">
            Adresse
          </label>
          <input
            id="adresse"
            type="text"
            className="modal-form-input"
            value={terrain.adresse}
            onChange={(e) =>
              setTerrain({
                ...terrain,
                adresse: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="modal-form-row">
        <div className="modal-form-halfRow">
          <label className="modal-form-label" htmlFor="heureO">
            Heure d'ouverture
          </label>
          <input
            type="time"
            id="heureO"
            className="modal-form-input"
            value={terrain.heureO}
            onChange={(e) =>
              setTerrain({ ...terrain, heureO: e.target.value + ":00" })
            }
          />
        </div>

        <div className="modal-form-halfRow">
          <label className="modal-form-label" htmlFor="heureF">
            Heure de fermeture
          </label>
          <input
            type="time"
            id="heureF"
            className="modal-form-input"
            value={terrain.heureF}
            onChange={(e) =>
              setTerrain({ ...terrain, heureF: e.target.value + ":00" })
            }
          />
        </div>
      </div>

      <div className="modal-form-row">
        <div className="modal-form-halfRow">
          <label className="modal-form-label" htmlFor="prixHr">
            Prix par heure
          </label>
          <input
            type="number"
            id="prixHr"
            className="modal-form-input"
            min="10"
            value={terrain.prixHr}
            onChange={(e) =>
              setTerrain({
                ...terrain,
                prixHr: parseFloat(e.target.value),
              })
            }
          />
        </div>

        <div className="modal-form-halfRow">
          <label className="modal-form-label" htmlFor="nbrJoueur">
            Joueur par équipe
          </label>
          <select
            id="nbrJoueur"
            className="modal-form-input"
            value={terrain.nbrJoueur}
            onChange={(e) =>
              setTerrain({ ...terrain, nbrJoueur: e.target.value })
            }
          >
            <option disabled value="">
              Choisissez le nombre de joueurs par équipe
            </option>
            <option value="5">5 joueurs par équipe</option>
            <option value="6">6 joueurs par équipe</option>
            <option value="7">7 joueurs par équipe</option>
            <option value="8">8 joueurs par équipe</option>
            <option value="9">9 joueurs par équipe</option>
            <option value="10">10 joueurs par équipe</option>
            <option value="11">11 joueurs par équipe</option>
          </select>
        </div>
      </div>

      <div className="modal-form-row">
        <div className="modal-form-halfRow modal-form-switch">
          <label htmlFor="douche" className="modal-form-switch-label">
            Avec douche
          </label>
          <CostumSwitch
            setChecked={(e) => setTerrain({ ...terrain, avecDouche: e })}
            checked={terrain.avecDouche}
            id="douche"
          />
        </div>

        <div className="modal-form-halfRow modal-form-switch">
          <label htmlFor="assure" className="modal-form-switch-label">
            Assuré
          </label>
          <CostumSwitch
            setChecked={(e) => setTerrain({ ...terrain, assure: e })}
            checked={terrain.assure}
            id="assure"
          />
        </div>
      </div>

      {/*<div className="modal-form-row">
        <div className="modal-form-halfRow">
          <label className="modal-form-label" htmlFor="dureeHr">
            Durée du match (heures)
          </label>
          <select
            id="dureeHr"
            className="modal-form-input"
            value={terrain.dureeMatchHr}
            onChange={(e) =>
              setTerrain({ ...terrain, dureeMatchHr: parseInt(e.target.value) })
            }
          >
            <option disabled value="">
              Choisissez la durée d'un match (heures)
            </option>
            <option value="0">0 Heure</option>
            <option value="1">1 Heure</option>
            <option value="2">2 Heures</option>
            <option value="3">3 Heures</option>
          </select>
        </div>

        <div className="modal-form-halfRow">
          <label className="modal-form-label" htmlFor="dureeMin">
            Durée du match (minutes)
          </label>
          <select
            id="dureeMin"
            className="modal-form-input"
            value={terrain.dureeMatchMin}
            onChange={(e) =>
              setTerrain({
                ...terrain,
                dureeMatchMin: parseInt(e.target.value),
              })
            }
          >
            <option disabled value="">
              Choisissez la durée d'un match (minutes)
            </option>
            <option value="0">0 minute</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
          </select>
        </div>
          </div>*/}

      <div className="modal-form-rowComp">
        <label className="modal-form-label" htmlFor="description">
          Desription
        </label>
        <textarea
          id="description"
          className="modal-form-input modal-form-textarea"
          value={terrain.description}
          onChange={(e) =>
            setTerrain({
              ...terrain,
              description: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
};

export default AddTerrain;
