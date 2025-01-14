import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/SignInPage.css";
import Button from "../../components/Button";
import Cookies from 'js-cookie'; // You will still use this for frontend cookies (though the token is in httpOnly cookies)
import { FaApple, FaFacebook, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import WelcomeSection from "../../components/WelcomeSection";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    if (!validateEmail(emailValue)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value.trim();
    setPassword(passwordValue);
    if (passwordValue.length < 8) {
      setError("Password must be at least 8 characters.");
    } else {
      setError("");
    }
  };

  const handleSignIn = () => {
    if (!email || !password || emailError) {
      return;
    }

    const userData = {
      email: email,
      password: password,
    };

    setLoading(true);
     
      // Cookies.set("myCookie", "sghwdeio")

       axios
      .post("https://auth-zxvu.onrender.com/api/auth/login", userData, { withCredentials: true }) // Token will be stored as an httpOnly cookie
      .then((response) => {
        setLoading(false);
        
        console.log(response.data);
        
        const token = response.data.token

        Cookies.set("token", token)
        
        
        
        // console.log("Token from cookies:", token);
        // console.log(Cookies.get('myCookie'))

        if (!token){
          setError("You don't have access Pls Try again");
          
        }

        else{
          setSuccessMessage("Login Successful"); // Set the success message
        }

        
        if (token) {
          // console.log(token);
          
          axios.get("https://auth-zxvu.onrender.com/api/auth/user/promises", {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          })
            .then((response) => {
              if (Array.isArray(response.data.promises.titles) && response.data.promises.titles.length === 0) {
                setTimeout(() => {
                  navigate("/createPromise");
                }, 1000);
              } else {
                setTimeout(() => {
                  navigate("/promiseList");
                }, 1000);
              }
            })
            .catch((error) => {
              console.error("Error fetching user promises:", error);
              setLoading(false);
              setError("Error fetching promises.");
            });
        }
      })
      .catch((error) => {
        setLoading(false);
        setError("Incorrect email or password.");
        console.log(error);
        setSuccessMessage(""); // Clear success message if login fails
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signInDiv">
      <div className="main-Container">
        <WelcomeSection />

        <div className="form-container">
          <h2>Sign In</h2>

          {successMessage && <p className="success-message">{successMessage}</p>} {/* Display the success message */}

          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="input-field"
            />
          </div>

          {emailError && <p className="email-error">{emailError}</p>}

          <div className="form-input">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className="input-field"
              />
              <span className="password-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
            <Link to={"/forgotPassword"}  className="fgpwrd">
            <p  className="fgpwrd-text">Forgot password?</p>
          </Link>
          </div>

          {error && <p className="password-error">{error}</p>}

        

          <Button
            label={loading ? "Signing in..." : "Sign in"}
            styleClass={`signBtn ${password.length >= 8 && email && !emailError ? "active" : ""}`}
            onClick={handleSignIn}
            disabled={loading || password.length < 8 || !email || emailError}
          />

          {loading && <div className="loader"><div className="spinner"></div></div>}

          <div className="span">
            <div></div>
            <p>OR Sign in with</p>
            <div></div>
          </div>

          <div className="social-media-icon">
          <img
            src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1733753205/Frame_30_1_lt8drl.png"
            alt="Social Logo 1"
            className="social-logo"
          />
          <img
            src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1733752348/Frame_32_wazt01.png"
            alt="Social Logo 2"
            className="social-logo"
          />
          <img
            src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1733752330/Frame_34_wqavhq.png"
            alt="Social Logo 3"
            className="social-logo"
          />
        </div>

          <div className="acctSettings">
            <p>Don’t have an Account? <Link id="span" to={"/signup"}><span>Sign up</span></Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
