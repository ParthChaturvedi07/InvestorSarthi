import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const SiteVisits = () => {
  const benefits = [
    {
      id: 1,
      title: "Planned Visits. Not Property Tours.",
      description:
        "We don’t drag you across 10 projects in a day. We take you to the 3 that actually make sense for you.",
      icon: "✅",
    },
    {
      id: 2,
      title: "On-Site Insights from Our Team",
      description:
        "We’re there with you — pointing out red flags, good signs, and hidden costs the brochures won’t mention.",
      icon: "✅",
    },
    {
      id: 3,
      title: "Compare. Calculate. Then Decide.",
      description:
        "Our team helps you evaluate what you saw — from investment logic to layout flaws.",
      icon: "✅",
    },
    {
      id: 4,
      title: "Transport? Sorted. Schedule? Yours.",
      description:
        "We work around your timing. Outstation? We arrange it. Busy schedule? We’ll adapt.",
      icon: "✅",
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
    <section className="min-h-screen bg-[#f9f8f6] py-30 px-6 md:px-20 overflow-hidden">
      <Navbar/>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto mb-16"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4 font-[Cirka]">
          Site Visits
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-light">
          Because Photos Lie. Ground Reality Doesn’t.
        </p>
        <p className="mt-4 text-gray-500 leading-relaxed">
          You can’t feel sunlight, check construction quality, or sense the vibe
          of a neighbourhood on a brochure. That’s why we insist: See it before
          you believe it.
        </p>
      </motion.div>

      {/* What You Get */}
      <div className="max-w-6xl mx-auto mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-semibold text-center mb-10"
        >
          What You Get
        </motion.h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {benefits.map((item, index) => (
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

      {/* Bonus for Serious Buyers */}
      <div className="max-w-4xl mx-auto mb-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-semibold mb-8"
        >
          Bonus for Serious Buyers
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
          {bonus.map((point, index) => (
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

      {/* Our Promise */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto bg-black text-white rounded-xl p-8 shadow-lg text-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Our Promise</h2>
        <p className="italic text-lg leading-relaxed">
          “We’re not here to impress you. We’re here to help you make a
          confident decision, on-ground.”
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
          Book a Site Visit
        </h3>
        <p className="text-gray-600 mb-6">
          Real insights. Real experience. Real estate, up close.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
          Schedule My Visit
        </button>
      </motion.div>
    </section>
    <Footer/>
    </>
  );
};

export default SiteVisits;
