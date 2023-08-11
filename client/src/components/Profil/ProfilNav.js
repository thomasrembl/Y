import React, { useState } from "react";
import { useProfil } from "../Context/ProfilContext";

const ProfilNav = () => {
  const [userPost, setUserPost] = useState(true);
  const [userComment, setUserComment] = useState(false);
  const [userMedia, setUserMedia] = useState(false);
  const [userLike, setUserLike] = useState(false);
  const { setProfilType } = useProfil();

  const Post = () => {
    setUserPost(true);
    setUserComment(false);
    setUserMedia(false);
    setUserLike(false);
    setProfilType("user-post");
  };
  const Comment = () => {
    setUserPost(false);
    setUserComment(true);
    setUserMedia(false);
    setUserLike(false);
    setProfilType("user-comment");
  };
  const Media = () => {
    setUserPost(false);
    setUserComment(false);
    setUserMedia(true);
    setUserLike(false);
    setProfilType("user-media");
  };
  const Like = () => {
    setUserPost(false);
    setUserComment(false);
    setUserMedia(false);
    setUserLike(true);
    setProfilType("user-like");
  };

  return (
    <div className="thread-type-container">
      <div className="thread-type" onClick={Post}>
        <button className={userPost ? "active-profil-btn" : ""}>Posts</button>
      </div>
      <div className="thread-type" onClick={Comment}>
        <button className={userComment ? "active-profil-btn" : ""}>
          Réponses
        </button>
      </div>
      <div className="thread-type" onClick={Media}>
        <button className={userMedia ? "active-profil-btn" : ""}>Médias</button>
      </div>
      <div className="thread-type" onClick={Like}>
        <button className={userLike ? "active-profil-btn" : ""}>J'aime</button>
      </div>
    </div>
  );
};

export default ProfilNav;
