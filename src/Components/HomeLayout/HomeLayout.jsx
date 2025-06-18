import React from "react";
import "./HomeLayout.scss";
import Logo from "../../Asset/LogoMain.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomeLayout = ({ children }) => {
  return (
    <>
      <ToastContainer />
      <div className="home">
        <div className="home_left">
          <div>
            <div className="home_left_logoSec">
              <img src={Logo} alt="Logo" />
            </div>
            <h1>
              Rocket Advance 
              Turns Your Pending  Commissions into 
              Real Cash
            </h1>
          </div>
        </div>
        <div className="home_right">{children}</div>
      </div>
    </>
  );
};

export default HomeLayout;
