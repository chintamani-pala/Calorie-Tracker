// 404Page.jsx
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 text-white">
      <div className="text-center px-6 py-12">
        <h1 className="text-6xl sm:text-8xl font-extrabold leading-tight mb-4">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
          Oops! The page you are looking for doesn’t exist.
        </h2>
        <p className="text-lg sm:text-xl mb-8">
          It seems the link is broken, or you’ve encountered a wrong address.
          Don’t worry, we’ll get you back on track.
        </p>

        <Link
          to="/"
          className="inline-block px-8 py-3 bg-yellow-500 text-blue-900 font-semibold text-lg rounded-lg shadow-lg hover:bg-yellow-600 transition"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
