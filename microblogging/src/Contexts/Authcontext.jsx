import { useState, createContext, useEffect } from "react";
import { auth, updateUserNameDetails } from "../firebase-config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState(user?.email || "Unkown");
  const [imageUpload, setImageUpload] = useState(null);

  useEffect(() => {
    setUserName(userName);
    updateUserNameDetails(userName);
  }, [userName]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userName,
        setUserName,
        imageUpload,
        setImageUpload,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
