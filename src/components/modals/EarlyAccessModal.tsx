"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type UserRole = "rider" | "driver" | null;

export default function EarlyAccessModal({ isOpen, onClose }: EarlyAccessModalProps) {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<UserRole>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(0);
        setRole(null);
        setEmail("");
        setSubmitted(false);
      }, 400);
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleRoleSelect = (selected: UserRole) => {
    setRole(selected);
    setTimeout(() => setStep(1), 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setStep(2);
  };

  // Shared transition config
  const pageTransition = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-primary/30 backdrop-blur-[2px]"
            onClick={onClose}
          />

          {/* ── Panel ── */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 z-[61] w-full md:w-[560px] lg:w-[640px] bg-white flex flex-col"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-8 md:px-12 h-20 border-b border-primary/[0.06] flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-bold text-primary/30 tracking-wide">
                  {step === 0 && "01 — Choose"}
                  {step === 1 && "02 — Details"}
                  {step === 2 && "03 — Done"}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center text-primary/40 hover:text-primary transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ── Progress bar ── */}
            <div className="h-[2px] bg-primary/[0.04] flex-shrink-0">
              <motion.div
                className="h-full bg-[#E76F32]"
                initial={{ width: "0%" }}
                animate={{ width: step === 0 ? "33%" : step === 1 ? "66%" : "100%" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* ── Content area ── */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <AnimatePresence mode="wait">

                {/* ── Step 0: Role selection ── */}
                {step === 0 && (
                  <motion.div
                    key="step-0"
                    {...pageTransition}
                    className="flex-1 flex flex-col justify-center px-8 md:px-12"
                  >
                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-primary/25 mb-4">
                      Early Access
                    </span>
                    <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.05] tracking-[-0.03em] text-primary mb-4">
                      I want to...
                    </h2>
                    <p className="text-[14.5px] text-primary/40 font-medium mb-12 max-w-[380px] leading-relaxed">
                      Tell us how you&apos;d like to use F-ride so we can tailor your experience from day one.
                    </p>

                    <div className="flex flex-col gap-4">
                      {[
                        {
                          id: "rider" as UserRole,
                          title: "Find rides",
                          subtitle: "I need a lift heading my direction",
                        },
                        {
                          id: "driver" as UserRole,
                          title: "Offer rides",
                          subtitle: "I have empty seats on my commute",
                        },
                      ].map((option) => (
                        <motion.button
                          key={option.id}
                          onClick={() => handleRoleSelect(option.id)}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.99 }}
                          className={`group flex items-center justify-between w-full py-6 px-6 border-2 rounded-sm text-left transition-all duration-200 ${
                            role === option.id
                              ? "border-primary bg-primary/[0.02]"
                              : "border-primary/10 hover:border-primary/30"
                          }`}
                        >
                          <div>
                            <span className="text-[20px] font-bold tracking-[-0.02em] text-primary block leading-none mb-1.5">
                              {option.title}
                            </span>
                            <span className="text-[13px] text-primary/40 font-medium">
                              {option.subtitle}
                            </span>
                          </div>
                          <span className={`text-[18px] transition-all duration-200 ${
                            role === option.id ? "text-[#E76F32]" : "text-primary/15 group-hover:text-primary/30"
                          }`}>
                            →
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ── Step 1: Email input ── */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    {...pageTransition}
                    className="flex-1 flex flex-col justify-center px-8 md:px-12"
                  >
                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-primary/25 mb-4">
                      Almost there
                    </span>
                    <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.05] tracking-[-0.03em] text-primary mb-4">
                      Drop your email.
                    </h2>
                    <p className="text-[14.5px] text-primary/40 font-medium mb-12 max-w-[380px] leading-relaxed">
                      We&apos;ll notify you when F-ride launches in your area.
                      {role === "driver" ? " Drivers get priority access." : " Early riders get their first trip free."}
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@email.com"
                          autoFocus
                          required
                          className="w-full bg-transparent border-b-2 border-primary/10 focus:border-primary text-[18px] font-semibold text-primary placeholder:text-primary/20 py-4 outline-none transition-colors duration-300 tracking-[-0.01em]"
                        />
                      </div>

                      <div className="flex items-center gap-4 pt-2">
                        <button
                          type="submit"
                          className="inline-flex items-center h-12 px-8 bg-primary text-white text-[13.5px] font-bold tracking-[-0.01em] rounded-sm hover:bg-primary/90 transition-colors duration-200"
                        >
                          Join the waitlist
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(0)}
                          className="text-[13px] font-semibold text-primary/30 hover:text-primary/50 transition-colors"
                        >
                          ← Back
                        </button>
                      </div>
                    </form>

                    {/* Role indicator */}
                    <div className="mt-12 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#E76F32]/50" />
                      <span className="text-[11.5px] font-semibold text-primary/25 tracking-wide">
                        Signing up as a {role}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 2: Confirmation ── */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    {...pageTransition}
                    className="flex-1 flex flex-col justify-center px-8 md:px-12"
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="w-16 h-16 rounded-full bg-[#E76F32]/10 flex items-center justify-center mb-8"
                    >
                      <motion.svg
                        className="w-7 h-7 text-[#E76F32]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                        />
                      </motion.svg>
                    </motion.div>

                    <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.05] tracking-[-0.03em] text-primary mb-4">
                      You&apos;re in.
                    </h2>
                    <p className="text-[14.5px] text-primary/40 font-medium max-w-[380px] leading-relaxed mb-8">
                      We&apos;ve added <span className="text-primary font-semibold">{email}</span> to
                      our {role} waitlist. You&apos;ll be the first to know when F-ride goes live.
                    </p>

                    <button
                      onClick={onClose}
                      className="inline-flex items-center h-12 px-8 border-2 border-primary/15 text-primary/60 text-[13.5px] font-bold tracking-[-0.01em] rounded-sm hover:border-primary/30 hover:text-primary transition-all duration-200 self-start"
                    >
                      Close
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* ── Footer ── */}
            <div className="px-8 md:px-12 py-6 border-t border-primary/[0.04] flex-shrink-0">
              <span className="text-[11px] font-medium text-primary/15 tracking-wide">
                No spam. Unsubscribe anytime.
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
