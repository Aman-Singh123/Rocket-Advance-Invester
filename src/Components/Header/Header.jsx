import React from "react";
import "./Header.scss";
import LogoMob from "../../Asset/RLogoColored.svg";
import useCurrentWidth from "../../CustomHooks/useCurrentWidth/useCurrentWidth";
// import makeRequest from "../../Api/makeRequest";

// const items = [
//   {
//     key: "1",
//     label: (
//       <a
//         target="_blank"
//         rel="noopener noreferrer"
//         href="https://www.antgroup.com"
//       >
//         1st menu item
//       </a>
//     ),
//   },
//   {
//     key: "2",
//     label: (
//       <a
//         target="_blank"
//         rel="noopener noreferrer"
//         href="https://www.aliyun.com"
//       >
//         2nd menu item
//       </a>
//     ),
//   },
// ];

const Header = () => {
  const width = useCurrentWidth();

  //state management
  // const [userDetails, setUserDetails] = useState(null);

  // //useEfect for user APi cal
  // useEffect(() => {
  //   getUserData();
  // }, []);

  // //user API function
  // const getUserData = async () => {
  //   const { user } = await makeRequest("/user", "get", "");
  //   setUserDetails(user);
  // };
  return (
    <div className="header">
      <h1 className="header_heading">Accredited Investor Dashboard</h1>
      <div className="header_right">
        {/* <Dropdown
          menu={{
            items,
          }}
        >
          <div onClick={(e) => e.preventDefault()}>
            <div className="borderedBg">
              {" "}
              <AlbumIcon />
            </div>{" "}
            {userDetails?.fullname || "-"} <DownArrow />
          </div>
        </Dropdown> */}
        {width < 767 && (
          <div >
            <img src={LogoMob} alt="Logo" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
