import React from 'react'
import "../styles/imageprop.css"
const imageprop = ({ src, alt, className, onClick, ...rest }) => {
  return (
    <img
      src={src}
      alt={alt || 'image'}
      className={className}
      onClick={onClick}
      {...rest}
    />
  );
};

// Define default props (optional)
imageprop.defaultProps = {
  alt: 'image',
  className: '',
  onClick: null,
};

// Define prop types for validation (optional)
//ImageComponent.propTypes = {
  //src: PropTypes.string.isRequired, // Image source is required
  //alt: PropTypes.string, // Alternative text
  //className: PropTypes.string, // CSS class for styling
 // onClick: PropTypes.func, // Click event handler
//};
export default imageprop