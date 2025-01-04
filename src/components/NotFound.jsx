import  { useState } from 'react';
import '../styles/NotFound.css';

const NotFound = () => {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [randomNumber] = useState(Math.floor(Math.random() * 10) + 1);
  const [attempts, setAttempts] = useState(0);

  const handleInputChange = (e) => {
    setGuess(e.target.value);
  };

  const handleGuess = () => {
    setAttempts(attempts + 1);
    if (parseInt(guess) === randomNumber) {
      setMessage(`Correct! You guessed the number in ${attempts + 1} tries.`);
    } else {
      setMessage('Wrong guess. Try again!');
    }
  };

  return (
    <div className="not-found-container">
      <div className="not-found-message">
        <h1>404</h1>
        <p>Oops! Page not found.</p>
        <p>While you're here, why not try a little game?</p>
      </div>

      <div className="game-container">
        <h2>Guess the Number Game</h2>
        <p>I'm thinking of a number between 1 and 10. Can you guess it?</p>
        <input
          type="number"
          value={guess}
          onChange={handleInputChange}
          placeholder="Enter a number"
          className="guess-input"
        />
        <button onClick={handleGuess} className="guess-button">
          Guess
        </button>
        <p>{message}</p>
        <p>Attempts: {attempts}</p>
      </div>
    </div>
  );
};

export default NotFound;
