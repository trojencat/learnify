import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef } from "react";

type TimelineItem = {
  step: number;
  title: string;
  description: string;
};

export const VerticalTimeline = ({ data }: { data: TimelineItem[] }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const checkpointRefs = useRef<HTMLDivElement[]>([]);
  checkpointRefs.current = [];

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !checkpointRefs.current.includes(el)) {
      checkpointRefs.current.push(el);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        end: "bottom bottom",
        toggleActions: "play none none none",
      },
    });

    // Draw vertical spine
    tl.fromTo(
      lineRef.current,
      { scaleY: 0, transformOrigin: "center top" },
      { scaleY: 1, duration: 1.2, ease: "power2.inOut" }
    );

    // Pop in each checkpoint + card
    checkpointRefs.current.forEach((el, index) => {
      const xStart = index % 2 === 0 ? -40 : 40; // subtle alternating slide
      tl.fromTo(
        el,
        { opacity: 0, x: xStart },
        { opacity: 1, x: 0, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.9"
      );
    });

    return () => tl.kill();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* vertical line */}
      <div ref={lineRef} className="absolute left-6 top-0 h-full w-1 bg-indigo-200 rounded-full" />

      <div className="flex flex-col gap-8">
        {data.map((item, index) => (
          <div key={item.step} className="relative pl-16">
            {/* checkpoint */}
            <div className="absolute left-0 top-0 w-12 h-12 bg-white rounded-full border-4 border-indigo-500 flex items-center justify-center">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{item.step}</span>
              </div>
            </div>

            {/* content box */}
            <div
              ref={addToRefs}
              className={`opacity-0 bg-white p-6 rounded-lg shadow-lg border border-gray-200`}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
