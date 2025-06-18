import React from "react";
import "./ButtonCustom.scss";
export default function ButtonCustom({
  label,
  customClass,
  onClick,
  isDisable,
  customHeight
}) {
  return (
    <div className={`customButton ${customClass ? customClass : ""}`}>
      <button disabled={isDisable} onClick={onClick} className={customHeight ? "customHeight" : ""}>
        {label}
      </button>
    </div>
  );
}
