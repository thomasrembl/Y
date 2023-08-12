import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";

import { UidContext } from "./Context/AppContext";
import Card from "./Post/Card";

import { isEmpty } from "./Utils";

const Thread = ({ type }) => {
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(10);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  // const userPosts = useSelector((state) => state.threadReducer.userPosts);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 500 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };
  function filterPostsByUid(posts, uid) {
    return posts.filter((post) => post.posterId === uid);
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
          {!isEmpty(posts[0]) &&
            posts.map((post) => (
              <li key={post._id}>
                <Card post={post} />
              </li>
            ))}
        </ul>
      )}
      {type === "user-follow" && (
        <ul>
          {!isEmpty(posts[0]) &&
            filterPostsByFollowers(posts, userData.following).map((post) => (
              <li key={post._id}>
                <Card post={post} />
              </li>
            ))}
        </ul>
      )}
      {type === "user-post" && (
        <ul>
          {!isEmpty(posts[0]) &&
            filterPostsByUid(posts, uid).map((post) => (
              <li key={post._id}>
                <Card post={post} />
              </li>
            ))}
        </ul>
      )}
      {type === "user-comment" && (
        <ul>
          {!isEmpty(posts[0]) &&
            filterPostsByCommenterId(posts, uid).map((post) => (
              <li key={post._id}>
                <Card post={post} />
              </li>
            ))}
        </ul>
      )}
      {type === "user-media" && (
        <ul>
          {!isEmpty(posts[0]) &&
            filterPostsMedia(posts, uid).map((post) => (
              <li key={post._id}>
                <Card post={post} />
              </li>
            ))}
        </ul>
      )}
      {type === "user-like" && (
        <ul>
          {!isEmpty(posts[0]) &&
            filterPostsLike(posts, uid).map((post) => (
              <li key={post._id}>
                <Card post={post} />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Thread;
