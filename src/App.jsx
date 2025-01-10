import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Inbox from "./components/Inbox";
import { useState } from "react";
import Sent from "./components/Sent";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <BrowserRouter>
      <div className="flex h-screen w-full">
        {/* Fixed Navbar */}
        <Navbar isOpen={isOpen} toggleMenu={toggleMenu} />
        
        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/inbox" element={<Inbox isOpen={isOpen} />} />
            <Route path="/sent" element={<Sent />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
