import React from "react";
import { NavLink } from "react-router-dom";

const LeftNav = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink to="/" exact="true" activeclassname="active-left-nav">
            <img src="./img/icons/home.svg" alt="home icon" />
          </NavLink>
          <br />
          <NavLink
            to="/trending"
            exact="true"
            activeclassname="active-left-nav"
          >
            <img src="./img/icons/rocket.svg" alt="trending icon" />
          </NavLink>
          <br />
          <NavLink to="/profil" exact="true" className="active-left-nav">
            <img src="./img/icons/user.svg" alt="user icon" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
