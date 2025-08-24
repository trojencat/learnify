import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  companyLogo: string;
  avatar: string;
};

const items: Testimonial[] = [
  {
    quote:
      "We love Landingfolio! Our designers were using it for their projects, so clients already knew what Landingfolio was and how to use it.",
    name: "Bessie Cooper",
    role: "Co-Founder, CEO",
    company: "Alterbone",
    companyLogo: "https://via.placeholder.com/90x24.png?text=Alterbone",
    avatar: "https://i.pravatar.cc/80?img=12",
  },
  {
    quote:
      "I didn’t know designing in Figma could be this individualized. I’d never considered it before, but Landingfolio changed my mind.",
    name: "Albert Flores",
    role: "Senior Product Manager",
    company: "Ridoria",
    companyLogo: "https://via.placeholder.com/80x24.png?text=Ridoria",
    avatar: "https://i.pravatar.cc/80?img=22",
  },
  {
    quote:
      "We love Landingfolio! Our designers were using it for their projects, so clients already knew what Landingfolio was and how to use it.",
    name: "Jenny Wilson",
    role: "Head of Marketing",
    company: "Incanto",
    companyLogo: "https://via.placeholder.com/90x24.png?text=Incanto",
    avatar: "https://i.pravatar.cc/80?img=36",
  },
  // add a 4th to complete 2x2 (optional: replace with a real one)
  {
    quote:
      "Clear reporting and actionable next steps helped us move faster with confidence.",
    name: "Sana Kapoor",
    role: "Product Lead",
    company: "Kinetiq",
    companyLogo: "https://via.placeholder.com/90x24.png?text=Kinetiq",
    avatar: "https://i.pravatar.cc/80?img=48",
  },
];

export default function Testimonials() {
  const row1WrapRef = useRef<HTMLDivElement | null>(null);
  const row2WrapRef = useRef<HTMLDivElement | null>(null);
  const row1Refs = useRef<HTMLDivElement[]>([]);
  const row2Refs = useRef<HTMLDivElement[]>([]);

  const row1 = useMemo(() => items.slice(0, 2), []);
  const row2 = useMemo(() => items.slice(2, 4), []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Row 1 animation
      gsap.fromTo(
        row1Refs.current,
        {
          opacity: 0,
          x: 90,
          rotate: () => gsap.utils.random(-10, 10),
        },
        {
          opacity: 1,
          x: 0,
          rotate: () => gsap.utils.random(-3, 3),
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: row1WrapRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Row 2 animation (separate trigger; slightly different timing)
      gsap.fromTo(
        row2Refs.current,
        {
          opacity: 0,
          x: 90,
          rotate: () => gsap.utils.random(-10, 10),
        },
        {
          opacity: 1,
          x: 0,
          rotate: ()=>gsap.utils.random(-3, 3),
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: row2WrapRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full py-16 bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
        {/* 2-column layout: left text, right cards */}
        <div className="flex flex-row ">
          {/* Left: centered text */}<div className="min-w-1/3 min-h-full flex items-center p-5">
            
            <div className=" ">
              <p className="text-3xl md:text-4xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">
                Don’t just take our words.
              </p>
              <p className="mt-3 text-sm md:text-base text-gray-600">
                Over <span className="font-semibold text-blue-600">1000+ people</span> trust us.
              </p>
            </div>
          </div>

          {/* Right: 2x2 grid of cards */}
          <div className="md:col-span-2 grid grid-rows-2 gap-6 md:gap-8 w">
            {/* Row 1 */}
            <div ref={row1WrapRef} className="grid grid-cols-1 sm:grid-cols-2 gap-[-1px] md:gap-[-1px]">
              {row1.map((t, i) => (
                <div
                  key={`r1-${t.name}-${i}`}
                  ref={(el) => el && (row1Refs.current[i] = el)}
                  className="rounded-2xl bg-white border border-gray-200 shadow-lg shadow-gray-900/5 p-6 md:p-7 flex flex-col will-change-transform"
                >
                  <blockquote className="text-gray-800 text-lg leading-relaxed">
                    “{t.quote}”
                  </blockquote>
                  <div className="mt-6 mb-4 h-px bg-gray-100" />
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-semibold text-gray-900">{t.name}</div>
                      <div className="text-sm text-gray-500">{t.role}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <img src={t.companyLogo} alt={`${t.company} logo`} className="h-5 w-auto opacity-90" />
                      <img src={t.avatar} alt={`${t.name} avatar`} className="h-9 w-9 rounded-full ring-2 ring-white shadow-md shadow-gray-900/10 object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div ref={row2WrapRef} className="grid grid-cols-1 sm:grid-cols-2 gap-[-1px] md:gap-[-1px]">
              {row2.map((t, i) => (
                <div
                  key={`r2-${t.name}-${i}`}
                  ref={(el) => el && (row2Refs.current[i] = el)}
                  className="rounded-2xl bg-white border border-gray-200 shadow-lg shadow-gray-900/5 p-6 md:p-7 flex flex-col will-change-transform"
                >
                  <blockquote className="text-gray-800 text-lg leading-relaxed">
                    “{t.quote}”
                  </blockquote>
                  <div className="mt-6 mb-4 h-px bg-gray-100" />
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-semibold text-gray-900">{t.name}</div>
                      <div className="text-sm text-gray-500">{t.role}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <img src={t.companyLogo} alt={`${t.company} logo`} className="h-5 w-auto opacity-90" />
                      <img src={t.avatar} alt={`${t.name} avatar`} className="h-9 w-9 rounded-full ring-2 ring-white shadow-md shadow-gray-900/10 object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
