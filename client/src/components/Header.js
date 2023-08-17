import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LeftNav from "./LeftNav";

const Header = () => {
  const [checkWidth, setChekedWidth] = useState(window.innerWidth);
  const [toggleNav, setToggleNav] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const checkFunc = () => {
    setChekedWidth(window.innerWidth);
  };
  const toggleNavFunc = () => {
    setToggleNav(!toggleNav);
  };

  useEffect(() => {
    window.addEventListener("resize", checkFunc);
    return () => {
      window.removeEventListener("resize", checkFunc);
    };
  }, []);

  return (
    <header className={checkWidth < 1065 ? "responsive-header" : ""}>
      {console.log(checkWidth)}
      <div>
        {checkWidth < 1065 && (
          <>
            <div className="nav-container">
              <div className="user-img" onClick={toggleNavFunc}>
                <img src={userData.picture} alt="user-pic" />
              </div>
              <div className="logo-container">
                <img src="/img/icon.png" alt="Y icon" />
              </div>
              <span></span>
            </div>
          </>
        )}
        <LeftNav isActive={toggleNav ? "active" : ""} />
      </div>
    </header>
  );
};

export default Header;
