"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Only show splash once per browser session
    const hasSeenSplash = sessionStorage.getItem("fride_splash_shown");
    if (hasSeenSplash) {
      setIsLoading(false);
      return;
    }

    setShouldShow(true);
    sessionStorage.setItem("fride_splash_shown", "true");

    // Reduced from 2800ms → 2000ms for snappier UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-deep-blue overflow-hidden"
        >
          {/* Subtle animated background gradient glow */}
          <motion.div
            className="absolute inset-0 opacity-30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              background:
                "radial-gradient(circle at center, rgba(45,156,219,0.15) 0%, rgba(10,37,64,0) 70%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            <Logo isAnimated className="w-48 h-auto text-white md:w-64" />
          </div>

          {/* Custom refined loader line */}
          <motion.div
            className="absolute bottom-12 w-[120px] h-[1px] bg-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <motion.div
              className="h-full bg-brand-blue"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                delay: 1,
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
