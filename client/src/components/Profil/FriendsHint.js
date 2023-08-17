import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { isEmpty } from "../Utils";
import FollowHandler from "./FollowHandler";

const FriendsHint = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(true);
  const [friendsHint, setFriendsHint] = useState([]);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  useEffect(() => {
    const notFriendList = () => {
      let array = [];
      usersData.forEach((user) => {
        if (
          user._id !== userData._id &&
          !user.followers.includes(userData._id)
        ) {
          array.push(user._id);
        }
      });
      array.sort(() => 0.5 - Math.random());
      if (window.innerHeight > 780) {
        array.length = 5;
      } else if (window.innerHeight > 720) {
        array.length = 4;
      } else if (window.innerHeight > 615) {
        array.length = 2;
      } else if (window.innerHeight > 540) {
        array.length = 1;
      } else {
        array.length = 0;
      }
      setFriendsHint(array);
    };
    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      notFriendList();
      setIsLoading(false);
      setPlayOnce(false);
    }
  }, [usersData, userData, playOnce]);

  return (
    <div className="get-friends-container">
      <h4>Suggestions</h4>
      {isLoading ? (
        <div className="icon">
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      ) : (
        <ul>
          {friendsHint &&
            friendsHint.map((user) => {
              const userData = usersData.find(
                (userData) => userData._id === user
              );

              if (userData) {
                return (
                  <li className="user-hint" key={userData._id}>
                    <NavLink key={userData._id} to={`/profil/${userData._id}`}>
                      <img src={userData.picture} alt="user pic" />
                      <p>{userData.pseudo}</p>
                    </NavLink>
                    <FollowHandler
                      idToFollow={userData._id}
                      type={"suggestion"}
                    />
                  </li>
                );
              }

              return null;
            })}
        </ul>
      )}
    </div>
  );
};

export default FriendsHint;
