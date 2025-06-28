import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function TypewriterEffect() {
  const typeRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typeRef.current, {
      strings: [
        `Find your next <span class="text-slate-500 font-bold">perfect</span> <br/> place with ease`
      ],
      typeSpeed: 80,
      backSpeed: 25,
      showCursor: false,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return <span className="text-slate-700" ref={typeRef}></span>;
}
