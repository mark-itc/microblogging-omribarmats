import { useContext, useEffect } from "react";
import { Routes, Route, NavLink, useNavigate, Link } from "react-router-dom";
import "./Styles/App.css";
import "./Styles/Navbar.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { Feed } from "./Components/Feed";
import { Profile } from "./Pages/Profile";
import { Login } from "./Pages/Login";
import { Page404 } from "./Pages/page404";
import { auth } from "./firebase-config";
import { signOut } from "firebase/auth";
import { AuthContext } from "./Contexts/Authcontext";
import { getDisplayName } from "firebase/storage";

function App() {
  const navigate = useNavigate();
  const { setUser, userName, setUserName } = useContext(AuthContext);
  const [user] = useAuthState(auth);

  const logOut = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="App">
      {user?.accessToken && (
        <div className="Navbar">
          <div className="Navbar-menu">
            <NavLink activeClassName="active" className={"tab"} to={"/"}>
              Home
            </NavLink>
            <NavLink activeClassName="active" className={"tab"} to={"/profile"}>
              Profile
            </NavLink>
          </div>

          <div class="navbar-profile">
            <a style={{ opacity: "1" }} href="/profile">
              <img
                width="50px"
                src={
                  user?.photoURL ||
                  "https://firebasestorage.googleapis.com/v0/b/microblogging-app-omri-barmats.appspot.com/o/1J4u4ejqH9NCDrgVqAmb09Hr0ij1-profilePicture-Mon%2C%2019%20Dec%202022%2009%3A06%3A49%20GMT?alt=media&token=2489094e-2599-4922-8efc-ac8790514efb"
                }
              />
            </a>
            <a style={{ opacity: "1" }} href="/profile">
              <p> {userName || user.displayName || user.email} |&nbsp;</p>
            </a>
            <a onClick={logOut}>Log out</a>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={user?.accessToken ? <Feed /> : <Login />} />
        <Route
          path="/profile"
          element={user?.accessToken ? <Profile /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
