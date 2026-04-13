"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Smartphone, ShieldCheck, Mail } from "lucide-react";

export default function LoginForm() {
  const [step, setStep] = useState(1); // 1: Identifier, 2: OTP
  const [identifier, setIdentifier] = useState("");

  const handleIdentifierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifier.trim()) {
      setStep(2);
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    window.location.href = "/dashboard/driver";
  };

  return (
    <div className="flex flex-col">
      <div className="mb-12">
        <h2 className="text-[32px] font-bold tracking-[-0.04em] text-primary mb-3">
          {step === 1 ? "Welcome back." : "Verification."}
        </h2>
        <p className="text-[14px] font-medium text-primary/40 leading-relaxed tracking-tight">
          {step === 1 
            ? "Enter your credentials to access your global mobility network." 
            : `We've sent a 6-digit access code to your verified identifier.`}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.form
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            onSubmit={handleIdentifierSubmit}
            className="flex flex-col gap-10"
          >
            <div className="group relative border-b border-primary/10 transition-colors focus-within:border-primary">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary/25 group-focus-within:text-[#E76F32] transition-colors">
                Email or Mobile
              </label>
              <div className="flex items-center gap-3 py-3">
                 <input
                  type="text"
                  placeholder="name@domain.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-transparent text-[16px] font-bold text-primary outline-none placeholder:text-primary/10 tracking-tight"
                  autoFocus
                />
                {identifier.includes("@") ? <Mail size={16} className="text-primary/10" /> : <Smartphone size={16} className="text-primary/10" />}
              </div>
            </div>

            <button
              type="submit"
              className="h-15 w-full bg-primary text-white font-bold text-[14px] tracking-tight hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 rounded-sm flex items-center justify-center gap-3"
            >
              Request Access
              <ArrowRight size={16} />
            </button>
          </motion.form>
        ) : (
          <motion.form
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            onSubmit={handleOtpSubmit}
            className="flex flex-col gap-10"
          >
            <div className="group relative border-b border-primary/10 transition-colors focus-within:border-primary">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary/25 group-focus-within:text-[#E76F32] transition-colors">
                Secure Entry Code
              </label>
              <div className="flex items-center gap-4 py-3">
                 <input
                  type="text"
                  maxLength={6}
                  placeholder="000 000"
                  className="w-full bg-transparent text-[24px] font-black tracking-[0.4em] text-primary outline-none placeholder:text-primary/10 placeholder:tracking-normal"
                  autoFocus
                />
                <ShieldCheck size={20} className="text-[#E76F32]" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
                <button
                type="submit"
                className="h-15 w-full bg-primary text-white font-bold text-[14px] tracking-tight hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 rounded-sm"
                >
                Sign In
                </button>
                <button
                type="button"
                onClick={() => setStep(1)}
                className="text-[12px] font-bold text-primary/30 hover:text-primary transition-colors py-2 uppercase tracking-widest"
                >
                Change Method
                </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="mt-16 pt-10 border-t border-primary/5">
        <p className="text-[13px] font-medium text-primary/40 tracking-tight">
          New to the network?{" "}
          <Link href="/register" className="text-primary font-bold hover:text-[#E76F32] transition-colors underline underline-offset-4 decoration-primary/10">
            Create Profile
          </Link>
        </p>
      </div>
    </div>
  );
}
