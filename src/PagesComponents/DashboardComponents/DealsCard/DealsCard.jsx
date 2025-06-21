import React from "react";
import "./DealsCard.scss";

export default function DealsCard(
  {
    cardImgLeft,
    dealsText,
    DealsValue,
    advanceText,
    fontLg,
    smallText,
    largeText,
  },
  props
) {
  return (
    <div className="dealsCard whiteCard" {...props}>
      <div className="dealsCard_imgSec">
        <span className="dealsCard_imgSec_left">
          {cardImgLeft && (
            <img src={cardImgLeft} alt="Icon" width={60} height={60} />
          )}
        </span>
        <span className="dealsCard_imgSec_right">
          {dealsText && <h3>{dealsText}</h3>}
          {advanceText && <h3 style={{ marginBottom: 12 }}>{advanceText}</h3>}
        </span>
      </div>
      {smallText && (
        <p className="smallText">
          <span className="me-2" >{largeText}</span>
          {smallText}
        </p>
      )}
      <h2 className={fontLg ? "fontLg" : ""}>${DealsValue}</h2>
      {/* <div className="dealsCard_date">{dateValue} </div> */}
    </div>
  );
}
