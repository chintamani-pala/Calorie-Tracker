// Navbar.jsx
import { useState } from "react";

const Navbar = () => {
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
          <a href="#hero" className="hover:text-yellow-500">
            Home
          </a>
          <a href="#features" className="hover:text-yellow-500">
            Features
          </a>
          <a href="#cta" className="hover:text-yellow-500">
            Get Started
          </a>
          <a href="#footer" className="hover:text-yellow-500">
            Contact
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          <i className={isMenuOpen ? "fa fa-times" : "fa fa-bars"}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4 px-6">
          <a href="#hero" className="text-lg hover:text-yellow-500">
            Home
          </a>
          <a href="#features" className="text-lg hover:text-yellow-500">
            Features
          </a>
          <a href="#cta" className="text-lg hover:text-yellow-500">
            Get Started
          </a>
          <a href="#footer" className="text-lg hover:text-yellow-500">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
