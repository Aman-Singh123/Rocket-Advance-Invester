import React, { useState } from "react";
import { Input, Select } from "antd";
import "../Login/Login.scss";
import ButtonCustom from "../../Components/ButtonCustom/ButtonCustom";
import { Link } from "react-router-dom";
import {
  EmailIcon,
  LockIcon,
  UserIcon,
  UserIconFilled,
} from "../../StoreImages/StoreImage";
import makeRequest from "../../Api/makeRequest";
import { useNavigate } from "react-router-dom/dist";
import { registerValidation } from "../../Utilis/Validations";

export default function Register() {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "investor",
  });

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const roleChange = (val) => {
    setUserDetails({ ...userDetails, role: val });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      (registerValidation(userDetails, setError) &&
        Object.values(error).every((error) => error === ""))
    ) {
      const { message } = await makeRequest("/user/register", "post", {
        ...userDetails,
        fullname: `${userDetails.firstName} ${userDetails.lastName}`,
      });
      if (message === "User registered successfully") {
        navigate("/login");
      }
    }
  };

  return (
    <div className="userDetails">
      <h1>Hello</h1>
      <p>Sign Up to Get Started</p>
      <div className="inputOuter mb30">
        <Input
          placeholder="First Name"
          name="firstName"
          type="text"
          onChange={(e) => handleChange(e)}
          value={userDetails.firstName}
          prefix={<UserIcon />}
        />
        <span style={{ color: "red" }}>{error.firstName}</span>
      </div>
      <div className="inputOuter mb30">
        <Input
          placeholder="Last Name"
          name="lastName"
          type="text"
          onChange={(e) => handleChange(e)}
          value={userDetails.lastName}
          prefix={<UserIcon />}
        />
        <span style={{ color: "red" }}>{error.lastName}</span>
      </div>
      <div className="inputOuter mb30">
        <Input
          placeholder="Email Address"
          name="email"
          type="email"
          onChange={(e) => handleChange(e)}
          value={userDetails.email}
          prefix={<EmailIcon />}
        />
        <span style={{ color: "red" }}>{error.email}</span>
      </div>
      <div className="inputOuter mb30">
        <Select
          name="role"
          value={userDetails.role}
          onChange={roleChange}
          className="selectBorderedCustom "
          placeholder={
            <span className="userIcon">
              <UserIconFilled />
              Account Type
            </span>
          }
          options={[
            {
              value: "brokerAdministrator",
              label: "Broker administrator",
            },
            {
              value: "brocketOfRecord",
              label: "Broker of record",
            },
            {
              value: "agent",
              label: "Agent",
            },
            {
              value: "investor",
              label: "Investor",
            },
            {
              value: "referral",
              label: "Referral",
            },
          ]}
        />
      </div>
      <div className="inputOuter mb30">
        <Input
          placeholder="Password"
          name="password"
          type="password"
          onChange={(e) => handleChange(e)}
          value={userDetails.password}
          prefix={<LockIcon />}
        />
        <span style={{ color: "red" }}>{error.password}</span>
      </div>
      <div className="linksWrap" style={{ marginBottom: 14 }}>
        Already have an account?
        <Link className="linkStyle" to={"/login"}>
          Sign In
        </Link>
      </div>
      <ButtonCustom label={"Register"} onClick={(e) => handleSubmit(e)} />
    </div>
  );
}
