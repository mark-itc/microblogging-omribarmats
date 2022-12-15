import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Profile.css";
import { Button } from "../Components/Button";
import { UserNameContext } from "../Contexts/UserNameContext";

export const Profile = () => {
  const { userName, setUserName } = useContext(UserNameContext);
  const [newUserName, setNewUserName] = useState("");
  const navigate = useNavigate();

  return (
    <div className="Profile">
      <h2>Profile</h2>
      <label htmlFor="profileName">User Name</label>
      <input
        onChange={(event) => setNewUserName(event.target.value)}
        id="profileName"
        placeholder={userName}
      ></input>
      <Button
        text="Save"
        type="submit"
        disabled={newUserName.length === 0}
        onClick={(event) => {
          event.preventDefault();
          setUserName(newUserName);
          navigate("/");
        }}
      />
      <p>Test</p>
    </div>
  );
};
