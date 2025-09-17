import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Check, CheckSquare } from "lucide-react";

const SiteVisits = () => {
  const benefits = [
    {
      id: 1,
      title: "Planned Visits. Not Property Tours.",
      description:
        "We don't drag you across 10 projects in a day. We take you to the 3 that actually make sense for you.",
      icon: <CheckSquare className="h-9 w-9" />,
    },
    {
      id: 2,
      title: "On-Site Insights from Our Team",
      description:
        "We're there with you — pointing out red flags, good signs, and hidden costs the brochures won't mention.",
      icon: <CheckSquare className="h-9 w-9" />,
    },
    {
      id: 3,
      title: "Compare. Calculate. Then Decide.",
      description:
        "Our team helps you evaluate what you saw — from investment logic to layout flaws.",
      icon: <CheckSquare className="h-9 w-9" />,
    },
    {
      id: 4,
      title: "Transport? Sorted. Schedule? Yours.",
      description:
        "We work around your timing. Outstation? We arrange it. Busy schedule? We'll adapt.",
      icon: <CheckSquare className="h-9 w-9" />,
    },
  ];

  const bonus = [
    "Get construction stage walkthroughs",
    "Meet project sales heads if needed",
    "We ensure no pressure, no hard sell on-site",
    "Receive honest feedback and unbiased advice from our team",
  ];

  return (
    <>
      <section className="min-h-screen bg-[#f9f8f6] py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
        <Navbar />

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20 pt-8">
          <div className="relative mb-6 md:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-6 tracking-wide">
              <span className="font-semibold text-slate-800 relative">
                Site Visits
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-slate-300 to-slate-500 rounded-full"></div>
              </span>
            </h1>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 font-medium mb-8 md:mb-10">
            Because Photos Lie. Ground Reality Doesn't.
          </p>

          <div className="space-y-4 md:space-y-6 text-slate-600 leading-relaxed">
            <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-medium">
              You can't feel sunlight, check construction quality, or sense the
              vibe of a neighbourhood on a brochure. That's why we insist: See
              it before you believe it.
            </p>
          </div>
        </div>

        {/* What You Get */}
        <div className="max-w-7xl mx-auto mb-16 md:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-12 md:mb-16 text-slate-800">
            What You Get
          </h2>
          <div className="grid gap-8 md:gap-10 sm:grid-cols-2">
            {benefits.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white/95 backdrop-blur rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 md:p-10 group cursor-pointer transform hover:-translate-y-2 border border-slate-200"
              >
                <div className="flex items-start justify-between mb-6 md:mb-8">
                  <div className="text-3xl md:text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 mb-4 md:mb-6 group-hover:text-slate-900 transition-colors leading-tight">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                  {item.description}
                </p>

                {/* Progress indicator */}
                <div className="mt-6 md:mt-8 h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-600 rounded-full transition-all duration-700 w-0 group-hover:w-full"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bonus for Serious Buyers */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-24 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-12 md:mb-16 text-slate-800">
            Bonus for Serious Buyers
          </h2>
          <motion.ul
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
            viewport={{ once: true }}
            className="grid gap-6 md:gap-8 sm:grid-cols-2 text-slate-700"
          >
            {bonus.map((point, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="bg-white/95 backdrop-blur rounded-2xl shadow-lg p-8 md:p-10 hover:shadow-xl transition-all duration-300 border border-slate-200 text-left group hover:-translate-y-1"
              >
                <span className="font-medium text-lg md:text-xl leading-relaxed text-slate-800 group-hover:text-slate-900 transition-colors">
                  {point}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Our Promise */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16 md:mb-20"
        >
          <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white rounded-2xl p-10 md:p-12 shadow-2xl text-center relative overflow-hidden border border-slate-600">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full transform -translate-x-12 translate-y-12"></div>

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-8 md:mb-10">
                Our Promise
              </h2>
              <p className="italic text-lg md:text-xl leading-relaxed font-medium max-w-2xl mx-auto">
                "We're not here to impress you. We're here to help you make a
                confident decision, on-ground."
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8 text-slate-800">
            Book a Site Visit
          </h3>
          <p className="text-slate-600 mb-8 md:mb-10 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            Real insights. Real experience. Real estate, up close.
          </p>
          <button className="bg-slate-800 text-white px-10 py-4 md:px-12 md:py-5 rounded-xl hover:bg-slate-900 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl text-lg transform hover:-translate-y-1">
            Schedule My Visit
          </button>
        </motion.div>
      </section>
      <Footer />
    </>
  );
};

export default SiteVisits;
