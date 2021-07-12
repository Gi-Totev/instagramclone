import React from "react";
import { usernames } from "../../constants/images";

const Avatar = ({ username, variant }) => {
  const isUsername = usernames.includes(username);
  // <img
  //   className="rounded-full h-8 w-8 flex mr-3"
  //   src={`/images/avatars/${username}.jpg` || `/images/avatars/default.png`}
  //   alt={`${username}`}
  // />;
  return (
    <img
      className={
        variant === "sm"
          ? "rounded-full h-8 w-8 flex mr-3"
          : "rounded-full h-40 w-40 flex"
      }
      src={
        isUsername
          ? `/images/avatars/${username}.jpg`
          : `/images/avatars/default.png`
      }
      alt={`${username}`}
    />
  );
};

export default Avatar;
