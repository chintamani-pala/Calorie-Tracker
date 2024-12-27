// FeaturesSection.jsx
const FeaturesSection = () => {
  return (
    <div id="features" className="bg-gray-100 py-16">
      <div className="max-w-screen-xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">
          Why Choose Our Calorie Tracker?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Easy Meal Logging</h3>
            <p className="text-gray-600">
              Quickly log your meals with a simple interface or search our food
              database.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Track Nutrients</h3>
            <p className="text-gray-600">
              Monitor your macros and stay on top of your daily nutrient intake.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Progress Insights</h3>
            <p className="text-gray-600">
              Get detailed insights and track your progress over time with
              interactive graphs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
