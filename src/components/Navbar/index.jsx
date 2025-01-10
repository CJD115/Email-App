import "./styles.css";
import { Link } from "react-router-dom";

const Navbar = ({ isOpen, toggleMenu }) => {
  const openClass = isOpen ? "open" : "";

  return (
    <div className={`menu ${openClass}`}>
      <button onClick={toggleMenu} className="py-5 pr-5 hover:bg-slate-800 w-full">
        Compose
      </button>
      <Link to="/" className="pl-4 py-5 pr-5 hover:bg-slate-800 w-full">
        Inbox
      </Link>
      <Link to="/sent" className="pl-4 py-5 pr-5 hover:bg-slate-800 w-full">
        Sent
      </Link>
      <p className="pl-4 py-5 pr-5 hover:bg-slate-800 w-full">Deleted</p>
    </div>
  );
};

export default Navbar;
