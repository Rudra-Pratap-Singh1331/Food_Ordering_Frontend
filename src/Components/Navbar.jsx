import React, { useState } from 'react';
import { Menu, X, UserCircle, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn] = useState(true); // Simulate login state

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-red-600 cursor-pointer select-none">
            Foodie
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-red-500">Home</Link>
            <Link to="/explore" className="text-gray-700 hover:text-red-500">Explore</Link>
            <Link to="/cart" className="text-gray-700 hover:text-red-500">Cart</Link>

            {isLoggedIn ? (
              // User avatar with dropdown menu
              <div className="relative group">
                <UserCircle className="text-red-500 cursor-pointer" size={28} aria-label="User menu" />
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</a>
                  <a href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Orders</a>
                  <a href="/logout" className="block px-4 py-2 text-red-600 hover:bg-gray-100 flex items-center gap-2">
                    <LogOut size={16} /> Logout
                  </a>
                </div>
              </div>
            ) : (
              <a href="/login" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Login</a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pt-4 pb-6 space-y-4 shadow-md">
          <a href="/" className="block text-gray-700 hover:text-red-500">Home</a>
          <a href="/explore" className="block text-gray-700 hover:text-red-500">Explore</a>
          <a href="/offers" className="block text-gray-700 hover:text-red-500">Offers</a>
          <a href="/cart" className="block text-gray-700 hover:text-red-500">Cart</a>

          {isLoggedIn ? (
            <>
              <a href="/profile" className="block text-gray-700 hover:text-red-500">Profile</a>
              <a href="/orders" className="block text-gray-700 hover:text-red-500">My Orders</a>
              <a href="/logout" className="block text-red-600 hover:text-red-700">Logout</a>
            </>
          ) : (
            <a href="/login" className="block text-white bg-red-500 px-4 py-2 rounded text-center hover:bg-red-600">
              Login
            </a>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
