"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import EarlyAccessModal from "@/components/modals/EarlyAccessModal";

export default function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <section className="relative bg-primary py-32 md:py-44 overflow-hidden">

      {/* Decorative oversized text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[clamp(8rem,25vw,22rem)] font-black tracking-[-0.06em] text-white/[0.02] leading-none whitespace-nowrap">
          F-RIDE
        </span>
      </div>

      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          className="max-w-[720px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
              }
            }
          }}
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
              }
            }}
            className="text-[clamp(2.4rem,5.5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white mb-8"
          >
            Start riding
            <br />
            smarter today.
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-[15px] md:text-[17px] leading-[1.65] text-white/40 font-medium max-w-[420px] mb-12"
          >
            Someone is already going your way. Join them, share the
            cost, and turn your empty seat into a connection.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
              }
            }}
            className="flex flex-wrap items-center gap-5"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center h-13 px-8 bg-white text-primary text-[13.5px] font-bold tracking-[-0.01em] rounded-sm hover:bg-white/90 transition-colors duration-300 cursor-pointer"
            >
              Get Early Access
            </button>
            <button
              onClick={scrollToHowItWorks}
              className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-white/50 hover:text-white/80 transition-colors duration-300 cursor-pointer bg-transparent border-none"
            >
              Learn more
              <span className="text-base">→</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom edge line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />

      <EarlyAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
