import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import LeftNav from "../components/LeftNav";
import Card from "../components/Post/Card";
import { isEmpty } from "../components/Utils";
import RightSide from "../components/RightSide";

const Trending = () => {
  useEffect(() => {
    document.title = "Y / Tendances";
  });

  const trendList = useSelector((state) => state.trendingReducer);

  return (
    <div className="trending-page">
      <LeftNav />
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
