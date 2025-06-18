import React from "react";
import "./Dashboard.scss";
import DealsContainer from "../../PagesComponents/DashboardComponents/DealsCard/DealsContainer";
import RightSidebarAgent from "../../PagesComponents/RightSideBar/RightSidebarAgent";
import FundedDealsDashboard from "../../PagesComponents/DashboardComponents/FundedDealsDashboard/FundedDealsDashboard";
import makeRequest from "../../Api/makeRequest";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard_left">
        <DealsContainer />
        <RightSidebarAgent />
      </div>
      <div className="dashboard_right">
        <FundedDealsDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
