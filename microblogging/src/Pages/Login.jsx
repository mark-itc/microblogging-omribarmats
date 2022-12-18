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

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const signUpNewUser = async (e) => {
    try {
      console.log(userName);
      e.preventDefault();
      const user = await createUserWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPssword
      );
      setUserName(newUsername);
      uploadImage();
      navigate("/");
      await user.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${user.uid}.png`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("image uploaded");
    });
    const downloadURL = getDownloadURL(ref(storage, imageRef));
    console.log(downloadURL);
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
      console.log(error.message);
    }
  };

  const logOut = () => {
    signOut(auth);
    navigate("/login");
    console.log("something");
  };

  return (
    <div className="login">
      <div className="login">
        <h2>Sign-up</h2>
        {user?.email}
        <Input
          id="signup-username"
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="User Name"
        />
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
        <Input
          type="file"
          id="image"
          labelText="Profile image"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
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
