import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Admin_btn from "./Buttons/Admin_btn";
import toast from "react-hot-toast";
import Login_Btn from "./Buttons/Login_Btn";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [sidebarOpen, setSidebarOpen] = useState(false); // login sidebar
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch(() => {
        toast.error("Failed to logout");
      });
    setIsOpen(false);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold">digital-e-gram</div>

            <div className="hidden md:flex space-x-6">
              <Link to="/" className="hover:text-purple-600">Home</Link>
              <Link to="/user/applyServices" className="hover:text-purple-600">Apply Services</Link>
              <Link to="/user/myApplicationStatus" className="hover:text-purple-600">My Application Status</Link>
              <Link to="/user/myProfile" className="hover:text-purple-600">My Profile</Link>
              <Link to="/aboutUs" className="hover:text-purple-600">About</Link>
            </div>

            <div className="hidden md:flex space-x-4">
              {user ? (
                <Logout />
              ) : (
                <>
                  <Link to="/adminLogin"><Admin_btn /></Link>
                  {/* When clicked, open sidebar */}
                  <button onClick={() => setSidebarOpen(true)}>
                    <Login_Btn />
                  </button>
                </>
              )}
            </div>

            {/* Hamburger Icon */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2 text-purple-600">
            <Link to="/" className="block" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/user/viewcropdetails" className="block" onClick={() => setIsOpen(false)}>Crop Info</Link>
            <Link to="/user/viewgovernmentschemes" className="block" onClick={() => setIsOpen(false)}>Govt Schemes</Link>
            <Link to="/user/viewapplicationstatus" className="block" onClick={() => setIsOpen(false)}>Status</Link>
            <Link to="/aboutUs" className="block" onClick={() => setIsOpen(false)}>About</Link>
            {user ? (
              <button onClick={handleLogout} className="text-red-700 cursor-pointer">Logout</button>
            ) : (
              <>
                <Link to="/login" className="block" onClick={() => setIsOpen(false)}>Admin</Link>
                <button onClick={() => { setSidebarOpen(true); setIsOpen(false); }}>
                  Login
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Sidebar for Login Options (Right Side Drawer) */}
      <div className={`fixed inset-0 z-50 flex justify-end ${sidebarOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {/* Overlay */}
        <div
          className={`fixed inset-0  bg-opacity-50 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Sidebar Content */}
        <div
          className={`relative w-64 bg-white shadow-lg h-full p-6 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <h2 className="text-xl font-bold mb-4">Login As</h2>
          <div className="flex flex-col gap-4">
            <Link
              to="/userLogin"
              className="p-3 bg-purple-600 text-white rounded"
              onClick={() => setSidebarOpen(false)}
            >
              User
            </Link>
            <Link
              to="/staffLogin"
              className="p-3 bg-purple-600 text-white rounded"
              onClick={() => setSidebarOpen(false)}
            >
              Staff
            </Link>
          </div>
          <button
            className="absolute top-2 right-2 text-gray-600"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
