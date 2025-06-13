"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // put the logic for login ya betho
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "How to Use", href: "#how-to-use" },
    { name: "Contact Us", href: "#contact" },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false); // Or call your logout function
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 backdrop-blur-md bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="#" className="flex items-center group">
              <Image
                src="/assets/logo.webp"
                alt="Logo"
                width={40}
                height={40}
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <h2 className="text-xl font-semibold ml-2 text-white group-hover:text-blue-300 transition-colors duration-300">
                Rashed
              </h2>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white font-medium hover:text-blue-300 transition-all duration-300  pb-1"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Conditional Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            
                <Link href={"/auth/login"}>
                  <button className="px-4 py-2 rounded-full border border-white text-white font-medium hover:bg-white hover:text-gray-900 transition-all duration-300">
                    SignIn
                  </button>
                </Link>
                <Link href="/auth/signup">
                  <button className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/30">
                    SignUp
                  </button>
                </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden px-4 transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col space-y-3 pt-4 pb-4 border-t border-white border-opacity-20">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="block py-2 text-white font-medium hover:text-blue-300 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)} // Close menu after click
              >
                {item.name}
              </Link>
            </li>
          ))}

          {/* Mobile Buttons */}
          <div className="flex flex-col space-y-2 mt-4">
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium transition-colors duration-300"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-4 py-2 rounded-full border border-white text-white font-medium hover:bg-white hover:text-gray-900 transition-all duration-300 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SignIn
                </button>
                <button
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  LogIn
                </button>
              </>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
