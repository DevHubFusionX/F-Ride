"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Maximize2, Map as MapIcon, Package, ShieldCheck, Globe } from "lucide-react";

const DriverMap = dynamic(() => import("@/components/dashboard/driver/DriverMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0A2540] animate-pulse" />,
});
const MapModal = dynamic(() => import("@/components/dashboard/driver/MapModal"), {
  ssr: false,
});
import CourierPanel from "@/components/dashboard/courier/CourierPanel";
import CourierActiveTripHUD from "@/components/dashboard/courier/CourierActiveTripHUD";
import HandshakeModal from "@/components/modals/HandshakeModal";
import TripCheckoutModal from "@/components/modals/TripCheckoutModal";
import CancellationModal from "@/components/modals/CancellationModal";
import { AnimatePresence, motion } from "framer-motion";


export default function CourierDashboard() {
  const [dashboardState, setDashboardState] = useState("idle");
  const [trackingActive, setTrackingActive] = useState(false);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [isHandshakeOpen, setIsHandshakeOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [activePackage, setActivePackage] = useState<any>(null);

  // Simulate finding a courier and transitioning to live tracking via Handshake
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (dashboardState === "dispatching") {
      timeout = setTimeout(() => {
        setIsHandshakeOpen(true);
      }, 4000);
    } else if (dashboardState === "idle") {
      setTrackingActive(false);
      setActivePackage(null);
    }
    return () => clearTimeout(timeout);
  }, [dashboardState]);

  const handleVerificationComplete = () => {
    setIsHandshakeOpen(false);
    setActivePackage({
      id: "PKG-7729-FR",
      weight: "4.5kg",
      priority: "Express",
      fragile: true,
      pickup: "Downtown Hub A",
      destination: "Tech District B"
    });
    setTrackingActive(true);
    setDashboardState("tracking");
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden">
      {/* ── Main Content Area ── */}
      <main className="relative flex-1 h-full bg-[#f8fafc] overflow-hidden flex flex-col lg:flex-row">
        {/* Interaction Sidebar (Desktop) / Full Content (Mobile) */}
        <aside className="w-full lg:w-[420px] h-full bg-white border-r border-primary/5 flex flex-col pb-24 lg:pb-32 relative z-20 overflow-y-auto custom-scrollbar">
          <CourierPanel 
            onStateChange={setDashboardState} 
            dashboardState={dashboardState}
            activePackage={activePackage}
            onOpenMap={() => setIsMapFullscreen(true)}
            activeTripHUD={trackingActive && activePackage ? (
              <CourierActiveTripHUD 
                 packageInfo={activePackage}
                 courier={{ name: "John Smith", id: "C-992" }}
                 onAbort={() => setIsCancelOpen(true)}
                 onComplete={() => setIsCheckoutOpen(true)}
                 variant="inline"
              />
            ) : null}
          />
        </aside>

        {/* Live Map (Desktop only background, Mobile hidden by default) */}
        <div className="hidden lg:block relative flex-1 h-full overflow-hidden">
          <DriverMap matching={dashboardState === "dispatching" || trackingActive} />
          
          {/* Active Trip HUD (Desktop only) */}
          <AnimatePresence>
            {trackingActive && activePackage && (
              <CourierActiveTripHUD 
                 packageInfo={activePackage}
                 courier={{ name: "John Smith", id: "C-992" }}
                 onAbort={() => setIsCancelOpen(true)}
                 onComplete={() => setIsCheckoutOpen(true)}
              />
            )}
          </AnimatePresence>

          {/* Status Overlay (Desktop only) */}
          <div className="absolute bottom-10 right-10 z-10">
             <div className="bg-[#0A2540] px-6 py-4 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                   <Globe size={20} className="text-white/60" />
                </div>
                <div>
                   <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] block mb-1">Grid Status</span>
                   <p className="text-[14px] font-black text-white flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#32D74B]"></span>
                      420 Connected Nodes
                   </p>
                </div>
             </div>
          </div>
        </div>

        {/* Global Modals */}
        <HandshakeModal
          isOpen={isHandshakeOpen}
          onClose={() => setIsHandshakeOpen(false)}
          onVerify={handleVerificationComplete}
          role="courier"
          partnerName="John Smith"
        />
        
        <TripCheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onComplete={() => {
             setIsCheckoutOpen(false);
             setTrackingActive(false);
             setDashboardState("idle");
             setActivePackage(null);
          }}
          role="courier"
          partnerName="John Smith"
          fare="₦850"
        />
        
        <CancellationModal
          isOpen={isCancelOpen}
          onClose={() => setIsCancelOpen(false)}
          onConfirm={(reason) => {
             console.log("Trip cancelled due to:", reason);
             setIsCancelOpen(false);
             setDashboardState("idle");
             setTrackingActive(false);
             setActivePackage(null);
          }}
          role="courier"
        />

        {/* Fullscreen Map Modal (Global) */}
        <MapModal 
          isOpen={isMapFullscreen} 
          onClose={() => setIsMapFullscreen(false)}
          matching={dashboardState === "dispatching" || trackingActive}
        />
      </main>
    </div>
  );
}
