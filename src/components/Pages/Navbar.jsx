import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import Admin_btn from './Buttons/Admin_btn';
import toast from "react-hot-toast";
import Login_Btn from "./Buttons/Login_Btn";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
   const navigate = useNavigate();

    const handleLogout = () => {
        const auth = getAuth()
        signOut(auth).then(()=>{
            toast.success("Logged out successfully")
            navigate('/')
        }).catch((error)=>{
            toast.error('Failde to logout')
        })
        setIsOpen(false)

    }
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-2xl font-bold">Agro-Web-App</div>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-green-600">Home</Link>
            <Link to="/user/viewcropdetails" className="hover:text-green-600">Crop Info</Link>
            <Link to="/user/viewgovernmentschemes" className="hover:text-green-600">Govt Schemes</Link>
            <Link to="/user/viewapplicationstatus" className="hover:text-green-600">Status</Link>
            <Link to="/aboutUs" className="hover:text-green-600">About</Link>
          </div>

          <div className="hidden md:flex space-x-4">
            {user ? (
              <Logout />
            ) : (
              <>
                <Link to="/adminLogin"><Admin_btn /></Link>
                <Link to="/userLogin"><Login_Btn /></Link>
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
        <div className="md:hidden px-4 pb-4 space-y-2 text-green-600">
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
                <Link to="/user/login" className="block" onClick={() => setIsOpen(false)}>Login</Link>
              </>
            )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
