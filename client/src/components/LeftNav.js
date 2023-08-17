import React, { useContext, useState } from "react";
import { NavLink, useMatch } from "react-router-dom";
import { UidContext } from "./Context/AppContext";
import NewPostForm from "./Post/NewPostForm";
import ProfilCard from "./Profil/ProfilCard";

const LeftNav = ({ isActive }) => {
  const matchHome = useMatch({
    path: "/",
    end: true,
  });

  const uid = useContext(UidContext);
  const [newPostPopUp, setNewPostPopUp] = useState(false);

  const matchTrending = useMatch("/trending");

  const matchProfile = useMatch({
    path: "/profil",
    end: true,
  });

  return (
    <div className={isActive}>
      {console.log(isActive)}
      <div className="left-nav ">
        <div className="left-nav-container">
          <div className="icons">
            <div className="logo">
              <img src="/img/icon.png" alt="logo" />
            </div>
            <div className="icons-bis">
              <NavLink
                to="/"
                exact="true"
                className={`nav-link ${
                  matchHome ? "active-left-nav" : "unselected"
                }`}
              >
                <div className="link-container">
                  <img src="/img/icons/home.svg" alt="home icon" />
                  <h3
                    className={`nav-link ${
                      matchHome ? "active-left-nav" : "unselected"
                    }`}
                  >
                    Acceuil
                  </h3>
                </div>
              </NavLink>
              <NavLink
                to="/trending"
                exact="true"
                className={`nav-link ${
                  matchTrending ? "active-left-nav" : "unselected"
                }`}
              >
                <div className="link-container">
                  <img src="/img/icons/rocket.svg" alt="trending icon" />
                  <h3
                    className={`nav-link ${
                      matchTrending ? "active-left-nav" : "unselected"
                    }`}
                  >
                    Tendances
                  </h3>
                </div>
              </NavLink>
              <NavLink
                to={`/profil/${uid}`}
                exact={true}
                className={`nav-link ${
                  matchProfile ? "active-left-nav" : "unselected"
                }`}
              >
                <div className="link-container">
                  <img src="/img/icons/user.svg" alt="user icon" />
                  <h3
                    className={`nav-link ${
                      matchProfile ? "active-left-nav" : "unselected"
                    }`}
                  >
                    Profil
                  </h3>
                </div>
              </NavLink>
            </div>
            <div className="post-btn">
              <button onClick={() => setNewPostPopUp(true)}>Poster</button>
            </div>
          </div>
          <div className="profil">{uid ? <ProfilCard /> : null}</div>
        </div>
        {newPostPopUp && (
          <div className="popup-left-nav-container">
            <div className="modal">
              <span className="cross" onClick={() => setNewPostPopUp(false)}>
                &#10005;
              </span>
              <NewPostForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftNav;
