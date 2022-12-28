import React from "react";
import "./AddAnnonce.css";

const AddAnnonce = ({ descriptionAnnnoce, setDescriptionAnnnoce }) => {
  return (
    <div className="add-annonce">
      <label className="add-annonce-label">Description</label>
      <textarea
        className="add-annonce-desc"
        value={descriptionAnnnoce}
        onChange={(e) => setDescriptionAnnnoce(e.target.value)}
      />
    </div>
  );
};

export default AddAnnonce;
