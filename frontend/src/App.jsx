import "./App.css";
import Home from "./Pages/Home";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";
import RegisterPage from "./Pages/Register";
import OTPVerificationPage from "./Pages/OtpVerificaton";
import Navbar from "./Components/Navbar";
import AccountActivatedPage from "./Pages/AccountActivated";
import LoginPage from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import AuthProvider from "./context/AuthContext";
import Logout from "./Pages/Logout";

function App() {
  return (
    <AuthProvider>
      <Router>
        {" "}
        {/* BrowserRouter wraps everything */}
        <Navbar />
        <Routes>
          {" "}
          {/* Routes should contain Route components */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-otp" element={<OTPVerificationPage />} />
          <Route path="/account-activated" element={<AccountActivatedPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<PageNotFound />} />{" "}
          {/* Catch-all route for 404 page */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
