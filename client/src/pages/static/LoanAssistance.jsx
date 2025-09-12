import React from "react";
import { motion } from "framer-motion";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const LoanAssistance = () => {
  const services = [
    {
      id: 1,
      title: "Compare Loans Across Banks & NBFCs",
      description:
        "We’re not loyal to any one bank — we’re loyal to your interest rate. We’ll compare the best options for you across major lenders.",
      icon: "✅",
    },
    {
      id: 2,
      title: "Loan Eligibility Check – In Minutes",
      description:
        "Tell us your budget and income — we’ll tell you how much you can borrow. No guesswork. No jargon.",
      icon: "✅",
    },
    {
      id: 3,
      title: "End-to-End Documentation",
      description:
        "From salary slips to sanction letters, we handle the paperwork jungle. You relax — we run it through.",
      icon: "✅",
    },
    {
      id: 4,
      title: "Faster Approvals, Fewer Headaches",
      description:
        "Our lending partners process files faster when they come from us. We’ve earned that trust. You get that edge.",
      icon: "✅",
    },
  ];

  const helps = [
    "First-time buyers",
    "Salaried professionals",
    "Business owners",
    "Investors funding commercial units or plots",
  ];

  return (
    <>
      <section className="min-h-screen bg-[#f9f8f6] py-30 px-6 md:px-20 overflow-hidden">
        <Navbar />
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 font-[Cirka]">
            Loan Assistance <span className="text-black">– Loan Saarthi</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light">
            Because a Good Property Deserves a Smart Loan.
          </p>
          <p className="mt-4 text-gray-500 leading-relaxed">
            At Investor Saarthi, we don’t just show you the right property — we
            also help you get the right money to buy it.
          </p>
          <p className="mt-2 text-gray-500">
            No confusing paperwork. No banks chasing you with 15 calls a day.{" "}
            <br />
            Just solid guidance and smooth approvals.
          </p>
        </motion.div>

        {/* What We Do Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold text-center mb-10"
          >
            What We Do ?
          </motion.h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Who We Help Section */}
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-semibold mb-8"
          >
            Who We Help ?
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
            {helps.map((item, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Our Promise Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-black text-white rounded-xl p-8 shadow-lg text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">Our Promise</h2>
          <p className="italic text-lg leading-relaxed">
            “We’ll never push a loan that doesn’t suit you. Because we don’t
            make money from interest — we make it from integrity.”
          </p>
        </motion.div>
      </section>
      <Footer />
    </>
  );
};

export default LoanAssistance;
