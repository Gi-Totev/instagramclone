import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Photos from "./Photos";
import {
  getUserByUsername,
  getUserPhotosByUserId,
} from "../../services/firebase";

const initialState = { profile: {}, photosCollection: [], followerCount: 0 };

const reducer = (state, newState) => ({ ...state, ...newState });

const UserProfile = ({ username }) => {
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileAndPhotos() {
      const [user] = await getUserByUsername(username);

      const photos = await getUserPhotosByUserId(user.userId);

      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user?.followers?.length,
      });
    }
    getProfileAndPhotos();
  }, [username]);

  return (
    <div>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount ? followerCount : 0}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </div>
  );
};

export default UserProfile;

UserProfile.propTypes = {
  username: PropTypes.string.isRequired,
};
