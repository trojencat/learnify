import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react"; // To install: npm install lucide-react

// --- Animation Variants ---
// A simple variant for the dropdown items
const dropdownItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
  exit: { opacity: 0, scale: 0.95 },
};

// --- Reusable Dropdown Component ---
const DropdownItem = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1.5 text-slate-600 hover:text-black transition-colors focus:outline-none">
        {title}
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={16} />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute z-30 top-full -mt-3 ml-2 w-max origin-top-left rounded-xl bg-white/60 p-2 backdrop-blur-2xl   shadow-xl shadow-black/5"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const DropdownLink = ({ text, href }: { text: String; href: string }) => (
  <motion.a
    href={href}
    variants={dropdownItemVariants}
    className="block w-full rounded-lg px-3 text-left py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-black"
  >
    {text}
  </motion.a>
);

// --- Main Header Component ---
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isExpanded = isScrolled || isHovered;

  return (
    <motion.header
      // The header simply fades in; its width is now controlled by its content.
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // Use onMouseEnter/Leave on the header itself to control the expanded state
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // `w-fit` makes the header intrinsically wrap its children.
      className="fixed  top-4 left-1/2  h-16 -translate-x-1/2 rounded-4xl z-50 bg-white/50 backdrop-blur-md shadow-xl"
    >
      <div className="flex items-center h-full px-8">
        {/* Logo and Motto */}
        <div className="flex-shrink-0 flex flex-row items-baseline mr-6">
          <h1 className="text-3xl font-bold bg-gradient-to-br from-blue-500 to-violet-500 bg-clip-text text-transparent">
            learnify.
          </h1>
          <p className="ml-2 text-base font-normal align-middle text-slate-500 hidden xl:block">
            your <span className="text-blue-600">learning </span>companion
          </p>
        </div>

        {/* Navigation Section */}
        <AnimatePresence>
          {isExpanded && (
            <motion.nav
              key="nav"
              // The nav now controls the main expansion animation with its width.
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "60em", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              // `overflow-hidden` and `whitespace-nowrap` are crucial for the smooth width animation.
              className="flex justify-end  w-fit items-center h-full gap-6  font-medium overflow-hidden whitespace-nowrap"
            >
              <a
                href="#home"
                className="text-slate-600 hover:text-black transition-colors"
              >
                Home
              </a>
              <DropdownItem title="Services">
                <DropdownLink href="#career-tests" text="Career Tests" />
                <DropdownLink href="#counselling" text="Counselling" />
              </DropdownItem>
              <a
                href="#courses"
                className="text-slate-600 hover:text-black transition-colors"
              >
                Courses
              </a>
              <DropdownItem title="Resources">
                <DropdownLink href="#blogs" text="Blogs & Articles" />
                <DropdownLink href="#guides" text="Career Guides" />
                <DropdownLink href="#success" text="Success Stories" />
              </DropdownItem>
              <a
                href="#contact"
                className="text-slate-600 hover:text-black transition-colors"
              >
                Contact Us
              </a>
              <a
                href="#contact"
                className="text-slate-600 hover:text-black transition-colors font-semibold"
              >
                Speak to a Counseller
              </a>
              <a
                href="#contact"
                className="text-white rounded-4xl px-2 py-1 hover:text-black transition-colors font-bold bg-gradient-to-r from-blue-600 to-indigo-400"
              >
                Take test
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
