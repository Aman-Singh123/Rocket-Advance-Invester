import React, { useEffect, useState } from "react";
import "../../PagesComponents/DashboardComponents/FundedDealsDashboard/FundedDealsDashboard.scss";
import { Pagination, Select, Table } from "antd";
import FilterIcon from "../../Asset/Icons/FilterIcon.svg";
import makeRequest from "../../Api/makeRequest.js";
import {
  formatDate,
  getDate,
  isValue,
  numberWithCommas,
  renameStatus,
  stateClass,
} from "../../Utilis/Constent.jsx";
import { useNavigate } from "react-router-dom";

export default function FundedDealsDashboard() {
  const [allDealsData, setAllDealsData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [filter, setFilter] = useState("all");
  const [total, setTotal] = useState();
  const [page, setPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(4);
  const navigate = useNavigate();
  const columns = [
    {
      title: (
        <span>
          Agreement <br /> Number
        </span>
      ),
      dataIndex: "unique_deal_number1",
      key: "unique_deal_number1",
      fixed: "left",
    },
    {
      title: "Property Address",
      dataIndex: "Property_Street_Address",
      key: "Property_Street_Address",
    },

    {
      title: "Closing Date",
      dataIndex: "Closing_Date",
      key: "Closing_Date",
    },
    {
      title: "Due Date",
      dataIndex: "Due_Date",
      key: "Due_Date",
    },
    {
      title: (
        <span>
          Date of <br /> advance
        </span>
      ),
      dataIndex: "Date_of_Advance",
      key: "Date_of_Advance",
    },
    {
      title: "Status",
      dataIndex: "Stage",
      key: "Stage",
    },
    {
      title: (
        <span>
          Commission <br /> Advanced
        </span>
      ),
      dataIndex: "Rocket_Advance_Net_Advance",
      key: "Rocket_Advance_Net_Advance",
    },
    {
      title: (
        <span>
          Income <br /> Made
        </span>
      ),
      dataIndex: "Investor_Income",
      key: "Investor_Income",
    },
  ];

  const getDeals = async () => {
    const { data, total } = await makeRequest(`/investor/funded-deals`, "get", "", undefined, navigate);
    if (!Object.keys(data || []).length) return;
    setTotal(total);

    const response = data.map((item, index) => {
      const rawStage = item?.Stage; // original string
      return {
        ...item,
        key: index,
        rawStage, // 👈 Save original stage here
        Closing_Date: formatDate(item?.Closing_Date) || "-",
        Due_Date: formatDate(item?.Due_Date) || "-",
        Date_of_Advance: formatDate(item?.Date_of_Advance) || "-",
        Rocket_Advance_Net_Advance: `$${numberWithCommas(item?.Rocket_Advance_Net_Advance.toFixed(2)) || "-"}`,
        Property_Street_Address: (
          <span style={{ maxWidth: 152, display: "block" }}>
            {item?.Property_Street_Address || "-"}
          </span>
        ),
        Investor_Income: `$${numberWithCommas(item.Investor_Income.toFixed(2))}`,
        Stage: (
          <span
            className={`${stateClass(rawStage)} greyText textDecoration spaceNowrap`}
          >
            {isValue(rawStage) && renameStatus(rawStage)}
          </span>
        ),
      };
    });
    

    setAllDealsData(response);
    setDataSource(response); // Initially show all
  };
  

  useEffect(() => {
    getDeals();
  }, [page]);



  return (
    <div className="fundedD ealsDashboard">
      {/* <div className="fundedDealsDashboard_wrapper whiteCard" style={{ padding: "0 0 0" }}>
        <div className="fundedDealsDashboard_wrapper_table"> */}
      <div className="allDeals">
        <div className="myDeals_btn">
          <div className="filterSection">
            <button>
              <img src={FilterIcon} alt="filter" width={19} height={22} />
            </button>
            <button>Filter By</button>
            <Select
              className="selectBorderedCustom"
              value={filter}
              onChange={(value) => {
                setPage(1);
                setFilter(value);

                if (value === "all") {
                  setDataSource(allDealsData);
                } else {
                  const filtered = allDealsData.filter((item) =>
                    item.rawStage?.toLowerCase().includes(value)
                  );
                  setDataSource(filtered);
                }
              }}
              options={[
                { value: "all", label: "All" },
                { value: "closed", label: "Closed Deals" },
              ]}
            />

          </div>
        </div>
        <div className="allDeals_wrapper">
          {/* <h1 className="headingText">My Deals</h1> */}
          {dataSource ? (
            <div className="allDeals_wrapper_table desktop-only">
              <Table
                className="commonTable"
                dataSource={dataSource || []}
                columns={columns}
                pagination={false}
              />
              <Pagination
                total={total}
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`
                }
                current={page}
                onChange={setPage}
                simple
                showSizeChanger={false}
                defaultPageSize={10}
                defaultCurrent={1}
              />
            </div>
          ) : (
            <></>
          )}


          {/* Mobile Accordion View */}
          <div className="mobile-deals mobile-only">
            {dataSource?.slice(0, visibleCount).map((item, index) => (
              <div key={index} className="deal-card">
                <div
                  className="deal-header"
                  style={{
                    backgroundColor: item.open ? "#CA2543" : "#fff",
                    color: item.open ? "#fff" : "#000",
                  }}
                  onClick={() =>
                    setDataSource((prev) =>
                      prev.map((deal, i) =>
                        i === index ? { ...deal, open: !deal.open } : { ...deal, open: false }
                      )
                    )
                  }
                >

                  {!item.open ? (
                    <div className="deal-collapsed">
                      <div className="number">{item.unique_deal_number1}</div>
                      <div className="flex">
                        <div className={`status-badge textDecoration  ${String(item.Stage).toLowerCase().replace(/\s/g, "")}`}>
                          {renameStatus(item.Stage)}
                        </div>
                        <div className="arrow ms-2">▼</div>
                      </div>
                    </div>
                  ) : (
                    <div className='deal-collapsed' >
                      <div className="label">Agreement Number</div>
                      <div className="flex">
                        <div className="number">{item.unique_deal_number1}</div>
                        <div className="arrow ms-2">▲</div>
                      </div>
                    </div>
                  )}
                </div>

                {item.open && (
                  <div className="deal-body">
                    <div className="field">
                      <div className="field-label">Property Address</div>
                      <div className="field-value">{item?.Property_Street_Address}</div>
                    </div>
                    <hr />

                    <div className="field">
                      <div className="field-label">Status</div>
                      <div className={`status-badge textDecoration  ${String(item.Stage).toLowerCase().replace(/\s/g, "")}`}>
                        {renameStatus(item.Stage)}
                      </div>
                    </div>
                    <hr />

                    <div className="field">
                      <div className="field-label">Agent Name</div>
                      <div className="field-value">{item?.Contact_Name?.name}</div>
                    </div>
                    <hr />

                    <div className="flex-pair">
                      <div className="field">
                        <div className="field-label">Closing Date</div>
                        <div className="field-value">{item.Closing_Date}</div>
                      </div>
                      <div className="field">
                        <div className="field-label">Due Date</div>
                        <div className="field-value">{item.Due_Date}</div>
                      </div>
                    </div>
                    <hr />

                    <div className="flex-pair">
                      <div className="field">
                        <div className="field-label">Commission Advanced</div>
                        <div className="field-value">{item.Rocket_Advance_Contribution}</div>
                      </div>
                      <div className="field">
                        <div className="field-label">Commission Due</div>
                        <div className="field-value">{item.Rocket_Advance_Net_Advance}</div>
                      </div>
                    </div>

                    <div className="field">
                      <div className="field-label">Income Made</div>
                      <div className="field-value">{item?.Investor_Income}</div>
                    </div>
                    <hr />

                  </div>

                )}
              </div>
            ))}

            {/* Load More Button */}
            {visibleCount < dataSource?.length && (
              <div className="load-more-container">
                <p
                  className="load-more-btn"
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                >
                  Load More...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
