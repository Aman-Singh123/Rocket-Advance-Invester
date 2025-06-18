import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { rootName } from "../Utilis/Constent.jsx";
import { HomeLayout } from "./LazyRoutes.jsx";

const PublicRoute = () => {
  return !localStorage.getItem("isLogged") ? (
    <HomeLayout>
      <Outlet />
    </HomeLayout>
  ) : (
    <Navigate to={`${rootName}dashboard`} />
  );
};

export default PublicRoute;
