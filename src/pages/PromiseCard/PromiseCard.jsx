import "../../styles/PromiseCard.css";
import { FaHeart } from "react-icons/fa";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import axios from "axios"; // Import axios
import SidePromise from "../../components/SidePromise";

const PromiseCard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [user, setUser] = useState(null);  // Set initial value to null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get("https://auth-zxvu.onrender.com/api/auth/getUsername", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        
        setUser({ username: response.data.username });  // Store user as an object with username
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  const displaySideBar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <div className="promiseCard">
      {loading ? (
        <p>Loading...</p>
      ) : (
        user ? (
          <p className="display-name">
            <span id="span">Welcome,</span>&nbsp; {user.username}👋🏽
          </p>
        ) : (
          <p>User not found or not authenticated.</p>
        )
      )}

      <div className="promiseCard">
        <FaHeart className="heart-icon" />
        <p className="promiseCard-content">
          Share a promise card with your friends and help them discover the perfect gift for you!
        </p>
        <Button
          label="Create your promise card"
          styleClass="action-button"
          onClick={displaySideBar}
        />

        {sidebarVisible && <SidePromise closeSidebar={closeSidebar} />}
      </div>
    </div>
  );
};

export default PromiseCard;
