import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, MapPin, HomeIcon, TrendingUp, CreditCard, Eye, Users, DollarSign, Globe, Award } from "lucide-react";
import Navbar from "../../components/Navbar";
import background from "../../assets/images/homeBack.svg";
import Residential from "../../assets/images/resedential.png";
import Commercial from "../../assets/images/commercial.png";
import Plot from "../../assets/images/plot.png";
import Logo2 from "../../assets/images/logo2.svg";
import FeatureProjects from "../../components/FeatureProjects";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const Navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredExplore, setHoveredExplore] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    
    // Add CSS animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fadeInUp {
        animation: fadeInUp 0.8s ease-out;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const onClickProperties = () => {
    Navigate("/properties");
  };

  const stats = [
    { number: "200+", label: "Happy Clients", icon: Users },
    { number: "₹50Cr+", label: "Properties Sold", icon: DollarSign },
    { number: "4", label: "Cities Covered", icon: Globe },
    { number: "98%", label: "Client Satisfaction", icon: Award }
  ];

  const locations = [
    { name: "Noida", properties: "50+ Projects", growth: "+12%" },
    { name: "Greater Noida", properties: "35+ Projects", growth: "+18%" },
    { name: "Gurgaon", properties: "40+ Projects", growth: "+15%" },
    { name: "Ghaziabad", properties: "25+ Projects", growth: "+20%" }
  ];

  const services = [
    {
      title: "Property Consultation",
      description: "Expert guidance for your investment decisions",
      icon: HomeIcon,
      link: "/consultation",
      delay: 0
    },
    {
      title: "Investment Advisory",
      description: "Strategic advice for wealth building",
      icon: TrendingUp,
      link: "/advisory",
      delay: 0.2
    },
    {
      title: "Loan Assistance",
      description: "End-to-end loan processing support",
      icon: CreditCard,
      link: "/loan-assistance",
      delay: 0.4
    },
    {
      title: "Site Visits",
      description: "Professional property inspections and tours",
      icon: Eye,
      link: "/site-visits",
      delay: 0.6
    }
  ];

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <div
        className="relative min-h-screen bg-cover bg-center flex flex-col"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <Navbar />

        {/* Hero Content */}
        <div className="flex flex-1 items-center justify-center text-center px-4">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 md:mb-12 tracking-wide">
              INVEST WITH SENSE
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
              Where smart money meets smarter decisions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
              <button 
                onClick={onClickProperties}
                className="border-2 border-white text-white px-8 py-3 md:py-4 rounded-lg hover:bg-white hover:text-black transition-all duration-300 font-medium transform hover:scale-105"
              >
                View Properties
              </button>
              <button className="bg-white text-black px-8 py-3 md:py-4 rounded-lg shadow-lg hover:bg-slate-100 transition-all duration-300 font-medium transform hover:scale-105">
                Connect with Us
              </button>
            </div>
          </div>
        </div>

        {/* Floating WhatsApp Icon */}
        <a
          href="https://wa.me/yourwhatsapplink"
          target="_blank"
          rel="noopener noreferrer"
          className="h-14 w-14 fixed bottom-6 right-6 z-50 bg-green-500 text-white p-3 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-110"
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

      {/* Stats Section */}
      <section className="bg-slate-800 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center text-white group">
                  <div className="flex justify-center mb-3">
                    <IconComponent className="w-8 h-8 md:w-10 md:h-10 transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-2xl md:text-4xl font-bold mb-1">{stat.number}</div>
                  <div className="text-sm md:text-base text-slate-300">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="min-h-[70vh] flex items-center justify-center flex-col bg-[#f5f4f3] text-center px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase text-slate-800 tracking-wider mb-6 md:mb-8 font-light">
            Welcome to <span className="font-semibold text-black">Investor Saarthi</span>
          </h2>

          <h3 className="text-xl md:text-2xl lg:text-3xl font-light mt-4 text-slate-600 mb-4">
            We Don't Sell Properties
          </h3>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-3 text-slate-900 mb-8 md:mb-12">
            We Engineer <span className="text-[#e76f51]">Better Decisions</span>
          </h2>

          <button className="bg-black text-white px-8 py-3 md:py-4 rounded-full text-lg shadow-lg hover:bg-slate-800 transition-all duration-300 transform hover:scale-105">
            Contact Us
          </button>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-center mb-12 md:mb-16 text-slate-800">
            Our Services
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className={`bg-slate-50 rounded-2xl p-6 md:p-8 text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group cursor-pointer transform opacity-0 animate-fadeInUp`}
                  style={{
                    animationDelay: `${service.delay}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                      <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-slate-700 group-hover:text-slate-900 transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                    {service.description}
                  </p>
                  <div className="mt-6 h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 md:py-24 text-center px-4 sm:px-6 md:px-14 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-12 md:mb-16 text-slate-800">
            ABOUT US
          </h2>
          <div className="flex gap-8 md:gap-12 items-center justify-center flex-col lg:flex-row">
            <div className="w-full lg:w-[35%] flex justify-center mb-8 lg:mb-0">
              <img src={Logo2} alt="About Logo" className="w-full max-w-md h-auto" />
            </div>
            <div className="w-full lg:w-[65%] text-slate-700 leading-relaxed text-left">
              <p className="text-base md:text-lg mb-6 leading-relaxed">
                Established in <span className="font-semibold">2024</span>,{" "}
                <strong>Investor Saarthi</strong> isn't just another name in real
                estate. We're the people investors call when they're done wasting
                time with brochure-pushers and sweet talkers.
              </p>

              <p className="text-base md:text-lg mb-8 leading-relaxed">
                We don't believe in pushing properties.
                <span className="font-semibold">
                  {" "}We believe in guiding people.
                </span>
                Whether it's a{" "}
                <span className="font-medium">₹45 lakh studio apartment</span> or
                a <span className="font-medium">₹2 crore office space</span> — we
                help you make moves that make sense.
              </p>

              <h3 className="text-xl md:text-2xl font-semibold mb-6 text-slate-800">What We Do</h3>
              <ul className="space-y-4 md:space-y-6">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-slate-600 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <p className="text-base md:text-lg leading-relaxed">
                    We decode real estate. Not just the buildings. The builders. The
                    timelines. The legal fine print. The long-term math.
                  </p>
                </li>

                <li className="flex items-start">
                  <span className="w-2 h-2 bg-slate-600 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <p className="text-base md:text-lg leading-relaxed">
                    We bring you only what's worth your attention. No overhyped
                    launches. No brochure noise. Just curated, verified, high-ROI
                    picks.
                  </p>
                </li>

                <li className="flex items-start">
                  <span className="w-2 h-2 bg-slate-600 rounded-full mt-3 mr-4 flex-shrink-0"></span>
                  <p className="text-base md:text-lg leading-relaxed">
                    We back it with brains. Every recommendation comes with data,
                    experience, and investor logic.
                    <span className="font-semibold"> Not sales targets.</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="py-16 md:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-light mb-12 md:mb-16 text-center text-slate-800">
            EXPLORE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { img: Residential, title: "Residential", desc: "Discover Elegant Residential Spaces for Comfortable Living" },
              { img: Commercial, title: "Commercial", desc: "View Premium Commercial Spaces to Fulfill Your Business Needs" },
              { img: Plot, title: "Plots", desc: "Find Prime Plots to Build Your Dream Project" }
            ].map((item, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-500"
                onClick={onClickProperties}
                onMouseEnter={() => setHoveredExplore(index)}
                onMouseLeave={() => setHoveredExplore(null)}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-64 md:h-80 object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center text-white px-6 text-center transition-all duration-500 ${hoveredExplore === index ? 'opacity-100' : 'opacity-0'}`}>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 drop-shadow-lg">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base drop-shadow-md leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                
                {/* Always visible title overlay */}
                <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 transition-all duration-500 ${hoveredExplore === index ? 'opacity-0' : 'opacity-100'}`}>
                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-[#f5f4f3] py-16 md:py-24 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-light text-center mb-12 md:mb-16 text-slate-800">
          Featured Projects
        </h2>
        <div className="w-full">
          {/* <FeatureProjects /> */}
        </div>
      </section>

      {/* Locations Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
          {/* Heading */}
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-slate-800 mb-6">
              Because Great Deals Deserve to Be Remembered
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Investor Saarthi has never been about volume. It's been about
              value — the kind that shows up in numbers, locations, and happy
              clients.
            </p>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left side - text */}
            <div className="space-y-8">
              <p className="text-slate-700 text-lg md:text-xl leading-relaxed">
                We don't celebrate deals closed. <br />
                <span className="font-semibold text-slate-900 text-xl md:text-2xl">
                  We celebrate the good decisions we helped people make.
                </span>
              </p>

              <div className="flex items-start gap-6 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl bg-slate-800 text-white flex-shrink-0">
                  <MapPin className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-slate-800 mb-3">
                    Our Footprint Is Growing — One Trusted Location at a Time
                  </h3>
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                    From prime metros to booming townships, here's where we've
                    helped investors put down solid ground:
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - locations */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {locations.map((location, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 rounded-xl p-6 text-center hover:shadow-lg hover:bg-white transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">
                      {location.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-1">
                      {location.properties}
                    </p>
                    <p className="text-sm font-medium text-green-600">
                      {location.growth}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 text-sm md:text-base mt-8 text-center italic">
                We go where the next opportunity is — before the crowd shows up.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;