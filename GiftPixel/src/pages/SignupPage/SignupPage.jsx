// React Component: SignupPage
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for password visibility toggle
import { useNavigate } from "react-router-dom"; 
import "../../styles/SignupPage.css";
import Input from "../../components/Inputs";
import Button from "../../components/Button";
import Cookies from "js-cookie"
import WelcomeSection from "../../components/WelcomeSection";

const SignupPage = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Hook to navigate to other pages

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    // Ensure password criteria is met before submitting
    if (!isPasswordValid()) {
      alert("Please ensure your password meets the criteria.");
      return;
    }

   
    console.log("Form submitted:", formData);

    try {
      Cookies.set('email', formData.email, { expires: 1, path: '/emailverificationpage' });

      const response = await fetch("https://auth-zxvu.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Signup successful:", data);
        // Redirect to email verification page or login page
        navigate("/emailVerificationPage", { state: { email: formData.email } });
      } else {
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
        // Handle server error (e.g., email already in use)
        alert(errorData.message || "Failed to create account. Try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

  const isPasswordValid = () => {
    return (
      formData.password.length >= 8 &&
      /[A-Z]/.test(formData.password) &&
      /\d/.test(formData.password) &&
      /[!@#$%^&*_-]/.test(formData.password)
    );
  };

  // Password validation criteria
  const passwordCriteria = [
    { label: "At least 8 characters", isValid: formData.password.length >= 8 },
    { label: "At least one uppercase", isValid: /[A-Z]/.test(formData.password) },
    { label: "At least one number", isValid: /\d/.test(formData.password) },
    { label: "At least one special character", isValid: /[!@#$%^&*_-]/.test(formData.password) },
  ];

  // Validate the entire form
  const isFormValid = () => {
    const isPasswordValid = passwordCriteria.every((criterion) => criterion.isValid);
    return (
      formData.firstName &&
      formData.lastName &&
      formData.username &&
      formData.email &&
      formData.phone &&
      isPasswordValid
    );
  };

  return (
    <div className="signup-page">
      {/* Welcome Section */}
     <div className= "mine">
      <WelcomeSection/>
     </div>

      {/* Signup Form */}
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        {/* First and Last Name Inputs */}
        <div className="form-row">
          <div className="input-container">
            <Input
              label="First name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="e.g John"
            />
          </div>
          <div className="input-container">
            <Input
              label="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="e.g Doe"
            />
          </div>
        </div>
        <div className="username">
          <Input
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="e.g JohnDoe"
          />
        </div>
        <div className="email">
          {/* Email Input */}
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g johndoe@gmail.com"
          />
          </div>

        {/* Phone Number Input */}
        <div className="phone-group">
          <Input
            label="Phone number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="9023428933"
            styleClass="phone-number"
          />

        </div>

        {/* Password Input with Visibility Toggle */}
        <div className="password-group">
          <Input
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="e.g Dawson12"
            styleClass="custom-password-input"
          />
          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >

            {showPassword ? <FaEyeSlash /> : <FaEye />}

          </span>
        </div>

        {/* Password Validation Messages */}
        <ul className="validation-list">
          {passwordCriteria.map((criterion, index) => (
            <li key={index} className={criterion.isValid ? "valid" : "invalid"}>
              {criterion.isValid ? "✔" : "✖"} {criterion.label}
            </li>
          ))}
        </ul>

        {/* Submit Button */}
        <Button
          label="Create account"
          type="submit"

          styleClass={`primary-button ${isFormValid() ? "enabled" : "disabled"}`}
          disabled={!isFormValid()}

        />

        {/* Social Media Sign-Up Options */}
        <div className="Or-signUp-with-google">
          <div></div>
          <p>OR Sign up with</p>
          <div></div>
        </div>
        <div className="social-icon-signUp-page">
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

        {/* Sign-In Link */}
        <p className="signin-link">
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </form>


      {/* Decorative SVG Image */}

     
    </div>
  );
};

export default SignupPage;
