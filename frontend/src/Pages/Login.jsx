import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CustomeAlert } from "../services/CustomeAlert";
import axios from "axios";

const Logout = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/logout`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setIsAuthenticated(false);
        CustomeAlert("success", "You have been logged out successfully");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleLogout = () => {
    // Perform any logout operations here (e.g., clearing session, cookies)
    logout();
    // Redirect to login page after logout
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Are you sure you want to logout?
        </h1>
        <p className="text-center text-gray-500 mb-6">
          You will be logged out of your account. Please confirm your decision.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
