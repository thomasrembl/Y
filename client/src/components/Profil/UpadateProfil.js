import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio, uploadPicture } from "../../actions/user.actions";

//icons
import { PiCameraPlusBold } from "react-icons/pi";

const UpadateProfil = () => {
  const [bio, setBio] = useState("");
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.userError);
  const dispatch = useDispatch();
  const [file, setFile] = useState();

  const handleUpdate = (e) => {
    e.preventDefault();
    if (bio !== userData.bio) {
      dispatch(updateBio(userData._id, bio));
    }

    const data = new FormData();
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);

    dispatch(uploadPicture(data, userData._id));
  };

  return (
    <div className="edit-profil-container">
      <div className="edit-banner">
        <span className="grey">
          <div className="icons"></div>
          <div className="error-banner">
            <p></p>
          </div>
        </span>
        <div className="user-banner">
          <img src="./uploads/banner/banniere.jpg" alt="user-banner" />
        </div>
      </div>
      <div className="edit-profil-pic">
        <span className="grey">
          <div className="icons-form">
            <i>
              <PiCameraPlusBold />
            </i>
            <form action="" className="upload-user-pic">
              <input
                type="file"
                id="file"
                name="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </form>
          </div>
          <div className="error-profil">
            <p>{error.maxSize}</p>
            <p>{error.format}</p>
          </div>
        </span>
        <div className="user-profil-pic">
          <img src={userData.picture} alt="user-profil-pic" />
        </div>
      </div>
      <div className="edit-content">
        <h2>{userData.pseudo}</h2>
        <textarea
          type="text"
          defaultValue={userData.bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <div>
          <button onClick={handleUpdate}>Valider Modification</button>
        </div>
      </div>
    </div>
  );
};

export default UpadateProfil;
