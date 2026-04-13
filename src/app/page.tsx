"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import TrustSafety from "@/components/home/TrustSafety";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/home/Footer";

const LiveMap = dynamic(() => import("@/components/home/LiveMap"), {
  ssr: false,
  loading: () => (
    <div className="relative bg-[#0A2540] py-40 overflow-hidden flex items-center justify-center min-h-[600px]">
       <div className="text-white/20 animate-pulse font-mono tracking-widest uppercase text-sm">Initializing Map Engine...</div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen font-sans text-deep-blue selection:bg-accent/20 overflow-hidden">
      <Hero />
      <HowItWorks />
      <LiveMap />
      <TrustSafety />
      <CTASection />
      <Footer />
    </main>
  );
}
