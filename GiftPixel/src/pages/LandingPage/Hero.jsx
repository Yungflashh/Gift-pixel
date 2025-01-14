import React from "react";
import "../../styles/Hero.css";

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          Share Meaningful <br />
          <span>Promises</span> With Your <br />
          Loved Ones
        </h1>
        <p className="hero-description">
          Create a personalized promise card to express your emotions and <br />
          strengthen your bond with someone special. Share your love in a <br /> unique way.
        </p>
        <button className="hero-button">Get Started</button>
        <div className="avatar-container">
  <div className="avatars">
    <img
      src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736598510/african-woman-successful-entrepreneur-wearing-glasses-face-portrait_1_teb7bd.png"
      alt="User 1"
      className="avatar"
    />
    <img
      src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736598509/african-woman-successful-entrepreneur-wearing-glasses-face-portrait_1_1_eecgr3.png"
      alt="User 2"
      className="avatar"
    />
    <img
      src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736598501/R_3_1_fmctna.png"
      alt="User 3"
      className="avatar"
    />
  </div>
  <div className="rating">
    <span className="stars">⭐⭐⭐⭐</span>
    <span className="rating-number">4.5 ratings</span>
  </div>
</div>

      </div>

      {/* Hero Images */}
      <div className="hero-images">
        <div className="image-container">
          <img
            src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736559833/flask_1_wb5efb.png"
            alt="Water Bottle"
          />
        </div>
        <div className="bike-container">
          <img
            src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736559834/cool-bicycle-studio_1_p7dwg9.png"
            alt="Bike"
          />
        </div>
        <div className="camera-container">
          <img
            src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736559833/camera_1_ltvavb.png"
            alt="Camera"
          />
        </div>
        <div className="watch-container">
          <img
            src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736559834/apple_watch_1_sfb2gr.png"
            alt="Watch"
          />
        </div>
        <div className="laptop-container">
          <img
            src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736559834/lenovo-laptops-thinkbook-series-thinkbook-14-gen2-amd-hero_1_mawgdy.png"
            alt="Laptop"
          />
        </div>
        <div className="phone-container">
          <img
            src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736559833/rb_66815_1_bcchvy.png"
            alt="Phone"
          />
        </div>
        <div className="car-container">
          <img
            src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736559833/iphone_1_ovaoxo.png"
            alt="Car"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
