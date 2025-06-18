import React from "react";
import "./InputCustom.scss";
const InputCustom = ({ type, label, placeholder, onChange }) => {
  return (
    <div className="customInput">
      {label && <label>{label}</label>}
      <input type={type} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default InputCustom;
