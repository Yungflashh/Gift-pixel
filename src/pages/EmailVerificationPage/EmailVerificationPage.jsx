import { useState } from "react";
import "../../styles/EmailVerificationPage.css";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom"; 
import OtpInput from "react-otp-input";
import { FaApple, FaFacebook, FaGoogle, FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import WelcomeSection from "../../components/WelcomeSection";

// I define the EmailVerificationPage component
const EmailVerificationPage = () => {
  // I use state hooks to manage OTP input, error messages, success messages, and loading state
  const [otp, setOtp] = useState(""); // I store the OTP entered by the user
  const [error, setError] = useState(""); // I store any error messages related to OTP verification
  const [successMessage, setSuccessMessage] = useState(""); // I store a success message if OTP is verified
  const [loading, setLoading] = useState(false); // I manage the loading spinner state during verification
  const navigate = useNavigate(); // I use the navigate hook to redirect users

  // I created the verifyOtp function to handle OTP verification
  const verifyOtp = async () => {
    setLoading(true); // I set loading to true when verification starts
    try {
      // I prepared the payload with the OTP code that the user entered
      const payload = {
        code: otp, // I send the OTP as 'code' to the backend
      };

      

      // I logged the OTP to the console for debugging purposes
      console.log("OTP to send:", otp);

      // I sent the OTP to the backend for verification
      const response = await fetch("https://auth-zxvu.onrender.com/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // I sent only the OTP in the request body
      });

      //

      const result = await response.json();
      console.log("Verify OTP response: ", result); // I logged the response from the server

      // If the OTP is verified successfully, I show a success message and redirect the user
      if (response.ok && result.success) {
        setSuccessMessage("OTP verified successfully!"); // I set the success message
        setError(""); // I reset any error message
        setTimeout(() => {
          navigate("/signIn"); // I navigated to the dashboard after a 2-second delay
        }, 2000);
      } else {
        // If the OTP verification fails, I show an error message
        setError(result.message || "OTP verification failed"); // I displayed an error message
        setSuccessMessage(""); // I cleared the success message on failure
      }
    } catch (error) {
      // I caught any errors that happened during the OTP verification process
      console.error("Error verifying OTP: ", error); // I logged the error
      setError("Error delay require:");
      setLoading(false); // I set loading to false when the verification process finished
    }
  };

  // I created the sendOtp function to handle sending the OTP again (Resend OTP)
  const sendOtp = async () => {
    try {
      // I sent a request to resend the OTP to the user's email
      const response = await fetch("https://auth-zxvu.onrender.com/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // I didn't need to send any email this time
      });

      const result = await response.json();
      if (response.ok) {
        alert("OTP sent to your email!"); // I informed the user that the OTP was sent
      } else {
        alert(result.message || "Failed to resend OTP"); // I showed an error message if resending failed
      }
    } catch (error) {
      alert("Error sending OTP: " + error.message); // I showed an error message in case of network issues
    }
  };

  return (
    <div className="email-container">
    
    <div className="EmailVerificationPage">
      <WelcomeSection/>

      <div className="form-container-otp">
        {/* I created a back button that allows the user to return to the Sign In page */}
        <p className="Back" onClick={() => navigate("/signin")}>
          <FaAngleLeft size={20} /> Back
        </p>
        <h2 id="verify-text">Verify your email address</h2>
        <p>Enter the OTP code sent to your email</p>

        {/* I displayed OTP input fields for the user to enter their OTP */}
        <div className="otp-form">
          <OtpInput
            inputType="number"
            value={otp}
            onChange={setOtp} // I updated the OTP value as the user typed
            numInputs={6} // I set the number of OTP fields to 6
            renderSeparator={<span>&nbsp;</span>} // I added spacing between the OTP input fields
            renderInput={(props) => <input {...props} />} // I rendered each OTP input as an HTML input field
          />
        </div>

        {/* I created a "Resend OTP" link in case the user didn't receive the OTP */}
        <div>
          <p id="Resend-OTP" onClick={sendOtp}>
            Didn’t get the OTP? <span style={{ color: "red" }}>Resend</span>
          </p>
        </div>

        {/* I created a button that triggers the OTP verification */}
        <div>
          <Button
            label={loading ? "Verifying..." : "Verify"} // I showed "Verifying..." when the process was ongoing
            styleClass={`verifyBtn ${otp.length === 6 ? "active" : ""}`} // I added the "active" class if OTP length was 6
            onClick={verifyOtp} // I called the verifyOtp function when the button was clicked
            disabled={otp.length !== 6 || loading} // I disabled the button if the OTP length was not 6 or if it was loading
          />
        </div>

        {/* I displayed an error message if OTP verification failed */}
        {error && <div className="error-message">{error}</div>}

        {/* I displayed a success message if OTP verification was successful */}
        {successMessage && <div className="success-message">{successMessage}</div>}

        {/* I created a divider and showed options for alternative sign-up methods */}
        <div className="span">
          <div></div>
          <p>OR Sign up with</p>
          <div></div>
        </div>

        {/* I displayed social media icons for users to sign up using Apple, Facebook, or Google */}
        <div className="social-icon">
          <FaApple size={30} />
          <FaFacebook size={30} />
          <FaGoogle size={30} />
        </div>

        {/* I provided a link to navigate to the Sign In page if the user already had an account */}
        <div className="acctSettings">
          <p>
            Already have an account?{" "}
            <Link id="span" to={"/signin"}>
              <span>Sign In</span>
            </Link>
          </p>
        </div>
      </div>

      {/* I added a decorative background image for the page */}
      <div>
        <img
          className="bottom-left-image-otp"
          src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1733307863/image_gnnaf1.png"
          alt="Decorative SVG" // I included an alt text for accessibility purposes
        />
      </div>
    </div>

    </div>
  );
};

export default EmailVerificationPage;
