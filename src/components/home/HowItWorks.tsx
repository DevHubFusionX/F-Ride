"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Set your direction",
    description:
      "Open F-ride and tell us where you're heading. Whether you're driving with empty seats or need a lift — we only need your destination and when you're leaving.",
    detail: "Offer a Ride  ·  Find a Ride",
  },
  {
    num: "02",
    title: "Get matched instantly",
    description:
      "Our engine scans nearby commuters heading the same way in real-time. You'll see route overlap, pickup distance, and estimated arrival — all within seconds.",
    detail: "75%+ route match  ·  Under 3 min wait",
  },
  {
    num: "03",
    title: "Ride together, split the cost",
    description:
      "Accept your match, meet at the pickup point, and share the journey. Costs are calculated fairly based on route overlap and split automatically in-app.",
    detail: "No cash needed  ·  Automatic split",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative bg-white py-28 md:py-40 overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">

        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-24 md:mb-32">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[11.5px] font-bold tracking-[0.15em] uppercase text-primary/35 block mb-4"
            >
              How it works
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
              className="text-[clamp(2rem,4.5vw,3.8rem)] font-bold leading-[1.05] tracking-[-0.03em] text-primary max-w-[550px]"
            >
              Three steps to a
              <br />
              smarter commute.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[14px] md:text-[15px] text-primary/50 font-medium max-w-[320px] leading-[1.6]"
          >
            No detours, no waiting for a private car.
            Just people already going your way.
          </motion.p>
        </div>

        {/* ── Steps ── */}
        <motion.div 
          className="flex flex-col"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
                }
              }}
              className="group border-t border-primary/8 last:border-b"
            >
              <div
                className={`grid grid-cols-1 md:grid-cols-[120px_1fr_1.2fr] lg:grid-cols-[140px_1fr_1.4fr] gap-6 md:gap-8 items-start py-10 md:py-14 ${
                  idx === 1 ? "md:pl-[60px] lg:pl-[100px]" : ""
                }`}
              >
                {/* Step Number */}
                <span className="text-[64px] md:text-[80px] font-extrabold leading-none tracking-[-0.06em] text-primary/[0.06] select-none transition-colors duration-500 group-hover:text-primary/[0.12]">
                  {step.num}
                </span>

                {/* Title */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-[22px] md:text-[26px] font-bold tracking-[-0.02em] text-primary leading-[1.15]">
                    {step.title}
                  </h3>
                </div>

                {/* Description + Detail */}
                <div className="flex flex-col gap-4">
                  <p className="text-[14.5px] md:text-[15.5px] leading-[1.7] text-primary/55 font-medium max-w-[440px]">
                    {step.description}
                  </p>
                  <span className="text-[11.5px] font-bold tracking-[0.08em] uppercase text-[#E76F32]/70">
                    {step.detail}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* ── Decorative side text ── */}
      <div className="absolute top-28 -right-4 hidden xl:block">
        <span className="text-[180px] font-black leading-none tracking-[-0.06em] text-primary/[0.02] select-none -rotate-90 origin-top-right block">
          HOW
        </span>
      </div>
    </section>
  );
}
