import React, { useEffect, useState } from "react";
import DealsCard from "./DealsCard";
import "./DealsCard.scss";
import CloseDealsIcon from "../../../Asset/Icons/CloseDeals.svg";
import TotalCommision from "../../../Asset/Icons/TotalCommision.svg";
import TotalCommisionBlue from "../../../Asset/Icons/TotalCommisionBlue.svg";
import ChecklistIcon from "../../../Asset/Icons/ChecklistIcon.svg";
import FIleIcon from "../../../Asset/Icons/FileIcon.svg";
import makeRequest from "../../../Api/makeRequest";
import { useNavigate } from "react-router-dom";

export default function DealsContainer() {
  const navigate = useNavigate();
  const [
    { closedDeals, fundedDealsAndProjection, investorIncome },
    setCardDetails,
  ] = useState([]);

  const [{ count }, setNewDeal] = useState({});

  const getInvestorStat = async () => {
    const { data } = await makeRequest("/investor/stats", "get", "", undefined, navigate);
    if (!Object.keys(data || []).length) return;
    setCardDetails(data);
  };

  const getNewDealStat = async () => {
    const { data } = await makeRequest("/investor/new-deals-stats", "get", "", undefined, navigate);
    if (!Object.keys(data || []).length) return;
    setNewDeal(data);
  };

  useEffect(() => {
    getInvestorStat();
    getNewDealStat();
  }, []);

  return (
    <div className="dealsContainer">
      <div className="dealsContainer_leftWrapper">
        <DealsCard
          cardImgLeft={FIleIcon}
          dealsText={"Funded Deals"}
          DealsValue={
            fundedDealsAndProjection
              ? fundedDealsAndProjection?.amount?.toLocaleString()
              : 0
          }
          dateValue={"From last month (January 1, 2023) "}
          smallText={"Deals"}
          largeText={
            fundedDealsAndProjection ? fundedDealsAndProjection?.count : 0
          }
        />
        <DealsCard
          cardImgLeft={TotalCommisionBlue}
          dealsText={"Projection of income"}
          DealsValue={
            fundedDealsAndProjection
              ? fundedDealsAndProjection?.amount?.toLocaleString()
              : 0
          }
          dateValue={"From last month (January 1, 2023) "}
          smallText={"Projection of closing deals"}
          largeText={
            fundedDealsAndProjection ? fundedDealsAndProjection?.count : 0
          }
        />
      </div>
      <div className="dealsContainer_rightWrapper">
        <DealsCard
          cardImgLeft={CloseDealsIcon}
          dealsText={"Closed Deals"}
          DealsValue={closedDeals ? closedDeals?.amount?.toLocaleString() : 0}
          dateValue={"From last month (January 1, 2023) "}
          smallText={"Deals"}
          largeText={closedDeals ? closedDeals?.count : 0}
        />
        <div className="smallCards">
          <div className="smallCards_container">
            <div className="smallCards_container_top">
              <div className="smallCards_container_left">
                <img src={TotalCommision} alt="Icon" />
              </div>
              <div className="smallCards_container_right">
                <h3>Income</h3>
                <h1 className="fontStyle32Base" style={{ color: "#d82f4a" }}>
                  $
                  {investorIncome
                    ? investorIncome?.amount?.toLocaleString()
                    : 0}
                </h1>
              </div>
            </div>
            {/* <p className="smallCards_container_footer">
              From last month (January 1, 2023){" "}
            </p> */}
          </div>
          <div className="smallCards_container">
            <div className="smallCards_container_top">
              <div className="smallCards_container_left">
                <img src={ChecklistIcon} alt="Icon" />
              </div>
              <div className="smallCards_container_right">
                <h3>New Deals</h3>
                <h1>
                  {count ? count : 0}
                  <span>Deals</span>
                </h1>
              </div>
            </div>
            {/* <p className="smallCards_container_footer">
              From last month (January 1, 2023){" "}
            </p> */}
          </div>
        </div>
      </div>
      {/* {data.map((ele, index) => (
        <DealsCard
          key={index}
          cardImgLeft={ele.icon}
          dealsText={ele.dealsText}
          DealsValue={ele.DealsValue}
          dateValue={ele.dateValue}
          dots={ele.dots}
          smallText={ele.smallText}
        />
      ))} */}
    </div>
  );
}
