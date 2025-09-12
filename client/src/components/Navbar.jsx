import React from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import logo from "../assets/images/logo.svg";

const Navbar = () => {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/properties", label: "Properties" },
    { to: "/services", label: "Services" },
    { to: "/careers", label: "Careers" },
    { to: "/testimonials", label: "Testimonial" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 py-4"
    >
      {/* Logo */}
      <Link
        to="/"
        className="text-white text-lg md:text-xl font-bold tracking-wide"
      >
        <img src={logo} alt="" />
      </Link>

      {/* Center Navigation */}
      <div className="hidden md:flex bg-white rounded-full shadow px-6 py-2 space-x-6">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `text-sm font-medium px-3 py-1 rounded-full transition ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-700 hover:text-black"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Social Icons */}
      <div className="hidden md:flex items-center space-x-4 text-white text-lg">
        <IoMdClose className="cursor-pointer hover:scale-110 transition" />
        <FaFacebook className="cursor-pointer hover:scale-110 transition" />
        <FaInstagram className="cursor-pointer hover:scale-110 transition" />
      </div>

      {/* Mobile menu (optional) */}
      <div className="md:hidden text-black">☰</div>
    </motion.nav>
  );
};

export default Navbar;
