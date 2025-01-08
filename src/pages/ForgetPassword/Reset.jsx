import { useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/ResetPassword.css";
import Button from "../../components/Button";
import WelcomeSection from "../../components/WelcomeSection";
import Input from "../../components/Inputs";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icon import

const ResetPassword = () => {
  const { token } = useParams(); // Get the reset token from the URL parameters
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validity
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Reset error message
    setErrorMessage("");

    // Send the new password to the backend for reset
    axios
      .post("https://auth-zxvu.onrender.com/api/auth/password-update", { password, token })
      .then((response) => {
        console.log("Password reset successful:", response);
        alert("Your password has been successfully reset!");
      })
      .catch((error) => {
        console.log("Error resetting password:", error);
        setErrorMessage(error.response.data.message); // Display error message
      });
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  // Handle confirm password input change
  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    validatePasswordMatch(newConfirmPassword);
  };

  // Validate password length and complexity
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}$/; // 7 characters minimum
    setIsPasswordValid(passwordRegex.test(password));
    setIsFormValid(password === confirmPassword && passwordRegex.test(password));
  };

  // Validate if passwords match
  const validatePasswordMatch = (confirmPassword) => {
    setIsFormValid(password === confirmPassword && isPasswordValid);
  };

  // Toggle visibility for password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle visibility for confirm password
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="resetPasswordDiv">
      <div className="main-Container">
        <WelcomeSection />

        <div className="resetpwrd-form-container">
          <form onSubmit={handleSubmit}>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <h2>Reset Your Password</h2>
            <p>Enter your new password below to reset it.</p>

            <div className="input-container">
              <Input
                label="New Password"
                type={showPassword ? "text" : "password"} // Toggle password visibility
                name="password"
                required
                value={password}
                onChange={handlePasswordChange}
                styleClass="resetpwrd-input"
              />
              <span onClick={togglePasswordVisibility} className="eye-icon">
                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icon */}
              </span>
            </div>

            <div className="input-container">
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                styleClass="resetpwrd-input"
              />
              <span onClick={toggleConfirmPasswordVisibility} className="eye-icon">
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icon */}
              </span>
            </div>

            {/* Conditionally change button style based on form validity */}
            <Button
              label="Reset Password"
              styleClass={isFormValid ? "primary-button-valid"}
              type="submit"
             
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
