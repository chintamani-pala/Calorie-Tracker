import axios from "axios";
import { createContext, useState } from "react";

// Create a Context for authentication
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  async function handleLogin() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/verify-token`,
        { withCredentials: true }
      );
      if (res.data.success === true) {
        setIsAuthenticated(true);
      }
      return res.data.success;
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, handleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
