import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/PromiseListPage.css";
import Cookies from "js-cookie";
import axios from "axios";
import { Rings } from "react-loader-spinner";
import Button from "../../components/Button";
import SidePromise from "../../components/SidePromise";
import { IoAnalytics } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import { FiTrash2 } from "react-icons/fi";

const PromiseListPage = () => {
  const [promises, setPromises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidePromiseOpen, setIsSidePromiseOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("Authentication token is missing");
      return;
    }

    axios
      .get("https://auth-zxvu.onrender.com/api/auth/getUsername", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        navigate("/signin");
        console.error("Error fetching username:", error);
      });

    setLoading(true);
    axios
      .get("https://auth-zxvu.onrender.com/api/auth/user/promises", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.promises.titles.length === 0) {
          navigate("/createPromise");
        }

        const { titles, descriptions } = response.data.promises;

        if (Array.isArray(titles) && Array.isArray(descriptions) && titles.length === descriptions.length) {
          const promisesArray = titles.map((title, index) => ({
            title: title.title,
            description: descriptions[index].description,
            timestamp: title.timestamp,
            _id: title._id,
          }));

          setPromises(promisesArray);
        } else {
          console.error("Invalid data structure: Titles and descriptions arrays are not in sync.");
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching promises:", error);
        setLoading(false);
      });
  }, [navigate]);

  const handleAnalytics = (e, promise) => {
    e.stopPropagation();
    Cookies.set("promiseId", promise._id);
    navigate("/analytics");
  };

  const handlePromiseClick = (promise) => {
    navigate(`/promise/${promise._id}`, { state: { promise } });
  };

  const handleCreatePromiseClick = () => {
    setIsSidePromiseOpen(true);
  };

  const handleCloseSidePromise = () => {
    setIsSidePromiseOpen(false);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
  };

  const handleShare = (e) => {
    e.stopPropagation();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="promise-list-container">
      {loading ? (
        <div className="loading-container">
          <Rings
            color="#ff5050"
            height={500}
            width={1000}
            radius="6"
            visible={true}
            ariaLabel="rings-loading"
          />
        </div>
      ) : (
        <div className="promise-cards-container">
          <div className="details-container">
            {user ? (
              <p className="display-name">
                <span id="span">Welcome,</span>&nbsp; {user.username}👋🏽
              </p>
            ) : (
              <p>Loading...</p>
            )}

            <Button label="Create a Promise" onClick={handleCreatePromiseClick} styleClass={"btn-to-createPromise"} />
          </div>

          {promises.length > 0 ? (
            promises.map((promise, index) => (
              <div
                key={index}
                className="promise-card"
                onClick={() => handlePromiseClick(promise)}
              >
                <p className="timestamp">{new Date(promise.timestamp).toLocaleString()}</p>
                <h3>{promise.title}</h3>

                <div className="icon-container">
                  <IoAnalytics 
                    className="icon" 
                    size={30} 
                    color="black" 
                    title="Analytics" 
                    onClick={(e) => handleAnalytics(e, promise)} 
                  />
          
                </div>
              </div>
            ))
          ) : (
            <p>No promises to display</p>
          )}
        </div>
      )}

      {isSidePromiseOpen && <SidePromise closeSidebar={handleCloseSidePromise} />}
    </div>
  );
};

export default PromiseListPage;
