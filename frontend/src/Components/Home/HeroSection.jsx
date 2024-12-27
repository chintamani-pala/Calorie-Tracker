import { Link } from "react-router";

// HeroSection.jsx
const HeroSection = () => {
  return (
    <div
      id="hero"
      className="relative bg-blue-600 text-white h-screen flex items-center justify-center px-6"
    >
      <div className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          Track Your Calories and Reach Your Health Goals
        </h1>
        <p className="text-lg sm:text-xl max-w-lg mx-auto">
          Easily log your meals, track your calories, and stay motivated with
          our simple and effective tracker.
        </p>
        <div>
          <button className="mt-6 px-8 py-3 text-lg font-semibold bg-yellow-500 text-blue-900 rounded-lg shadow-md hover:bg-yellow-600 transition">
            <Link to="/register">Get Started Now</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
