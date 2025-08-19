import { easeInOut, hover, motion } from "framer-motion";

// Import your images...
import testIcon from "../assets/testIcon.jpg";
import counsellingIcon from "../assets/counsellingIcon.jpg";
import reportIcon from "../assets/reportIcon.jpg";
import webinarIcon from "../assets/webinarIcon.png";

// Data remains the same...
const featuresData = [
  {
    id: 1, // Unique ID for the key prop
    title: "Career Selection Tests",
    subtitle: "Psychometric + Aptitude",
    description:
      "Utilize our scientifically designed psychometric and aptitude tests to discover your strengths, personality traits, and career inclinations for a perfect match.",
    image: testIcon,
    align: "left",
    bgColor: "#E6E6FA", // A light blue color
  },
  {
    id: 2,
    title: "One-on-One Counselling",
    subtitle: "Online or In-person",
    description:
      "Connect with our expert career counselors for personalized guidance. We offer flexible sessions, either online or in-person, to fit your schedule and needs.",
    image: counsellingIcon,
    align: "right",
    bgColor: "#FFDAB9", // A light green color
  },
  {
    id: 3,
    title: "Career Reports",
    subtitle: "Detailed guidance PDF",
    description:
      "Receive a comprehensive PDF report after your assessment, detailing your career recommendations, educational pathways, and actionable next steps.",
    image: reportIcon,
    align: "right",
    bgColor: "#C3D5C5", // A light purple color
  },
  {
    id: 4,
    title: "Workshops & Webinars",
    subtitle: "Career awareness programs",
    description:
      "Join our interactive workshops and webinars to stay updated on the latest career trends, develop essential skills, and network with industry professionals.",
    image: webinarIcon,
    align: "left",
    bgColor: "#B3D4F5", // A light yellow color
  },
];

// Card animation for scrolling into view
const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { easeInOut, duration: 0.8 },
  },
};

// NEW: Animation variants for the rotated background


const KeyFeatures = () => {
  return (
    <section className="py-12 sm:py-20 bg-white/10 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Key Features
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Guiding you to your ideal career path with expert tools and support.
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 grid-cols-1 gap-y-16 lg:gap-x-8">
          {featuresData.map((feature) => (
            <motion.div
              key={feature.id}
              className={`group  cursor-pointer flex flex-col items-center h-full overflow-hidden rounded-3xl md:flex-row ${
                feature.align === "right" ? "md:flex-row-reverse" : ""
              }`}
              // Scroll-triggered animation
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
              // Hover-triggered animation controller
              whileHover="hover" // This tells children to animate to their "hover" state
            >
              {/* Image Section */}
              <div className="md:w-1/2 p-6">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="rounded-lg object-cover"
                />
              </div>

              {/* Text Section */}
              <div
                className={`md:w-1/2  h-full p-6 relative flex flex-col justify-center ${
                  feature.align === "right" ? "md:text-right" : "md:text-left"
                }`}
              >
                {/* UPDATED: Rotated background is now a motion.div */}
                <motion.div
                  className={`-z-10 absolute inset-0 opacity-20 group-hover:opacity-70 transition duration-300 ease-in-out ${
                    feature.align === "right" ? "-rotate-12" : "rotate-12"
                  } scale-y-[2.0] scale-x-[1.5]`}
                  style={{ backgroundColor: feature.bgColor }} // Apply the new background variants
                  initial="initial" // Set its initial state
                ></motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 relative">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 relative">{feature.subtitle}</p>
                <p className="mt-4 text-gray-700 relative">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;