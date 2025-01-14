import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ProfileImage.css';


const ProfileImage = ({ user }) => {
  // If no user or user image, render an empty placeholder
  return (
    <div className="profile-image-container">
      {user && user.image ? (
        <img
          src={user.image}
          alt={`${user.name}'s profile`}
          className="profile-image"
        />
      ) : (
        <div className="empty-placeholder">No Image</div>
      )}
    </div>
  );
};

// Define PropTypes for validation
ProfileImage.propTypes = {
  user: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
  }),
};

// Default props for when no user is provided
ProfileImage.defaultProps = {
  user: null,
};

export default ProfileImage;
