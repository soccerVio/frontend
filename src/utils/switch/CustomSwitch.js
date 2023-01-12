
import React from "react";
import Switch from "react-switch";

const CostumSwitch = ({ setChecked, checked }) => {
  return (
    <Switch
      onChange={(e) => setChecked(e)}
      checked={checked}
      onColor="#016b32"
      width={33}
      height={17}
    />
  );
};

export default CostumSwitch;
