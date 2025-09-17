import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Brain, Camera, Mail, Phone, Speaker, Videotape } from "lucide-react";
import { FaMobile } from "react-icons/fa";

const Careers = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const openings = [
    {
      id: 1,
      title: "Real Estate Content Creator",
      icon: <Speaker className="h-8 w-8" />,
      description:
        "Bring properties to life with storytelling. From ad copy to social media to project brochures, you'll write content that converts browsers into buyers.",
      skills:
        "Real estate knowledge, clear persuasive writing, creativity, SEO basics",
      type: "Creative",
      location: "Remote/Hybrid",
    },
    {
      id: 2,
      title: "Inside Sales (Cold Calling Executive)",
      icon: <Phone className="h-8 w-8" />,
      description:
        "You're not selling — you're unlocking value. Call prospects, qualify leads, and guide them to smart property decisions with confidence and empathy.",
      skills:
        "Communication, follow-up systems, CRM tools, persuasive speaking",
      type: "Sales",
      location: "Office/Remote",
    },
    {
      id: 3,
      title: "Video Editor (Reels + Property Walkthroughs)",
      icon: <Videotape className="h-8 w-8" />,
      description:
        "Turn site visits into scroll-stopping Instagram Reels and crisp walkthroughs that make people say, 'Damn, I want that.'",
      skills:
        "Premiere Pro or CapCut, trend awareness, fast edits, audio syncing",
      type: "Creative",
      location: "Remote/Hybrid",
    },
    {
      id: 4,
      title: "Social Media Manager",
      icon: <FaMobile className="h-8 w-8" />,
      description:
        "Build the brand where it lives — online. Own our IG, LinkedIn, and YouTube growth by planning, posting, and engaging like a pro.",
      skills: "Content planning, engagement strategies, analytics",
      type: "Marketing",
      location: "Remote/Hybrid",
    },
    {
      id: 5,
      title: "Cameraperson (Shooter)",
      icon: <Camera className="h-8 w-8" />,
      description:
        "Join our shoots across real estate projects and make properties look like prime-time. You'll shoot hosts, drone visuals, b-rolls, and Instagram stories.",
      skills:
        "Camera handling, frame composition, basic editing (preferred), drone ops (bonus)",
      type: "Creative",
      location: "On-site",
    },
    {
      id: 6,
      title: "Real Estate Strategy Intern",
      icon: <Brain className="h-8 w-8" />,
      description:
        "Work directly with the founder and learn how property deals are researched, pitched, and closed. Great for anyone serious about real estate careers.",
      skills: "Research, PPT/Excel, curiosity, market analysis",
      type: "Strategy",
      location: "Office",
    },
  ];

  const getTypeColor = (type) => {
    const colors = {
      Creative: "bg-blue-100 text-blue-800",
      Sales: "bg-green-100 text-green-800",
      Marketing: "bg-purple-100 text-purple-800",
      Strategy: "bg-orange-100 text-orange-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <>
      <section className="min-h-screen bg-[#f9f8f6] py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-x-hidden">
        <Navbar />

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-20">
          <div className="relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 md:mb-6 tracking-wide">
              Build Your Career at{" "}
              <span className="font-semibold text-slate-800 relative">
                Investor Saarthi
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-slate-300 to-slate-500 rounded-full"></div>
              </span>
            </h1>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 font-light mb-6 md:mb-8">
            Not Just Jobs. Real Roles with Real Impact.
          </p>

          <div className="space-y-4 md:space-y-6 text-slate-500 leading-relaxed">
            <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
              At Investor Saarthi, we're not building a typical real estate
              company. We're building a high-performance team that creates
              trust, moves markets, and simplifies investment decisions for
              people who want more than just properties — they want clarity.
            </p>
            <p className="text-sm sm:text-base md:text-lg font-medium text-slate-600">
              If you're sharp, curious, and hate the 9-to-5 energy drain — you
              might belong here.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">
                6
              </div>
              <div className="text-xs md:text-sm text-slate-600">
                Open Positions
              </div>
            </div>
            <div className="text-center bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">
                100+
              </div>
              <div className="text-xs md:text-sm text-slate-600">
                Properties Handled
              </div>
            </div>
            <div className="text-center bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">
                50+
              </div>
              <div className="text-xs md:text-sm text-slate-600">
                Happy Clients
              </div>
            </div>
            <div className="text-center bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <div className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">
                24/7
              </div>
              <div className="text-xs md:text-sm text-slate-600">Support</div>
            </div>
          </div>
        </div>

        {/* Current Openings */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 md:mb-12 text-slate-800">
            Current Openings
          </h2>

          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {openings.map((job) => (
              <div
                key={job.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 md:p-8 flex flex-col group cursor-pointer transform hover:-translate-y-2 border border-slate-100 ${
                  hoveredCard === job.id ? "scale-105" : ""
                }`}
                onMouseEnter={() => setHoveredCard(job.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4 md:mb-6">
                  <div className="text-3xl md:text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                    {job.icon}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium ${getTypeColor(
                        job.type
                      )}`}
                    >
                      {job.type}
                    </span>
                    <span className="text-xs text-slate-500">
                      {job.location}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 mb-3 md:mb-4 group-hover:text-slate-900 transition-colors">
                  {job.title}
                </h3>

                <p className="text-slate-600 text-sm md:text-base mb-4 md:mb-6 flex-1 leading-relaxed">
                  {job.description}
                </p>

                <div className="mt-auto">
                  <p className="text-xs md:text-sm text-slate-700 bg-slate-50 rounded-lg p-3 md:p-4">
                    <span className="font-semibold text-slate-800">
                      Skills:
                    </span>
                    <br />
                    <span className="text-slate-600">{job.skills}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Apply Section */}
        <div className="text-center mt-16 md:mt-24 bg-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto shadow-lg">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 md:mb-8 text-slate-800">
            Ready to Apply?
          </h2>

          <div className="space-y-4 md:space-y-6 text-slate-600">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <span className="text-2xl">
                <Mail className="w-8 h-8" />
              </span>
              <p className="text-sm sm:text-base md:text-lg">
                Email your resume with the role in the subject line to:
              </p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 md:p-6 inline-block">
              <p className="font-semibold text-slate-800 text-lg md:text-xl">
                contact@investorsaarthi.com
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-6 md:mt-8">
              <span className="text-2xl">
                <Phone className="h-8 w-8" />
              </span>
              <p className="text-sm sm:text-base md:text-lg">
                For queries:
                <span className="font-semibold text-slate-800 ml-2">
                  +91 8587897666, +91 7417620619
                </span>
              </p>
            </div>
          </div>

          <div className="mt-8 md:mt-10 text-xs md:text-sm text-slate-500 italic">
            We review applications within 48 hours and get back to shortlisted
            candidates quickly.
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Careers;
