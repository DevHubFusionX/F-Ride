"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { UserCheck, Navigation, Car, Smartphone, ArrowRight, X, Shield } from "lucide-react";

export default function RegisterForm() {
  const [step, setStep] = useState(1); // 1: Role, 2: Identifier, 3: OTP, 4: Profile
  const [role, setRole] = useState<"rider" | "driver" | null>(null);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <div className="flex flex-col">
      <div className="mb-12">
        <h2 className="text-[32px] font-bold tracking-[-0.04em] text-primary mb-3">
          {step === 1 && "Identity."}
          {step === 2 && "Verification."}
          {step === 3 && "Security."}
          {step === 4 && "Profile."}
        </h2>
        <p className="text-[14px] font-medium text-primary/40 leading-relaxed tracking-tight">
          {step === 1 && "Select your primary function within the FrankRide network."}
          {step === 2 && "Enter your contact details to establish your secure identity."}
          {step === 3 && "Confirm the 6-digit access code sent to your device."}
          {step === 4 && "How should the community verify and address you?"}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-col gap-4"
          >
            {[
              { id: "rider", title: "Rider", desc: "Find vehicles sharing your path.", icon: Navigation },
              { id: "driver", title: "Driver", desc: "Share your empty vehicle capacity.", icon: Car },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setRole(r.id as "rider" | "driver");
                  nextStep();
                }}
                className={`flex items-center gap-6 p-7 border transition-all text-left rounded-sm ${
                  role === r.id ? "border-primary bg-primary/[0.02]" : "border-primary/5 hover:border-primary/20 bg-white"
                }`}
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-sm ${role === r.id ? "bg-primary text-white" : "bg-primary/5 text-primary/20"}`}>
                   <r.icon size={20} />
                </div>
                <div>
                   <span className="text-[17px] font-bold text-primary mb-1 block tracking-tight">{r.title}</span>
                   <span className="text-[13px] font-medium text-primary/40 tracking-tight">{r.desc}</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-col gap-10"
          >
            <div className="group relative border-b border-primary/10 transition-colors focus-within:border-primary">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary/25 group-focus-within:text-[#E76F32] transition-colors">
                Phone or Email
              </label>
              <div className="flex items-center gap-3 py-3">
                 <input
                  type="text"
                  className="w-full bg-transparent text-[16px] font-bold text-primary outline-none placeholder:text-primary/10 tracking-tight"
                  autoFocus
                  placeholder="name@domain.com"
                />
                <Smartphone size={16} className="text-primary/10" />
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
                <button
                onClick={nextStep}
                className="h-15 w-full bg-primary text-white font-bold text-[14px] tracking-tight hover:shadow-2xl hover:shadow-primary/20 transition-all rounded-sm flex items-center justify-center gap-3"
                >
                Proceed
                <ArrowRight size={16} />
                </button>
                <button onClick={prevStep} className="text-[12px] font-bold text-primary/30 hover:text-primary transition-colors py-2 uppercase tracking-widest">Return</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-col gap-10"
          >
            <div className="group relative border-b border-primary/10 transition-colors focus-within:border-primary">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary/25 group-focus-within:text-[#E76F32] transition-colors">
                Verification Hub
              </label>
              <div className="flex items-center gap-4 py-3">
                 <input
                  type="text"
                  maxLength={6}
                  className="w-full bg-transparent text-[24px] font-black tracking-[0.4em] text-primary outline-none placeholder:text-primary/10"
                  autoFocus
                  placeholder="000 000"
                />
                <Shield size={20} className="text-[#E76F32]" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
                <button
                onClick={nextStep}
                className="h-15 w-full bg-primary text-white font-bold text-[14px] tracking-tight hover:shadow-2xl hover:shadow-primary/20 transition-all rounded-sm flex items-center justify-center gap-3"
                >
                Verify Identity
                <UserCheck size={16} />
                </button>
                <button onClick={prevStep} className="text-[12px] font-bold text-primary/30 hover:text-primary transition-colors py-2 uppercase tracking-widest">Resend Code</button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex flex-col gap-10"
          >
            <div className="group relative border-b border-primary/10 transition-colors focus-within:border-primary">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary/25 group-focus-within:text-[#E76F32] transition-colors">
                Full Display Name
              </label>
              <div className="flex items-center gap-3 py-3">
                 <input
                  type="text"
                  className="w-full bg-transparent text-[16px] font-bold text-primary outline-none placeholder:text-primary/10 tracking-tight"
                  autoFocus
                  placeholder="Frank Ride"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
               <button
                onClick={() => window.location.href = "/dashboard/driver"}
                className="h-15 w-full bg-primary text-white font-bold text-[14px] tracking-tight hover:shadow-2xl hover:shadow-primary/20 transition-all rounded-sm uppercase tracking-widest"
               >
                  Authorize Profile
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-16 pt-10 border-t border-primary/5">
        <p className="text-[13px] font-medium text-primary/40 tracking-tight">
          Already verified?{" "}
          <Link href="/login" className="text-primary font-bold hover:text-[#E76F32] transition-colors underline underline-offset-4 decoration-primary/10">
            Secure Sign-in
          </Link>
        </p>
      </div>
    </div>
  );
}
