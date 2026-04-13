"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const DriverMap = dynamic(() => import("@/components/dashboard/driver/DriverMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0A2540] animate-pulse" />,
});
import RideOfferPanel from "@/components/dashboard/driver/RideOfferPanel";
import RiderMatchCard from "@/components/dashboard/driver/RiderMatchCard";
import { AnimatePresence, motion } from "framer-motion";

const MOCK_RIDERS = [
  {
    name: "Alex Johnson",
    initials: "AJ",
    distance: "0.8 miles",
    overlap: "92%",
    pickup: "Your Current Location",
    dropoff: "Silicon Valley Tech Hub",
    color: "#2D9CDB",
  },
  {
    name: "Sarah Chen",
    initials: "SC",
    distance: "1.2 miles",
    overlap: "85%",
    pickup: "2 blocks away",
    dropoff: "Downtown Arts District",
    color: "#E76F32",
  },
];

export default function DriverDashboard() {
  const [dashboardState, setDashboardState] = useState("idle");
  const [showMatches, setShowMatches] = useState(false);

  // Simulate finding matches after a delay when in matching state
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (dashboardState === "matching") {
      timeout = setTimeout(() => {
        setShowMatches(true);
      }, 3000);
    } else {
      setShowMatches(false);
    }
    return () => clearTimeout(timeout);
  }, [dashboardState]);

  return (
    <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden">
      {/* ── Left Side: Interaction Panel ── */}
      <aside className="w-full lg:w-[420px] flex-shrink-0 h-auto lg:h-full border-b lg:border-b-0 lg:border-r border-primary/5 bg-white relative z-20 max-h-[50vh] lg:max-h-none overflow-y-auto">
        <RideOfferPanel onStateChange={setDashboardState} />
      </aside>

      {/* ── Main Content: Map + Matches ── */}
      <main className="relative flex-1 h-full bg-[#f8fafc] overflow-hidden">
        {/* Map Background */}
        <div className="absolute inset-0 z-0">
          <DriverMap matching={dashboardState === "matching"} />
        </div>

        {/* Floating Rider Matches (appear on map area) */}
        <div className="absolute top-4 right-4 lg:top-10 lg:right-10 w-[calc(100%-2rem)] max-w-[380px] z-40">
           <AnimatePresence>
              {showMatches && (
                 <div className="flex flex-col gap-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-2"
                    >
                       <p className="text-[11px] font-bold uppercase tracking-widest text-primary/30">Matches Found</p>
                    </motion.div>
                    {MOCK_RIDERS.map((rider) => (
                      <RiderMatchCard 
                        key={rider.name} 
                        rider={rider} 
                        onAccept={() => alert(`Ride with ${rider.name} accepted!`)}
                        onReject={() => console.log("Rejected")}
                        onViewMore={() => console.log(`View more for ${rider.name}`)}
                      />
                    ))}
                 </div>
              )}
           </AnimatePresence>
        </div>

        {/* Bottom map-vignette / status info (optional premium touch) */}
        <div className="absolute bottom-20 right-4 lg:bottom-10 lg:right-10 z-10">
           <div className="bg-primary px-4 py-3 lg:px-6 lg:py-4 rounded-xl shadow-2xl shadow-primary/20">
              <span className="text-[9px] lg:text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-1">Live Updates</span>
              <p className="text-[12px] lg:text-[13px] font-black text-white">9 Active Riders Nearby</p>
           </div>
        </div>

        {/* Zoom Controls (Uber-style visual) */}
        <div className="absolute bottom-20 left-4 lg:bottom-10 lg:left-10 z-10 flex flex-col gap-2">
            <button className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-lg shadow-xl border border-primary/5 flex items-center justify-center font-bold text-primary hover:bg-primary hover:text-white transition-all">+</button>
            <button className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-lg shadow-xl border border-primary/5 flex items-center justify-center font-bold text-primary hover:bg-primary hover:text-white transition-all">−</button>
        </div>
      </main>
    </div>
  );}

