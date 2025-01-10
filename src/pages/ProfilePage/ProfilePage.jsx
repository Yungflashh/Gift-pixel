import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { PiNotePencilLight } from "react-icons/pi";
import "../../styles/ProfilePage.css";
import Input from "../../components/Inputs";
import Cookies from "js-cookie";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    phone: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://auth-zxvu.onrender.com/api/auth/getUserData",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          const { username, email, firstName, lastName, phoneNumber } = data.user;
          setFormData({
            username: username || "",
            email: email || "",
            firstName: firstName || "",
            lastName: lastName || "",
            phone: phoneNumber || "",
            password: "",
          });
        } else {
          setError(data.message || "Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("An error occurred while fetching user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.firstName || !formData.lastName || !formData.username || !formData.email || !formData.phone || !formData.password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://auth-zxvu.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Signup successful:", data);
        navigate("/emailVerificationPage", { state: { email: formData.email } });
      } else {
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
        setError(errorData.message || "Failed to create account. Try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError("An error occurred during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="setting-page">
      <div className="profile-account-settingbox">
        <div className="profile">
          <AiOutlineUser /> Profile settings
        </div>
        <div className="profile">
          <AiOutlineUser /> Account settings
        </div>
      </div>
      <div className="info-box">
        <div className="image-container">
          <PiNotePencilLight className="notepen-icon" />
        </div>
        <form className="Personalsetting-form" onSubmit={handleSubmit}>
          <div className="formrow">
            <div className="inputContainer">
              <Input
                label="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="e.g Hamzah"
                styleClass="name"
                disabled={!isEditing.firstName} // Disabled if not in editing mode
              />
              <PiNotePencilLight className="icon" onClick={() => handleEditClick("firstName")} />
            </div>
            <div className="inputContainer">
              <Input
                label="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="e.g Alagbe"
                styleClass="name"
                disabled={!isEditing.lastName} // Disabled if not in editing mode
              />
              <PiNotePencilLight className="icon" onClick={() => handleEditClick("lastName")} />
            </div>
          </div>

          <div className="inputContainer">
            <Input
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="e.g Halalhustler"
              styleClass="general"
              disabled={true} // Always disabled for username
            />
          </div>

          <div className="inputContainer">
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g hamzahalagbe27@gmail.com"
              styleClass="general"
              disabled={true} // Always disabled for email
            />
          </div>

          <div className="inputContainer">
            <Input
              label="Phone number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+2347046441783"
              styleClass="general"
              disabled={!isEditing.phone} // Disabled if not in editing mode
            />
            <PiNotePencilLight className="icon" onClick={() => handleEditClick("phone")} />
          </div>

          <div className="PasswordInput">
            <Input
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="e.g Dawson12"
              styleClass="general"
            />
            <span className="PasswordToggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            <PiNotePencilLight className="icon" />
          </div>

          <ul className="ValidationMessage">
            {/* Password validation messages here */}
          </ul>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
