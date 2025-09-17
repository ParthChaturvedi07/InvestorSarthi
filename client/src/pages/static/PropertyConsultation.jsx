import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const PropertyConsultation = () => {
  const [hoveredService, setHoveredService] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  const services = [
    {
      id: 1,
      title: "Clarity Calls",
      description:
        "We listen first. Your goals, your budget, your doubts — all on the table. You talk. We make sense of the chaos.",
      icon: "💬",
      duration: "30-45 mins",
      deliverable: "Clear roadmap",
    },
    {
      id: 2,
      title: "Shortlist Without the Stress",
      description:
        "We don't show you 40 random projects. We show you the 3 that actually fit your financial life and future.",
      icon: "🎯",
      duration: "2-3 days",
      deliverable: "Curated options",
    },
    {
      id: 3,
      title: "Investment-Focused Filtering",
      description:
        "Looking for high rental? Low entry cost? Builder credibility? We help you filter properties with logic, not just location.",
      icon: "📊",
      duration: "1 week",
      deliverable: "Investment analysis",
    },
    {
      id: 4,
      title: "Risk Radar",
      description:
        "We tell you what agents won't — from project delays to area saturation. Because avoiding a bad deal is step one of making a good one.",
      icon: "⚠️",
      duration: "Ongoing",
      deliverable: "Risk assessment",
    },
  ];

  const whoFor = [
    {
      title: "First-time buyers feeling overwhelmed",
      description: "Navigate the property maze with expert guidance",
      icon: "🏠",
    },
    {
      title: "Investors who don't want to fall for marketing fluff",
      description: "Get real numbers, not sales pitches",
      icon: "📈",
    },
    {
      title: "NRIs and outstation buyers seeking ground reality",
      description: "Your eyes and ears on the ground",
      icon: "✈️",
    },
    {
      title: "Business owners looking for tax-efficient asset buys",
      description: "Strategic property investments for tax optimization",
      icon: "💼",
    },
  ];

  const processSteps = [
    { title: "Listen", desc: "We understand your goals", icon: "👂" },
    { title: "Analyze", desc: "Market research & filtering", icon: "🔍" },
    { title: "Present", desc: "Curated options with logic", icon: "📋" },
    { title: "Guide", desc: "Support through decision", icon: "🤝" },
  ];

  return (
    <>
      <section className="min-h-screen bg-[#f9f8f6] py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
        <Navbar />

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-20">
          <div className="relative mb-6 md:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-6 tracking-wide">
              <span className="font-semibold text-slate-800 relative">
                Property Consultation
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-slate-300 to-slate-500 rounded-full"></div>
              </span>
            </h1>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 font-light mb-6 md:mb-8">
            Not Just Real Estate Advice. Real Sense-Making.
          </p>

          <div className="space-y-4 md:space-y-6 text-slate-500 leading-relaxed">
            <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
              Anyone can sell you a flat. We help you figure out if you should
              even buy it. That's the difference between a broker and a Saarthi.
            </p>
          </div>
        </div>


        {/* Process Steps */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 md:mb-12 text-slate-800">
            Our Process
          </h2>
          <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`relative cursor-pointer transition-all duration-300 ${
                  activeStep === index ? "scale-105" : ""
                }`}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div className="bg-white rounded-xl p-6 md:p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4 transform hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600">
                    {step.desc}
                  </p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-slate-300">
                    <svg
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* What We Actually Do */}
        <div className="max-w-7xl mx-auto mb-16 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 md:mb-12 text-slate-800">
            What We Actually Do?
          </h2>
          <div className="grid gap-6 md:gap-8 sm:grid-cols-2">
            {services.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 md:p-8 group cursor-pointer transform hover:-translate-y-2 border border-slate-100"
                onMouseEnter={() => setHoveredService(item.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4 md:mb-6">
                  <div className="text-3xl md:text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="text-right">
                    <div className="bg-slate-50 px-3 py-1 rounded-full mb-1">
                      <span className="text-xs font-medium text-slate-700">
                        {item.duration}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      {item.deliverable}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 mb-3 md:mb-4 group-hover:text-slate-900 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>

                {/* Progress indicator */}
                <div className="mt-4 md:mt-6 h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-slate-600 rounded-full transition-all duration-700 ${
                      hoveredService === item.id ? "w-full" : "w-0"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who It's For */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 md:mb-12 text-slate-800">
            Who It's For?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {whoFor.map((item, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 group border border-slate-100"
              >
                {item.highlight && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs font-medium">
                      {item.highlight}
                    </span>
                  </div>
                )}

                <div className="flex items-start space-x-4">
                  <div className="text-2xl md:text-3xl transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Belief */}
        <div className="max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="bg-slate-800 text-white rounded-2xl p-8 md:p-12 shadow-2xl text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 opacity-50"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full transform -translate-x-12 translate-y-12"></div>

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 md:mb-8">
                Our Belief
              </h2>
              <div className="text-4xl md:text-5xl mb-6 md:mb-8">🛡️</div>
              <p className="italic text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                "We're not in the business of pushing inventory. We're in the
                business of protecting your money."
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light mb-4 md:mb-6 text-slate-800">
              🤝 Book a Consultation That Actually Helps
            </h3>
            <p className="text-slate-600 mb-6 md:mb-8 text-sm md:text-base">
              Ready to make sense of the property market? Let's talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-slate-800 text-white px-8 py-3 md:py-4 rounded-lg hover:bg-slate-900 transition-all duration-300 font-medium transform hover:scale-105">
                Schedule Free Clarity Call
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PropertyConsultation;
