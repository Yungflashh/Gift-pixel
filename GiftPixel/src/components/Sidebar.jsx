import { useState } from "react";
import "../styles/Sidebar.css";   
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 


const Sidebar = ({ onClose, userId, promiseId }) => {
  const [requestType, setRequestType] = useState(""); // money or gift
  const [moneyAmount, setMoneyAmount] = useState(""); // amount if money is selected
  const [giftUrl, setGiftUrl] = useState(""); // URL if gift is selected
  const [isSubmitting, setIsSubmitting] = useState(false); // To manage form submission state


    // console.log(promiseId);
    
  const handleRequestTypeChange = (e) => {
    setRequestType(e.target.value);
  };

  const handleMoneyAmountChange = (e) => {
    setMoneyAmount(e.target.value);
  };

  const handleGiftUrlChange = (e) => {
    setGiftUrl(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if required fields are filled
    if (
      !requestType ||
      (requestType === "gift-item" && !giftUrl) ||
      (requestType === "money" && !moneyAmount)
    ) {
      toast.error("Please fill all the required fields.");
      return;
    }

    // Validate money amount if it's a number
    if (requestType === "money" && (isNaN(moneyAmount) || moneyAmount <= 0)) {
      toast.error("Please enter a valid amount.");
      return;
    }

    setIsSubmitting(true); // Set loading state

    // Prepare the data to be sent based on the request type
    let data = {
      userId,
      promiseTitleId: promiseId, // Send promiseId for the specific promiseTitle
      requestType, // "money" or "gift-item" based on the selection
    };

    // Only include moneyAmount or giftUrl based on the request type
    if (requestType === "money") {
      data.requestValue = parseFloat(moneyAmount); // Send moneyAmount as requestValue
    } else if (requestType === "gift-item" && giftUrl.trim() !== "") {
      data.requestValue = giftUrl.trim(); // Use requestValue for gift URL
    }

    // Get the token (either from cookies, localStorage, or wherever it's stored)
    const token = Cookies.get("token"); // Adjust based on where your token is stored

    try {
      const response = await axios.put(
        "https://auth-zxvu.onrender.com/api/auth/addRequest",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Include the token in the headers
          },
          withCredentials: true,
        }
      );

      const result = response.data;

      if (result.success) {
        toast.info("Request added successfully!");
        onClose(); // Close the sidebar after success
        window.location.reload();
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("There was an error submitting the form.");
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h3>What are you requesting for?</h3>

        <label htmlFor="request-type">Type of Promise:</label>
        <select id="request-type" value={requestType} onChange={handleRequestTypeChange}>
          <option value="">Select</option>
          <option value="money">Money</option>
          <option value="gift-item">Gift Item</option>
        </select>

        {requestType === "money" && (
          <div>
            <label htmlFor="money-amount">Amount:</label>
            <input
              id="money-amount"
              type="number"
              value={moneyAmount}
              onChange={handleMoneyAmountChange}
              placeholder="Enter amount"
            />
          </div>
        )}

        {requestType === "gift-item" && (
          <div>
            <label htmlFor="gift-url">Gift URL:</label>
            <input
              id="gift-url"
              type="gift-url"
              value={giftUrl}
              onChange={handleGiftUrlChange}
              placeholder="Enter gift item URL"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={  isSubmitting ? "btn-loading" : " sub-button "}
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
