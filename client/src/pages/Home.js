import React, { useContext, useEffect } from "react";
import { UidContext } from "../components/Context/AppContext";

import Thread from "../components/Thread";
import NewPostForm from "../components/Post/NewPostForm";
import Log from "../components/Log/";
import HomeNav from "../components/HomeNav";
import { useThread } from "../components/Context/ThreadContext";
import RightSide from "../components/RightSide";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  const uid = useContext(UidContext);
  const { threadType } = useThread();
  const { setThreadType } = useThread();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    document.title = "Y / Acceuil";
    setThreadType("forYou");
  }, [setThreadType]);

  return (
    <div className="home">
      <Header />
      <div className="main">
        <HomeNav />
        <div className="home-header">
          {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>

        <Thread type={threadType} />
      </div>
      <RightSide />
    </div>
  );
};

export default Home;
