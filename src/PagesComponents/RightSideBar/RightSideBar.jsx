import React from "react";
import "./RightSideBar.scss";

export default function RightSideBar({ heading, textData, viewAll }) {
  return (
    <div className="rightSideBar whiteCard">
      <div className="rightSideBar_head">
        {heading && <h1>{heading}</h1>}
        {viewAll && viewAll}
      </div>
      {textData.map((ele, index) => (
        <div key={index} className="rightSideBar_container">
          {ele.date}
          {ele.address}
          {ele.investBtn}
        </div>
      ))}
    </div>
  );
}
