// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebook, FaInstagram, FaChevronDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import logo from "../assets/images/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [showNavbar, setShowNavbar] = useState(true); // hide/show on scroll
  const [lastScrollY, setLastScrollY] = useState(0);
  const [serviceDropdown, setServiceDropdown] = useState(false);
  const dropdownTimerRef = useRef(null);
  const location = useLocation();

  // scroll hide/show
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  // keyboard escape to close dropdown / mobile menu
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setServiceDropdown(false);
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // helper: open dropdown (clear any close-timers)
  const openServiceDropdown = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setServiceDropdown(true);
  };

  // helper: schedule close with a small delay
  const closeServiceDropdown = (delay = 150) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    dropdownTimerRef.current = setTimeout(() => {
      setServiceDropdown(false);
      dropdownTimerRef.current = null;
    }, delay);
  };

  // smooth scroll to an ID on same page or navigate to homepage and hash
  const handleScroll = (id) => {
    if (location.pathname !== "/") {
      // navigate to home with hash — router will need to pick it up; fallback: use location change
      window.location.href = `/#${id}`;
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/properties", label: "Properties" },
    {
      label: "Services",
      dropdown: [
        { to: "/loan-assistance", label: "Loan Assistance" },
        { to: "/property-consultation", label: "Property Consultation" },
        { to: "/investment-advisory", label: "Investment Advisory" },
        { to: "/site-visits", label: "Site Visits" },
      ],
    },
    { to: "/careers", label: "Careers" },
    { to: "testimonial", label: "Testimonial", scroll: true },
    { to: "contact", label: "Contact", scroll: true },
  ];

  // animation variants for dropdown container and items (fall down)
  const containerVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { when: "beforeChildren", staggerChildren: 0.05, duration: 0.18 },
    },
    exit: { opacity: 0, y: -8, transition: { duration: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.16 } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.12 } },
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: showNavbar ? 0 : -110, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-16 py-3"
    >
      {/* Logo */}
      <Link to="/" className="text-lg md:text-xl font-bold tracking-wide flex items-center gap-3">
        <img src={logo} alt="Investor Saarthi" className="h-8 md:h-10" />
      </Link>

      {/* Desktop Links */}
      <div className="hidden px-4 py-2 md:flex items-center space-x-6 rounded-full bg-white backdrop-blur-md shadow">
        {navLinks.map((link, idx) =>
          link.dropdown ? (
            <div
              key={idx}
              className="relative"
              onMouseEnter={openServiceDropdown}
              onMouseLeave={() => closeServiceDropdown(180)}
            >
              <button
                aria-haspopup="true"
                aria-expanded={serviceDropdown}
                className="text-sm font-medium px-3 py-1 rounded-full text-gray-700 hover:text-black inline-flex items-center gap-2"
              >
                {link.label}
                <FaChevronDown className="text-xs" />
              </button>

              {/* Use AnimatePresence + motion for animated falling menu */}
              <AnimatePresence>
                {serviceDropdown && (
                  <motion.div
                    key="service-dropdown"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={containerVariants}
                    onMouseEnter={openServiceDropdown}
                    onMouseLeave={() => closeServiceDropdown(100)}
                    className="absolute left-0 mt-3 w-52 bg-white rounded-xl shadow-lg border border-slate-100 z-50"
                    style={{ transformOrigin: "top center" }}
                  >
                    <div className="py-2">
                      {link.dropdown.map((sublink) => (
                        <motion.div variants={itemVariants} key={sublink.to}>
                          <NavLink
                            to={sublink.to}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-50"
                            onClick={() => setServiceDropdown(false)}
                          >
                            {sublink.label}
                          </NavLink>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : link.scroll ? (
            <button
              key={idx}
              onClick={() => handleScroll(link.to)}
              className="text-sm font-medium px-3 py-1 rounded-full text-gray-700 hover:text-black"
            >
              {link.label}
            </button>
          ) : (
            <NavLink
              key={idx}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium px-3 py-1 rounded-full transition ${
                  isActive ? "bg-black text-white" : "text-gray-700 hover:text-black"
                }`
              }
            >
              {link.label}
            </NavLink>
          )
        )}
      </div>

      {/* Social icons (desktop) */}
      <div className="hidden md:flex items-center space-x-4 text-black text-lg">
        <FaFacebook className="cursor-pointer hover:scale-110 transition" />
        <FaInstagram className="cursor-pointer hover:scale-110 transition" />
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden text-black text-2xl cursor-pointer">
        <FiMenu onClick={() => setIsOpen(true)} />
      </div>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ duration: 0.28 }}
              className="absolute right-0 top-0 bg-white/90 bg-blur shadow w-72 h-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <img src={logo} alt="logo" className="h-8" />
                <IoMdClose className="text-2xl cursor-pointer" onClick={() => setIsOpen(false)} />
              </div>

              <nav className="flex flex-col gap-3">
                {navLinks.map((link, i) =>
                  link.dropdown ? (
                    <div key={i}>
                      <button
                        className="w-full text-left flex items-center justify-between px-1 py-2 font-medium"
                        onClick={() => setServiceDropdown((s) => !s)}
                      >
                        {link.label} <FaChevronDown />
                      </button>
                      {serviceDropdown && (
                        <div className="ml-3 flex flex-col gap-1 mt-1">
                          {link.dropdown.map((sublink) => (
                            <NavLink
                              key={sublink.to}
                              to={sublink.to}
                              className="text-sm text-gray-700 px-2 py-2 rounded hover:bg-slate-50"
                              onClick={() => {
                                setIsOpen(false);
                                setServiceDropdown(false);
                              }}
                            >
                              {sublink.label}
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : link.scroll ? (
                    <button
                      key={i}
                      onClick={() => {
                        handleScroll(link.to);
                        setIsOpen(false);
                      }}
                      className="text-left px-2 py-2 text-gray-700"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <NavLink
                      key={i}
                      to={link.to}
                      className="text-left px-2 py-2 text-gray-700 rounded hover:bg-slate-50"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  )
                )}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
