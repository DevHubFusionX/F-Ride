"use client";

import { motion } from "framer-motion";

const trustPoints = [
  {
    label: "Identity Verified",
    text: "Every user goes through OTP and optional ID verification before their first ride. No anonymous passengers.",
  },
  {
    label: "Emergency SOS",
    text: "One-tap emergency button shares your real-time location with your chosen contacts and local authorities.",
  },
  {
    label: "Live Ride Sharing",
    text: "Share your active ride status with anyone — they see your route, driver, and ETA in real-time.",
  },
  {
    label: "Ratings Both Ways",
    text: "Drivers rate riders. Riders rate drivers. The community self-governs and low-rated accounts are flagged.",
  },
];

export default function TrustSafety() {
  return (
    <section
      id="trust"
      className="relative bg-[#F5F0EB] py-28 md:py-40 overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12">

        {/* ── Top: Big statement layout ── */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-24 mb-24 md:mb-36"
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

          {/* Left — the anchor number */}
          <div className="relative">
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-[11.5px] font-bold tracking-[0.15em] uppercase text-primary/30 block mb-6"
            >
              Trust & Safety
            </motion.span>

            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 30 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                }
              }}
              className="flex items-baseline gap-3"
            >
              <span className="text-[clamp(6rem,15vw,12rem)] font-black leading-[0.85] tracking-[-0.06em] text-primary">
                100
              </span>
              <span className="text-[clamp(2rem,5vw,4rem)] font-black tracking-[-0.04em] text-[#E76F32] leading-none">
                %
              </span>
            </motion.div>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.2 } }
              }}
              className="text-[18px] md:text-[22px] font-bold tracking-[-0.02em] text-primary/80 mt-4 max-w-[380px] leading-[1.3]"
            >
              of riders and drivers on F-ride are identity verified before
              their first trip.
            </motion.p>
          </div>

          {/* Right — editorial text block */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="flex flex-col justify-end lg:pt-16"
          >
            <p className="text-[15px] md:text-[16.5px] leading-[1.75] text-primary/50 font-medium max-w-[460px]">
              We built F-ride around the idea that you shouldn&apos;t have to
              choose between affordable transport and personal safety.
              Every feature exists because trust is the foundation of
              shared mobility — not an afterthought bolted on later.
            </p>
            <div className="w-16 h-[2px] bg-primary/10 mt-8" />
          </motion.div>
        </motion.div>

        {/* ── Bottom: Trust points in an offset 2-column layout ── */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.3
              }
            }
          }}
        >
          {trustPoints.map((point, idx) => (
            <motion.div
              key={point.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
                }
              }}
              className={`border-t border-primary/8 py-8 md:py-10 ${
                idx % 2 === 1 ? "md:mt-16" : ""
              }`}
            >
              <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#E76F32]/60 block mb-3">
                {point.label}
              </span>
              <p className="text-[14.5px] md:text-[15.5px] leading-[1.7] text-primary/55 font-medium max-w-[400px]">
                {point.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
