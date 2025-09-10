import React from "react";
import Navbar from "../../components/Navbar";
import background from "../../assets/images/homeBack.svg";
import Residential from "../../assets/images/resedential.png";
import Commercial from "../../assets/images/commercial.png";
import Logo2 from "../../assets/images/logo2.svg";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import FeatureProjects from "../../components/FeatureProjects";
import Footer from "../../components/Footer";

const featuredProperties = [
  {
    id: 1,
    title: "Parasite Complex",
    description: "Level up your chinari with our properties",
    location: "Noida",
    image: "/property1.jpg",
  },
  {
    id: 2,
    title: "Skyline Towers",
    description: "Luxury redefined with skyline views",
    location: "Gurgaon",
    image: "/property2.jpg",
  },
  {
    id: 3,
    title: "Green Residency",
    description: "Nature-inspired modern living spaces",
    location: "Delhi",
    image: "/property3.jpg",
  },
];

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
          className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition"
        >
          <img src="/whatsapp-icon.png" alt="WhatsApp" className="w-6 h-6" />
        </a>
      </div>

      {/* Welcome Section */}

      <section className="py-16 bg-[#f9f8f6] text-center">
        <h2 className="text-3xl md:text-4xl uppercase test-gray-500 tracking-wider">
          Welcome to Investor Saarthi
        </h2>
        <h3 className="text-lg md:text-xl font-light mt-2">
          We Don't Sell Properties
        </h3>
        <h2 className="text-2xl md:text-3xl font-semibold mt-2">
          We Engineer Good Decisions
        </h2>
        <button className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
          Connect
        </button>
      </section>

      {/* Explore Section */}
      {/* Explore Section */}
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-2xl md:text-3xl font-light mb-12">Explore</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12 lg:px-20">
          {/* Residential */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src={Residential}
              alt="Residential"
              className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4 text-center opacity-0 group-hover:opacity-100 transition duration-500">
              <h3 className="text-xl font-semibold mb-2">Residential</h3>
              <p className="text-sm">
                Discover Elegant Residential Spaces for Comfortable Living
              </p>
            </div>
          </div>

          {/* Commercial */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src={Commercial}
              alt="Commercial"
              className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4 text-center opacity-0 group-hover:opacity-100 transition duration-500">
              <h3 className="text-xl font-semibold mb-2">Commercial</h3>
              <p className="text-sm">
                View Premium Commercial Spaces to Fulfill Your Business Needs
              </p>
            </div>
          </div>

          {/* Plots */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src=""
              alt="Plots"
              className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4 text-center opacity-0 group-hover:opacity-100 transition duration-500">
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

      <Footer />
    </div>
  );
};

export default Home;
