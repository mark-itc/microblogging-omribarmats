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
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    setLoading(true);
    const imageRef = ref(storage, user.uid);

    const snapshot = uploadBytes(imageRef, imageUpload);

    const photoURLnew = await getDownloadURL(imageRef);

    updateProfile(user, { photoURL: photoURLnew });
    setLoading(false);
  };

  return (
    <div className="Profile">
      <h2>Profile</h2>
      <div class="profile-details">
        <img
          className="profile-img"
          src={
            user?.photoURL
              ? user.photoURL
              : "https://firebasestorage.googleapis.com/v0/b/microblogging-app-omri-barmats.appspot.com/o/1J4u4ejqH9NCDrgVqAmb09Hr0ij1-profilePicture-Mon%2C%2019%20Dec%202022%2009%3A06%3A49%20GMT?alt=media&token=2489094e-2599-4922-8efc-ac8790514efb"
          }
        />
        <div>
          <h1>{user?.displayName}</h1>
          <h4>{user?.email}</h4>
        </div>
      </div>
      <Input
        id="profileName"
        onChange={(event) => setNewUserName(event.target.value)}
        labelText="Edit user Name"
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
        labelText="Upload profile image"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <Button onClick={uploadImage} text="Upload" />
      {loading && <p>Loading</p>}
    </div>
  );
};
