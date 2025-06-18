import { lazy } from "react";

export const DashboardLayout = lazy(() =>
  import("../Components/Layout/DashboardLayout.jsx")
);
export const HomeLayout = lazy(() =>
  import("../Components/HomeLayout/HomeLayout.jsx")
);

export const Home = lazy(() => import("../Pages/Home/Home.jsx"));
export const Login = lazy(() => import("../Pages/Login/Login.jsx"));

export const Dashbaord = lazy(() => import("../Pages/Dashboard/Dashboard.jsx"));
export const FundedDeals = lazy(() =>
  import("../Pages/FundedDeals/FundedDeals.jsx")
);
export const NewDeals = lazy(() => import("../Pages/NewDeals/NewDeals.jsx"));
