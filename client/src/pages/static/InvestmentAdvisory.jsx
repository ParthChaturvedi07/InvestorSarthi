import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const InvestmentAdvisory = () => {
  const [hoveredService, setHoveredService] = useState(null);
  const [activeInvestment, setActiveInvestment] = useState(0);

  const services = [
    {
      id: 1,
      title: "Tailored Investment Plans",
      description:
        "Your income, your risk appetite, your timeline — we craft a strategy that suits you, not the market mood.",
      icon: "📋",
      outcome: "Custom roadmap",
      timeframe: "1-2 weeks",
    },
    {
      id: 2,
      title: "Residential vs. Commercial vs. Plot – Decoded",
      description:
        "We'll tell you where your money works harder — not just where everyone's buying.",
      icon: "🏗️",
      outcome: "Clear comparison",
      timeframe: "3-5 days",
    },
    {
      id: 3,
      title: "Growth Potential Analysis",
      description:
        "From upcoming infrastructure to developer reputation, we dive deep into what could double — and what's all talk.",
      icon: "📈",
      outcome: "Growth forecast",
      timeframe: "1 week",
    },
    {
      id: 4,
      title: "Exit Strategy Thinking (From Day 1)",
      description:
        "We don't just talk entry price. We talk exit strategy. Because a good investment knows when to leave.",
      icon: "🎯",
      outcome: "Exit timeline",
      timeframe: "Ongoing",
    },
  ];

  const whoFor = [
    {
      title: "High-income earners looking to diversify beyond mutual funds",
      description: "Smart diversification strategies for wealth preservation",
      icon: "💰",
      investment: "₹50L+",
    },
    {
      title: "Business owners parking capital for long-term tax efficiency",
      description: "Tax-optimized real estate investments for businesses",
      icon: "🏢",
      investment: "₹1Cr+",
    },
    {
      title: "Parents planning for future-proof assets",
      description: "Building generational wealth through strategic property",
      icon: "👨‍👩‍👧‍👦",
      investment: "₹25L+",
    },
    {
      title: "Serious buyers tired of vague agent advice",
      description: "Data-driven insights, not sales pitches",
      icon: "🧠",
      investment: "Any budget",
    },
  ];

  const investmentTypes = [
    {
      type: "Residential",
      returns: "8-12% annually",
      risk: "Low",
      liquidity: "Medium",
      pros: ["Rental income", "Capital appreciation", "Home loan benefits"],
      cons: ["Maintenance costs", "Tenant management", "Location dependent"],
      icon: "🏠",
    },
    {
      type: "Commercial",
      returns: "10-15% annually",
      risk: "Medium",
      liquidity: "Low",
      pros: ["Higher yields", "Professional tenants", "Longer leases"],
      cons: ["Higher investment", "Market dependent", "Complex regulations"],
      icon: "🏢",
    },
    {
      type: "Plots",
      returns: "12-20% annually",
      risk: "High",
      liquidity: "Low",
      pros: ["High appreciation", "No maintenance", "Development potential"],
      cons: ["No rental income", "Approval risks", "Infrastructure dependent"],
      icon: "📍",
    },
  ];

  const investmentStrategies = [
    {
      strategy: "Conservative Growth",
      description: "Stable rental income + steady appreciation",
      riskLevel: "Low",
      timeframe: "5-7 years",
      targetReturn: "8-10%",
      idealFor: "First-time investors, retirement planning",
    },
    {
      strategy: "Balanced Portfolio",
      description: "Mix of residential and commercial properties",
      riskLevel: "Medium",
      timeframe: "3-5 years",
      targetReturn: "10-14%",
      idealFor: "Experienced investors, wealth building",
    },
    {
      strategy: "Aggressive Growth",
      description: "High-potential plots and pre-launch projects",
      riskLevel: "High",
      timeframe: "2-3 years",
      targetReturn: "15-25%",
      idealFor: "High-risk appetite, quick wealth creation",
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
              <span className="font-semibold text-slate-800 relative">
                Investment Advisory
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-slate-300 to-slate-500 rounded-full"></div>
              </span>
            </h1>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 font-light mb-6 md:mb-8">
            Because Buying Real Estate Isn't the Goal. Growing Wealth Is.
          </p>

          <div className="space-y-4 md:space-y-6 text-slate-500 leading-relaxed">
            <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
              Most people buy real estate emotionally. You won't be one of them.
              At Investor Saarthi, we don't just find you a property — we help
              you turn it into a smart, long-term financial move.
            </p>
          </div>
        </div>

        {/* Investment Performance Stats */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">
                18%
              </div>
              <div className="text-xs md:text-sm text-slate-600">
                Avg Annual Returns
              </div>
            </div>
            <div className="text-center bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                ₹50Cr+
              </div>
              <div className="text-xs md:text-sm text-slate-600">
                Investments Advised
              </div>
            </div>
            <div className="text-center bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">
                200+
              </div>
              <div className="text-xs md:text-sm text-slate-600">
                Success Stories
              </div>
            </div>
            <div className="text-center bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">
                95%
              </div>
              <div className="text-xs md:text-sm text-slate-600">
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>

        {/* Investment Types Comparison */}
        <div className="max-w-7xl mx-auto mb-16 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 md:mb-12 text-slate-800">
            Investment Options Decoded
          </h2>
          <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
            {investmentTypes.map((investment, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 md:p-8 cursor-pointer transform hover:-translate-y-2 border ${
                  activeInvestment === index
                    ? "border-slate-400 ring-2 ring-slate-200"
                    : "border-slate-100"
                }`}
                onClick={() => setActiveInvestment(index)}
              >
                <div className="text-center mb-6">
                  <div className="text-3xl md:text-4xl mb-3">
                    {investment.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">
                    {investment.type}
                  </h3>
                  <div className="text-lg font-bold text-green-600 mb-4">
                    {investment.returns}
                  </div>

                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-slate-600">
                      Risk:{" "}
                      <span
                        className={`font-medium ${
                          investment.risk === "Low"
                            ? "text-green-600"
                            : investment.risk === "Medium"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {investment.risk}
                      </span>
                    </span>
                    <span className="text-slate-600">
                      Liquidity:{" "}
                      <span className="font-medium">
                        {investment.liquidity}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-green-700 mb-2">
                      Pros:
                    </h4>
                    <ul className="space-y-1">
                      {investment.pros.map((pro, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-slate-600 flex items-center"
                        >
                          <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-red-700 mb-2">
                      Cons:
                    </h4>
                    <ul className="space-y-1">
                      {investment.cons.map((con, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-slate-600 flex items-center"
                        >
                          <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Strategies */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 md:mb-12 text-slate-800">
            Investment Strategies
          </h2>
          <div className="space-y-6">
            {investmentStrategies.map((strategy, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-300 border border-slate-100"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 mb-4 lg:mb-0">
                    <div className="flex items-center mb-3">
                      <h3 className="text-lg md:text-xl font-semibold text-slate-800 mr-4">
                        {strategy.strategy}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          strategy.riskLevel === "Low"
                            ? "bg-green-100 text-green-800"
                            : strategy.riskLevel === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {strategy.riskLevel} Risk
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm md:text-base mb-2">
                      {strategy.description}
                    </p>
                    <p className="text-xs md:text-sm text-slate-500">
                      <span className="font-medium">Ideal for:</span>{" "}
                      {strategy.idealFor}
                    </p>
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        {strategy.targetReturn}
                      </div>
                      <div className="text-xs text-slate-600">
                        Target Returns
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-800">
                        {strategy.timeframe}
                      </div>
                      <div className="text-xs text-slate-600">Time Horizon</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What We Help You With */}
        <div className="max-w-7xl mx-auto mb-16 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 md:mb-12 text-slate-800">
            What We Help You With?
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
                        {item.timeframe}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">{item.outcome}</div>
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

        {/* Who's It For */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 md:mb-12 text-slate-800">
            Who's It For?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {whoFor.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 group border border-slate-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-2xl md:text-3xl transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium">
                    {item.investment}
                  </span>
                </div>

                <h3 className="text-base md:text-lg font-semibold text-slate-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Investment Lens */}
        <div className="max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="bg-slate-800 text-white rounded-2xl p-8 md:p-12 shadow-2xl text-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 opacity-50"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full transform -translate-x-12 translate-y-12"></div>

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 md:mb-8">
                Our Investment Lens
              </h2>
              <div className="text-4xl md:text-5xl mb-6 md:mb-8">📊</div>
              <p className="italic text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                "Your property should make more sense on Excel before it looks
                good on Instagram."
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light mb-4 md:mb-6 text-slate-800">
              Let's Talk Money, Not Hype.
            </h3>
            <p className="text-slate-600 mb-6 md:mb-8 text-sm md:text-base">
              Ready to build wealth through smart real estate investments? Let's
              create your strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-slate-800 text-white px-8 py-3 md:py-4 rounded-lg hover:bg-slate-900 transition-all duration-300 font-medium transform hover:scale-105">
                Book Your Investment Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default InvestmentAdvisory;
