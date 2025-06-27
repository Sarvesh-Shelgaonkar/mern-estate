import React, { useEffect, useState } from "react";

const Intro = () => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const [animationFinished2, setAnimationFinished2] = useState(true);
  const [animationFinished3, setAnimationFinished3] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setAnimationFinished2(false); // Start both images moving towards each other
    }, 100);

    const welcomeTimeout = setTimeout(() => {
      setShowWelcome(true); // Show welcome text
    }, 2000);

    const timeout = setTimeout(() => {
      setAnimationFinished(true); // Fade out after merging
    }, 3000);

    const timeout3 = setTimeout(() => {
      setAnimationFinished3(false); // Hide the animation after merge
    }, 3500);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(welcomeTimeout);
    };
  }, []);

  return (
    <div
      className={`fixed z-50 left-0 top-0 w-screen h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 transition-opacity duration-1000 flex justify-center items-center ${
        animationFinished ? "opacity-0" : "opacity-100"
      } ${animationFinished3 ? "" : "hidden"}`}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-white/5 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-white/10 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-[80%] flex flex-col justify-center items-center text-center">
        {/* Logo Animation */}
        <div className="flex justify-center items-center mb-8">
          {/* Left Image - Starts from left side */}
          <img
            src="https://res.cloudinary.com/dupythh95/image/upload/v1739045823/PrimeEstateSolutionsLeft_jw2xpc.png"
            alt="PrimeEstate Left"
            className={`w-[40%] max-w-[200px] duration-[2000ms] transition-all ease-out ${
              animationFinished2
                ? "translate-x-[0vw]" // Moves to center
                : "-translate-x-[100vw]" // Starts off-screen from left
            } ${
              animationFinished
                ? "opacity-0 -translate-y-[50vh] scale-50"
                : "translate-y-[0vh] opacity-100 scale-100"
            }`}
          />

          {/* Right Image - Starts from right side */}
          <img
            src="https://res.cloudinary.com/dupythh95/image/upload/v1739045823/PrimeEstateSolutionsRight_sqfjvs.png"
            alt="PrimeEstate Right"
            className={`w-[40%] max-w-[200px] duration-[2000ms] transition-all ease-out ${
              animationFinished2
                ? "translate-x-[0vw]" // Moves to center
                : "translate-x-[100vw]" // Starts off-screen from right
            } ${
              animationFinished
                ? "opacity-0 translate-y-[50vh] scale-50"
                : "translate-y-[0vh] opacity-100 scale-100"
            }`}
          />
        </div>

        {/* Welcome Text */}
        <div className={`transition-all duration-1000 ${
          showWelcome ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-wide">
            Welcome to
          </h1>
          <h2 className="text-2xl md:text-4xl font-light text-white/90 mb-6">
            PrimeEstate Solutions
          </h2>
          <div className="w-24 h-1 bg-white/50 mx-auto rounded-full"></div>
        </div>

        {/* Loading Animation */}
        <div className={`mt-12 transition-all duration-1000 ${
          showWelcome ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          <p className="text-white/80 mt-4 text-lg">Loading your dream home experience...</p>
        </div>
      </div>
    </div>
  );
};

export default Intro;
