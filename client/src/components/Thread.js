import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";

import Card from "./Post/Card";

import { isEmpty } from "./Utils";

const Thread = ({ type, userid }) => {
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(10);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);
  const Allposts = useSelector((state) => state.allPostsReducer);
  const userData = useSelector((state) => state.userReducer);
  const userId = userid;

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 500 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };
  function filterPostsByUid(posts, userId) {
    return posts.filter((post) => post.posterId === userId);
  }

  function filterPostsByFollowers(posts, userFollowers) {
    return posts.filter((post) => {
      return userFollowers.includes(post.posterId);
    });
  }

  function filterPostsByCommenterId(posts, uid) {
    return posts.filter((post) =>
      post.comments.some((comment) => comment.commenterId === uid)
    );
  }
  function filterPostsMedia(posts, uid) {
    return posts.filter((post) => {
      return (
        post.posterId === uid &&
        (post.picture !== undefined || post.video.includes("https://"))
      );
    });
  }

  function filterPostsLike(posts, uid) {
    return posts.filter((post) => post.likers.includes(uid));
  }

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setCount(count + 5);
    }
    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch, count, userData.following, posts]);

  return (
    <div className="thread-container">
      {type === "forYou" && (
        <ul>
          {Array.isArray(posts) &&
            !isEmpty(posts[0]) &&
            posts.map((post) => (
              <li key={post._id}>
                <Card post={post} />
              </li>
            ))}
        </ul>
      )}
      {type === "user-follow" && (
        <ul>
          {Array.isArray(Allposts) &&
          !isEmpty(filterPostsByFollowers(Allposts, userData.following)[0]) ? (
            filterPostsByFollowers(Allposts, userData.following).map((post) => (
              <li key={post._id}>
                <Card post={post} />
              </li>
            ))
          ) : (
            <h2 className="no-post">
              Suivez de nouvelles personnes pour voir des Y
            </h2>
          )}
        </ul>
      )}
      {type === "user-post" && (
        <ul>
          {console.log("uid : ", userId)}
          {Array.isArray(Allposts) &&
          !isEmpty(filterPostsByUid(Allposts, userId)[0]) ? (
            filterPostsByUid(Allposts, userId).map((post) => (
              <li key={post._id}>
                <Card post={post} />
              </li>
            ))
          ) : (
            <h2 className="no-post">C'est bien vide ici ...</h2>
          )}
        </ul>
      )}
      {type === "user-comment" && (
        <ul>
          {Array.isArray(Allposts) &&
          !isEmpty(filterPostsByCommenterId(Allposts, userId)[0]) ? (
            filterPostsByCommenterId(Allposts, userId).map((post) => (
              <li key={post._id}>
                <Card post={post} />
              </li>
            ))
          ) : (
            <h2 className="no-post">C'est bien vide ici ...</h2>
          )}
        </ul>
      )}
      {type === "user-media" && (
        <ul>
          {Array.isArray(Allposts) &&
          !isEmpty(filterPostsMedia(Allposts, userId)[0]) ? (
            filterPostsMedia(Allposts, userId).map((post) => (
              <li key={post._id}>
                <Card post={post} />
              </li>
            ))
          ) : (
            <h2 className="no-post">C'est bien vide ici ...</h2>
          )}
        </ul>
      )}
      {type === "user-like" && (
        <ul>
          {Array.isArray(Allposts) &&
          !isEmpty(filterPostsLike(Allposts, userId)[0]) ? (
            filterPostsLike(Allposts, userId).map((post) => (
              <li key={post._id}>
                <Card post={post} />
              </li>
            ))
          ) : (
            <h2 className="no-post">C'est bien vide ici ...</h2>
          )}
        </ul>
      )}
    </div>
  );
};

export default Thread;
