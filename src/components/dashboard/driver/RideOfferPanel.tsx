"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Map as MapIcon } from "lucide-react";

// Sub-components
import DriverStats from "./DriverStats";
import DirectionInput from "./DirectionInput";
import WaitingForMatches from "./WaitingForMatches";
import ActiveOrderOverview from "./ActiveOrderOverview";

interface RideOfferPanelProps {
  onStateChange: (state: string) => void;
  dashboardState?: string;
  activeTrip?: any;
  matches?: any[];
  onSelectRider?: (rider: any) => void;
  onViewMore?: (person: any) => void;
  onOpenMap?: () => void;
  activeTripHUD?: React.ReactNode;
}

export default function RideOfferPanel({ 
  onStateChange, 
  dashboardState = "idle", 
  activeTrip, 
  matches = [], 
  onSelectRider, 
  onViewMore,
  onOpenMap,
  activeTripHUD
}: RideOfferPanelProps) {
  const [internalState, setInternalState] = useState("idle");
  const [destination, setDestination] = useState("");

  // Sync internal state with prop state
  useEffect(() => {
    if (dashboardState === "idle" || dashboardState === "offering" || dashboardState === "matching") {
      setInternalState(dashboardState);
    } else if (dashboardState === "enroute" || dashboardState === "ongoing") {
      setInternalState("trip");
    }
  }, [dashboardState]);

  const handleStartOffering = () => {
    setInternalState("offering");
    onStateChange("offering");
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setInternalState("matching");
    onStateChange("matching");
  };

  const handleCancel = () => {
    setInternalState("idle");
    onStateChange("idle");
  };

  return (
    <div className="h-full w-full bg-white border-r border-primary/5 flex flex-col p-5 lg:p-12 relative z-20 overflow-y-auto custom-scrollbar uppercase-none">
      {/* Mobile Map Access */}
      <div className="lg:hidden mb-6">
         <button 
           onClick={onOpenMap}
           className="w-full h-11 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center gap-2 text-[12px] font-bold text-slate-600 uppercase tracking-widest active:bg-slate-200 transition-colors"
         >
            <MapIcon size={16} />
            View Live Grid Map
         </button>
      </div>

      {/* Mobile Active HUD Integration */}
      {activeTripHUD && (
        <div className="lg:hidden mb-8">
           {activeTripHUD}
        </div>
      )}

      <AnimatePresence mode="wait">
        {internalState === "idle" && (
          <DriverStats onStartOffering={handleStartOffering} />
        )}

        {internalState === "offering" && (
          <div className="flex flex-col h-full">
            <div className="mb-6 lg:mb-10">
               <h3 className="text-[22px] lg:text-[28px] font-bold text-slate-900 mb-2">Publish Route</h3>
               <p className="text-[13px] lg:text-[14px] font-medium text-slate-500">We&apos;ll match you with riders sharing your direction.</p>
            </div>

            <DirectionInput 
              destination={destination}
              onDestinationChange={setDestination}
              onSubmit={handlePublish}
              onCancel={handleCancel}
            />
          </div>
        )}

        {internalState === "matching" && (
          <WaitingForMatches 
            destination={destination}
            matches={matches}
            onSelectRider={onSelectRider}
            onViewMore={onViewMore}
            onCancel={handleCancel}
          />
        )}

        {internalState === "trip" && activeTrip && (
          <ActiveOrderOverview 
            activeTrip={activeTrip}
            dashboardState={dashboardState}
            onCancel={handleCancel}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
