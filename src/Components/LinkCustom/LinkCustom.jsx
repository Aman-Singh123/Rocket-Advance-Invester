import React from "react";
import { Link } from "react-router-dom";
import "./LinkCustom.scss";

const LinkCustom = ({ text, to }) => {
  return (
    <div>
      <Link className="link" to={to} data-item={text}>
        {text}
      </Link>
    </div>
  );
};

export default LinkCustom;
