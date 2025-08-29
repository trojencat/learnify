import { useEffect, useRef } from "react";
import Waves from "./Waves";
import gsap from "gsap";
import Hero_img from "../assets/Hero.png"; // Assuming you have a hero image

const Banner = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const text = headingRef.current.innerText;
    headingRef.current.innerText = ""; // clear initial text

    // typewriter effect
    gsap.to(
      {},
      {
        duration: text.length * 0.05,
        repeat: 0,
        onUpdate: function () {
          const progress = this.progress();
          const chars = Math.floor(progress * text.length);
          headingRef.current!.innerHTML = text.substring(0, chars);
        },
        ease: "power1.in",
      }
    );
  }, []);
  return (
    <section className="relative h-full w-full flex flex-col md:flex-row items-center justify-between p-10 bg-cover mx-auto my-0 rounded-lg overflow-hidden shadow-2xl">
      {/* Background waves */}
      <Waves
        lineColor="#eee"
        backgroundColor="rgba(0, 0, 0, 0)"
        waveSpeedX={-0.03}
        waveSpeedY={0.04}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
      />
      <div className="flex md:flex-row flex-col justify-center md:justify-between items-center w-full md:px-[10em] px-[3em] h-full">
        {/* Text content on the left */}
        <div className="z-10  md:w-2/3 text-left ml-automd:text-left md:mr-12">
          {/* Heading with GSAP typewriter */}
          <h1
            ref={headingRef}
            className="text-5xl  font-extrabold text-gray-900 whitespace-pre-line"
          >
            Discover Your True Career Path with{" "}
            <span className="text-blue-500">Learnify</span>
          </h1>

          {/* Paragraph */}
          <p className="mt-4 text-lg text-gray-700">
            Scientifically designed tests and expert counselling for a future
            that fits you.
          </p>

          {/* Buttons with blur + blue accent */}
          <div className="mt-8 flex flex-col sm:flex-row text-lg  gap-4 ">
            <a
              href="/test-registration"
              className="inline-block px-6 py-3 bg-white/5 backdrop-blur-sm text-blue-400 hover:text-blue-500 text-base font-semibold hover:shadow-2xl rounded-full shadow-lg hover:bg-blue-400/10   transition duration-300 ease-in-out"
            >
              Take a Test Now
            </a>

            <button
              onClick={() => alert("Open calendar/scheduling form")}
              className="inline-block px-6 py-3 hover:bg-green-300/20 backdrop-blur-sm hover:text-green-500 text-green-400 text-base hover:shadow-2xl font-semibold rounded-full shadow-lg bg-green-300/20   transition duration-300 ease-in-out"
            >
              Book a Counselling Session
            </button>
          </div>
        </div>

        {/* Hero image on the right */}
        <div className="flex-grow justify-center p-10 md:flex hidden">
          <img
            src={Hero_img}
            alt="Working professionals"
            className="hero-img relative z-10  "
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
