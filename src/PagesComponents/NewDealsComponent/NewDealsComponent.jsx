import React, { useEffect, useState } from "react";
import "./NewDealsComponent.scss";
import { Button, Pagination } from "antd";
import makeRequest from "../../Api/makeRequest";
import { useNavigate } from "react-router-dom";

export default function NewDealsComponent() {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState();
  const [total, setTotal] = useState();
  const [page, setPage] = useState(1);

  const getNewDeals = async () => {
    const { data, total } = await makeRequest(
      `/investor/new-deals?page=${page}`,
      "get",
      "",
      undefined,
      navigate
    );
    if (!Object.keys(data || []).length) return;
    setTotal(total);
    const response = data.map((item, index) => ({
      ...item,
      key: index,
      heading: item?.Property_City || "-",
      durationDaysValue: `${item?.Duration_of_Advance || "-"} days`,
      totalIncomeValue: `$${(item?.Investor_Income || "-").toLocaleString()}`,
      initialInvestVal: `$${(
        item?.Rocket_Advance_Contribution || "-"
      )?.toLocaleString()}`,
      buttonClick: () =>
        item?.investor_investing_in_deal_form
          ? window.open(
            item?.investor_investing_in_deal_form,
            "_blank",
            "width=750, height=600"
          )
          : null,
      perDayIncome: "Per day income ",
      durationDays: "Duration of days",
      totalIncome: "Total Income",
      initialInvest: "Initial investment amount",
      perDayIncomeVal: `$${item.Inv_Income_per_Day}`,
    }));
    setDataSource(response);
  };

  useEffect(() => {
    getNewDeals();
  }, [page]);

  

  const renderData = (heading, subHeading) => (
    <div className="newDealsComponent_wrapper_textContainer">
      <h5>{heading}</h5>
      <p>{subHeading}</p>
    </div>
  );

  return (
    <>
      {dataSource &&
        (dataSource.length ? (
          <>
            {/* Desktop View */}
            <div className="newDealsComponent desktop-only">
              {dataSource.map((ele, idx) => (
                <div key={idx} className="newDealsComponent_wrapper whiteCard">
                  <div className="newDealsComponent_wrapper_top">
                    <p>{ele.heading}</p>
                    <Button className="borderedBtn" onClick={ele.buttonClick}>
                      Invest Now
                    </Button>
                  </div>
                  {renderData(ele.perDayIncome, ele.perDayIncomeVal)}
                  <div className="newDealsComponent_wrapper_center">
                    {renderData(ele.durationDays, ele.durationDaysValue)}
                    {renderData(ele.totalIncome, ele.totalIncomeValue)}
                  </div>
                  <div className="newDealsComponent_wrapper_bottom">
                    <h4>{ele.initialInvest}</h4>
                    <h2>{ele.initialInvestVal}</h2>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile View */}
            <div className="newDealsComponent_mobile mobile-only">
              {dataSource.map((ele, idx) => (
                <div key={idx} className="mobile-deal-card">
                  <div className="deal-row">
                    <div>
                      <div className="deal-label">Agreement Number</div>
                      <div className="deal-value">{ele?.Deal_Number || "N/A"}</div>
                    </div>
                    <div>
                      <div className="deal-label">City</div>
                      <div className="deal-value">{ele?.heading}</div>
                    </div>
                    <div>
                      <div className="deal-label">Per Day Income</div>
                      <div className="deal-value">{ele?.perDayIncomeVal}</div>
                    </div>
                  </div>
                  <hr className="horizontal-line" />
                  <div className="deal-row">
                    <div>
                      <div className="deal-label">Duration of days</div>
                      <div className="deal-value">{ele?.durationDaysValue || "N/A"}</div>
                    </div>
                    <div>
                      <div className="deal-label">Total income </div>
                      <div className="deal-value">{ele?.totalIncomeValue}</div>
                    </div>
                    <div>
                      <div className="deal-label">Initial investment amount</div>
                      <div className="deal-value">{ele?.totalIncomeValue}</div>
                    </div>
                  </div>
                  <Button className="invest-btn" onClick={ele.buttonClick}>
                    INVEST NOW
                  </Button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              total={total}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
              current={page}
              onChange={setPage}
              simple
              showSizeChanger={false}
              defaultPageSize={10}
              defaultCurrent={1}
            />
          </>
        ) : (
          "No new deals found"
        ))}
    </>
  );
}
