import { createContext, useContext, useState } from "react";

const ThreadContext = createContext();

export const useThread = () => {
  return useContext(ThreadContext);
};

export const ThreadProvider = ({ children }) => {
  const [threadType, setThreadType] = useState("forYou");

  return (
    <ThreadContext.Provider value={{ threadType, setThreadType }}>
      {children}
    </ThreadContext.Provider>
  );
};
