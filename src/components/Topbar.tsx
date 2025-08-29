import { useState, useEffect } from "react";
import { motion, AnimatePresence, type AnimationGeneratorType } from "framer-motion";
import { ChevronDown, MoreHorizontal, X } from "lucide-react"; // npm i lucide-react

// --- Animation Variants ---
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

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const sheetVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as AnimationGeneratorType, stiffness: 300, damping: 28 },
  },
  exit: { opacity: 0, y: 10, scale: 0.98 },
};

// --- Reusable Dropdown (desktop) ---
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
      className="relative"
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
            className="absolute z-30 top-full -mt-3 ml-2 w-max origin-top-left rounded-xl bg-white/60 p-2 backdrop-blur-2xl shadow-xl shadow-black/5"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DropdownLink = ({ text, href }: { text: string; href: string }) => (
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
  const [isHovered, setIsHovered] = useState(false); // desktop only
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isExpanded = isScrolled || isHovered; // desktop only

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed top-4 left-1/2 h-16 -translate-x-1/2 rounded-4xl w-[80%] md:w-fit z-50 bg-white/50 backdrop-blur-sm shadow-xl"
    >
      <div className="flex items-center h-full  px-4 sm:px-6 md:px-8 gap-4">
        {/* Logo and Motto */}
        <div className="flex-shrink-0 flex flex-row items-baseline mr-1 md:mr-6">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-blue-500 to-violet-500 bg-clip-text text-transparent">
            learnify.
          </h1>
          <p className="ml-2 text-sm md:text-base font-normal align-middle text-slate-500 hidden xl:block">
            your <span className="text-blue-600">learning </span>companion
          </p>
        </div>

        {/* --- Mobile trigger (<= md) --- */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="md:hidden ml-auto inline-flex items-center justify-center rounded-2xl p-2 text-slate-700 hover:text-black hover:bg-white/60 transition"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={22} /> : <MoreHorizontal size={22} />}
        </button>

        {/* --- Desktop nav (md and up) --- */}
        <AnimatePresence>
          {isExpanded && (
            <motion.nav
              key="nav"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "60em", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="hidden md:flex justify-end items-center h-full gap-6 font-medium overflow-hidden whitespace-nowrap"
            >
              <a href="#home" className="text-slate-600 hover:text-black transition-colors">
                Home
              </a>
              <DropdownItem title="Services">
                <DropdownLink href="#career-tests" text="Career Tests" />
                <DropdownLink href="#counselling" text="Counselling" />
              </DropdownItem>
              <a href="#courses" className="text-slate-600 hover:text-black transition-colors">
                Courses
              </a>
              <DropdownItem title="Resources">
                <DropdownLink href="#blogs" text="Blogs & Articles" />
                <DropdownLink href="#guides" text="Career Guides" />
                <DropdownLink href="#success" text="Success Stories" />
              </DropdownItem>
              <a href="#contact" className="text-slate-600 hover:text-black transition-colors">
                Contact Us
              </a>
              <a href="#contact" className="text-slate-600 hover:text-black transition-colors font-semibold">
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

      {/* --- Mobile Fullscreen Menu --- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            className="fixed w-full inset-0 z-[60]"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              className="absolute inset-0 bg-white/70 backdrop-blur-2xl"
              aria-hidden
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Menu"
              className="relative mx-auto mt-24 w-[90%] max-w-md rounded-3xl bg-white/98 shadow-2xl backdrop-blur-xl p-6"
              variants={sheetVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-slate-800">Menu</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="inline-flex items-center justify-center rounded-xl p-2 text-slate-700 hover:text-black hover:bg-slate-100"
                  onClick={() => setMobileOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="grid gap-1 text-base font-medium">
                <a href="#home" className="rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-100">
                  Home
                </a>
                <details className="rounded-xl px-3 py-2 text-slate-700 open:bg-slate-50">
                  <summary className="cursor-pointer list-none flex items-center justify-between">
                    <span>Services</span>
                    <ChevronDown size={18} />
                  </summary>
                  <div className="mt-2 ml-2 grid">
                    <a href="#career-tests" className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100">
                      Career Tests
                    </a>
                    <a href="#counselling" className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100">
                      Counselling
                    </a>
                  </div>
                </details>
                <a href="#courses" className="rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-100">
                  Courses
                </a>
                <details className="rounded-xl px-3 py-2 text-slate-700 open:bg-slate-50">
                  <summary className="cursor-pointer list-none flex items-center justify-between">
                    <span>Resources</span>
                    <ChevronDown size={18} />
                  </summary>
                  <div className="mt-2 ml-2 grid">
                    <a href="#blogs" className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100">
                      Blogs & Articles
                    </a>
                    <a href="#guides" className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100">
                      Career Guides
                    </a>
                    <a href="#success" className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100">
                      Success Stories
                    </a>
                  </div>
                </details>
                <a href="#contact" className="rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-100">
                  Contact Us
                </a>
                <a href="#contact" className="rounded-xl px-3 py-2 text-slate-900">
                  <span className="font-semibold">Speak to a Counseller</span>
                </a>
                <a
                  href="#contact"
                  className="mt-2 text-center text-white rounded-3xl px-4 py-2 font-bold bg-gradient-to-r from-blue-600 to-indigo-400"
                >
                  Take test
                </a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}