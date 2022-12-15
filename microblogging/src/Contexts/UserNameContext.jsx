import { useState, createContext, useEffect } from "react";
import localForage from "localforage";

const UserNameContext = createContext();

const UserNameProvidr = ({ children }) => {
  const [userName, setUserName] = useState("Text");

  useEffect(() => {
    localForage.setItem("User Name", userName);
  }, [userName]);

  async function getUserName() {
    const localUserName = await localForage.getItem("User Name");
    if (localUserName) {
      setUserName(localUserName);
    }
  }

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <UserNameContext.Provider
      value={{
        userName,
        setUserName,
      }}
    >
      {children}
    </UserNameContext.Provider>
  );
};

export { UserNameContext, UserNameProvidr };
