// import React, { useEffect, useState } from "react";

// const Intro = () => {
//   const [animationFinished, setAnimationFinished] = useState(false);
//   const [animationFinished2, setAnimationFinished2] = useState(true);
//   const [animationFinished3, setAnimationFinished3] = useState(true);

//   useEffect(() => {
//     const timeout2 = setTimeout(() => {
//       setAnimationFinished2(false); // After 100ms, second image animation starts
//     }, 100);

//     const timeout = setTimeout(() => {
//       setAnimationFinished(true); // After 1500ms, opacity animation finishes
//     }, 1500);

//     const timeout3 = setTimeout(() => {
//       setAnimationFinished3(false); // After 2000ms, the third image fades out
//     }, 2000);

//     return () => {
//       clearTimeout(timeout);
//       clearTimeout(timeout2);
//       clearTimeout(timeout3);
//     };
//   }, []);

//   return (
//     <div
//       className={`fixed z-50 left-0 top-0 w-screen h-screen bg-gradient-to-br from-purple-300 to-violet-400 transition-opacity duration-1000 flex justify-center items-center ${animationFinished ? "opacity-0" : "opacity-100"} ${animationFinished3 ? "" : "hidden"}`}
//     >
//       <h1 className="max-w-[70%] flex justify-center items-center text-center">
//         {/* First Image (Big Image) */}
//         <img
//           src="https://res.cloudinary.com/dupythh95/image/upload/f_auto,q_auto/popzcnsoxhwmhjygqj1y"
//           className={`w-[66.39%] scale-0 duration-1000 transition-all ${animationFinished2 ? "scale-[5] rotate-90 -translate-x-[70vw]" : "scale-[1] translate-x-[0vw] transition-all duration-500"} ${animationFinished ? "opacity-0 -translate-y-[50vh]" : "translate-y-[0vh] scale-100 opacity-100"}`}
//         />
        
//         {/* Second Image (Smaller Image) */}
//         <img
//           src="https://res.cloudinary.com/dupythh95/image/upload/f_auto,q_auto/popzcnsoxhwmhjygqj1y"
//           className={`w-[33.61%] scale-0 duration-1000 transition-all ${animationFinished2 ? "scale-[1] -rotate-90 translate-x-[70vw]" : "scale-[1] translate-x-[0vw] transition-all duration-500"} ${animationFinished ? "opacity-0 translate-y-[50vh]" : "translate-y-[0vh] scale-100 opacity-100"}`}
//         />
//       </h1>
//     </div>
//   );
// };

// export default Intro;
import React from 'react'

export default function Intro() {
  return (
    <div>
      
    </div>
  )
}
