import React, { useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TestimonialSlider = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const sliderStyle = {
    padding: "50px 0",
    
    textAlign: "center",
    position: "relative",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const dotStyle = {
    color: "#ff6e6e",
  };

  const subtitleStyle = {
    fontSize: "1rem",
    color: "#777",
    marginBottom: "30px",
  };

  const contentStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    position: "relative",
  };

  const navBtnStyle = {
    background: "none",
    border: "none",
    fontSize: "2rem", // Adjusted size to make them more noticeable
    color: "#333",
    cursor: "pointer",
  };

  const navigationStyle = {
    position: "relative",
    bottom: "-100px", // Move the buttons further down
    left: "50%",
    transform: "translateX(-50%)", // Center the buttons horizontally
    display: "flex",
    justifyContent: "center", // Align buttons horizontally
    gap: "10px", // Maintain the gap between the buttons
  };
  

  return (
    <div style={sliderStyle}>
      <h2 style={titleStyle}>
        Testimonial <span style={dotStyle}>.</span>
      </h2>
      <p style={subtitleStyle}>See what people say about us</p>

      <div style={contentStyle}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            text={testimonial.text}
            name={testimonial.name}
            image={testimonial.image}
            highlight={index === currentIndex}
          />
        ))}
      </div>

      <div style={navigationStyle}>
        <button style={navBtnStyle} onClick={handlePrev}>
          <FaChevronLeft />
        </button>
        <button style={navBtnStyle} onClick={handleNext}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
