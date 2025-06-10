"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

// Import social media icons
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = React.memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" text-white pt-12 pb-6 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & Description */}
        <div className="flex flex-col items-start space-y-4">
          <Link
            href="/"
            className="group flex items-center space-x-3 transition-transform duration-300 cursor-pointer"
            aria-label="Go to homepage"
          >
            <Image
              src="/assets/logo.webp"
              alt="Logo"
              width={40}
              height={40}
              className="object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <h3 className="text-xl font-bold transition-transform duration-300 group-hover:scale-110">
              Rashed
            </h3>
          </Link>
          <p className="text-gray-400 max-w-xs">
            Delivering innovative solutions tailored to meet modern business
            needs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a
                href="#about"
                className="flex items-center hover:text-white transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="flex items-center hover:text-white transition-colors"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="flex items-center hover:text-white transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <ul className="space-y-3 text-gray-400">
            <li>
              <a
                href="https://facebook.com "
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-white transition-colors"
                aria-label="Follow us on Facebook"
              >
                <FaFacebookF />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com "
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-white transition-colors"
                aria-label="Follow us on Twitter"
              >
                <FaTwitter />
                <span>Twitter / X</span>
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com "
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-white transition-colors"
                aria-label="Follow us on Instagram"
              >
                <FaInstagram />
                <span>Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-800 pt-5 text-center text-sm text-gray-500">
        <p>
          <Link href="/" className="hover:underline">
            Rashed
          </Link>{" "}
          &copy; {currentYear}. All rights reserved.
        </p>
      </div>
    </footer>
  );
});

export default Footer;
