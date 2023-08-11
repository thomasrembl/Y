import React, { useContext, useEffect } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/Context/AppContext";
// import UpadateProfil from "../components/Profil/UpadateProfil";
import LeftNav from "../components/LeftNav";
import RightSide from "../components/RightSide";
import ProfilMain from "../components/Profil/ProfilMain";
import Thread from "../components/Thread";
import { useProfil } from "../components/Context/ProfilContext";

const Profil = () => {
  const { profilType } = useProfil();
  const { setProfilType } = useProfil();

  useEffect(() => {
    document.title = "Y / Profil";
    setProfilType("user-post");
  }, [setProfilType]);

  const uid = useContext(UidContext);
  return (
    <div className="profil-page">
      {uid ? (
        <>
          <LeftNav />
          <div className="main">
            <ProfilMain />
            <Thread type={profilType} />
          </div>
          <RightSide />
        </>
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="./img/log.svg" alt="img-log" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
