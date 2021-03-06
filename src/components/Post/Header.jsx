import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import PropTypes from "prop-types";

const Header = ({ username }) => {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <Avatar username={username} variant="sm" />

          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
