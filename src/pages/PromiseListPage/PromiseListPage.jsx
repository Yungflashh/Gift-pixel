import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/PromiseListPage.css";
import Cookies from "js-cookie";
import axios from "axios";
import { Rings } from "react-loader-spinner"; // Import Rings from react-loader-spinner
import Button from "../../components/Button";
import SidePromise from "../../components/SidePromise";
import { IoAnalytics } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import { FiTrash2 } from "react-icons/fi";

const PromiseListPage = () => {

  const [promises, setPromises] = useState([]); // Store promises fetched from the backend
  const [loading, setLoading] = useState(true); // Manage loading state
  const [isSidePromiseOpen, setIsSidePromiseOpen] = useState(false); // State to control visibility of SidePromise
  const [user, setUser] = useState(null); // Store user data
  const navigate = useNavigate(); // React Router hook for navigation



  useEffect(() => {
    // Get token from cookies
    const token = Cookies.get("token");

    // If the token is missing, redirect to the sign-in page
    if (!token) {
      console.error("Authentication token is missing");
      navigate("/signin"); // Redirect to the sign-in page
      return; // Stop further execution if no token is found
    }

    // Fetch user data (username) from the backend API using the token
    axios
      .get("https://auth-zxvu.onrender.com/api/auth/getUsername", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token for authentication
        },
      })
      .then((response) => {
        // Set the username from the API response
        setUser(response.data); // Assuming response.data contains the username
      })
      .catch((error) => {
        console.error("Error fetching username:", error);
      });

    // Fetch the promises from the API on initial component load
    setLoading(true); // Start loading state
    axios
      .get("https://auth-zxvu.onrender.com/api/auth/user/promises", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token for authentication
        },
      })
      .then((response) => {
        console.log(response.data); // Log the entire response to check the structure

        const { titles, descriptions } = response.data.promises; // Destructure titles and descriptions from the response

        if (Array.isArray(titles) && Array.isArray(descriptions) && titles.length === descriptions.length) {
          // Map titles and descriptions into a combined promises array
          const promisesArray = titles.map((title, index) => ({
            title: title.title,
            description: descriptions[index].description,
            timestamp: title.timestamp,
            _id: title._id, // Assume each promise has a unique _id
          }));

          setPromises(promisesArray); // Set the promises state
        } else {
          console.error("Invalid data structure: Titles and descriptions arrays are not in sync.");
        }

        setLoading(false); // Stop loading after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching promises:", error);
        setLoading(false); // Stop loading in case of an error
      });
  }, [navigate]); // Add navigate to the dependency array


  const handleAnalytics = (promise) => {
    Cookies.set ("promiseId", promise._id)
    navigate("/analytics/:promiseTitleId")
  }
  // Handle promise click to navigate to PromiseDetailPage
  const handlePromiseClick = (promise) => {
    navigate(`/promise/${promise._id}`, { state: { promise } }); // Passing the promise data via state
  };

  // Function to handle "Create a Promise" button click
  const handleCreatePromiseClick = () => {
    setIsSidePromiseOpen(true); // Open the SidePromise component when button is clicked
  };

  // Function to close the SidePromise component
  const handleCloseSidePromise = () => {
    setIsSidePromiseOpen(false); // Close the SidePromise component
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
            ariaLabel="rings-loading" // Accessibility label
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

          {/* Check if user exists before rendering */}
          {promises.length > 0 ? (
            promises.map((promise, index) => (
              <div
                key={index}
                className="promise-card"
                onClick={() => handlePromiseClick(promise)} // Pass the full promise object
              >
                <p className="timestamp">{new Date(promise.timestamp).toLocaleString()}</p>
                <h3>{promise.title}</h3>

                <div className="icon-container">
                  <IoAnalytics className="icon " size={30} color="black" title="Analytics" onClick={handleAnalytics}/>
                  <FaEdit className="icon " size={30} color="black" title="Edit" />
                  <FaShareFromSquare className="icon" size={30} color="black" title="Share" />
                  <FiTrash2 className="icon" size={30} color="red" title="Delete" />
                </div>
              </div>
            ))
          ) : (
            <p>No promises to display</p>
          )}
        </div>
      )}

      {/* Conditionally render the SidePromise component */}
      {isSidePromiseOpen && <SidePromise closeSidebar={handleCloseSidePromise} />}
    </div>
  );
};

export default PromiseListPage;
