import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../app/features/authSlice";
import { useSelector } from "react-redux";
const Navbar = () => {

  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = () => {
    navigate("/");
    dispatch(logout());
  }
  return (
    <div className="bg-gradient-to-r from-emerald-100 to-green-400 shadow-lg">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
        <Link to="/" className="transition-transform hover:scale-105 duration-200">
          <img src="/logo.svg" alt="" className="h-10" />
        </Link>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-emerald-50 text-sm font-medium">
              Welcome back,
            </p>
            <p className="text-white font-semibold">
              {user?.name || "Guest"}
            </p>
          </div>
          
          <button onClick={logoutUser} className="bg-white text-green-700 px-5 py-2 rounded-lg font-medium shadow-md hover:bg-emerald-50 hover:shadow-lg transition-all duration-200 active:scale-95">
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;