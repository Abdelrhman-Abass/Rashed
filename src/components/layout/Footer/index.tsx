"use client";
import React from "react";

const Footer = React.memo(() => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Logo Section */}
                <div className="footer-logo">
                    <h2>Logo</h2>
                </div>

                {/* Links Section */}
                <div className="footer-links">
                    <ul>
                        <li><a href="#about">About</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>

                {/* Social Media Section */}
                <div className="footer-social">
                    <p>Follow us on:</p>
                    <ul>
                        <li><a href="#facebook">Facebook</a></li>
                        <li><a href="#twitter">Twitter</a></li>
                        <li><a href="#instagram">Instagram</a></li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom Section */}
            <div className="footer-bottom">
                <p>&copy; {currentYear} Your Company. All rights reserved.</p>
            </div>
        </footer>
    );
});

export default Footer;