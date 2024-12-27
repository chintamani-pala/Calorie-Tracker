import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CustomeAlert } from "../services/CustomeAlert";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [foodItem, setFoodItem] = useState("");
  const [calorieValue, setCalorieValue] = useState("");
  const [entryDate, setEntryDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [filterDate, setFilterDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [filteredEntries, setFilteredEntries] = useState([]);

  const getFoodLogs = async (date) => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/food/getFoodLogDateWise?date=${date}`,
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    // Set today's date in YYYY-MM-DD format
    handleFilter();
  }, []);
  const addFoodLog = async (entry) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/food/createFoodLog`,
        { foodItem: entry.food, calories: entry.calories, date: entry.date },
        { withCredentials: true }
      );
      setEntries([...entries, res.data.data]);
      CustomeAlert("success", "Entry added successfully");
    } catch (err) {
      console.error(err);
    }
  };

  // Add a new entry
  const handleAddEntry = (e) => {
    e.preventDefault();
    if (foodItem && calorieValue && entryDate) {
      const newEntry = {
        food: foodItem,
        calories: parseInt(calorieValue, 10),
        date: entryDate,
      };
      addFoodLog(newEntry);
      setFoodItem("");
      setCalorieValue("");
      setEntryDate("");
    } else {
      CustomeAlert("error", "Please fill all the fields");
    }
  };

  // Filter entries by date
  const handleFilter = async () => {
    if (filterDate) {
      const filtered = await getFoodLogs(filterDate);

      setFilteredEntries(filtered.data); // Assuming filtered data is under `data`
    } else {
      CustomeAlert("error", "Please select a date to filter entries");
    }
  };

  // Total calories (all or filtered entries)
  const totalCalories = (filterDate ? filteredEntries : entries).reduce(
    (sum, item) => sum + item.calories,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Calorie Tracker Dashboard
        </h1>

        {/* Add Entry Card */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Add Entry
          </h2>
          <form onSubmit={handleAddEntry} className="space-y-4">
            <input
              type="text"
              value={foodItem}
              onChange={(e) => setFoodItem(e.target.value)}
              placeholder="Food Item"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              value={calorieValue}
              onChange={(e) => setCalorieValue(e.target.value)}
              placeholder="Calories"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="date"
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Entry
            </button>
          </form>
        </div>

        {/* Filter Entries Card */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Filter Entries
          </h2>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleFilter}
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Filter Entries
          </button>
        </div>

        {/* Summary Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Summary</h2>
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-700">
              Total Calories: {totalCalories} kcal
            </h3>
          </div>
          <ul className="space-y-2">
            {(filterDate ? filteredEntries : entries).map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-sm"
              >
                <span className="font-medium text-gray-700">
                  {item.foodItem}
                </span>
                <span className="text-gray-600">{item.calories} kcal</span>
                <span className="text-gray-500 text-sm">
                  {new Date(item.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
