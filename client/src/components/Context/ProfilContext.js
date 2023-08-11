import { createContext, useContext, useState } from "react";

const ProfilContext = createContext();

export const useProfil = () => {
  return useContext(ProfilContext);
};

export const ProfilProvider = ({ children }) => {
  const [profilType, setProfilType] = useState("user-post");

  return (
    <ProfilContext.Provider value={{ profilType, setProfilType }}>
      {children}
    </ProfilContext.Provider>
  );
};
