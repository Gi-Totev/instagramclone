import React, { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "../Avatar/Avatar";
import Skeleton from "react-loading-skeleton";

const User = ({ username, fullname }) =>
  !username || !fullname ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link
      to={`/p/${username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <Avatar username={username} variant="sm" />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullname}</p>
      </div>
    </Link>
  );

User.propTypes = {
  username: PropTypes.string,
  fullname: PropTypes.string,
};

export default memo(User);

User.whyDidYouRender = true;
