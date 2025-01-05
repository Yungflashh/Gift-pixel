import React, { useState, useEffect } from 'react';
import GiftPixelLogo from "../assets/GiftPixel.svg";
import { IoNotifications } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaGift, FaHandHolding } from "react-icons/fa"; // Imported icons for gift and giving
import "../styles/Header.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import Cookies from "js-cookie";

const Header = () => {
  const [notifications, setNotifications] = useState([]); // State to store notifications
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // To handle errors


  // Get the token from cookies
  const token = Cookies.get("token"); // Assuming token is stored in cookies

  // Fetch notifications
  const fetchNotifications = async (token) => {
    if (!token) {
        setError("Authentication token is missing");
        return;
    }

    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
        const response = await axios.get(
            `https://auth-zxvu.onrender.com/api/auth/notifications`, // The route stays the same
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Use the token for authentication
                },
            }
        );

        // Extract notifications from the response
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

  // Handle notification icon click
  const handleNotificationClick = () => {
   
    console.log(token);
    
    console.log("Notification icon  has been clicked");
   

    if (token) {
      setIsModalOpen(true); // Open the modal
      fetchNotifications(token); // Fetch notifications when modal opens
    } else {
      setError("User not authenticated");
    }
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="header-container">
      <div className="logo-container">
        <img src={GiftPixelLogo} alt="Logo image" />
      </div>

      <div className="links-container">
        <Link to={"/promiseList"} className="anchor-link">
          <nav>Promise list</nav>
        </Link>
       
       
       <Link to={"/walletBalance"} className="anchor-link">  <nav>Wallet</nav>  </Link> 
        <nav>Settings</nav>
      </div>

      <div className="profile-container">
        {/* Notification Icon */}
        <IoNotifications size={20} onClick={handleNotificationClick} />

        {/* Profile Icon */}
        <CgProfile size={24} />
      </div>

      {/* Notification Modal */}
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
                      {/* Conditionally render icons based on notification type */}
                      <div className="notification-icon">
                        {notification.type === 'promise_created' ? (
                          <FaGift size={24} color="green" /> // Icon for promise created (gift)
                        ) : notification.type === 'request_created' ? (
                          <FaHandHolding size={24} color="blue" /> // Icon for request created (giving)
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
