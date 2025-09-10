import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../assets/images/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-5 md:py-16 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
        {/* Logo + Company */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Investor Saarthi Logo" className="w-40" />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Helping investors make smarter decisions in real estate — with
            trust, data, and clarity. From residential to commercial, we guide
            you every step.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-base font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#home" className="hover:text-white transition">Home</a></li>
            <li><a href="#properties" className="hover:text-white transition">Properties</a></li>
            <li><a href="#testimonials" className="hover:text-white transition">Testimonials</a></li>
            <li><a href="#about" className="hover:text-white transition">About Us</a></li>
            <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-base font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-white" />
              <span>+91 76182 06189</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-white" />
              <span>isarthi@gmail.com</span>
            </li>
            <li>
              <p className="text-gray-400 leading-relaxed">
                DLF Cyber City, Tower 5<br />
                Gurugram, Haryana, India
              </p>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-base font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mt-8 pt-5 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} Investor Saarthi. All Rights Reserved. | Crafted with ❤️
      </div>
    </footer>
  );
};

export default Footer;
