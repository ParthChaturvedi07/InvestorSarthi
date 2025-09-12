import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const PropertyConsultation = () => {
  const services = [
    {
      id: 1,
      title: "Clarity Calls",
      description:
        "We listen first. Your goals, your budget, your doubts — all on the table. You talk. We make sense of the chaos.",
      icon: "✅",
    },
    {
      id: 2,
      title: "Shortlist Without the Stress",
      description:
        "We don’t show you 40 random projects. We show you the 3 that actually fit your financial life and future.",
      icon: "✅",
    },
    {
      id: 3,
      title: "Investment-Focused Filtering",
      description:
        "Looking for high rental? Low entry cost? Builder credibility? We help you filter properties with logic, not just location.",
      icon: "✅",
    },
    {
      id: 4,
      title: "Risk Radar",
      description:
        "We tell you what agents won’t — from project delays to area saturation. Because avoiding a bad deal is step one of making a good one.",
      icon: "✅",
    },
  ];

  const whoFor = [
    "First-time buyers feeling overwhelmed",
    "Investors who don’t want to fall for marketing fluff",
    "NRIs and outstation buyers seeking ground reality",
    "Business owners looking for tax-efficient asset buys",
  ];

  return (
    <>
      <section className="min-h-screen bg-[#f9f8f6] py-20 md:py-30 px-6 md:px-20 overflow-hidden">
        <Navbar />
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 font-[Cirka]">
            Property Consultation
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light">
            Not Just Real Estate Advice. Real Sense-Making.
          </p>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Anyone can sell you a flat. We help you figure out if you should
            even buy it. That’s the difference between a broker and a Saarthi.
          </p>
        </motion.div>

        {/* What We Actually Do */}
        <div className="max-w-6xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-center mb-10"
          >
            What We Actually Do ?
          </motion.h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {services.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Who It’s For */}
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold mb-8"
          >
            Who It’s For ?
          </motion.h2>
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
            className="grid gap-4 sm:grid-cols-2 text-gray-700 text-lg"
          >
            {whoFor.map((point, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
              >
                {point}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Our Belief */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-black text-white rounded-xl p-8 shadow-lg text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">Our Belief</h2>
          <p className="italic text-lg leading-relaxed">
            “We’re not in the business of pushing inventory. We’re in the
            business of protecting your money.”
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            🤝 Book a Consultation That Actually Helps
          </h3>
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
            Schedule My Consultation
          </button>
        </motion.div>
      </section>
      <Footer/>
    </>
  );
};

export default PropertyConsultation;
