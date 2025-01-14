import React from "react";
import { FaQuoteRight } from "react-icons/fa";
import PropTypes from "prop-types";

const TestimonialCard = ({ text, name, image, highlight }) => {
  const cardStyle = {
    backgroundColor: highlight ? "rgba(255, 80, 80, 1)" : "#fff",
    color: highlight ? "#fff" : "#555",
    borderRadius: "10px",
    padding: "30px",
    width: "400px",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    opacity: highlight ? 1 : 0.6,
    transform: highlight ? "scale(1.05)" : "scale(1)",
    transition: "all 0.3s ease",
    position: "relative",
  };

  const quoteIconStyle = {
    color: highlight ? "#fff" : "#555",
    fontSize: "2rem",
    marginBottom: "20px",
  };

  const textStyle = {
    fontSize: "1rem",
    lineHeight: "1.6",
    marginBottom: "20px",
  };

  const authorInfoStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    bottom: "-90px", // Position the image slightly inside the card
    left: "50%",
    transform: "translateX(-50%)",
  };

  const authorImageStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    border: highlight ? "3px solid #fff" : "3px solid #FF6E6E",
    marginBottom: "10px",
  };

  const authorNameStyle = {
    fontSize: "1rem",
    color: highlight ? "#fff" : "#333",
    fontWeight: "bold",
    marginTop: "5px",
  };

  return (
    <div style={cardStyle}>
      <div style={quoteIconStyle}>
        <FaQuoteRight />
      </div>
      <p style={textStyle}>{text}</p>
      <div style={authorInfoStyle}>
        <img src={image} alt={name} style={authorImageStyle} />
        <p style={authorNameStyle}>{name}</p>
      </div>
    </div>
  );
};

TestimonialCard.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  highlight: PropTypes.bool,
};

export default TestimonialCard;
