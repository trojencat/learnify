import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FeedbackSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Minimal, subtle animation on scroll into view
    const ctx = gsap.context(() => {
      const inputs = formRef.current?.querySelectorAll<HTMLElement>("label, input, textarea, select, button");
      gsap.from([wrapRef.current], {
        autoAlpha: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
      if (inputs && inputs.length) {
        gsap.from(inputs, {
          autoAlpha: 0,
          y: 10,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.06,
          delay: 0.1,
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 80%",
          },
        });
      }
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // Honeypot check
    if (fd.get("website")) return;

    setStatus("sending");
    try {
      // TODO: Send to your backend / form service
      // await fetch("/api/feedback", { method: "POST", body: fd });
      await new Promise((r) => setTimeout(r, 800)); // mock
      setStatus("sent");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 2500);
    }
  }

  return (
    <section
      className="
        relative py-20
        bg-gradient-to-br from-white/70 via-blue-50/40 to-indigo-50/30
        backdrop-blur-xl
      "
    >
      {/* soft spotlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12),transparent_60%)]" />

      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div
          ref={wrapRef}
          className="
            relative rounded-3xl
            bg-white/35 backdrop-blur-md
            ring-1 ring-white/50
            shadow-[0_30px_80px_rgba(30,64,175,0.15)]
            p-6 md:p-10
          "
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">
              Share Feedback or Contact the Team
            </h2>
            <p className="mt-2 text-blue-900/70">
              We read every message. Tell us what’s working, what’s not, or just say hi.
            </p>
          </div>

          {/* Status toast */}
          {status !== "idle" && (
            <div
              className={`
                mb-6 mx-auto max-w-xl text-center rounded-xl px-4 py-3
                ${status === "sent" ? "bg-emerald-50/70 text-emerald-700 ring-1 ring-emerald-200/70" : ""}
                ${status === "sending" ? "bg-blue-50/70 text-blue-700 ring-1 ring-blue-200/70" : ""}
                ${status === "error" ? "bg-rose-50/70 text-rose-700 ring-1 ring-rose-200/70" : ""}
              `}
            >
              {status === "sending" && "Sending…"}
              {status === "sent" && "Thanks! Your message has been sent."}
              {status === "error" && "Something went wrong. Please try again."}
            </div>
          )}

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="mx-auto max-w-3xl">
            {/* honeypot */}
            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-blue-900/80">Your name</label>
                <input
                  required
                  name="name"
                  placeholder="Jane Doe"
                  className="
                    rounded-xl px-4 py-3
                    bg-white/45 backdrop-blur
                    ring-1 ring-white/60 focus:ring-2 focus:ring-blue-400/60
                    outline-none
                    shadow-inner shadow-blue-900/5
                    placeholder:text-blue-900/40
                  "
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-blue-900/80">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  className="
                    rounded-xl px-4 py-3
                    bg-white/45 backdrop-blur
                    ring-1 ring-white/60 focus:ring-2 focus:ring-blue-400/60
                    outline-none
                    shadow-inner shadow-blue-900/5
                    placeholder:text-blue-900/40
                  "
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-blue-900/80">Topic</label>
                <select
                  name="topic"
                  className="
                    rounded-xl px-4 py-3
                    bg-white/45 backdrop-blur
                    ring-1 ring-white/60 focus:ring-2 focus:ring-blue-400/60
                    outline-none
                    shadow-inner shadow-blue-900/5
                    text-blue-900
                  "
                >
                  <option>General feedback</option>
                  <option>Report a bug</option>
                  <option>Feature request</option>
                  <option>Partnerships</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-blue-900/80">Message</label>
                <textarea
                  required
                  name="message"
                  rows={6}
                  placeholder="Type your message…"
                  className="
                    rounded-2xl px-4 py-3
                    bg-white/45 backdrop-blur
                    ring-1 ring-white/60 focus:ring-2 focus:ring-blue-400/60
                    outline-none resize-y
                    shadow-inner shadow-blue-900/5
                    placeholder:text-blue-900/40
                  "
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <label className="flex items-center gap-2 text-sm text-blue-900/70">
                <input
                  type="checkbox"
                  name="consent"
                  className="h-4 w-4 rounded bg-white/60 border border-blue-900/20 accent-blue-600"
                />
                You may contact me about this message.
              </label>

              <button
                disabled={status === "sending"}
                className="
                  inline-flex items-center justify-center
                  rounded-xl px-5 py-3
                  font-semibold
                  text-white
                  bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600
                  shadow-[0_12px_30px_rgba(37,99,235,0.35)]
                  disabled:opacity-60
                  focus:outline-none focus:ring-2 focus:ring-blue-400/60
                  transition
                "
                type="submit"
              >
                {status === "sending" ? "Sending…" : "Send feedback"}
              </button>
            </div>
          </form>

          {/* Decorative translucent corners */}
          <div className="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full bg-blue-300/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-8 h-32 w-32 rounded-full bg-indigo-300/20 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
