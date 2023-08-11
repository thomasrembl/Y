import React, { useContext } from "react";
import { UidContext } from "./Context/AppContext";
import FriendsHint from "./Profil/FriendsHint";
import Trends from "./Trends";

const RightSide = () => {
  const uid = useContext(UidContext);
  return (
    <div className="right-side">
      <div className="right-side-container">
        <div className="wrapper">
          <Trends />
          {uid && <FriendsHint />}
        </div>
      </div>
    </div>
  );
};

export default RightSide;
