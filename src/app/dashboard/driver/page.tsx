"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useTripContext } from "@/contexts/TripContext";
import RideOfferPanel from "@/components/dashboard/driver/RideOfferPanel";
import RiderMatchCard from "@/components/dashboard/driver/RiderMatchCard";
import ActiveTripHUD from "@/components/dashboard/driver/ActiveTripHUD";
import { AnimatePresence, motion } from "framer-motion";

const DriverMap = dynamic(() => import("@/components/dashboard/driver/DriverMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0A2540] animate-pulse" />,
});

import { useTrips } from "@/hooks/useTrips";

export default function DriverDashboard() {
  const {
    driverState, setDriverState,
    driverShowMatches, setDriverShowMatches,
    selectedPartner, setSelectedPartner,
    openHandshake, openCheckout, openCancel, openPersonModal,
    acceptRider, goOnline, goOffline,
  } = useTripContext();

  const { matches } = useTrips("driver");

  // Trigger match search when state changes to matching
  useEffect(() => {
    if (driverState === "matching") {
      matches.refetch().then(() => {
        setDriverShowMatches(true);
      });
    } else if (driverState === "idle") {
      setDriverShowMatches(false);
    }
  }, [driverState, matches.refetch, setDriverShowMatches]);

  const handleArrived = () => {
    openHandshake("driver", selectedPartner?.name || "Rider");
  };

  const currentMatches = matches.data?.data || [];

  return (
    <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden">
      {/* ── Left Side: Interaction Panel ── */}
      <aside className="w-full lg:w-[420px] flex-shrink-0 h-auto lg:h-full border-b lg:border-b-0 lg:border-r border-primary/5 bg-white relative z-20 max-h-[50vh] lg:max-h-none overflow-y-auto">
        <RideOfferPanel
          onStateChange={(state, destination) => {
            if (state === "matching" && destination) goOnline(destination);
            else if (state === "idle") goOffline();
            else setDriverState(state);
          }}
          dashboardState={driverState}
          activeTrip={selectedPartner}
          matches={driverState === "matching" ? currentMatches : []}
          onSelectRider={acceptRider}
          onViewMore={(person) => openPersonModal(person)}
          activeTripHUD={(driverState === "enroute" || driverState === "ongoing") && selectedPartner ? (
            <ActiveTripHUD
              rider={{
                name: selectedPartner.name,
                initials: selectedPartner.initials,
                pickup: selectedPartner.pickup,
                dropoff: selectedPartner.dropoff,
                color: selectedPartner.color,
                role: selectedPartner.role || "Rider",
              }}
              onCancel={() => openCancel("driver")}
              onArrived={handleArrived}
              onComplete={() => openCheckout("driver", selectedPartner.name, selectedPartner.price || "₦1,800")}
              status={driverState === "ongoing" ? "Passenger Onboard" : "En Route to Pickup"}
              tripState={driverState}
              variant="inline"
            />
          ) : null}
        />
      </aside>

      {/* ── Main Content: Map + Matches ── */}
      <main className="relative flex-1 h-full bg-[#f8fafc] overflow-hidden">
        {/* Map Background */}
        <div className="absolute inset-0 z-0">
          <DriverMap matching={driverState === "matching" || driverState === "enroute" || driverState === "ongoing"} />
        </div>

        {/* Floating Rider Matches (appear on map area) */}
        <div className="absolute top-4 right-4 lg:top-10 lg:right-10 w-[calc(100%-2rem)] max-w-[380px] z-40">
          <AnimatePresence>
            {driverShowMatches && driverState === "matching" && !matches.isLoading && (
              <div className="flex flex-col gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-2"
                >
                  <p className="text-[11px] font-bold uppercase tracking-widest text-primary/30">Matches Found</p>
                </motion.div>
                {currentMatches.map((rider) => (
                  <RiderMatchCard
                    key={rider.name}
                    rider={rider}
                    onAccept={() => acceptRider(rider)}
                    onReject={() => console.log("Rejected")}
                    onViewMore={() => openPersonModal(rider)}
                  />
                ))}
              </div>
            )}

            {matches.isLoading && driverState === "matching" && (
                <div className="flex flex-col gap-4">
                    <div className="w-full h-32 bg-white/80 animate-pulse rounded-xl border border-primary/5" />
                    <div className="w-full h-32 bg-white/80 animate-pulse rounded-xl border border-primary/5" />
                </div>
            )}
          </AnimatePresence>
        </div>

        {/* Active Trip HUD (Desktop floating on map) */}
        <AnimatePresence>
          {(driverState === "enroute" || driverState === "ongoing") && selectedPartner && (
            <ActiveTripHUD
              rider={{
                name: selectedPartner.name,
                initials: selectedPartner.initials,
                pickup: selectedPartner.pickup,
                dropoff: selectedPartner.dropoff,
                color: selectedPartner.color,
                role: selectedPartner.role || "Rider",
              }}
              onCancel={() => openCancel("driver")}
              onArrived={handleArrived}
              onComplete={() => openCheckout("driver", selectedPartner.name, selectedPartner.price || "₦1,800")}
              status={driverState === "ongoing" ? "Passenger Onboard" : "En Route to Pickup"}
              tripState={driverState}
            />
          )}
        </AnimatePresence>

        {/* Bottom map status info */}
        <div className="absolute bottom-20 right-4 lg:bottom-10 lg:right-10 z-10">
          <div className="bg-primary px-4 py-3 lg:px-6 lg:py-4 rounded-xl shadow-2xl shadow-primary/20">
            <span className="text-[9px] lg:text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-1">Live Updates</span>
            <p className="text-[12px] lg:text-[13px] font-black text-white">9 Active Riders Nearby</p>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-20 left-4 lg:bottom-10 lg:left-10 z-10 flex flex-col gap-2">
          <button className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-lg shadow-xl border border-primary/5 flex items-center justify-center font-bold text-primary hover:bg-primary hover:text-white transition-all">+</button>
          <button className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-lg shadow-xl border border-primary/5 flex items-center justify-center font-bold text-primary hover:bg-primary hover:text-white transition-all">−</button>
        </div>
      </main>
    </div>
  );
}
