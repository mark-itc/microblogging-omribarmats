import "../Styles/Login.css";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle, storage } from "../firebase-config";
import {
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
import { AuthContext } from "../Contexts/Authcontext";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getDisplayName,
} from "firebase/storage";
import { v4 } from "uuid";
import { updateProfile } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const Login = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPssword, setSignUpPassword] = useState("");

  const [newUsername, setNewUserName] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPssword, setLoginPassword] = useState("");
  const { setUser, userName, setUserName, imageUpload, setImageUpload } =
    useContext(AuthContext);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const signUpNewUser = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPssword
      ).then((userCred) => {
        setUserName(userCred.user.email);
        navigate("/");
      });
    } catch {
      alert("You alredy have an account, try logging in");
    }
  };

  const logIn = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPssword
      );
      navigate("/");
    } catch (error) {
      alert("Wrong password or email address");
    }
  };

  const logOut = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className="login">
      <div className="login">
        <h2>Sign-up</h2>
        <Input
          type="email"
          id="signup-email"
          onChange={(e) => setSignUpEmail(e.target.value)}
          placeholder="Email address"
        />
        <Input
          id="signup-password"
          onChange={(e) => setSignUpPassword(e.target.value)}
          placeholder="Password"
        />

        <div className="login-buttons">
          <a onClick={signInWithGoogle}>
            Click here to sign-up with your google account
          </a>
          <Button type="submit" onClick={signUpNewUser} text="Sign up" />
        </div>
      </div>
      <div>
        <h2>Login</h2>
        <Input
          id="signin-email"
          onChange={(e) => setLoginEmail(e.target.value)}
          placeholder="Email address"
        />
        <Input
          id="signin-password"
          onChange={(e) => setLoginPassword(e.target.value)}
          placeholder="Password"
        />
        <div className="login-buttons">
          <a onClick={signInWithGoogle}>
            Click here to login with your google account
          </a>
          <Button onClick={logIn} text="Log in" />
        </div>
      </div>
    </div>
  );
};
