import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../Context/AppContext";
import { dateParser } from "../Utils";
import { NavLink } from "react-router-dom";
import ProfilNav from "./ProfilNav";
import FollowHandler from "./FollowHandler";
import UpdateProfil from "./UpadateProfil";

//icons
import { FaArrowLeft } from "react-icons/fa";

const ProfilMain = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const [followingPopUp, setFollowingPopUp] = useState(false);
  const [followersPopUp, setFollowersPopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);

  return (
    <div className="profil-container">
      <div className="profil-header">
        <div className="icon">
          <NavLink to="/">
            <FaArrowLeft />
          </NavLink>
        </div>
        <div className="profil-header-right">
          <h1>{userData.pseudo}</h1>
          <span></span>
        </div>
      </div>
      <div className="profil-banner">
        <img src="./uploads/banner/banniere.jpg" alt="user-banner" />
      </div>
      <div className="profil-info">
        <div className="profil-top-info">
          <div className="user-picture">
            <img src={userData.picture} alt="" />
          </div>
          <div>
            <button onClick={() => setEditPopUp(true)}>Editer le profil</button>
          </div>
        </div>
        <div className="profil-main-info">
          <h2>{userData.pseudo}</h2>
          <p>{userData.bio}</p>
          <h4>A rejoint Y le : {dateParser(userData.createdAt)}</h4>
          <div className="follow-container">
            <h4 onClick={() => setFollowingPopUp(true)}>
              <span className="big">
                {userData.following ? userData.following.length : 0}
              </span>{" "}
              Abonnement
              {userData.following && userData.following.length > 1 ? "s" : null}
            </h4>
            <h4 onClick={() => setFollowersPopUp(true)}>
              <span className="big">
                {userData.followers ? userData.followers.length : 0}
              </span>{" "}
              Abonné
              {userData.followers && userData.followers.length > 1 ? "s" : null}
            </h4>
          </div>
        </div>
      </div>
      <div className="post-nav">
        <ProfilNav />
      </div>
      {editPopUp && (
        <div className="popup-profil-container">
          <div className="modal-edit">
            <div className="edit-header">
              <span className="cross" onClick={() => setEditPopUp(false)}>
                &#10005;
              </span>
              <h3>Editer le profil</h3>
            </div>
            <UpdateProfil />
          </div>
        </div>
      )}
      {followingPopUp && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnement</h3>
            <span className="cross" onClick={() => setFollowingPopUp(false)}>
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.following.length; i++) {
                  if (user._id === userData.following[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />{" "}
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type={"suggestion"}
                          />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
      {followersPopUp && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnées</h3>
            <span className="cross" onClick={() => setFollowersPopUp(false)}>
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.followers.length; i++) {
                  if (user._id === userData.followers[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />{" "}
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type={"suggestion"}
                          />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilMain;
