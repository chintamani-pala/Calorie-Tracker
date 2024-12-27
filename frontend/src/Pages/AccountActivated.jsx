import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AccountActivatedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!location.state?.isRegistered) {
      navigate("/register");
    }
  });

  const handleLoginClick = () => {
    navigate("/login"); // Replace "/login" with your login route
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Account Activated Successfully!
        </h2>
        <p className="text-gray-700 mb-6">
          Your account has been activated. You can now log in and start using
          our application.
        </p>
        <button
          onClick={handleLoginClick}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default AccountActivatedPage;
