import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Profile.css";
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
import { AuthContext } from "../Contexts/Authcontext";
import { storage, auth } from "../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const Profile = () => {
  const [newUserName, setNewUserName] = useState("");
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { setUser, userName, setUserName, imageUpload, setImageUpload } =
    useContext(AuthContext);

  const uploadImage = async () => {
    const imageRef = ref(storage, `test`);

    uploadBytes(imageRef, imageUpload);

    const photoURLnew = await getDownloadURL(imageRef);

    updateProfile(user, { photoURL: photoURLnew });
  };

  return (
    <div className="Profile">
      <h2>Profile</h2>
      <Input
        id="profileName"
        onChange={(event) => setNewUserName(event.target.value)}
        labelText="User Name"
        placeholder={user?.displayName}
      />
      <Button
        text="Save"
        type="submit"
        disabled={newUserName.length === 0}
        onClick={(event) => {
          // updateUserNameDetails(newUserName);
          setUserName(newUserName);
          event.preventDefault();
        }}
      />
      <Input
        type="file"
        id="image"
        labelText="Profile image"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <Button onClick={uploadImage} text="Upload" />
      <img className="profile-img" src={user?.photoURL} />
    </div>
  );
};
