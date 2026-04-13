"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const marqueeItems = [
  "Same direction rides",
  "Real-time matching",
  "Shared costs",
  "Verified drivers",
  "Live tracking",
  "Community commuting",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const headline = "Going your way?";

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col bg-[#F5F0EB] overflow-hidden">

      {/* ── Top: Full-width headline ── */}
      <div className="max-w-[1320px] mx-auto w-full px-6 lg:px-12 pt-32 md:pt-40">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.03,
              },
            },
          }}
          className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] tracking-[-0.045em] text-primary"
        >
          {headline.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      {/* ── Middle: Asymmetric image + text layout ── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex-1 max-w-[1320px] mx-auto w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-6 items-end py-10 md:py-16"
      >

        {/* Left: description + CTAs stacked vertically */}
        <div className="flex flex-col justify-end gap-8 pb-4 order-2 lg:order-1">
          <motion.p
            variants={itemVariants}
            className="text-[15px] md:text-[17px] leading-[1.7] text-primary/50 font-medium max-w-[380px]"
          >
            F-ride connects drivers with empty seats to riders heading
            the same direction. No detours — just people already going
            your way.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/register?role=rider"
              className="inline-flex items-center h-12 px-7 border-2 border-primary text-primary text-[13.5px] font-bold tracking-[-0.01em] rounded-sm hover:bg-primary hover:text-white transition-all duration-300"
            >
              Find a Ride
            </Link>
            <Link
              href="/register?role=driver"
              className="inline-flex items-center h-12 px-7 border-2 border-primary/20 text-primary/60 text-[13.5px] font-bold tracking-[-0.01em] rounded-sm hover:border-primary/40 hover:text-primary transition-all duration-300"
            >
              Offer a Ride
            </Link>
          </motion.div>

          {/* Micro-stat */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 pt-2"
          >
            <div className="flex flex-col">
              <span className="text-[26px] font-extrabold tracking-[-0.03em] text-primary leading-none">2,400+</span>
              <span className="text-[10.5px] font-semibold tracking-[0.05em] uppercase text-primary/25 mt-1">rides today</span>
            </div>
            <div className="w-px h-8 bg-primary/10" />
            <div className="flex flex-col">
              <span className="text-[26px] font-extrabold tracking-[-0.03em] text-primary leading-none">&lt; 3 min</span>
              <span className="text-[10.5px] font-semibold tracking-[0.05em] uppercase text-primary/25 mt-1">avg wait</span>
            </div>
          </motion.div>
        </div>

        {/* Right: image in a tall, cropped frame */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 1.05, filter: "blur(10px)" },
            visible: {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
            },
          }}
          className="relative w-full h-[50vh] md:h-[55vh] lg:h-full min-h-[320px] rounded-[4px] overflow-hidden order-1 lg:order-2"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src="/hero-bg.png"
              alt="City commuters at golden hour"
              fill
              className="object-cover object-center"
              priority
              quality={90}
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </motion.div>
          {/* Subtle warm tint */}
          <div className="absolute inset-0 bg-[#F5F0EB]/10 pointer-events-none" />

          {/* Overlaid label on the image */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-0 left-0 right-0 p-5 md:p-7 bg-gradient-to-t from-black/40 to-transparent"
          >
            <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/60">
              Live · 847 drivers active
            </span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Bottom: Scrolling marquee ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="border-t border-primary/[0.06] bg-white/50 overflow-hidden"
      >
        <div className="relative flex py-4">
          <div className="flex animate-marquee whitespace-nowrap gap-0">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
              <span key={idx} className="inline-flex items-center">
                <span className="text-[11.5px] font-semibold text-primary/30 tracking-wide px-6">
                  {item}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#E76F32]/30 flex-shrink-0" />
              </span>
            ))}
          </div>
          <div className="flex animate-marquee whitespace-nowrap gap-0" aria-hidden>
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
              <span key={idx} className="inline-flex items-center">
                <span className="text-[11.5px] font-semibold text-primary/30 tracking-wide px-6">
                  {item}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#E76F32]/30 flex-shrink-0" />
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
