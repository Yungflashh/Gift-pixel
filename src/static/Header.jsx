import React, { useState, useEffect } from 'react';
import GiftPixelLogo from "../assets/GiftPixel.svg";
import { IoNotifications } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaGift, FaHandHolding } from "react-icons/fa"; 
import "../styles/Header.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import Cookies from "js-cookie";

const Header = () => {
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu

  const token = Cookies.get("token");

  const fetchNotifications = async (token) => {
    if (!token) {
      setError("Authentication token is missing");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://auth-zxvu.onrender.com/api/auth/notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const sortedNotifications = response.data.notifications.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      setNotifications(sortedNotifications);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError("Failed to fetch notifications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = () => {
    if (token) {
      setIsModalOpen(true);
      fetchNotifications(token);
    } else {
      setError("User not authenticated");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Toggle hamburger menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="header-container">
      <div className="logo-container">
        <img src={GiftPixelLogo} alt="Logo image" />
      </div>

      <div className={`links-container ${isMenuOpen ? 'active' : ''}`}>
        <Link to={"/promiseList"} className="anchor-link" onClick={handleLinkClick}>
          <nav>Promise list</nav>
        </Link>

        <Link to={"/walletBalance"} className="anchor-link" onClick={handleLinkClick}>
          <nav>Wallet</nav>
        </Link>

        <nav onClick={handleLinkClick}>Settings</nav>
      </div>

      <div className="profile-container">
        <IoNotifications size={20} onClick={handleNotificationClick} />


        <Link to={"/profileSettings"} className="anchor-link" >
        <CgProfile size={24} />

        </Link>
      </div>

      {/* Hamburger Menu Icon */}
      <div className="hamburger-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {isModalOpen && (
        <div className="notification-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseModal}>
              X
            </button>
            <h3>Notifications</h3>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <div>
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <div key={index} className="notification-item">
                      <div className="notification-icon">
                        {notification.type === 'promise_created' ? (
                          <FaGift size={24} color="green" />
                        ) : notification.type === 'request_created' ? (
                          <FaHandHolding size={24} color="blue" />
                        ) : null}
                      </div>
                      <div className="notification-text">
                        <p>{notification.message}</p>
                        <small>{new Date(notification.timestamp).toLocaleString()}</small>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No new notifications</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
