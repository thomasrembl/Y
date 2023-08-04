import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../Utils";

const UpadateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const [followingPopUp, setFollowingPopUp] = useState(false);
  const [followersPopUp, setFollowersPopUp] = useState(false);

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  return (
    <div className="profil-container">
      <LeftNav />
      <h1>Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt="user-pic" />
          <UploadImg />
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier bio
                </button>
              </>
            )}
            {updateForm === true && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider modification</button>
              </>
            )}
          </div>
          <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
          <h5 onClick={() => setFollowingPopUp(true)}>
            Abonnements : {userData.following ? userData.following.length : "1"}
          </h5>
          <h5 onClick={() => setFollowersPopUp(true)}>
            Abonnés : {userData.followers ? userData.followers.length : ""}
          </h5>
        </div>
      </div>
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
                        <h1>Follow handler</h1>
                      </li>
                    );
                  }
                }
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
                        <h1>Follow handler</h1>
                      </li>
                    );
                  }
                }
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpadateProfil;
