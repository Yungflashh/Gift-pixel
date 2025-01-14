import "../styles/SidePromise.css";
import Input from "../components/Inputs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie"; 
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const SidePromise = ({ closeSidebar }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPromise, setSelectedPromise] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submitting status
  const [errorMessage, setErrorMessage] = useState(""); // For displaying error messages
  const [successMessage, setSuccessMessage] = useState(""); // For displaying success messages
  const navigate = useNavigate();

  // Handle changes in input fields
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  // Handle the radio button selection
  const handleRadioChange = (e) => setSelectedPromise(e.target.value);

  const handlePromise = async () => {
    if (!title || !description || !selectedPromise) {
      toast.error("Please fill in all fields.");
      return;
    }

    const token = Cookies.get("token"); // Retrieve token from cookies

    if (!token) {
      navigate("/signin");
      return;
    }

    const requestData = {
      promiseTitle: title,
      promiseDescription: description,
      promiseType: selectedPromise,
    };

    try {
      setIsSubmitting(true);
      setErrorMessage(""); // Reset previous error message
      setSuccessMessage(""); // Reset previous success message

      // Include the token in the Authorization header
      const response = await axios.put(
        "https://auth-zxvu.onrender.com/api/auth/update-promise",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );

      // Assuming the backend returns the userId in the response (adjust based on your API structure)
      if (response.status === 200) {
        console.log(response);

        // const { userId } = response.data;  // Adjust based on the actual response structure

        setSuccessMessage("Promise updated successfully!");
        setTitle("");
        setDescription("");
        setSelectedPromise("");
        setTimeout(() => {
          navigate("/promiseList", { replace: true });
          window.location.reload();
        }, 1000);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error updating promise:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sidePromise-container">
      <button className="close-btn" onClick={closeSidebar}>
        ✖
      </button>

      <div className="Promise-select">
        <Input
          styleClass={"input-field"}
          type={"text"}
          label={"Promise Title"}
          value={title}
          onChange={handleTitleChange}
        />

        <label className="sideLabel">Description</label>
        <textarea value={description} onChange={handleDescriptionChange} />

        <p>What best describes your promise list?</p>
      </div>

      <div className="promise-btn">
        <div className="btn-container">
          <input
            type="radio"
            id="birthday1"
            name="promise"
            value="Birthday 1"
            onChange={handleRadioChange}
          />
          <label htmlFor="birthday1" className="btn-promise">
            Birthday
          </label>

          <input
            type="radio"
            id="Anniversary"
            name="promise"
            value="Anniversary"
            onChange={handleRadioChange}
          />
          <label htmlFor="Anniversary" className="btn-promise">
            Anniversary
          </label>

          <input
            type="radio"
            id="Valentine"
            name="promise"
            value="Valentine"
            onChange={handleRadioChange}
          />
          <label htmlFor="Valentine" className="btn-promise">
            Valentine
          </label>

          <input
            type="radio"
            id="NEWYEAR"
            name="promise"
            value="New Year Celebration"
            onChange={handleRadioChange}
          />
          <label htmlFor="NEWYEAR" className="btn-promise">
            New Year Celebration
          </label>

          <input
            type="radio"
            id="Christmas"
            name="promise"
            value="Christmas"
            onChange={handleRadioChange}
          />
          <label htmlFor="Christmas" className="btn-promise">
            Christmas
          </label>

          <input
            type="radio"
            id="Date"
            name="promise"
            value="Date"
            onChange={handleRadioChange}
          />
          <label htmlFor="Date" className="btn-promise">
            Date
          </label>

          <input
            type="radio"
            id="GoFundme"
            name="promise"
            value="GoFundme"
            onChange={handleRadioChange}
          />
          <label htmlFor="GoFundme" className="btn-promise">
            GoFundme
          </label>

          <input
            type="radio"
            id="House"
            name="promise"
            value="House Building"
            onChange={handleRadioChange}
          />
          <label htmlFor="House" className="btn-promise">
            House Building
          </label>

          <input
            type="radio"
            id="School"
            name="promise"
            value="School Fees"
            onChange={handleRadioChange}
          />
          <label htmlFor="School" className="btn-promise">
            School Fees
          </label>

          <input
            type="radio"
            id="Japa"
            name="promise"
            value="Japa Funds"
            onChange={handleRadioChange}
          />
          <label htmlFor="Japa" className="btn-promise">
            Japa Funds
          </label>

          <input
            type="radio"
            id="Tourism"
            name="promise"
            value="Tourism"
            onChange={handleRadioChange}
          />
          <label htmlFor="Tourism" className="btn-promise">
            Tourism
          </label>

          <input
            type="radio"
            id="Travelling"
            name="promise"
            value="Travelling"
            onChange={handleRadioChange}
          />
          <label htmlFor="Travelling" className="btn-promise">
            Travelling
          </label>

          <input
            type="radio"
            id="Others"
            name="promise"
            value="Others"
            onChange={handleRadioChange}
          />
          <label htmlFor="Others" className="btn-promise">
            Others
          </label>

          {/* New categories */}
          <input
            type="radio"
            id="Wedding"
            name="promise"
            value="Wedding"
            onChange={handleRadioChange}
          />
          <label htmlFor="Wedding" className="btn-promise">
            Wedding
          </label>

          <input
            type="radio"
            id="Charity"
            name="promise"
            value="Charity"
            onChange={handleRadioChange}
          />
          <label htmlFor="Charity" className="btn-promise">
            Charity
          </label>

          <input
            type="radio"
            id="BusinessStartup"
            name="promise"
            value="Business Startup"
            onChange={handleRadioChange}
          />
          <label htmlFor="BusinessStartup" className="btn-promise">
            Business Startup
          </label>

          <input
            type="radio"
            id="Health"
            name="promise"
            value="Health"
            onChange={handleRadioChange}
          />
          <label htmlFor="Health" className="btn-promise">
            Health
          </label>

          <input
            type="radio"
            id="Vacation"
            name="promise"
            value="Vacation"
            onChange={handleRadioChange}
          />
          <label htmlFor="Vacation" className="btn-promise">
            Vacation
          </label>

          <input
            type="radio"
            id="LoanRepayment"
            name="promise"
            value="Loan Repayment"
            onChange={handleRadioChange}
          />
          <label htmlFor="LoanRepayment" className="btn-promise">
            Loan Repayment
          </label>

          <input
            type="radio"
            id="Investment"
            name="promise"
            value="Investment"
            onChange={handleRadioChange}
          />
          <label htmlFor="Investment" className="btn-promise">
            Investment
          </label>

          <input
            type="radio"
            id="RetirementFund"
            name="promise"
            value="Retirement Fund"
            onChange={handleRadioChange}
          />
          <label htmlFor="RetirementFund" className="btn-promise">
            Retirement Fund
          </label>

          <input
            type="radio"
            id="FamilySupport"
            name="promise"
            value="Family Support"
            onChange={handleRadioChange}
          />
          <label htmlFor="FamilySupport" className="btn-promise">
            Family Support
          </label>

          <input
            type="radio"
            id="HomeRenovation"
            name="promise"
            value="Home Renovation"
            onChange={handleRadioChange}
          />
          <label htmlFor="HomeRenovation" className="btn-promise">
            Home Renovation
          </label>

          <input
            type="radio"
            id="EventPlanning"
            name="promise"
            value="Event Planning"
            onChange={handleRadioChange}
          />
          <label htmlFor="EventPlanning" className="btn-promise">
            Event Planning
          </label>

          <input
            type="radio"
            id="FitnessGoals"
            name="promise"
            value="Fitness Goals"
            onChange={handleRadioChange}
          />
          <label htmlFor="FitnessGoals" className="btn-promise">
            Fitness Goals
          </label>

          <input
            type="radio"
            id="PersonalGrowth"
            name="promise"
            value="Personal Growth"
            onChange={handleRadioChange}
          />
          <label htmlFor="PersonalGrowth" className="btn-promise">
            Personal Growth
          </label>
        </div>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <button
        onClick={handlePromise}
        className="submit-btn"
        disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default SidePromise;
