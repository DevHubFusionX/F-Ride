"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Smartphone, ShieldCheck, Mail, Loader2, Lock, Shield, Timer, Check } from "lucide-react";
import api, { wakeServer } from "@/lib/api/axios-client";
import { useAuth, type AuthUser } from "@/contexts/AuthContext";

/* ────────────────────────────────────────────────────────────── */
/* ─── Animation Config                                      ─── */
/* ────────────────────────────────────────────────────────────── */

const slideTransition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };
const slideIn = { opacity: 0, x: 20 };
const slideVisible = { opacity: 1, x: 0 };
const slideOut = { opacity: 0, x: -20 };

/* ────────────────────────────────────────────────────────────── */
/* ─── Component                                             ─── */
/* ────────────────────────────────────────────────────────────── */

export default function LoginForm() {
  const { login } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [flow, setFlow] = useState<"login" | "reset">("login");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const isEmail = identifier.includes("@");
  const contactField = isEmail ? "email" : "phone";

  /* ── Wake server on mount ── */
  useEffect(() => { wakeServer(); }, []);

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

  /* ── Step 1: Identifier Entry → Next ── */

  const handleIdentifierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;
    setStep(2);
  };

  /* ── Step 2: Password Verification → Trigger OTP ── */

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const { data } = await api.post("/auth/login", { 
        [contactField]: identifier,
        password 
      });

      if (data.requires2FA) {
        setTimer(60);
        setStep(3);
        setFlow("login");
      } else {
        // Direct successful login
        const { token, ...userData } = data;
        login(token, userData as AuthUser);
        window.location.href = `/dashboard/${userData.role || "rider"}`;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials. Please verify your password.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Forgot Password Request ── */
  const handleForgotPassword = async () => {
    setIsLoading(true);
    setError("");
    console.log("[ForgotPassword] identifier:", identifier, "contactField:", contactField);
    try {
      const res = await api.post("/auth/forgot-password", { [contactField]: identifier });
      console.log("[ForgotPassword] success:", res.data);
      setFlow("reset");
      setStep(3);
      setTimer(60);
    } catch (err: any) {
      console.error("[ForgotPassword] error:", err.response?.status, err.response?.data, err.message);
      setError(err.response?.data?.message || "Failed to initiate password reset.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Step 3: Verify OTP → Login OR Reset ── */

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) return;

    setIsLoading(true);
    setError("");

    if (flow === "reset") {
      if (!newPassword.trim()) {
        setError("Please provide a new secure password.");
        setIsLoading(false);
        return;
      }
      try {
        await api.post("/auth/reset-password", {
          [contactField]: identifier,
          otp,
          newPassword
        });
        setResetSuccess(true);
        setFlow("login");
        setStep(1);
        setIdentifier(""); // Reset form
        setPassword("");
        setNewPassword("");
        setOtp("");
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to reset password. Please check your code.");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    try {
      const { data } = await api.post("/auth/verify-otp", {
        [contactField]: identifier,
        otp,
      });

      const { token, ...userData } = data;
      login(token, userData as AuthUser);
      window.location.href = `/dashboard/${userData.role || "rider"}`;
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid or expired code.");
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
      if (flow === "reset") {
        await api.post("/auth/forgot-password", { [contactField]: identifier });
      } else {
        await api.post("/auth/login", { 
          [contactField]: identifier,
          password 
        });
      }
      setResendSuccess(true);
      setTimer(60);
      setTimeout(() => setResendSuccess(false), 5000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to resend code.");
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
          {step === 1 && "Welcome back."}
          {step === 2 && "Vault security."}
          {step === 3 && (flow === "reset" ? "Reset Sync." : "Verification.")}
        </h2>
        <p className="text-[14px] font-medium text-primary/40 leading-relaxed tracking-tight">
          {step === 1 && "Enter your credentials to access your global mobility network."}
          {step === 2 && "Authorize access with your secure network password."}
          {step === 3 && `We've sent a 6-digit access code to ${identifier}.`}
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
        {resetSuccess && (
          <p className="mt-4 text-[12px] font-bold text-green-600 bg-green-600/10 py-2 px-3 rounded-sm flex items-center gap-2">
            <Check size={12} />
            Password reset successful. Please sign in with your new credential.
          </p>
        )}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form
            key="step1"
            initial={slideIn}
            animate={slideVisible}
            exit={slideOut}
            transition={slideTransition}
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
                {isEmail ? (
                  <Mail size={16} className="text-primary/10" />
                ) : (
                  <Smartphone size={16} className="text-primary/10" />
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="h-15 w-full bg-primary text-white font-bold text-[14px] tracking-tight hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 rounded-sm flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          </motion.form>
        )}

        {step === 2 && (
          <motion.form
            key="step2"
            initial={slideIn}
            animate={slideVisible}
            exit={slideOut}
            transition={slideTransition}
            onSubmit={handlePasswordSubmit}
            className="flex flex-col gap-10"
          >
            <div className="group relative border-b border-primary/10 transition-colors focus-within:border-primary">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary/25 group-focus-within:text-[#E76F32] transition-colors">
                Network Password
              </label>
              <div className="flex items-center gap-3 py-3">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-[16px] font-bold text-primary outline-none placeholder:text-primary/10 tracking-tight"
                  autoFocus
                />
                <Lock size={16} className="text-primary/10" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="h-15 w-full bg-primary text-white font-bold text-[14px] tracking-tight hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 rounded-sm flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Verify Password"}
                {!isLoading && <Shield size={16} />}
              </button>
              
              <div className="flex items-center justify-between px-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[11px] font-bold text-primary/30 hover:text-primary transition-colors py-2 uppercase tracking-widest"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={isLoading}
                  className="text-[11px] font-bold text-[#E76F32]/60 hover:text-[#E76F32] transition-colors py-2 uppercase tracking-widest"
                >
                  {isLoading ? "Requesting..." : "Forgot Password?"}
                </button>
              </div>
            </div>
          </motion.form>
        )}

        {step === 3 && (
          <motion.form
            key="step3"
            initial={slideIn}
            animate={slideVisible}
            exit={slideOut}
            transition={slideTransition}
            onSubmit={handleOtpSubmit}
            className="flex flex-col gap-8"
          >
            <div className="group relative border-b border-primary/10 transition-colors focus-within:border-primary px-1">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary/25 group-focus-within:text-[#E76F32] transition-colors">
                Secure Entry Code
              </label>
              <div className="flex items-center gap-4 py-3">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000 000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-transparent text-[24px] font-black tracking-[0.4em] text-primary outline-none placeholder:text-primary/10 placeholder:tracking-normal"
                  autoFocus
                />
                <ShieldCheck size={20} className="text-[#E76F32]" />
              </div>
            </div>

            {flow === "reset" && (
              <div className="group relative border-b border-primary/10 transition-colors focus-within:border-primary px-1">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary/25 group-focus-within:text-[#E76F32] transition-colors">
                  Assign New Password
                </label>
                <div className="flex items-center gap-3 py-3">
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-transparent text-[16px] font-bold text-primary outline-none placeholder:text-primary/10 tracking-tight"
                  />
                  <Lock size={16} className="text-primary/10" />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="h-15 w-full bg-primary text-white font-bold text-[14px] tracking-tight hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 rounded-sm flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : (flow === "reset" ? "Reset Password" : "Sign In")}
              </button>
              <div className="flex flex-col gap-2">
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
                <button
                  type="button"
                  onClick={() => {
                    setStep(flow === "reset" ? 1 : 2);
                    setFlow("login");
                    setResetSuccess(false);
                  }}
                  className="text-[12px] font-bold text-primary/30 hover:text-primary transition-colors py-2 uppercase tracking-widest"
                >
                  {flow === "reset" ? "Cancel" : "Return to Password"}
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Footer link */}
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