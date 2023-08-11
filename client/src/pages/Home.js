import React, { useContext, useEffect } from "react";
import { UidContext } from "../components/Context/AppContext";
import LeftNav from "../components/LeftNav";
import Thread from "../components/Thread";
import NewPostForm from "../components/Post/NewPostForm";
import Log from "../components/Log/";
import HomeNav from "../components/HomeNav";
import { useThread } from "../components/Context/ThreadContext";
import RightSide from "../components/RightSide";

const Home = () => {
  useEffect(() => {
    document.title = "Y / Acceuil";
  });
  const uid = useContext(UidContext);
  const { threadType } = useThread();
  return (
    <div className="home">
      <LeftNav />
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
