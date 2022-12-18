import { useState, createContext, useEffect } from "react";
import {
  auth,
  signInWithGoogle,
  updateUserNameDetails,
} from "../firebase-config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState(user?.displayName);
  const [imageUpload, setImageUpload] = useState(null);

  console.log(userName);

  useEffect(() => {
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
