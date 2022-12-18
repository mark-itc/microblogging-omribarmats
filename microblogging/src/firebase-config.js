import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyDgtUWr0vvTqUw96FlVPOVw0eOh8OLtoRQ",
  authDomain: "microblogging-app-omri-barmats.firebaseapp.com",
  projectId: "microblogging-app-omri-barmats",
  storageBucket: "microblogging-app-omri-barmats.appspot.com",
  messagingSenderId: "876011062887",
  appId: "1:876011062887:web:9a420b543e5184c6b136c2",
  measurementId: "G-BZM8Z2PLX0",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user.accessToken);
      useNavigate("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateUserNameDetails = async (username) => {
  updateProfile(auth.currentUser, {
    displayName: username,
  });
  await auth.currentUser
    .reload()
    .then(() => {
      console.log(auth.currentUser.displayName);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateProfileImage = async () => {
  updateProfile(auth.currentUser, {
    photoURL: "https://picsum.photos/200/300",
  })
    .then(() => {
      console.log(auth.currentUser.displayName);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const storage = getStorage(app);
