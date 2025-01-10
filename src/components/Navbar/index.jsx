import "./styles.css";
import { Link } from "react-router-dom";

const Navbar = ({ isOpen, toggleMenu }) => {
  return (
    <div className="bg-gray-800 text-white h-screen w-1/4 p-4">
      {/* User Profile */}
      <div className="text-center">
        <img
          src="https://via.placeholder.com/80"
          alt="User Avatar"
          className="w-20 h-20 rounded-full mx-auto mb-2"
        />
        <h2 className="text-lg font-bold">Connor Davis</h2>
      </div>

      {/* Navigation Links */}
      <ul className="mt-6 space-y-4">
        <li className="flex justify-between items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer">
          <Link to="/inbox">Inbox</Link>
          <span className="bg-blue-500 text-white px-2 py-1 rounded-full">13</span>
        </li>
        <li className="p-2 hover:bg-gray-700 rounded-md cursor-pointer">Starred</li>
        <li className="p-2 hover:bg-gray-700 rounded-md cursor-pointer">
          <Link to="/sent">Sent</Link>
          </li>
        <li className="flex justify-between items-center p-2 hover:bg-gray-700 rounded-md cursor-pointer">
          <span>Drafts</span>
          <span className="bg-red-500 text-white px-2 py-1 rounded-full">2</span>
        </li>
        <li className="p-2 hover:bg-gray-700 rounded-md cursor-pointer">Important</li>
        <li className="p-2 hover:bg-gray-700 rounded-md cursor-pointer">Trash</li>
      </ul>
    </div>
  );
};

export default Navbar;
