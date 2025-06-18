import React, { useEffect } from "react";
import "./Home.scss";
import "../Login/Login.scss";
import { UserOutlined } from "../../StoreImages/StoreImage";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate()
  const data = [
    {
      role: "an agent",
    },
    {
      role: "a broker of record",
    },
    {
      role: "a broker administrator",
    },
    {
      role: "an investor",
    },
    {
      role: " a referral partner",
    },
    
  ];
  useEffect(() => {
    document.body.classList.add("landing");
    return () => {
      document.body.classList.remove("landing");
    };
  }, []);

  return (
    <div className="userDetails">
      <h1>Login</h1>
      <p style={{ marginBottom: 24 }}>Please select your account</p>
      <div className="userSelection">
        {data.map((ele, index) => (
          <div className="userSelection_cards" onClick={()=>navigate("/login")}>
            <UserOutlined />
            <span>I am {ele.role} </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
