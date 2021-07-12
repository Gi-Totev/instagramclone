import React from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import Heart from "../Post/Svg/Heart";
import Comment from "../Post/Svg/Comment";

const Photos = ({ photos }) => {
  return (
    <div className="h-16 border-top border-gray-primary mt-12 pt-4">
      <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
        {!photos ? (
          <Skeleton count={12} width={320} height={400} />
        ) : photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.docId} className="relative group">
              <img src={photo.imageSrc} alt={photo.caption} />
              <div className="absolute bottom-0 left-0 bg-gray-200 z-10 w-full justify-evenly items-center h-full bg-black-faded hidden group-hover:flex">
                <p className="flex item-center text-white font-bold">
                  <Heart
                    liked={true}
                    className="cursor-default"
                    color="white"
                  />
                  {photo.likes.length}
                </p>
                <p className="flex item-center text-white font-bold">
                  <Comment
                    liked={true}
                    className="cursor-default"
                    color="white"
                  />
                  {photo.comments.length}
                </p>
              </div>
            </div>
          ))
        ) : null}
      </div>
      {!photos ||
        (photos.length === 0 && (
          <p className="text-center text-2xl capitalize">
            This user has no posts
          </p>
        ))}
    </div>
  );
};

export default Photos;

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
};
