import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Careers = () => {
  const openings = [
    {
      id: 1,
      title: "Real Estate Content Creator",
      icon: "📢",
      description:
        "Bring properties to life with storytelling. From ad copy to social media to project brochures, you'll write content that converts browsers into buyers.",
      skills:
        "Real estate knowledge, clear persuasive writing, creativity, SEO basics",
    },
    {
      id: 2,
      title: "Inside Sales (Cold Calling Executive)",
      icon: "📞",
      description:
        "You're not selling — you're unlocking value. Call prospects, qualify leads, and guide them to smart property decisions with confidence and empathy.",
      skills:
        "Communication, follow-up systems, CRM tools, persuasive speaking",
    },
    {
      id: 3,
      title: "Video Editor (Reels + Property Walkthroughs)",
      icon: "🎬",
      description:
        "Turn site visits into scroll-stopping Instagram Reels and crisp walkthroughs that make people say, 'Damn, I want that.'",
      skills:
        "Premiere Pro or CapCut, trend awareness, fast edits, audio syncing",
    },
    {
      id: 4,
      title: "Social Media Manager",
      icon: "📱",
      description:
        "Build the brand where it lives — online. Own our IG, LinkedIn, and YouTube growth by planning, posting, and engaging like a pro.",
      skills: "Content planning, engagement strategies, analytics",
    },
    {
      id: 5,
      title: "Cameraperson (Shooter)",
      icon: "📷",
      description:
        "Join our shoots across real estate projects and make properties look like prime-time. You’ll shoot hosts, drone visuals, b-rolls, and Instagram stories.",
      skills:
        "Camera handling, frame composition, basic editing (preferred), drone ops (bonus)",
    },
    {
      id: 6,
      title: "Real Estate Strategy Intern",
      icon: "🧠",
      description:
        "Work directly with the founder and learn how property deals are researched, pitched, and closed. Great for anyone serious about real estate careers.",
      skills: "Research, PPT/Excel, curiosity, market analysis",
    },
  ];

  return (
    <>
      <section className="min-h-screen bg-[#f9f8f6] py-30 px-6 md:px-20 overflow-x-hidden">
        <Navbar />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 font-[Cirka]">
            Build Your Career at{" "}
            <span className="text-black">Investor Saarthi</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light">
            Not Just Jobs. Real Roles with Real Impact.
          </p>
          <p className="mt-4 text-gray-500 leading-relaxed">
            At Investor Saarthi, we’re not building a typical real estate
            company. We’re building a high-performance team that creates trust,
            moves markets, and simplifies investment decisions for people who
            want more than just properties — they want clarity.
          </p>
          <p className="mt-2 text-gray-500">
            If you're sharp, curious, and hate the 9-to-5 energy drain — you
            might belong here.
          </p>
        </div>

        {/* Current Openings */}
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {openings.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-6 flex flex-col"
            >
              <div className="text-4xl mb-4">{job.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {job.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 flex-1">
                {job.description}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-medium">Skills:</span> {job.skills}
              </p>
            </div>
          ))}
        </div>

        {/* Apply Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Ready to Apply?
          </h2>
          <p className="text-gray-600 mb-2">
            📧 Email your resume with the role in the subject line to:
          </p>
          <p className="font-medium text-black">investorsaarthi@gmail.com</p>
          <p className="mt-4 text-gray-600">
            📞 For queries: <span className="font-medium">+91 9311747466</span>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Careers;
