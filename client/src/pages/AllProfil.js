import React, { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { UidContext } from "../components/Context/AppContext";
import { useProfil } from "../components/Context/ProfilContext";
import Header from "../components/Header";

import Log from "../components/Log";
import ProfilMain from "../components/Profil/ProfilMain";
import RightSide from "../components/RightSide";
import Thread from "../components/Thread";

const AllProfil = () => {
  const { profilType } = useProfil();
  const { setProfilType } = useProfil();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    document.title = "Y / Profil ";
    setProfilType("user-post");
  }, [setProfilType]);

  const uid = useContext(UidContext);
  const { userId } = useParams();
  return (
    <div className="profil-page">
      {uid ? (
        <>
          <Header />
          <div className="main">
            <ProfilMain />
            <Thread type={profilType} userid={userId} />
          </div>
          <RightSide />
        </>
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="/img/log.svg" alt="img-log" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProfil;
