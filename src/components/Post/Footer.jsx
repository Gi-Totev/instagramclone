import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Footer = ({ caption, username }) => {
  return (
    <div className="p-4 pt-2 pb-0">
      <Link to={`/p/${username}`}>
        <span className="mr-3 font-bold">{username}</span>
      </Link>
      <span>
        <em>{caption}</em>
      </span>
      <hr className="mt-3 mb-3" />
    </div>
  );
};

export default Footer;

Footer.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
