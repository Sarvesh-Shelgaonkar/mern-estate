import React, { useEffect, useState } from "react";

const Intro = () => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const [animationFinished2, setAnimationFinished2] = useState(true);
  const [animationFinished3, setAnimationFinished3] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setAnimationFinished2(false); // Start both images moving towards each other
    }, 500); // Increased from 100ms

    const welcomeTimeout = setTimeout(() => {
      setShowWelcome(true); // Show welcome text
    }, 3500); // Increased from 2000ms

    const timeout = setTimeout(() => {
      setAnimationFinished(true); // Fade out after merging
    }, 5500); // Increased from 3000ms

    const timeout3 = setTimeout(() => {
      setAnimationFinished3(false); // Hide the animation after merge
    }, 6500); // Increased from 3500ms

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(welcomeTimeout);
    };
  }, []);

  return (
    <div
      className={`fixed z-50 left-0 top-0 w-screen h-screen transition-opacity duration-1000 flex justify-center items-center ${
        animationFinished ? "opacity-0" : "opacity-100"
      } ${animationFinished3 ? "" : "hidden"}`}
      style={{
        background: `
          linear-gradient(45deg, #000000 0%, #0f0f23 25%, #1a1a3a 50%, #000000 75%, #000000 100%),
          radial-gradient(circle at 25% 25%, #4f46e5 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, #7c3aed 0%, transparent 50%)
        `,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Moving geometric shapes */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Large moving orbs */}
          <div 
            className="absolute w-96 h-96 rounded-full opacity-10"
            style={{
              background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
              animation: 'float 8s ease-in-out infinite',
              top: '10%',
              left: '10%',
              filter: 'blur(40px)'
            }}
          ></div>
          <div 
            className="absolute w-80 h-80 rounded-full opacity-15"
            style={{
              background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
              animation: 'float 6s ease-in-out infinite reverse',
              top: '60%',
              right: '10%',
              filter: 'blur(30px)',
              animationDelay: '2s'
            }}
          ></div>
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'grid-move 20s linear infinite'
            }}
          ></div>
        </div>
        
        {/* Shooting stars */}
        <div className="absolute top-1/4 left-0 w-1 h-1 bg-white rounded-full opacity-80" 
             style={{animation: 'shooting-star 3s ease-out infinite'}}>
        </div>
        <div className="absolute top-1/2 left-0 w-1 h-1 bg-blue-300 rounded-full opacity-60" 
             style={{animation: 'shooting-star 4s ease-out infinite', animationDelay: '1s'}}>
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes shooting-star {
          0% {
            transform: translateX(-100px) translateY(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(calc(100vw + 100px)) translateY(-200px);
            opacity: 0;
          }
        }
        
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
          50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.6); }
        }
      `}</style>

      <div className="relative z-10 max-w-[80%] flex flex-col justify-center items-center text-center">
        {/* Sleek Logo Animation */}
        <div className="flex justify-center items-center mb-12 perspective-1000">
          {/* Left Logo Part */}
          <div
            className={`relative duration-[2500ms] transition-all ease-out ${
              animationFinished2
                ? "translate-x-0 opacity-100" 
                : "-translate-x-[50vw] opacity-0"
            } ${
              animationFinished
                ? "opacity-0 scale-110"
                : "opacity-100 scale-100"
            }`}
            style={{
              filter: 'drop-shadow(0 10px 30px rgba(99, 102, 241, 0.3))'
            }}
          >
            <img
              src="https://res.cloudinary.com/dupythh95/image/upload/v1739045823/PrimeEstateSolutionsLeft_jw2xpc.png"
              alt="PrimeEstate Left"
              className="w-32 md:w-48 lg:w-56 h-auto"
            />
          </div>

          {/* Right Logo Part */}
          <div
            className={`relative duration-[2500ms] transition-all ease-out ${
              animationFinished2
                ? "translate-x-0 opacity-100" 
                : "translate-x-[50vw] opacity-0"
            } ${
              animationFinished
                ? "opacity-0 scale-110"
                : "opacity-100 scale-100"
            }`}
            style={{
              filter: 'drop-shadow(0 10px 30px rgba(139, 92, 246, 0.3))',
              animationDelay: '0.2s'
            }}
          >
            <img
              src="https://res.cloudinary.com/dupythh95/image/upload/v1739045823/PrimeEstateSolutionsRight_sqfjvs.png"
              alt="PrimeEstate Right"
              className="w-32 md:w-48 lg:w-56 h-auto"
            />
          </div>
        </div>

        {/* Clean Welcome Text */}
        <div className={`transition-all duration-[1500ms] ease-out ${
          showWelcome ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-wide">
            Welcome to
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-wider">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              PrimeEstate
            </span>
            <span className="text-white/90 ml-4">Solutions</span>
          </h2>
          
          {/* Elegant divider */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
          </div>
        </div>

        {/* Minimal Loading */}
        <div className={`transition-all duration-[1000ms] ease-out ${
          showWelcome ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex space-x-2 justify-center mb-4">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
          </div>
          <p className="text-white/70 text-lg font-light tracking-wider">
            Crafting your experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default Intro;
