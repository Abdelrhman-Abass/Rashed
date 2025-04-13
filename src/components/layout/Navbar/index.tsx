"use client";
import React from "react";

const Navbar = React.memo(() => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo Section */}
                <div className="navbar-logo">
                    <h1>Logo</h1>
                </div>

                {/* Navigation Links */}
                <div className="navbar-links">
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>

                {/* Additional Section (e.g., Search, Profile) */}
                <div className="navbar-extra">
                    <button className="navbar-button">Sign In</button>
                </div>
            </div>
        </nav>
    );
});

export default Navbar;