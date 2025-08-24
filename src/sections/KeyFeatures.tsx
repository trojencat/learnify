import { easeInOut, motion } from "framer-motion";

// Import your images...
import testIcon from "../assets/testIcon.jpg";
import counsellingIcon from "../assets/counsellingIcon.jpg";
import reportIcon from "../assets/reportIcon.jpg";
import webinarIcon from "../assets/webinarIcon.png";

const featuresData = [
  {
    id: 1,
    title: "Career Selection Tests",
    subtitle: "Psychometric + Aptitude",
    description:
      "Utilize our scientifically designed psychometric and aptitude tests to discover your strengths, personality traits, and career inclinations for a perfect match.",
    image: testIcon,
    bgColor: "#E6E6FA",
  },
  {
    id: 2,
    title: "One-on-One Counselling",
    subtitle: "Online or In-person",
    description:
      "Connect with our expert career counselors for personalized guidance. We offer flexible sessions, either online or in-person, to fit your schedule and needs.",
    image: counsellingIcon,
    bgColor: "#FFDAB9",
  },
  {
    id: 3,
    title: "Career Reports",
    subtitle: "Detailed guidance PDF",
    description:
      "Receive a comprehensive PDF report after your assessment, detailing your career recommendations, educational pathways, and actionable next steps.",
    image: reportIcon,
    bgColor: "#C3D5C5",
  },
  {
    id: 4,
    title: "Workshops & Webinars",
    subtitle: "Career awareness programs",
    description:
      "Join our interactive workshops and webinars to stay updated on the latest career trends, develop essential skills, and network with industry professionals.",
    image: webinarIcon,
    bgColor: "#B3D4F5",
  },
];

// Minimal scroll-in animation
const rowVariants = {
  offscreen: { y: 32, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { ease: easeInOut, duration: 0.6 },
  },
};

export default function KeyFeatures() {
  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/30">
      {/* soft ambient blobs (light) */}
      <div className="pointer-events-none absolute -top-20 -left-10 h-60 w-60 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">
            Our Key Features
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-700">
            Guiding you to your ideal career path with expert tools and support.
          </p>
        </div>

        {/* Stacked, alternating rows */}
        <div className="mt-14 flex flex-col gap-14">
          {featuresData.map((feature, idx) => {
            const reverse = idx % 2 === 1; // alternate layout
            return (
              <motion.div
                key={feature.id}
                className={`relative flex flex-col items-center gap-8 md:gap-12 ${
                  reverse ? "md:flex-row-reverse" : "md:flex-row"
                }`}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                variants={rowVariants}
              >
                {/* Background accent that fades outside the row */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10"
                >
                  <div
                    className={`absolute ${
                      reverse ? "right-[-10%]" : "left-[-10%]"
                    } top-1/2 -translate-y-1/2 h-56 w-[55%] rounded-[2.5rem] blur-2xl opacity-40`}
                    style={{ background: feature.bgColor }}
                  />
                </div>

                {/* Vector/Image side */}
                <div className="w-full md:w-1/2">
                  <div className="relative rounded-3xl bg-white/40 backdrop-blur-xl p-4 sm:p-5">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-64 sm:h-72 object-cover rounded-2xl"
                    />
                    {/* gentle light gradient on top of media */}
                    <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/40 via-transparent to-white/20" />
                  </div>
                </div>

                {/* Text side */}
                <div
                  className={`w-full md:w-1/2 ${
                    reverse ? "md:text-left" : "md:text-left"
                  }`}
                >
                  <div className="relative">
                    {/* soft text background wash that bleeds out */}
                    <div
                      aria-hidden
                      className={`pointer-events-none absolute -inset-x-10 -inset-y-6 -z-10 rounded-[3rem] blur-3xl opacity-30`}
                      style={{ background: feature.bgColor }}
                    />
                    <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm sm:text-base font-medium text-blue-700/90">
                      {feature.subtitle}
                    </p>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
