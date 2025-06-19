import React, { useEffect, useState } from "react";
import "./RightSideBar.scss";
import "../DashboardComponents/FundedDealsDashboard/FundedDealsDashboard.scss";
import "../NewDealsComponent/NewDealsComponent.scss"
import { Button, Spin, Table } from "antd";
import ArrowRight from "../../Asset/Icons/arrow-right.svg";
import ButtonCustom from "../../Components/ButtonCustom/ButtonCustom";
import { useNavigate } from "react-router-dom";
import makeRequest from "../../Api/makeRequest";
import { newDealsColoms } from "../../Utilis/Constent";

export default function RightSidebarAgent() {
  const [dataSource, setDataSource] = useState();
  const [visibleCount, setVisibleCount] = useState(2);

  const navigate = useNavigate();

  const getNewDeals = async () => {
    const { data } = await makeRequest(
      "/investor/new-deals",
      "get",
      "",
      undefined,
      navigate
    );
    if (!Object.keys(data || []).length) return;

    const response = data.map((item, index) => ({
      ...item,
      key: index,
      Property_Citys: (
        <p className="customStyleTd">{item?.Property_City || "-"}</p>
      ),
      Inv_Income_per_Day: `$${item?.Inv_Income_per_Day.toFixed(2)}`,
      unique_deal_number1: item?.unique_deal_number1 || "-",
      click: (
        <Button
          onClick={() =>
            item?.investor_investing_in_deal_form
              ? window.open(
                item?.investor_investing_in_deal_form,
                "_blank",
                "width=750, height=600"
              )
              : null
          }
          className="borderedBtn"
        >
          Invest Now{" "}
        </Button>
      ),
    }));
    setDataSource(response);
  };

  useEffect(() => {
    getNewDeals();
  }, []);

  console.log("source is ", dataSource)

  return (
    <>
      <div className="textWithLink desktop-only">
        {/* <RightSideBar
        heading={"New Deals"}
        textData={textData}
        viewAll={viewAll()}
      /> */}
        <div className="fundedDealsDashboard">
          <div
            className="fundedDealsDashboard_wrapper whiteCard"
            style={{ margin: 0, padding: "34px 0 40px" }}
          >
            <div className="fundedDealsDashboard_wrapper_head">
              <h1 className="headingText" style={{ margin: 0 }}>
                New Deals
              </h1>
              <div className="viewAll" onClick={() => navigate("/new-deals")}>
                View All{" "}
                <img src={ArrowRight} alt="arrow" width={12} height={12} />
              </div>
            </div>
            <div className="fundedDealsDashboard_wrapper_table">
              {dataSource ? (
                <Table
                  className="commonTable bgThNone"
                  dataSource={dataSource || []}
                  columns={newDealsColoms}
                  pagination={false}
                />
              ) : (
                <div className="spinner">
                  <Spin />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile View */}
      <div className="newDealsComponent_mobile mobile-only">
        <div className="flex-delas mb-2">
          <p>New Deals</p>
          <a href="new-deals" rel="">See All</a>
        </div>
        {dataSource?.slice(0, visibleCount).map((ele, idx) => (
          <div key={idx} className="mobile-deal-card">
            <div className="deal-row">
              <div>
                <div className="deal-label">Agreement Number</div>
                <div className="deal-value">{ele?.unique_deal_number1 || "N/A"}</div>
              </div>
              <div>
                <div className="deal-label">City</div>
                <div className="deal-value">{ele?.Property_City}</div>
              </div>
              <div>
                <div className="deal-label">Per Day Income</div>
                <div className="deal-value">{ele?.Inv_Income_per_Day}</div>
              </div>
            </div>
            <Button className="invest-btn" onClick={ele.buttonClick}>
              INVEST NOW
            </Button>
          </div>
        ))}


      </div>
    </>

  );
}
