import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Dummy payment gateway handler
const handlePayment = (plan: string) => {
  alert(`Initiating payment gateway for: ${plan}`);
};

export default () => {
  const titleRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%", // when title is 80% down the viewport
          once: true,
        },
      }
    );

    // Cards animation
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0]?.parentElement, // wrapper div
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  const plans = [
    {
      title: "Career Selection Test",
      price: "₹X",
      button: "Buy Now",
      action: () => handlePayment("Career Selection Test"),
      highlight: false,
    },
    {
      title: "Counselling Session",
      price: "₹Y",
      button: "Book Now",
      action: () => alert("Redirecting to booking scheduler..."),
      highlight: false,
    },
    {
      title: "Test + Counselling Combo",
      price: "₹Z",
      button: "Best Value",
      action: () => handlePayment("Test + Counselling Combo"),
      highlight: true,
    },
  ];

  return (
    <section className="relative py-16 bg-gradient-to-br from-blue-900/95 to-blue-700/80 min-h-[60vh]">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-extrabold mb-12 tracking-tight text-blue-100 drop-shadow-2xl"
        >
          Programs & Pricing
        </h2>
        <div className="grid w-full md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              ref={(el: any) => (cardsRef.current[i] = el)}
              key={plan.title}
              className={`relative group rounded-2xl shadow-2xl border border-white/20 overflow-hidden bg-white/10 backdrop-blur-md px-8 py-12 flex flex-col items-center transition-all duration-300
                ${
                  plan.highlight
                    ? "bg-gradient-to-br from-blue-600/30 via-blue-700/50 to-blue-800/20 border-blue-400/40 scale-105 shadow-blue-600/30"
                    : ""
                }`}
            >
              {plan.highlight && (
                <span className="absolute  top-4 right-4 bg-yellow-400 text-blue-800 text-xs px-3 py-1 rounded-full font-bold shadow-md opacity-90">
                  Best Value
                </span>
              )}
              <h3 className="text-2xl font-bold mb-3 text-blue-200 text-center drop-shadow">
                {plan.title}
              </h3>
              <div className="text-4xl font-extrabold mb-8 text-blue-100 tracking-wider text-center">
                {plan.price}
              </div>
              <button
                onClick={plan.action}
                className={`w-full py-3 px-6 mt-auto rounded-xl font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-2 
                  ${
                    plan.highlight
                      ? "bg-blue-500 hover:bg-blue-600 text-white shadow-xl ring-blue-400/40"
                      : "bg-white/30 text-blue-800 hover:bg-blue-100/70 shadow-md ring-blue-200/50"
                  }
                `}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
