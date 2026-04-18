"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { Globe } from "lucide-react";
import { useTripContext } from "@/contexts/TripContext";
import CourierPanel from "@/components/dashboard/courier/CourierPanel";
import CourierActiveTripHUD from "@/components/dashboard/courier/CourierActiveTripHUD";
import { AnimatePresence } from "framer-motion";

const DriverMap = dynamic(() => import("@/components/dashboard/driver/DriverMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0A2540] animate-pulse" />,
});

import { useTrips } from "@/hooks/useTrips";

export default function CourierDashboard() {
  const {
    courierState, setCourierState,
    courierTrackingActive,
    activePackage,
    openHandshake, openCheckout, openCancel, openMapFullscreen,
    dispatchCourier, resetRole,
  } = useTripContext();

  const { matches } = useTrips("courier");

  return (
    <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden">
      {/* ── Main Content Area ── */}
      <main className="relative flex-1 h-full bg-[#f8fafc] overflow-hidden flex flex-col lg:flex-row">
        {/* Interaction Sidebar (Desktop) / Full Content (Mobile) */}
        <aside className="w-full lg:w-[420px] h-full bg-white border-r border-primary/5 flex flex-col pb-24 lg:pb-32 relative z-20 overflow-y-auto custom-scrollbar">
          <CourierPanel
            onDispatch={dispatchCourier}
            onCancel={() => resetRole("courier")}
            dashboardState={courierState}
            activePackage={activePackage}
            onOpenMap={() => openMapFullscreen(courierState === "dispatching" || courierTrackingActive)}
            activeTripHUD={courierTrackingActive && activePackage ? (
              <CourierActiveTripHUD
                packageInfo={activePackage}
                courier={{ name: "John Smith", id: "C-992" }}
                onAbort={() => openCancel("courier")}
                onComplete={() => openCheckout("courier", "John Smith", "₦850")}
                variant="inline"
              />
            ) : null}
          />
        </aside>

        {/* Live Map (Desktop only background, Mobile hidden by default) */}
        <div className="hidden lg:block relative flex-1 h-full overflow-hidden">
          <DriverMap matching={courierState === "dispatching" || courierTrackingActive} />

          {/* Active Trip HUD (Desktop only) */}
          <AnimatePresence>
            {courierTrackingActive && activePackage && (
              <CourierActiveTripHUD
                packageInfo={activePackage}
                courier={{ name: "John Smith", id: "C-992" }}
                onAbort={() => openCancel("courier")}
                onComplete={() => openCheckout("courier", "John Smith", "₦850")}
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
      </main>
    </div>
  );
}
