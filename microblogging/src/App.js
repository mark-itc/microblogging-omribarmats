import { useContext, useEffect } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
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

  console.log(user);

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
            <img width="50px" src={user?.photoURL} />
            <p> {userName || user.displayName || user.email} |&nbsp;</p>
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
