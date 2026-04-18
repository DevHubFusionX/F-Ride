"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  UserCheck,
  Navigation,
  Car,
  Smartphone,
  ArrowRight,
  Shield,
  Mail,
  Loader2,
  Lock,
  Timer,
} from "lucide-react";
import api from "@/lib/api/axios-client";
import { useAuth, type AuthUser, type UserRole } from "@/contexts/AuthContext";

/* ────────────────────────────────────────────────────────────── */
/* ─── Animation Config                                      ─── */
/* ────────────────────────────────────────────────────────────── */

const slideTransition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };
const slideIn = { opacity: 0, x: 20 };
const slideVisible = { opacity: 1, x: 0 };
const slideOut = { opacity: 0, x: -20 };

/* ────────────────────────────────────────────────────────────── */
/* ─── Role Options                                          ─── */
/* ────────────────────────────────────────────────────────────── */

const ROLE_OPTIONS = [
  {
    id: "rider" as UserRole,
    title: "Rider",
    desc: "Find vehicles sharing your path.",
    icon: Navigation,
  },
  {
    id: "driver" as UserRole,
    title: "Driver",
    desc: "Share your empty vehicle capacity.",
    icon: Car,
  },
] as const;

/* ────────────────────────────────────────────────────────────── */
/* ─── Component                                             ─── */
/* ────────────────────────────────────────────────────────────── */

export default function RegisterForm() {
  const { login } = useAuth();

  /* ── Form state ── */
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [role, setRole] = useState<UserRole | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendSuccess, setResendSuccess] = useState(false);
  const [timer, setTimer] = useState(0);

  const isEmail = identifier.includes("@");
  const contactField = isEmail ? "email" : "phone";

  /* ── Timer Effect ── */
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  /* ── Step helpers ── */

  const nextStep = () => {
    setResendSuccess(false);
    setStep((s) => Math.min(s + 1, 4) as 1 | 2 | 3 | 4);
  };
  const prevStep = () => {
    setError("");
    setResendSuccess(false);
    setStep((s) => Math.max(s - 1, 1) as 1 | 2 | 3 | 4);
  };

  /* ── Step 1: Role Selection → Next ── */
  // Handled inline in button click

  /* ── Step 2: Name & Contact Info → Next ── */
  const handleIdentitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim() || !identifier.trim()) return;
    nextStep();
  };

  /* ── Step 3: Password → Register (Trigger OTP) ── */
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      await api.post("/auth/register", {
        name: displayName,
        [contactField]: identifier,
        role,
        password,
      });
      setTimer(60); // Start timer on initial trigger
      nextStep();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Step 4: OTP Verification → Login ── */
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const { data } = await api.post("/auth/verify-otp", {
        [contactField]: identifier,
        otp,
      });

      const { token, ...userData } = data;

      // Persist session via AuthContext
      login(token, userData as AuthUser);

      // Redirect to the role-specific dashboard
      window.location.href = `/dashboard/${userData.role || "rider"}`;
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr.response?.data?.message || "Invalid or expired verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Resend OTP ── */
  const handleResendOtp = async () => {
    if (timer > 0) return;
    setIsLoading(true);
    setError("");
    setResendSuccess(false);

    try {
      await api.post("/auth/register", {
        name: displayName,
        [contactField]: identifier,
        role,
        password,
      });
      setResendSuccess(true);
      setTimer(60); // Reset timer
      setTimeout(() => setResendSuccess(false), 5000);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr.response?.data?.message || "Failed to resend code.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Render ── */

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-[32px] font-bold tracking-[-0.04em] text-primary mb-3">
          {step === 1 && "Network Role."}
          {step === 2 && "Personal identity."}
          {step === 3 && "Vault security."}
          {step === 4 && "Verification code."}
        </h2>
        <p className="text-[14px] font-medium text-primary/40 leading-relaxed tracking-tight">
          {step === 1 && "Select your function within the FrankRide community."}
          {step === 2 && "Tell us who you are and how we can reach you."}
          {step === 3 && "Choose a strong password to protect your sync data."}
          {step === 4 && `Enter the secure access code sent to ${identifier}.`}
        </p>
        {error && (
          <p className="mt-4 text-[12px] font-bold text-red-500 bg-red-500/10 py-2 px-3 rounded-sm">
            {error}
          </p>
        )}
        {resendSuccess && (
          <p className="mt-4 text-[12px] font-bold text-green-500 bg-green-500/10 py-2 px-3 rounded-sm flex items-center gap-2">
            <Shield size={12} />
            Verification code resent successfully.
          </p>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* ── Step 1: Role Selection ── */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={slideIn}
            animate={slideVisible}
            exit={slideOut}
            transition={slideTransition}
            className="flex flex-col gap-4"
          >
            {ROLE_OPTIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setRole(r.id);
                  nextStep();
                }}
                className={`flex items-center gap-6 p-7 border transition-all text-left rounded-sm ${
                  role === r.id
                    ? "border-primary bg-primary/[0.02]"
                    : "border-primary/5 hover:border-primary/20 bg-white"
                }`}
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-sm ${
                    role === r.id
                      ? "bg-primary text-white"
                      : "bg-primary/5 text-primary/20"
                  }`}
                >
                  <r.icon size={20} />
                </div>
                <div>
                  <span className="text-[17px] font-bold text-primary mb-1 block tracking-tight">
                    {r.title}
                  </span>
                  <span className="text-[13px] font-medium text-primary/40 tracking-tight">
                    {r.desc}
                  </span>
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {/* ── Step 2: Identity (Name & Contact) ── */}
        {step === 2 && (
          <motion.form
            key="step2"
            initial={slideIn}
            animate={slideVisible}
            exit={slideOut}
            transition={slideTransition}
            onSubmit={handleIdentitySubmit}
            className="flex flex-col gap-8"
          >
            <div className="group relative border-b border-primary/10 transition-colors focus-within:border-primary">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary/25 group-focus-within:text-[#E76F32] transition-colors">
                Your Full Name
              </label>
              <div className="flex items-center gap-3 py-3">
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full bg-transparent text-[16px] font-bold text-primary outline-none placeholder:text-primary/10 tracking-tight"
                  autoFocus
                  placeholder="Frank Ride"
                  required
                />
              </div>
            </div>

            <div className="group relative border-b border-primary/10 transition-colors focus-within:border-primary">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary/25 group-focus-within:text-[#E76F32] transition-colors">
                Email or Mobile Identity
              </label>
              <div className="flex items-center gap-3 py-3">
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full bg-transparent text-[16px] font-bold text-primary outline-none placeholder:text-primary/10 tracking-tight"
                  placeholder="name@domain.com"
                  required
                />
                {isEmail ? (
                  <Mail size={16} className="text-primary/10" />
                ) : (
                  <Smartphone size={16} className="text-primary/10" />
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="h-15 w-full bg-primary text-white font-bold text-[14px] tracking-tight hover:shadow-2xl hover:shadow-primary/20 transition-all rounded-sm flex items-center justify-center gap-3"
              >
                Continue
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={prevStep}
                className="text-[12px] font-bold text-primary/30 hover:text-primary transition-colors py-2 uppercase tracking-widest"
              >
                Back
              </button>
            </div>
          </motion.form>
        )}

        {/* ── Step 3: Password Creation ── */}
        {step === 3 && (
          <motion.form
            key="step3"
            initial={slideIn}
            animate={slideVisible}
            exit={slideOut}
            transition={slideTransition}
            onSubmit={handlePasswordSubmit}
            className="flex flex-col gap-10"
          >
            <div className="group relative border-b border-primary/10 transition-colors focus-within:border-primary">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary/25 group-focus-within:text-[#E76F32] transition-colors">
                Set Secure Password
              </label>
              <div className="flex items-center gap-3 py-3">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-[16px] font-bold text-primary outline-none placeholder:text-primary/10 tracking-tight"
                  autoFocus
                  placeholder="••••••••"
                  required
                />
                <Lock size={16} className="text-primary/10" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="h-15 w-full bg-primary text-white font-bold text-[14px] tracking-tight hover:shadow-2xl hover:shadow-primary/20 transition-all rounded-sm flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Initiate Verification"}
                {!isLoading && <Shield size={16} />}
              </button>
              <button
                type="button"
                onClick={prevStep}
                className="text-[12px] font-bold text-primary/30 hover:text-primary transition-colors py-2 uppercase tracking-widest"
              >
                Previous Step
              </button>
            </div>
          </motion.form>
        )}

        {/* ── Step 4: OTP Verification ── */}
        {step === 4 && (
          <motion.form
            key="step4"
            initial={slideIn}
            animate={slideVisible}
            exit={slideOut}
            transition={slideTransition}
            onSubmit={handleOtpSubmit}
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
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-transparent text-[24px] font-black tracking-[0.4em] text-primary outline-none placeholder:text-primary/10"
                  autoFocus
                  placeholder="000 000"
                />
                <Shield size={20} className="text-[#E76F32]" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="h-15 w-full bg-primary text-white font-bold text-[14px] tracking-tight hover:shadow-2xl hover:shadow-primary/20 transition-all rounded-sm flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    Authorize Profile
                    <UserCheck size={16} />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isLoading || timer > 0}
                className="text-[12px] font-bold text-primary/30 hover:text-primary transition-colors py-2 uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {timer > 0 ? (
                  <>
                    <Timer size={12} className="animate-pulse" />
                    Retry in {timer}s
                  </>
                ) : (
                  "Resend Code"
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Footer link */}
      <div className="mt-16 pt-10 border-t border-primary/5">
        <p className="text-[13px] font-medium text-primary/40 tracking-tight">
          Already synced?{" "}
          <Link
            href="/login"
            className="text-primary font-bold hover:text-[#E76F32] transition-colors underline underline-offset-4 decoration-primary/10"
          >
            Enter Network
          </Link>
        </p>
      </div>
    </div>
  );
}
