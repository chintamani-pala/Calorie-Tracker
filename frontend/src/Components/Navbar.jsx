// Navbar.jsx
import { useContext, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo or App Name */}
        <div className="text-2xl font-semibold">
          <a href="/">Calorie Tracker</a>
        </div>

        {/* Desktop Navbar Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-yellow-500">
            Home
          </Link>
          <Link to="/About" className="hover:text-yellow-500">
            About US
          </Link>
          <Link to="/Contact" className="hover:text-yellow-500">
            Contact Us
          </Link>
          {isAuthenticated && (
            <Link to="/logout" className="text-lg hover:text-yellow-500">
              Logout
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          <i className={isMenuOpen ? "fa fa-times" : "fa fa-bars"}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4 px-6">
          <Link to="/" className="text-lg hover:text-yellow-500">
            Home
          </Link>
          <Link to="/About" className="text-lg hover:text-yellow-500">
            About Us
          </Link>
          <Link to="/Contact" className="text-lg hover:text-yellow-500">
            Contact Us
          </Link>
          {isAuthenticated && (
            <Link to="/logout" className="text-lg hover:text-yellow-500">
              Logout
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
