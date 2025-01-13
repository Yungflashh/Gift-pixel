import { Link } from "react-router-dom";
import "../../styles/ForgetPassword.css";
import { useState } from "react";
import Button from "../../components/Button";
import WelcomeSection from "../../components/WelcomeSection";
import Input from "../../components/Inputs";
import axios from "axios";

const ForgetPassword = () => {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const [isRequestSent, setIsRequestSent] = useState(false); 
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    if (email.trim() === "") {
      setErrorMessage("Please enter a valid email address.");
      return; 
    }
   
    setErrorMessage("");

    
    setIsLoading(true);

   
    axios.post("https://auth-zxvu.onrender.com/api/auth/reset-password", { email })
      .then(response => {
        setIsRequestSent(true); 
        console.log("Backend Response:", response); 
        alert("Password reset link has been sent to your email.");
      })
      .catch(response => {
        console.log("Error resetting password:", response)
        setErrorMessage(response.response.data.message); 
      })
      .finally(() => {
        setIsLoading(false); 
      });
  };

 
  const handleEmailChange = (e) => {
    const email = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsEmailValid(emailRegex.test(email)); 
  };

  return (
    <div className="forgetPasswordDiv">
      <div className="main-Container">
        <WelcomeSection />

        <div className="forgetpwrd-form-container">
          <form onSubmit={handleSubmit}>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <h2>Forgot Password</h2>
            <p>Enter your registered email to receive a password reset link.</p>

            <Input
              label="Email"
              type="email"
              name="email"
              required
              onChange={handleEmailChange}
              styleClass={"forgetpwrd-input"}
            />

           
            <Button
              label={isLoading ? "Sending..." : "Send Reset Link"}
              styleClass={isEmailValid ? "primary-button-valid" : "primary-button"}
              type="submit"
              disabled={!isEmailValid || isLoading}
            />

            
            {isLoading && <div className="spinner">Loading...</div>}
          </form>

         
          <div className="backToSignIn">
            <p>
              Remembered your password? <Link to="/signin">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
