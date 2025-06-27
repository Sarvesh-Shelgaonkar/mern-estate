import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function TypewriterEffect() {
  const typeRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typeRef.current, {
      strings: [
        `Find your next <span class="gradient-text">perfect</span> place with ease`,
        `Discover <span class="gradient-text">luxury</span> homes that inspire`,
        `Your <span class="gradient-text">dream home</span> awaits you`,
        `Experience <span class="gradient-text">premium</span> real estate solutions`
      ],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 500,
      showCursor: true,
      cursorChar: '|',
      loop: true,
      smartBackspace: true,
      fadeOut: true,
      fadeOutClass: 'typed-fade-out',
      fadeOutDelay: 500,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <span 
      className="text-gray-800 dark:text-gray-200 leading-tight" 
      ref={typeRef}
    ></span>
  );
}
