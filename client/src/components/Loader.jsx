import React, { useEffect, useRef, useState } from "react";
import { Home, Key, Building2 } from "lucide-react";

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Animation phases
    const phaseTimeout1 = setTimeout(() => setAnimationPhase(1), 100);
    const phaseTimeout2 = setTimeout(() => setAnimationPhase(2), 400);
    const phaseTimeout3 = setTimeout(() => setAnimationPhase(3), 700);
    const phaseTimeout4 = setTimeout(() => setAnimationPhase(4), 1000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(phaseTimeout1);
      clearTimeout(phaseTimeout2);
      clearTimeout(phaseTimeout3);
      clearTimeout(phaseTimeout4);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Main loader content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo container with rotating circle */}
        <div className="relative mb-8">
          {/* Rotating circle border */}
          <div
            className={`w-40 h-40 rounded-full border-4 border-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 p-1 transition-all duration-1000 ${
              animationPhase >= 1
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-0 -rotate-180"
            }`}
            style={{
              animation:
                animationPhase >= 4 ? "spin 8s linear infinite" : "none",
            }}
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative shadow-lg">
              {/* Home Icon */}
              <div
                className={`absolute top-6 left-1/2 -translate-x-1/2 transition-all duration-400 ${
                  animationPhase >= 2
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-50"
                }`}
                style={{
                  animation:
                    animationPhase >= 4
                      ? "float 1.5s ease-in-out infinite"
                      : "none",
                }}
              >
                <Home className="w-8 h-8 text-blue-600" />
              </div>

              {/* Building Icon */}
              <div
                className={`absolute bottom-6 left-1/2 -translate-x-1/2 transition-all duration-400 ${
                  animationPhase >= 2
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-50"
                }`}
                style={{
                  animation:
                    animationPhase >= 4
                      ? "float 1.5s ease-in-out infinite 0.2s"
                      : "none",
                  animationDelay: "0.2s",
                }}
              >
                <Building2 className="w-8 h-8 text-indigo-600" />
              </div>

              {/* Key Icon */}
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                  animationPhase >= 3
                    ? "opacity-100 scale-100 rotate-360"
                    : "opacity-0 scale-50 rotate-0"
                }`}
              >
                <Key className="w-10 h-10 text-violet-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div
          className={`text-center mb-8 transition-all duration-600 ${
            animationPhase >= 3
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-3xl font-bold text-slate-800 mb-2 tracking-wide">
            Finding Your Dream Home
          </h2>
          <p className="text-slate-600 text-lg">
            Loading premium properties...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Exit animation */}
      {isComplete && (
        <div className="absolute inset-0 bg-white animate-pulse"></div>
      )}

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
