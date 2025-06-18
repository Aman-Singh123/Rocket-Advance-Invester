import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { rootName } from "../Utilis/Constent.jsx";
import { DashboardLayout } from "./LazyRoutes.jsx";

const PrivateRoute = () => {
  return localStorage.getItem("isLogged") ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to={`${rootName}`} />
  );
};

export default PrivateRoute;
