import React, { useEffect, useState } from "react";

const Intro = () => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const [animationFinished2, setAnimationFinished2] = useState(true);
  const [animationFinished3, setAnimationFinished3] = useState(true);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setAnimationFinished2(false); // Start both images moving towards each other
    }, 100);

    const timeout = setTimeout(() => {
      setAnimationFinished(true); // Fade out after merging
    }, 3000); // Increase the duration to 3 seconds

    const timeout3 = setTimeout(() => {
      setAnimationFinished3(false); // Hide the animation after merge
    }, 3500); // Increase the duration to 3.5 seconds

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, []);

  return (
    <div
      className={`fixed z-50 left-0 top-0 w-screen h-screen bg-gradient-to-br from-back-300 to-white-400 transition-opacity duration-1000 flex justify-center items-center ${
        animationFinished ? "opacity-0" : " opacity-100"
      }
        ${animationFinished3 ? "" : "hidden"}`}
    >
      <h1 className="max-w-[70%] flex justify-center items-center text-center">
        {/* Left Image - Starts from left side */}
        <img
          src="https://res.cloudinary.com/dupythh95/image/upload/v1739045823/PrimeEstateSolutionsLeft_jw2xpc.png"
          className={`w-[50%] duration-[2000ms] transition-all ${
            animationFinished2
              ? "translate-x-[0vw]" // Moves to center
              : "-translate-x-[100vw]" // Starts off-screen from left
          } ${
            animationFinished
              ? "opacity-0 -translate-y-[50vh]"
              : "translate-y-[0vh] opacity-100"
          }`}
        />

        {/* Right Image - Starts from right side */}
        <img
          src="https://res.cloudinary.com/dupythh95/image/upload/v1739045823/PrimeEstateSolutionsRight_sqfjvs.png"
          className={`w-[50%] duration-[2000ms] transition-all ${
            animationFinished2
              ? "translate-x-[0vw]" // Moves to center
              : "translate-x-[100vw]" // Starts off-screen from right
          } ${
            animationFinished
              ? "opacity-0 translate-y-[50vh]"
              : "translate-y-[0vh] opacity-100"
          }`}
        />
      </h1>
    </div>
  );
};

export default Intro;
