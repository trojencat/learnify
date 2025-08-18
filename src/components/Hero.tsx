import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Banner = () => {
  const bannerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.banner-bg',
        { opacity: 0, scale: 1.1 },
        { opacity: 0.3, scale: 1, duration: 2, ease: 'power2.out' }
      );
      gsap.fromTo(
        '.hero-img',
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1.5, ease: 'power3.out', delay: 1 }
      );
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={bannerRef} className="relative h-full  w-full flex flex-col md:flex-row items-center justify-between p-10 bg-cover mx-auto my-0 rounded-lg overflow-hidden bg-gray-50 bg-[url(https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/26c0bc7e-6e7b-49e4-b914-7456ff905c72.png)]">
      {/* Background image with low opacity */}
      
      {/* Hero image */}
      <motion.img
        src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/8fd65eec-570e-4a5a-be16-062426b19b0a.png"
        alt="Working professionals"
        className="hero-img relative z-10 max-w-sm rounded-lg shadow-lg"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* Text content */}
      <motion.div
        className="relative z-10 max-w-xl text-center md:text-left mt-8 md:mt-0 md:ml-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Discover Your True Career Path with Learnify
        </h1>

        <p className="mt-4 text-lg text-gray-700">
          Scientifically designed tests and expert counselling for a future that fits you.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a
            href="/test-registration"
            className="inline-block px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md shadow hover:bg-blue-700 transition"
          >
            Take a Test Now
          </a>

          <button
            onClick={() => alert('Open calendar/scheduling form')}
            className="inline-block px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-md shadow hover:bg-green-700 transition"
          >
            Book a Counselling Session
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;
