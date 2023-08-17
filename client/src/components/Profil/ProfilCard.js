import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Logout from "../Log/Logout";

const ProfilCard = () => {
  const userData = useSelector((state) => state.userReducer);
  return (
    <div className="profil-card">
      <NavLink to={`/profil/${userData._id}`} exact="true">
        <div className="profil-card-left">
          <div className="user-picture">
            <img src={userData.picture} alt="" />
          </div>
          <h3>{userData.pseudo}</h3>
        </div>
      </NavLink>
      <div className="profil-card-right">
        <Logout />
      </div>
    </div>
  );
};

export default ProfilCard;
