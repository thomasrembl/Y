import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Card from "../components/Post/Card";
import { isEmpty } from "../components/Utils";
import RightSide from "../components/RightSide";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

const Trending = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    document.title = "Y / Tendances";
  });

  const trendList = useSelector((state) => state.trendingReducer);

  return (
    <div className="trending-page">
      <Header />
      <div className="main">
        <ul>
          {!isEmpty(trendList[0]) &&
            trendList.map((post) => <Card post={post} key={post._id} />)}
        </ul>
      </div>
      <RightSide />
    </div>
  );
};

export default Trending;
