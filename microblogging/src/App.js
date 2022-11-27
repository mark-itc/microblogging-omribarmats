import { Routes, Route, NavLink } from "react-router-dom";
import "./Styles/App.css";
import "./Styles/Navbar.css";
import { Feed } from "./Components/Feed";
import { Profile } from "./Pages/Profile";

function App() {
  return (
    <div className="App">
      <div class="Navbar">
        <NavLink activeClassName="active" className={""} to="/">
          Home
        </NavLink>
        <NavLink activeClassName="active" className={"tab"} to="/profile">
          Profile
        </NavLink>
      </div>
      <Routes>
        <Route path="" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
