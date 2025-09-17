import React, { useRef, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Amit Sharma",
      role: "Investor",
      message:
        "Investor Saarthi helped me find the perfect property and guided me through every step. Truly professional and transparent.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Neha Verma",
      role: "Home Buyer",
      message:
        "What I loved was the clarity. No sales push, just practical advice that made my decision easy.",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Rahul Mehta",
      role: "NRI Client",
      message:
        "Being an NRI, I was worried about investing in India. Investor Saarthi made it seamless and safe.",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      name: "Priya Singh",
      role: "Entrepreneur",
      message:
        "They don't just sell property — they engineer financial sense. Exactly what I was looking for.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Priya Singh",
      role: "Entrepreneur",
      message:
        "They don't just sell property — they engineer financial sense. Exactly what I was looking for.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Priya Singh",
      role: "Entrepreneur",
      message:
        "They don't just sell property — they engineer financial sense. Exactly what I was looking for.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Priya Singh",
      role: "Entrepreneur",
      message:
        "They don't just sell property — they engineer financial sense. Exactly what I was looking for.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Priya Singh",
      role: "Entrepreneur",
      message:
        "They don't just sell property — they engineer financial sense. Exactly what I was looking for.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Priya Singh",
      role: "Entrepreneur",
      message:
        "They don't just sell property — they engineer financial sense. Exactly what I was looking for.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Priya Singh",
      role: "Entrepreneur",
      message:
        "They don't just sell property — they engineer financial sense. Exactly what I was looking for.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId;
    let startTime;
    const speed = 0.179;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const distance = (elapsed * speed) % (container.scrollWidth / 2);

      container.style.transform = `translateX(-${distance}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      startTime =
        performance.now() -
        (parseFloat(
          container.style.transform
            .replace("translateX(-", "")
            .replace("px)", "")
        ) || 0) /
          speed;
      animationId = requestAnimationFrame(animate);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <section
        id="testimonials"
        className="relative flex min-h-[60vh] md:min-h-[75vh] w-full flex-col items-center justify-center overflow-hidden bg-[#f5f5f5] py-18 md:py-30"
      >
        <Navbar />

        {/* Title Section */}
        <div className="text-center mb-8 md:mb-16 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-slate-800 mb-2 md:mb-4 tracking-wide">
            What Our Clients Say
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-light max-w-2xl mx-auto px-4">
            Don’t Take Our Word for It. Take Theirs.
          </p>
        </div>

        {/* Gradient overlays - responsive width */}
        <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-[50px] sm:w-[100px] md:w-[150px] lg:w-[200px] bg-gradient-to-r from-[#f5f5f5] via-[#f5f5f5]/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-[50px] sm:w-[100px] md:w-[150px] lg:w-[200px] bg-gradient-to-l from-[#f5f5f5] via-[#f5f5f5]/80 to-transparent" />

        {/* Scrolling Testimonials */}
        <div
          ref={containerRef}
          className="flex items-center justify-start gap-4 sm:gap-8 md:gap-12 lg:gap-16 px-4 md:px-8"
          style={{ width: "max-content" }}
        >
          {/* First set of testimonials */}
          {testimonials.map((client, index) => (
            <div
              key={`first-${index}`}
              className="relative flex flex-col items-center justify-between h-[240px] w-[200px] sm:h-[260px] sm:w-[220px] md:h-[280px] md:w-[250px] lg:h-[300px] lg:w-[280px] rounded-xl md:rounded-2xl bg-white shadow-lg hover:shadow-2xl p-4 sm:p-6 md:p-8 text-center transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-slate-100 flex-shrink-0"
            >
              {/* Quote Icon */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 text-slate-300">
                <svg
                  width="16"
                  height="16"
                  className="sm:w-5 sm:h-5 md:w-6 md:h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Avatar */}
              <img
                src={client.avatar}
                alt={client.name}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover border-2 md:border-3 border-slate-200 mb-2 sm:mb-3 md:mb-4 shadow-md"
              />

              {/* Message */}
              <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-2 sm:mb-3 md:mb-4 flex-1 line-clamp-3 md:line-clamp-4">
                "{client.message}"
              </p>

              {/* Name & Role */}
              <div className="mt-auto">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800 mb-1">
                  {client.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-light tracking-wide">
                  {client.role}
                </p>
              </div>
            </div>
          ))}

          {/* Second set of testimonials for seamless loop */}
          {testimonials.map((client, index) => (
            <div
              key={`second-${index}`}
              className="relative flex flex-col items-center justify-between h-[240px] w-[200px] sm:h-[260px] sm:w-[220px] md:h-[280px] md:w-[250px] lg:h-[300px] lg:w-[280px] rounded-xl md:rounded-2xl bg-white shadow-lg hover:shadow-2xl p-4 sm:p-6 md:p-8 text-center transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-slate-100 flex-shrink-0"
            >
              {/* Quote Icon */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 text-slate-300">
                <svg
                  width="16"
                  height="16"
                  className="sm:w-5 sm:h-5 md:w-6 md:h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Avatar */}
              <img
                src={client.avatar}
                alt={client.name}
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover border-2 md:border-3 border-slate-200 mb-2 sm:mb-3 md:mb-4 shadow-md"
              />

              {/* Message */}
              <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-2 sm:mb-3 md:mb-4 flex-1 line-clamp-3 md:line-clamp-4">
                "{client.message}"
              </p>

              {/* Name & Role */}
              <div className="mt-auto">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800 mb-1">
                  {client.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-light tracking-wide">
                  {client.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom fade indicator */}
        <div className="mt-6 md:mt-12 flex justify-center">
          <div className="flex space-x-1 md:space-x-2">
            {[1, 2, 3, 4].map((dot) => (
              <div
                key={dot}
                className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-slate-300 animate-pulse"
                style={{ animationDelay: `${dot * 0.5}s` }}
              />
            ))}
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center px-4 mt-8 md:mt-16">
          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-light max-w-2xl mx-auto px-4">
            Words from People Who Got the Right Deal — Not the Runaround.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Testimonials;
