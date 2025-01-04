// Flower.jsx
import React, { useEffect, useState } from 'react';
import '../styles/Flower.css'; // Importing the CSS file for styles

const Flower = () => {
  const [flameStyle, setFlameStyle] = useState([]);

  useEffect(() => {
    // Start a timer that will update the flame effect
    const interval = setInterval(() => {
      setFlameStyle((prev) => prev.map(() => Math.random() * 15)); // Randomize flame heights for the illusion of burning
    }, 100);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="flower">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="petal"
          style={{
            transform: `rotate(${index * 60}deg) translateY(${flameStyle[index] ? flameStyle[index] : 0}px)`,
            animation: 'flame 1s ease-in-out infinite',
          }}
        />
      ))}
    </div>
  );
};

export default Flower;
