import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const InvestmentAdvisory = () => {
  const services = [
    {
      id: 1,
      title: "Tailored Investment Plans",
      description:
        "Your income, your risk appetite, your timeline — we craft a strategy that suits you, not the market mood.",
      icon: "✅",
    },
    {
      id: 2,
      title: "Residential vs. Commercial vs. Plot – Decoded",
      description:
        "We’ll tell you where your money works harder — not just where everyone’s buying.",
      icon: "✅",
    },
    {
      id: 3,
      title: "Growth Potential Analysis",
      description:
        "From upcoming infrastructure to developer reputation, we dive deep into what could double — and what’s all talk.",
      icon: "✅",
    },
    {
      id: 4,
      title: "Exit Strategy Thinking (From Day 1)",
      description:
        "We don’t just talk entry price. We talk exit strategy. Because a good investment knows when to leave.",
      icon: "✅",
    },
  ];

  const whoFor = [
    "High-income earners looking to diversify beyond mutual funds",
    "Business owners parking capital for long-term tax efficiency",
    "Parents planning for future-proof assets",
    "Serious buyers tired of vague agent advice",
  ];

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-[#f9f8f6] py-30 px-6 md:px-20 overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 font-[Cirka]">
            Investment Advisory
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light">
            Because Buying Real Estate Isn’t the Goal. Growing Wealth Is.
          </p>
          <p className="mt-4 text-gray-500 leading-relaxed">
            Most people buy real estate emotionally. You won’t be one of them.
            At Investor Saarthi, we don’t just find you a property — we help you
            turn it into a smart, long-term financial move.
          </p>
        </motion.div>

        {/* What We Help You With */}
        <div className="max-w-6xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-center mb-10"
          >
            What We Help You With ?
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

        {/* Who’s It For */}
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold mb-8"
          >
            Who’s It For ?
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

        {/* Our Investment Lens */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-black text-white rounded-xl p-8 shadow-lg text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">Our Investment Lens</h2>
          <p className="italic text-lg leading-relaxed">
            “Your property should make more sense on Excel before it looks good
            on Instagram.”
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
            Let’s Talk Money, Not Hype.
          </h3>
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
            Book Your Investment Consultation
          </button>
        </motion.div>
      </section>
      <Footer />
    </>
  );
};

export default InvestmentAdvisory;
