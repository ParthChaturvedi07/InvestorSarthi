import React, { useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import {
  Backpack,
  Building,
  Construction,
  HomeIcon,
  MapPin,
  Rocket,
  Sparkle,
  Target,
} from "lucide-react";
import { IoMdDocument } from "react-icons/io";

const LoanAssistance = () => {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      id: 1,
      title: "Compare Loans Across Banks & NBFCs",
      description:
        "We're not loyal to any one bank — we're loyal to your interest rate. We'll compare the best options for you across major lenders.",
      icon: <HomeIcon />,
      stats: "50+ Lenders",
    },
    {
      id: 2,
      title: "Loan Eligibility Check – In Minutes",
      description:
        "Tell us your budget and income — we'll tell you how much you can borrow. No guesswork. No jargon.",
      icon: <Sparkle />,
      stats: "5 Min Check",
    },
    {
      id: 3,
      title: "End-to-End Documentation",
      description:
        "From salary slips to sanction letters, we handle the paperwork jungle. You relax — we run it through.",
      icon: <IoMdDocument />,
      stats: "Zero Hassle",
    },
    {
      id: 4,
      title: "Faster Approvals, Fewer Headaches",
      description:
        "Our lending partners process files faster when they come from us. We've earned that trust. You get that edge.",
      icon: <Rocket />,
      stats: "15 Days Avg",
    },
  ];

  const helps = [
    {
      title: "First-time buyers",
      description: "Navigate your first property purchase with confidence",
      icon: <HomeIcon />,
    },
    {
      title: "Salaried professionals",
      description: "Maximize your loan eligibility with proper documentation",
      icon: <Backpack />,
    },
    {
      title: "Business owners",
      description: "Self-employed? We know the right banks for you",
      icon: <Target />,
    },
    {
      title: "Commercial investors",
      description:
        "Funding for commercial units, plots, and investment properties",
      icon: <Building />,
    },
  ];

  const loanTypes = [
    { name: "Home Loans", rate: "8.5% onwards", icon: <HomeIcon /> },
    { name: "Plot Loans", rate: "9.2% onwards", icon: <MapPin /> },
    { name: "Commercial Loans", rate: "10.5% onwards", icon: <Building /> },
    {
      name: "Construction Loans",
      rate: "9.8% onwards",
      icon: <Construction />,
    },
  ];

  return (
    <>
      <section className="min-h-screen bg-[#f9f8f6] py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
        <Navbar />

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-20">
          <div className="relative mb-6 md:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-6 tracking-wide">
              Loan Assistance{" "}
              <span className="font-semibold text-slate-800 relative">
                – Loan Saarthi
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-slate-300 to-slate-500 rounded-full"></div>
              </span>
            </h1>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 font-light mb-6 md:mb-8">
            Because a Good Property Deserves a Smart Loan.
          </p>

          <div className="space-y-4 md:space-y-6 text-slate-500 leading-relaxed">
            <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
              At Investor Saarthi, we don't just show you the right property —
              we also help you get the right money to buy it.
            </p>
            <p className="text-sm sm:text-base md:text-lg font-medium text-slate-600">
              No confusing paperwork. No banks chasing you with 15 calls a day.
              <br className="hidden sm:block" />
              Just solid guidance and smooth approvals.
            </p>
          </div>
        </div>

        {/* Loan Types Section */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 md:mb-12 text-slate-800">
            Loan Options We Facilitate
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {loanTypes.map((loan, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 md:p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-center mb-2 md:mb-3">
                  <div className="text-2xl md:text-3xl">{loan.icon}</div>
                </div>
                <h3 className="text-sm md:text-base font-semibold text-slate-800 mb-1 md:mb-2">
                  {loan.name}
                </h3>
                <p className="text-xs md:text-sm text-slate-600 font-medium">
                  {loan.rate}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What We Do Section */}
        <div className="max-w-7xl mx-auto mb-16 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 md:mb-12 text-slate-800">
            What We Do?
          </h2>
          <div className="grid gap-6 md:gap-8 sm:grid-cols-2">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 md:p-8 group cursor-pointer transform hover:-translate-y-2 border border-slate-100"
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4 md:mb-6">
                  <div className="text-3xl md:text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <div className="bg-slate-50 px-3 md:px-4 py-1 md:py-2 rounded-full">
                    <span className="text-xs md:text-sm font-medium text-slate-700">
                      {service.stats}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 mb-3 md:mb-4 group-hover:text-slate-900 transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>

                {/* Progress indicator */}
                <div className="mt-4 md:mt-6 h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-slate-600 rounded-full transition-all duration-700 ${
                      hoveredService === service.id ? "w-full" : "w-0"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Who We Help Section */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 md:mb-12 text-slate-800">
            Who We Help?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {helps.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 md:p-8 text-center transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex justify-center mb-3 md:mb-4">
                  <div className="text-3xl md:text-4xl transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-2 md:mb-3">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 md:mb-12 text-slate-800">
            Our Process
          </h2>
          <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Share Details",
                desc: "Income, property, budget",
              },
              {
                step: "02",
                title: "We Compare",
                desc: "Best rates across lenders",
              },
              {
                step: "03",
                title: "Apply Together",
                desc: "We handle paperwork",
              },
              {
                step: "04",
                title: "Get Approved",
                desc: "Faster processing guaranteed",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 md:p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-slate-300 mb-2 md:mb-3">
                    {item.step}
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-slate-800 mb-1 md:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600">
                    {item.desc}
                  </p>
                </div>
                {index < 3 && (
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

        {/* Our Promise Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800 text-white rounded-2xl p-8 md:p-12 shadow-2xl text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 opacity-50"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full transform -translate-x-12 translate-y-12"></div>

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 md:mb-8">
                Our Promise
              </h2>
              <div className="text-4xl md:text-5xl mb-6 md:mb-8">💝</div>
              <p className="italic text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                "We'll never push a loan that doesn't suit you. Because we don't
                make money from interest — we make it from integrity."
              </p>

              <div className="mt-8 md:mt-12 grid grid-cols-2 gap-8 md:gap-12 text-center">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                    ₹500Cr+
                  </div>
                  <div className="text-sm md:text-base text-slate-300">
                    Loans Facilitated
                  </div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                    98%
                  </div>
                  <div className="text-sm md:text-base text-slate-300">
                    Approval Rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default LoanAssistance;
