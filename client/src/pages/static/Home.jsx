import React from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import Navbar from "../../components/Navbar";
import background from "../../assets/images/homeBack.svg";
import Residential from "../../assets/images/resedential.png";
import Commercial from "../../assets/images/commercial.png";
import Plot from "../../assets/images/plot.png";
import Logo2 from "../../assets/images/logo2.svg";
import { motion } from "framer-motion";
import FeatureProjects from "../../components/FeatureProjects";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <div
        className="relative min-h-screen bg-cover bg-center flex flex-col"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <div className="flex flex-1 items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl font-light text-white mb-8 tracking-wide font-[Cirka]">
              INVEST WITH SENSE
            </h1>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition">
                View Properties
              </button>
              <button className="bg-white text-black px-8 py-3 rounded-lg shadow hover:bg-gray-200 transition">
                Connect
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating WhatsApp Icon */}
        <a
          href="https://wa.me/yourwhatsapplink"
          target="_blank"
          rel="noopener noreferrer"
          className="h-14 w-14 fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-whatsapp h-full w-full"
            viewBox="0 0 16 16"
          >
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
          </svg>
        </a>
      </div>

      {/* Welcome Section */}

      <section className="h-[70vh] flex items-center justify-center flex-col bg-[#f5f4f3] text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-[Cirka] text-4xl md:text-6xl uppercase text-gray-800 tracking-wider"
        >
          Welcome to <span className="text-black">Investor Saarthi</span>
        </motion.h2>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl font-light mt-4 text-gray-600"
        >
          We Don’t Sell Properties
        </motion.h3>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-2xl md:text-4xl font-semibold mt-3 text-gray-900"
        >
          We Engineer <span className="text-[#e76f51]">Better Decisions</span>
        </motion.h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 bg-black text-white px-8 py-3 rounded-full text-lg shadow-md hover:bg-gray-800 transition"
        >
          Contact Us
        </motion.button>
      </section>

      <section className="py-16 bg-gray-50 text-center">
        <h2 className="font-[Cirka] text-3xl md:text-4xl font-light mb-12">
          EXPLORE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 lg:px-20">
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src={Residential}
              alt="Residential"
              className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div
              className="absolute inset-0 
     bg-white/10 backdrop-blur-md 
     flex flex-col items-center justify-center text-white px-4 text-center 
     opacity-0 group-hover:opacity-100 
     transition duration-500 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-2 drop-shadow-lg">
                Residential
              </h3>
              <p className="text-sm drop-shadow-md">
                Discover Elegant Residential Spaces for Comfortable Living
              </p>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src={Commercial}
              alt="Commercial"
              className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div
              className="absolute inset-0 
     bg-white/10 backdrop-blur-md 
     flex flex-col items-center justify-center text-white px-4 text-center 
     opacity-0 group-hover:opacity-100 
     transition duration-500 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-2">Commercial</h3>
              <p className="text-sm">
                View Premium Commercial Spaces to Fulfill Your Business Needs
              </p>
            </div>
          </div>

          {/* Plots */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src={Plot}
              alt="Plots"
              className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div
              className="absolute inset-0 
     bg-white/10 backdrop-blur-md 
     flex flex-col items-center justify-center text-white px-4 text-center 
     opacity-0 group-hover:opacity-100 
     transition duration-500 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-2">Plots</h3>
              <p className="text-sm">
                Find Prime Plots to Build Your Dream Project
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f4f3] py-12 flex flex-col items-center ">
        <h2 className="text-3xl font-bold text-center my-8">
          Featured Projects
        </h2>
        <div className="w-full">
          <FeatureProjects />
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonial" className="py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-light mb-8">
          What our client say?
        </h2>
        <p className="text-gray-500">Testimonials slider can go here.</p>
      </section>

      {/* About Us */}
      <section className="py-16 bg-[#f9f8f6] text-center px-6 md:px-14">
        <h2 className="text-2xl md:text-3xl font-light mb-6">ABOUT US</h2>
        <div className="flex gap-6 items-center justify-center flex-col md:flex-row">
          <div className="mt-10 w-[35%] f-full flex justify-center">
            <img src={Logo2} alt="About Logo" className="w-full h-full" />
          </div>
          <div className="max-w-2xl w-[65%] mx-auto text-gray-700 leading-relaxed text-left">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Established in <span className="font-semibold">2024</span>,{" "}
              <strong>Investor Saarthi</strong> isn’t just another name in real
              estate. We’re the people investors call when they’re done wasting
              time with brochure-pushers and sweet talkers.
            </p>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              We don’t believe in pushing properties.
              <span className="font-semibold">
                We believe in guiding people.
              </span>
              Whether it’s a{" "}
              <span className="font-medium">₹45 lakh studio apartment</span> or
              a <span className="font-medium">₹2 crore office space</span> — we
              help you make moves that make sense.
            </p>

            <h3 className="text-2xl font-semibold mt-10 mb-4">What We Do</h3>
            <ul className="list-disc pl-6">
              <li className="text-lg text-gray-700 mb-6 leading-relaxed">
                We decode real estate. Not just the buildings. The builders. The
                timelines. The legal fine print. The long-term math.
              </li>

              <li className="text-lg text-gray-700 mb-6 leading-relaxed">
                We bring you only what’s worth your attention. No overhyped
                launches. No brochure noise. Just curated, verified, high-ROI
                picks.
              </li>

              <li className="text-lg text-gray-700 leading-relaxed">
                We back it with brains. Every recommendation comes with data,
                experience, and investor logic.
                <span className="font-semibold">Not sales targets.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="min-h-screen py-16 px-6 md:px-20 overflow-hidden"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 font-[Cirka]">
            Get in Touch
          </h1>
          <p className="text-gray-600 text-lg">
            Let’s talk property, strategy, and clarity. Reach out — we’re always
            listening.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left side - Contact Details + Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between"
          >
            {/* Contact Info */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-6">Contact Info</h2>
              <p className="text-gray-700 mb-2">
                📧 <span className="font-medium">Email:</span>{" "}
                investorsaarthi@gmail.com
              </p>
              <p className="text-gray-700 mb-2">
                📞 <span className="font-medium">Phone:</span> +91 9311747466
              </p>
              <p className="text-gray-700">
                📍 <span className="font-medium">Office:</span> Investor
                Saarthi, Gurugram, Haryana, India
              </p>
            </div>

            {/* Form */}
            <form className="bg-[#f9f8f6] shadow-md rounded-xl p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Right side - Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full h-[400px] md:h-full rounded-xl overflow-hidden shadow-md"
          >
            <iframe
              title="Investor Saarthi Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14016.305852999258!2d77.033086!3d28.459497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d2b0c0b0fb%3A0xd50deec95bf2c98b!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1699712345678"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
