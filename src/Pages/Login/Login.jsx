import React, { useState } from 'react'
import { Link, useSearchParams } from "react-router-dom";
import ButtonCustom from '../../Components/ButtonCustom/ButtonCustom'
import { Input, Select } from 'antd'
import './Login.scss'
import {
  EmailIcon,
  LockIcon,
  UserIconFilled,
} from '../../StoreImages/StoreImage'
import makeRequest from '../../Api/makeRequest'
import { loginValidation } from '../../Utilis/Validations'
import { useNavigate } from 'react-router-dom/dist'
import { toast } from 'react-toastify'
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
export default function Login() {
  //Sates management
  const [searchParams, setSearchParams] = useSearchParams();
  const [role, setRole] = useState(searchParams.get("role") || "Accredited Investor");
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    role: "investor"
  })
  const [error, setError] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  //onChange function
  const handleChange = (e) => {
    const { name, value } = e.target
    setUserDetails({ ...userDetails, [name]: value })
    setError({ ...error, [name]: '' })
  }

  // Handles the form submission for user login.
  const handleSubmit = async (e) => {
    e.preventDefault()
    // loginValidation(userDetails, setError) &&
    if (Object.values(error).every((error) => error === '')) {
      const res = await makeRequest(
        '/user/login',
        'post',
        userDetails,
        'public',
      )
      if (res.message === "Login successful") {
        localStorage.setItem("isLogged", res.token);
        toast.success(res.message);
        navigate("/dashboard");
        return;
      } else {
        toast.error(res?.response?.data?.message);
      }
    }
  }

  return (
    <div className="userDetails">
      <h1>Hello Again!</h1>
      <p>Welcome Back to Investor Portal</p>
      <div className="inputOuter mb30">
        <Input
          placeholder="Email Address"
          prefix={<EmailIcon />}
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <p className="validationErr">{error.email}</p>
      </div>
      <div className="inputOuter mb30">
        <Input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          prefix={<LockIcon />}
          suffix={
            showPassword ? (
              <EyeTwoTone onClick={() => setShowPassword(false)} />
            ) : (
              <EyeInvisibleOutlined onClick={() => setShowPassword(true)} />
            )
          }
          name="password"
          onChange={handleChange}
        />
        <p className="validationErr">{error.password}</p>
      </div>
      <div className="inputOuter mb30">
        <Select
          className="selectBorderedCustom "
          placeholder={
            <span className="userIcon">
              <UserIconFilled />
              Account Type
            </span>
          }
          value={role}
          onChange={(e) => {
            setRole(e);
          }}
          options={[
            {
              value: 'brokerAdministrator',
              label: 'Broker Administrator',
              // disabled: true,
            },
            {
              value: 'brocketOfRecord',
              label: 'Broker of Record',
              // disabled: true,
            },
            {
              value: 'agent',
              label: 'Agent',
              // disabled: true,
            },
            {
              value: 'investor',
              label: 'Investor',
            },
          ]}
        />
      </div>
      <ButtonCustom label={'Login'} onClick={(e) => handleSubmit(e)} />
      <div className="styledFlexedLinks">
        <div className="linksWrap fadeText">
          <a className="linkStyle" href="https://portal.rocketadvance.ca/register">
            Don’t have an account?
          </a>
        </div>
        <div className="linksWrap fadeText">
          <Link className="linkStyle" to={'https://portal.rocketadvance.ca/forgot-password?role=investor'}>
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  )
}
