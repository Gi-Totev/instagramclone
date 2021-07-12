import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import PropTypes from "prop-types";
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
} from "../../services/firebase";

const SuggestedProfiles = ({
  suggestedProfileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId,
}) => {
  const [followed, setFollowed] = useState(false);

  const handleFollow = async () => {
    setFollowed(true);
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    await updateFollowedUserFollowers(suggestedProfileDocId, userId, false);
  };

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <Avatar username={username} variant="sm" />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button
        type="button"
        className="text-xs font-bold text-blue-medium"
        onClick={handleFollow}
      >
        Follow
      </button>
    </div>
  ) : null;
};

export default SuggestedProfiles;

SuggestedProfiles.propTypes = {
  suggestedProfileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
};
