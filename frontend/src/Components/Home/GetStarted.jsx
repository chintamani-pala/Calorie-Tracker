import { Link } from "react-router";

// CTASection.jsx
const CTASection = () => {
  return (
    <div id="cta" className="bg-blue-600 text-white py-16 px-6 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">
        Ready to Start Tracking Your Calories?
      </h2>
      <p className="text-lg sm:text-xl mb-6">
        Join thousands of users who are reaching their health and fitness goals.
        Its time to take control of your diet!
      </p>
      <button className="px-8 py-3 text-lg font-semibold bg-yellow-500 text-blue-900 rounded-lg shadow-md hover:bg-yellow-600 transition">
        <Link to="/register">Get Started Now</Link>
      </button>
    </div>
  );
};

export default CTASection;
