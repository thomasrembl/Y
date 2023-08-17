import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { dateParser } from "../Utils";
import { NavLink, useParams } from "react-router-dom";
import ProfilNav from "./ProfilNav";
import FollowHandler from "./FollowHandler";
import UpdateProfil from "./UpdateProfil";

//icons
import { FaArrowLeft } from "react-icons/fa";

const ProfilMain = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { userId } = useParams();
  const posts = useSelector((state) => state.allPostsReducer);

  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  const [followingPopUp, setFollowingPopUp] = useState(false);
  const [followersPopUp, setFollowersPopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);

  function filterPostsByUid(posts, currentUsersData) {
    return posts.filter((post) => post.posterId === currentUsersData._id);
  }
  useEffect(() => {
    if (userData && usersData.length > 0) {
      setIsDataLoaded(true);
    }
  }, [userData, usersData]);

  if (isDataLoaded) {
    const currentUsersData = usersData.find((user) => user._id === userId);

    return (
      <div className="profil-container">
        <div className="profil-header">
          <div className="icon">
            <NavLink to="/">
              <FaArrowLeft />
            </NavLink>
          </div>
          <div className="profil-header-right">
            <h1>{currentUsersData.pseudo}</h1>
            <span>{filterPostsByUid(posts, currentUsersData).length} Y</span>
          </div>
        </div>
        <div className="profil-banner">
          <img src={currentUsersData.banner} alt="user-banner" />
        </div>
        <div className="profil-info">
          <div className="profil-top-info">
            <div className="user-picture">
              <img src={currentUsersData.picture} alt="user-pic" />
            </div>
            <div>
              {currentUsersData._id === userData._id ? (
                <button onClick={() => setEditPopUp(true)}>
                  Editer le profil
                </button>
              ) : (
                <FollowHandler
                  idToFollow={currentUsersData._id}
                  type={"suggestion"}
                />
              )}
            </div>
          </div>
          <div className="profil-main-info">
            <h2>{currentUsersData.pseudo}</h2>
            {currentUsersData._id === userData._id ? (
              <p>{userData.bio}</p>
            ) : (
              <p>{currentUsersData.bio}</p>
            )}
            <h4>A rejoint Y le : {dateParser(currentUsersData.createdAt)}</h4>
            <div className="follow-container">
              <h4 onClick={() => setFollowingPopUp(true)}>
                <span className="big">
                  {currentUsersData.following
                    ? currentUsersData.following.length
                    : 0}
                </span>{" "}
                Abonnement
                {currentUsersData.following &&
                currentUsersData.following.length > 1
                  ? "s"
                  : null}
              </h4>
              <h4 onClick={() => setFollowersPopUp(true)}>
                <span className="big">
                  {currentUsersData.followers
                    ? currentUsersData.followers.length
                    : 0}
                </span>{" "}
                Abonné
                {currentUsersData.followers &&
                currentUsersData.followers.length > 1
                  ? "s"
                  : null}
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
                  for (let i = 0; i < currentUsersData.following.length; i++) {
                    if (user._id === currentUsersData.following[i]) {
                      return (
                        <li key={user._id}>
                          <NavLink
                            key={user._id}
                            to={`/profil/${user._id}`}
                            onClick={() => setFollowingPopUp(false)}
                          >
                            <img src={user.picture} alt="user-pic" />{" "}
                            <h4>{user.pseudo}</h4>
                          </NavLink>
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
                  for (let i = 0; i < currentUsersData.followers.length; i++) {
                    if (user._id === currentUsersData.followers[i]) {
                      return (
                        <li key={user._id}>
                          <NavLink
                            key={user._id}
                            to={`/profil/${user._id}`}
                            onClick={() => setFollowersPopUp(false)}
                          >
                            <img src={user.picture} alt="user-pic" />{" "}
                            <h4>{user.pseudo}</h4>
                          </NavLink>
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
  }
};

export default ProfilMain;
