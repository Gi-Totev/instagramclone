import React, { useState, useEffect } from "react";
import Avatar from "../Avatar/Avatar";
import PropTypes from "prop-types";
import useUser from "../../hooks/useUser";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";

const Header = ({
  photosCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    following = [],
    followers = [],
    username,
  },
  followerCount,
  setFollowerCount,
}) => {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(isFollowing);
    };

    if (user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profileUserId]);

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto">
      <div className="container flex justify-center">
        <Avatar username={username} variant="lg" />
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{username}</p>
          {user.username && user.username !== username ? (
            <button
              className="mt-1 bg-blue-medium font-bold text-sm text-white rounded w-20 h-8"
              onClick={handleToggleFollow}
              onKeyDown={(e) => {
                if ((e.key = "Enter")) {
                  handleToggleFollow();
                }
              }}
            >
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          ) : null}
        </div>
        <div className="container flex mt-4">
          <p className="mr-10">
            <span className="font-bold">{photosCount}</span> posts
          </p>
          <p className="mr-10">
            <span className="font-bold">{followerCount}</span>
            {followers === 1 ? " Follower" : " Followers"}
          </p>
          <p className="mr-10">
            <span className="font-bold">{following.length}</span>
            Following
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    following: PropTypes.array,
    followers: PropTypes.array,
    username: PropTypes.string,
  }).isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
};
