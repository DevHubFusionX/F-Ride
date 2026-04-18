"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useTripContext } from "@/contexts/TripContext";
import RiderTripPanel from "@/components/dashboard/rider/RiderTripPanel";
import RiderMatchCard from "@/components/dashboard/driver/RiderMatchCard";
import RiderActiveTripHUD from "@/components/dashboard/rider/RiderActiveTripHUD";
import { AnimatePresence } from "framer-motion";

const DriverMap = dynamic(() => import("@/components/dashboard/driver/DriverMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0A2540] animate-pulse" />,
});

import { useTrips } from "@/hooks/useTrips";

export default function RiderDashboard() {
  const {
    riderState, setRiderState,
    riderShowDrivers, setRiderShowDrivers,
    selectedPartner, setSelectedPartner,
    openHandshake, openCheckout, openCancel, openMapFullscreen, openPersonModal,
    createTrip, bookPartner,
  } = useTripContext();

  const { matches } = useTrips("rider");

  // Trigger match search when state changes to searching
  useEffect(() => {
    if (riderState === "searching") {
      matches.refetch().then(() => {
        setRiderShowDrivers(true);
      });
    } else if (riderState === "idle") {
      setRiderShowDrivers(false);
    }
  }, [riderState, matches.refetch, setRiderShowDrivers]);

  const currentMatches = matches.data?.data || [];

  return (
    <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden">
      {/* ── Main Content Area ── */}
      <main className="relative flex-1 h-full bg-[#f8fafc] overflow-hidden flex flex-col lg:flex-row">
        {/* Interaction Sidebar (Desktop) / Full Content (Mobile) */}
        <aside className="w-full lg:w-[420px] h-full bg-white border-r border-primary/5 flex flex-col pb-24 lg:pb-32 relative z-20 overflow-y-auto custom-scrollbar">
          <RiderTripPanel
            onStateChange={setRiderState}
            onCreateTrip={(dest) => createTrip("Current Location", dest)}
            dashboardState={riderState}
            activeTrip={selectedPartner}
            matches={riderState === "searching" ? currentMatches : []}
            onSelectDriver={bookPartner}
            onViewMore={(driver) => openPersonModal(driver)}
            onOpenMap={() => openMapFullscreen(riderState === "searching" || riderState === "booked")}
            activeTripHUD={(riderState === "booked" || riderState === "ongoing") && selectedPartner ? (
              <RiderActiveTripHUD
                driver={selectedPartner}
                onCancel={() => openCancel("rider")}
                onRequestStop={() => openCheckout("rider", selectedPartner.name, selectedPartner.price || "₦2,400")}
                status={riderState === "booked" ? "Driver is En-Route" : "On the way"}
                variant="inline"
              />
            ) : null}
          />
        </aside>

        {/* Live Map (Desktop only background, Mobile hidden by default) */}
        <div className="hidden lg:block relative flex-1 h-full overflow-hidden">
          <DriverMap matching={riderState === "searching" || riderState === "booked"} />

          {/* Floating Driver Matches (Desktop only) */}
          <AnimatePresence>
            {riderShowDrivers && riderState === "searching" && !matches.isLoading && (
              <div className="absolute top-12 left-12 z-20 flex flex-col gap-4 pointer-events-none">
                {currentMatches.map((driver) => (
                  <RiderMatchCard
                    key={driver.name}
                    rider={driver}
                    onAccept={() => bookPartner(driver)}
                    onReject={() => console.log("Rejected")}
                    onViewMore={() => openPersonModal(driver)}
                  />
                ))}
              </div>
            )}
            
            {matches.isLoading && riderState === "searching" && (
                <div className="absolute top-12 left-12 z-20 flex flex-col gap-4">
                    <div className="w-[320px] h-32 bg-white/80 animate-pulse rounded-xl border border-primary/5" />
                    <div className="w-[320px] h-32 bg-white/80 animate-pulse rounded-xl border border-primary/5" />
                </div>
            )}
          </AnimatePresence>

          {/* Active Trip HUD (Desktop only) */}
          <AnimatePresence>
            {(riderState === "booked" || riderState === "ongoing") && selectedPartner && (
              <RiderActiveTripHUD
                driver={selectedPartner}
                onCancel={() => openCancel("rider")}
                onRequestStop={() => openCheckout("rider", selectedPartner.name, selectedPartner.price || "₦2,400")}
                status={riderState === "booked" ? "Driver is En-Route" : "On the way"}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
