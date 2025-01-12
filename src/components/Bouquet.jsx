// Bouquet.jsx
import React from 'react';
import Flower from './Flower'; // Import the Flower component
import '../styles/Bouquet.css'; // Importing the bouquet styles

const Bouquet = () => {
  return (
    <div className="bouquet">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flower-container"
          style={{
            transform: `translate(${Math.random() * 50}px, ${Math.random() * 50}px) rotate(${Math.random() * 30 - 15}deg)`, // Random positioning and rotation
          }}
        >
          <Flower />
        </div>
      ))}
    </div>
  );
};

export default Bouquet;
