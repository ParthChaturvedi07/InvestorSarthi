import React from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Contact = () => {
  return (
    <>
      <section
        id="contact"
        className="min-h-screen py-30 px-6 md:px-20 overflow-hidden"
      >
        <Navbar />
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-800 mb-2 md:mb-4 tracking-wide">
            Get In Touch
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-light max-w-2xl mx-auto px-4">
            Let’s talk property, strategy, and clarity. Reach out — we’re always
            listening.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left side - Contact Details + Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between"
          >
            {/* Contact Info */}
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-6">Contact Info</h2>
              <p className="text-gray-700 mb-2">
                📧 <span className="font-medium">Email:</span>{" "}
                contact@investorsaarthi.com
              </p>
              <p className="text-gray-700 mb-2">
                📞 <span className="font-medium">Phone:</span> +91 9311747466
              </p>
              <p className="text-gray-700">
                📍 <span className="font-medium">Office:</span> Investor
                Saarthi, D Mall, 2nd floor, Indirapuram
              </p>
            </div>

            {/* Form */}
            <form className="bg-[#f9f8f6] shadow-md rounded-xl p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone No.
                </label>
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City / Area looking for "
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>

              {/* Looking For */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Looking For
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none">
                  <option value="">Select an option</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Plot">Plot</option>
                  <option value="Investment">Investment</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Right side - Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full h-[400px] md:h-full rounded-xl overflow-hidden shadow-md"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.4619907449605!2d77.37519206459974!3d28.64588257344578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfbc514590611%3A0xf294829608147da5!2sD%20MALL!5e0!3m2!1sen!2sin!4v1757850077727!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
