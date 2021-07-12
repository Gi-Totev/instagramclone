import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";
import AddComment from "./AddComment";

const Comments = ({ docId, comments: allComments, posted, commentInput }) => {
  const [comments, setComments] = useState(allComments);
  const [toggleShowAllComments, setToggleShowAllComments] = useState(false);
  let slice = !toggleShowAllComments ? 3 : comments.length;

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.length >= 3 && (
          <p
            className="text-sm text-gray-base mb-1 cursor-pointer"
            onClick={() => setToggleShowAllComments(!toggleShowAllComments)}
          >
            {toggleShowAllComments ? "Hide comments" : "View all comments"}
          </p>
        )}
        {comments.slice(0, slice).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-3 font-bold">{item.displayName}</span>
            </Link>
            <span>&nbsp;{item.comment}</span>
          </p>
        ))}
        <p className="text-gray-base capitalized text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
};

export default Comments;

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
};
