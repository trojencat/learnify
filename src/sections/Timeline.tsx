import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef } from "react";
import { VerticalTimeline } from "../components/VerticalTimeline";


// --- Timeline Step Component ---
const TimelineStep = ({
  step,
  title,
  description,
  isUp,
  isLast,
  elRef,
}: {
  step: number;
  title: string;
  description: string;
  isUp: boolean;
  isLast: boolean;
  elRef: React.Ref<HTMLDivElement>;
}) => {
  const stepClass = isUp ? "md:bottom-1/2 md:mb-10" : "md:top-1/2 md:mt-10";

  return (
    <div ref={elRef} className="checkpoint relative md:flex-1 opacity-0 flex justify-end">
      {/* --- Desktop Layout --- */}
        <div
          className={`hidden  absolute origin-center start-full -translate-x-[calc(50%+1.5rem)]   w-fit md:flex flex-col items-center ${stepClass}`}
        >
            {!isUp && <div className="w-px h-10 bg-indigo-300"></div>}
        
          {/* Content Box */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-64 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          {/* Vertical line */}
          {isUp && <div className="w-px h-10 bg-indigo-300"></div>}
        </div>
   

      {/* --- Checkpoint Circle --- */}
      <div className="relative z-10 flex  justify-center w-12 h-12 bg-white rounded-full border-4 border-indigo-500 mx-auto md:mx-0">
        <div className="flex items-center justify-center w-10 h-10 bg-indigo-500 rounded-full">
          <span className="text-white font-bold text-lg">{step}</span>
        </div>
      </div>

      {/* --- Mobile Layout --- */}
      <div className="md:hidden mt-4 ml-4 pl-8 pb-8 border-l-2 border-indigo-200">
        {/* Don't draw a line for the last item on mobile */}
        <div className={`${isLast ? "border-transparent" : ""}`}>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Timeline  = () => {
  const timelineData = [
    {
      step: 1,
      title: "Take the Test",
      description: "Online payment gateway integrated",
    },
    {
      step: 2,
      title: "Get Your Career Report",
      description: "Instant access/download",
    },
    {
      step: 3,
      title: "Speak to a Counselor",
      description: "Personalized session scheduling",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const checkpointRefs = useRef<[HTMLDivElement] | []>([]);
  checkpointRefs.current = [];

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !(checkpointRefs.current as [HTMLDivElement]).includes(el)) {
      (checkpointRefs.current as [HTMLDivElement]).push(el);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Create a GSAP timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // Start animation when 70% of the container is in view
        end: "bottom center",
        toggleActions: "play none none none",
      },
    });

    // 1. Animate the line drawing from left to right
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: "power2.inOut",
        transformOrigin: "left center",
      }
    );

    // 2. Animate each checkpoint popping in
    checkpointRefs.current.forEach((checkpoint: HTMLDivElement, index : number) => {
      const isUp = index % 2 === 0;
      // Animate from bottom/top depending on position
      const yStart = isUp ? 50 : -50;

      tl.fromTo(
        checkpoint ,
        { opacity: 0, y: yStart },
        { opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.7)" },
        "-=1.2" // Overlap animations for a smoother sequence
      );
    });
  }, []);

  return (<div className="overflow-hidden py-16 group ">
      
        <div className=" sm:py-28 my-5 " ref={containerRef}>
          <div className="flex md:flex-row flex-col md:px-64 m-3 justify-around ">
            {/* --- Section Header --- */}
            <div className="relative text-center h-full flex flex-col my-auto  md:mr-16 ">
                <div className="absolute -z-50 bg-stone-200/20  transition duration-300 ease-in-out h-full w-full scale-y-[800%] scale-x-[140%] rotate-12"></div>
              <p className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                How it <span className="bg-gradient-to-r from-blue-600 to-indigo-700 text-transparent bg-clip-text">works?</span>
              </p>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Follow these steps to unlock your career potential.
              </p>
            </div>
            {/* --- Timeline Container --- */}
            <div className="relative flex-grow hidden md:block ">
              {/* The main horizontal line (for desktop) */}
              <div
                className="md:block absolute top-1/2 left-0 w-full h-1 bg-indigo-200 rounded-full"
                ref={lineRef}
              ></div>
              {/* Checkpoints */}
              <div className="relative flex flex-col  md:flex-row justify-end top-1/2 -translate-y-1/2   items-center ">
                {timelineData.map((item, index) => (
                  <TimelineStep
                    key={item.step}
                    step={item.step}
                    title={item.title}
                    description={item.description}
                    isUp={index % 2 !== 0} // Alternate up/down, starting with down
                    isLast={index === timelineData.length - 1}
                    elRef={addToRefs}
                  />
                ))}
              </div>
            </div>
             <div className="relative flex-grow block md:hidden">
            <VerticalTimeline data={timelineData} />
          </div>
          </div>
        </div>
  </div>
  );
};

export default Timeline;