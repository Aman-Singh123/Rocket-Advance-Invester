import React, { useEffect, useState } from "react";
import "./FundedDealsDashboard.scss";
import { Pagination, Table } from "antd";
import makeRequest from "../../../Api/makeRequest.js";
import {
  formatDate,
  getDate,
  numberWithCommas,
  renameStatus
} from "../../../Utilis/Constent.jsx";
import { useNavigate } from "react-router-dom";

export default function FundedDealsDashboard() {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
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
      title: "Deal Address",
      dataIndex: "Property_Street_Address",
      key: "Property_Street_Address",
    },
    {
      title: (
        <span>
          Investment <br /> Date
        </span>
      ),
      dataIndex: "Stage_Funded_Date",
      key: "Stage_Funded_Date",
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
      title: "Paid",
      dataIndex: "Rocket_Advance_Net_Advance",
      key: "Rocket_Advance_Net_Advance",
    },
    {
      title: (
        <span>
          Investor <br /> Income
        </span>
      ),
      dataIndex: "Investor_Income",
      key: "Investor_Income",
    },
    {
      title: (
        <span>
          per day <br /> Income
        </span>
      ),
      dataIndex: "Inv_Income_per_Day",
      key: "Inv_Income_per_Day",
    },
  ];

  const getDeals = async () => {
    const { data, total } = await makeRequest(
      `/investor/funded-deals?page=${page}`,
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
      Stage_Funded_Date: formatDate(item?.Stage_Funded_Date) || "-",
      Closing_Date: formatDate(item?.Closing_Date) || "-",
      Due_Date: formatDate(item?.Due_Date) || "-",
      Property_Street_Address: (
        <span style={{ maxWidth: 152, display: "block" }}>
          {item?.Property_Street_Address || "-"}
        </span>
      ),
      Rocket_Advance_Net_Advance: `$${(
        numberWithCommas(item?.Rocket_Advance_Net_Advance.toFixed(2)) || "-"
      )?.toLocaleString()}`,
      Investor_Income: `$${numberWithCommas(item?.Investor_Income.toFixed(2)) || "-"
        }`,
      Inv_Income_per_Day: `$${numberWithCommas(item?.Inv_Income_per_Day.toFixed(2)) || "-"
        }`,
    }));
    setDataSource(response);
  };

  useEffect(() => {
    getDeals();
  }, [page]);

  return (
    <div className="fundedDealsDashboard">
      <div className="myDeals">
        <div className="allDeals_wrapper">
          {dataSource ? (
            <div className="allDeals_wrapper  desktop-only">
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
        </div>


        {/* Mobile Accordion View */}
        <div className="mobile-deals mobile-only">
          <div className="flex mb-2">
            <p>Funded Deals</p>
            <a href="funded-deals"  rel="">See All</a>
          </div>
          {dataSource?.map((item, index) => (
            <div key={index} className="deal-card">
              <div
                className="deal-header"
                onClick={() =>
                  setDataSource((prev) =>
                    prev.map((deal, i) =>
                      i === index ? { ...deal, open: !deal.open } : { ...deal, open: false }
                    )
                  )
                }
              >
                <div className="label">Agreement Number</div>
                <div className="flex">
                  <div className="number">{item.unique_deal_number1}</div>
                  <div className="arrow ms-2">{item.open ? "▲" : "▼"}</div>
                </div>
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
                    <div className="field-label">Income made</div>
                    <div className="field-value">{item?.Investor_Income}</div>
                  </div>
                  <hr />
                </div>

              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
