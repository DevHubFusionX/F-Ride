"use client";

import React from "react";
import { motion } from "framer-motion";

/* ── Animation Variants ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ── Section 1: Vision Hero ── */
export function VisionHero() {
  const headline = "Moving people,    not just cars.";
  
  return (
    <section className="pt-32 pb-20 md:pt-56 md:pb-32 bg-white">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.04 } }
          }}
        >
          <h1 className="text-[clamp(2.5rem,10vw,8.5rem)] font-bold leading-[0.95] md:leading-[0.9] tracking-[-0.05em] text-primary">
            {/* Split headline into words to handle the large gap responsively */}
            {"Moving people,".split("").map((char, index) => (
              <motion.span
                key={`p-${index}`}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
                }}
                className="inline-block"
                style={{ whiteSpace: char === " " ? "pre" : "normal" }}
              >
                {char}
              </motion.span>
            ))}
            <span className="hidden md:inline-block md:w-[3vw]" />
            <br className="md:hidden" />
            {"not just cars.".split("").map((char, index) => (
              <motion.span
                key={`c-${index}`}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
                }}
                className="inline-block"
                style={{ whiteSpace: char === " " ? "pre" : "normal" }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] as const }}
          className="mt-12 md:mt-20 max-w-[580px]"
        >
          <p className="text-[18px] md:text-[22px] font-medium leading-[1.5] text-primary/60 tracking-[-0.01em]">
            F-ride was built on a simple observation: the roads are full, but the cars are empty. We're on a mission to optimize the journey of every vehicle on the road.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section 2: The Paradox ── */
export function TheParadox() {
  return (
    <section className="py-24 md:py-40 bg-[#F5F0EB]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-32 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.span variants={itemVariants} className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#E76F32] block mb-6">
              The Reality
            </motion.span>
            <motion.h2 variants={itemVariants} className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1] tracking-[-0.04em] text-primary mb-10">
              80% of seats are empty.
            </motion.h2>
            <motion.p variants={itemVariants} className="text-[16px] md:text-[17.5px] leading-[1.7] text-primary/50 font-medium max-w-[420px]">
              Every day, millions of travelers head in the exact same direction, separated only by thin sheets of glass and steel. We believe the future of mobility isn't about more cars—it's about more connections.
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="aspect-[4/5] bg-primary/5 border border-primary/10 rounded-sm relative overflow-hidden flex items-center justify-center p-12"
          >
            {/* Minimalist visualization of empty vs full */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-[280px]">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-32 rounded-sm border-2 ${i === 1 ? "bg-primary border-primary" : "border-primary/10 bg-transparent"}`} />
              ))}
            </div>
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              <span className="text-[11px] font-bold tracking-widest uppercase text-primary/20">Vehicle Capacity</span>
              <span className="text-[42px] font-black text-primary/10 leading-none tracking-tighter">75% EMPTY</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Section 3: Principles ── */
export function Principles() {
  const values = [
    { title: "Efficiency at Scale", text: "We don't create new traffic. We use what's already there to move the world forward." },
    { title: "Radical Safety", text: "Trust is our foundation. Identity verification and real-time tracking are non-negotiable." },
    { title: "Human Connection", text: "A commute is an opportunity to meet someone in your community, not just a duration." }
  ];

  return (
    <section className="py-24 md:py-44 bg-white">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {values.map((v, i) => (
            <motion.div key={v.title} variants={itemVariants} className="relative pt-12">
              <span className="absolute top-0 left-0 text-[14px] font-bold text-[#E76F32]/40">0{i+1} /</span>
              <h3 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] text-primary mb-5">{v.title}</h3>
              <p className="text-[14.5px] md:text-[15.5px] leading-[1.65] text-primary/50 font-medium">
                {v.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section 4: Future Network ── */
export function FutureNetwork() {
  return (
    <section className="py-32 md:py-56 bg-primary overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-5">
        <span className="text-[25vw] font-black tracking-[-0.08em] text-white leading-none">NETWORK</span>
      </div>
      
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 relative z-10 text-center flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[clamp(2.2rem,6vw,4.8rem)] font-bold leading-[1.1] tracking-[-0.04em] text-white max-w-[850px]"
        >
          Building the world's first smart mobility network.
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-px w-24 bg-[#E76F32] my-12"
        />
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-[17px] md:text-[20px] text-white/40 font-medium max-w-[600px] leading-relaxed"
        >
          Our vision goes beyond ride-matching. We're creating a seamless, interconnected layer of transport that works within the existing infrastructure of our cities.
        </motion.p>
      </div>
    </section>
  );
}

/* ── Section 5: Join CTA ── */
export function BuildWithUs() {
  return (
    <section className="py-24 md:py-44 bg-[#F5F0EB]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 flex flex-col items-start">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary/30 mb-8"
        >
          Collaborate
        </motion.span>
        <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.7 }}
          className="text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.05em] text-primary mb-12 max-w-[800px]"
        >
          Let&apos;s build the future of movement.
        </motion.h2>
        
        <div className="flex flex-col md:flex-row gap-12 w-full pt-12 border-t border-primary/10">
          <div className="flex-1">
            <h4 className="text-[13px] font-bold uppercase tracking-widest text-[#E76F32] mb-4">Careers</h4>
            <p className="text-[15px] text-primary/50 font-medium mb-6">We&apos;re looking for engineers, designers, and visionaries.</p>
            <a href="mailto:careers@frankride.com" className="text-[17px] font-bold text-primary hover:text-[#E76F32] transition-colors underline decoration-2 underline-offset-8">View Openings</a>
          </div>
          <div className="flex-1">
            <h4 className="text-[13px] font-bold uppercase tracking-widest text-[#E76F32] mb-4">Partnerships</h4>
            <p className="text-[15px] text-primary/50 font-medium mb-6">For cities, campuses, and logistics networks.</p>
            <a href="mailto:hello@frankride.com" className="text-[17px] font-bold text-primary hover:text-[#E76F32] transition-colors underline decoration-2 underline-offset-8">Say Hello</a>
          </div>
        </div>
      </div>
    </section>
  );
}
