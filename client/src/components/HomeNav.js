import React, { useState } from "react";
import { useThread } from "./Context/ThreadContext";

const HomeNav = () => {
  const [forYouThread, setForYouThread] = useState(true);
  const [customThread, setCustomThread] = useState(false);
  const { setThreadType } = useThread();

  const forYou = () => {
    setForYouThread(true);
    setCustomThread(false);
    setThreadType("forYou");
  };
  const custom = () => {
    setForYouThread(false);
    setCustomThread(true);
    setThreadType("custom");
  };

  return (
    <div className="top-nav-bar">
      <div className="nav-bar-title">
        <h1>Acceuil</h1>
      </div>
      <div className="nav-bar-container">
        <div className="nav-bar-btn" onClick={forYou}>
          <button className={forYouThread ? "active-thread" : ""}>
            Pour Vous
          </button>
        </div>
        <div className="nav-bar-btn" onClick={custom}>
          <button className={customThread ? "active-thread" : ""}>
            Abonnments
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeNav;
