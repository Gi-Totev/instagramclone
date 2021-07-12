import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/Header";
import UserProfile from "../components/Profile/UserProfile";

const Profile = () => {
  const { username } = useParams();
  const [userExists, setUserExists] = useState(false);
  const [, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const doesUserExist = await getUserByUsername(username);
      if (doesUserExist.length > 0) {
        setUserExists(true);
        setUser(doesUserExist[0]);
      } else {
        setUserExists(false);
        history.push(ROUTES.NOT_FOUND);
      }
    }

    checkUserExists();
  }, [username, history]);

  return userExists ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile username={username} />
      </div>
    </div>
  ) : null;
};

export default Profile;
