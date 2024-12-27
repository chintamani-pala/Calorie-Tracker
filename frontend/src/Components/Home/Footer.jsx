// Footer.jsx
const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-800 text-white py-6">
      <div className="max-w-screen-xl mx-auto px-6 text-center">
        <p className="text-lg">
          © 2024 Calorie Tracker App. All rights reserved.
        </p>
        <div className="mt-4 space-x-6">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
