import React from "react";
import CostumSwitch from "../../../utils/switch/CustomSwitch";
import cities from "../../../files/cities.json";

const AddTerrain = ({ terrain, setImage, setTerrain }) => {
  return (
    <div className="modal-form">
      <div className="modal-form-row">
        <div className="modal-form-halfRow">
          <label className="modal-form-label" htmlFor="image">
            Image du terrain
          </label>
          <input
            type="file"
            id="image"
            className="modal-form-input modal-form-input-file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="modal-form-halfRow">
          <label className="modal-form-label" htmlFor="ville">
            Ville
          </label>
          <select
            id="ville"
            className="modal-form-input"
            value={terrain.ville}
            onChange={(e) => setTerrain({ ...terrain, ville: e.target.value })}
          >
            <option disabled value="">
              Choisissez la ville du terrain
            </option>
            {cities.names.map((name) => (
              <option value={name} key={name}>
                {name}
              </option>
            ))}
          </select>
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
          <input
            type="number"
            id="nbrJoueur"
            className="modal-form-input"
            value={terrain.nbrJoueur}
            onChange={(e) =>
              setTerrain({
                ...terrain,
                nbrJoueur: parseInt(e.target.value),
              })
            }
          />
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
