import React, { useRef } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Image from "./Image";
import Actions from "./Actions";
import Footer from "./Footer";
import Comments from "./Comments";

const Post = ({ content }) => {
  const commentInput = useRef(null);

  const handleFocus = () => {
    commentInput.current.focus();
  };

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-8">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer username={content.username} caption={content.caption} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
};

export default Post;

Post.propTypes = {
  content: PropTypes.shape({
    caption: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
    docId: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
  }),
};
