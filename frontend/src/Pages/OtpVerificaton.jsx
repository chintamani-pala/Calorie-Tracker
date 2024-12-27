import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { CustomeAlert } from "../services/CustomeAlert";

const OTPVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]); // Create refs for the input fields
  const [activationToken] = useState(location.state?.activationToken);
  const [error, setError] = useState("");
  useEffect(() => {
    if (activationToken === undefined) {
      navigate("/register");
    }
    if (activationToken) {
      CustomeAlert("success", "OTP has been sent to your email");
    }
  }, [activationToken, navigate]);
  // Handle value change for each OTP input field
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow numbers (0-9)
    if (value.match(/[0-9]/)) {
      const newOtp = [...otp];
      newOtp[index] = value; // Update the OTP at the specific index
      setOtp(newOtp);

      // Move focus to the next input if not the last one
      if (index < otp.length - 1 && value !== "") {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Handle keydown events (including Backspace for focus shifting)
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      // If the current field has a value, clear it
      if (newOtp[index] !== "") {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Otherwise, move focus to the previous field and clear it
        inputRefs.current[index - 1].focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const enteredOtp = otp.join("");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/activate-user`,
        { activation_token: activationToken, activation_code: enteredOtp }
      );
      if (response.data.status === 200) {
        CustomeAlert("success", response.data.message);
        setTimeout(() => {
          navigate("/account-activated", {
            state: { isRegistered: true },
          });
        }, 3000);
      } else {
        setError(response.data.message);
        CustomeAlert("error", response.data.message);
      }

      // Implement OTP verification logic here
    } catch (err) {
      console.error(err);
      if (err.response) {
        CustomeAlert("error", err.response.data.message);
        setError(err.response.data.message);
      } else {
        CustomeAlert("error", "Something went wrong. Please try again later.");
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          OTP Verification
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="flex justify-between">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)} // Handle value change
                onKeyDown={(e) => handleKeyDown(e, index)} // Handle Backspace logic
                ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input field
                className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="-"
              />
            ))}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
