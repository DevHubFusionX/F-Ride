"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Map as MapIcon } from "lucide-react";

// Sub-components
import SearchForm from "./SearchForm";
import FrequentDestinations from "./FrequentDestinations";
import SearchLoading from "./SearchLoading";
import BookingSummary from "./BookingSummary";

interface RiderTripPanelProps {
  onStateChange: (state: string) => void;
  dashboardState?: string;
  activeTrip?: any;
  matches?: any[];
  onSelectDriver?: (driver: any) => void;
  onViewMore?: (person: any) => void;
  onOpenMap?: () => void;
  onCreateTrip?: (destination: string) => void;
  activeTripHUD?: React.ReactNode;
}

export default function RiderTripPanel({ 
  onStateChange, 
  dashboardState = "idle", 
  activeTrip, 
  matches = [], 
  onSelectDriver, 
  onViewMore,
  onOpenMap,
  onCreateTrip,
  activeTripHUD
}: RiderTripPanelProps) {
  const [internalState, setInternalState] = useState("idle");
  const [destination, setDestination] = useState("");

  // Sync internal state with prop state
  useEffect(() => {
    if (dashboardState === "idle" || dashboardState === "searching") {
      setInternalState(dashboardState);
    } else if (dashboardState === "booked" || dashboardState === "ongoing") {
      setInternalState("booked");
    }
  }, [dashboardState]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination && onCreateTrip) {
      onCreateTrip(destination);
    } else {
      setInternalState("searching");
      onStateChange("searching");
    }
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
            View Live Route Map
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
          <div className="flex flex-col">
            <div className="mb-6 lg:mb-10 text-left">
               <h2 className="text-[24px] lg:text-[32px] font-bold text-slate-900 mb-2 leading-tight">Where to?</h2>
               <p className="text-[13px] lg:text-[15px] text-slate-500 font-medium">Access the shared vehicle network instantly.</p>
            </div>

            <SearchForm 
              destination={destination}
              onDestinationChange={setDestination}
              onSubmit={handleSearch}
            />
            
            <FrequentDestinations />
          </div>
        )}

        {internalState === "searching" && (
          <SearchLoading 
            destination={destination}
            matches={matches}
            onSelectDriver={onSelectDriver}
            onViewMore={onViewMore}
            onCancel={handleCancel}
          />
        )}

        {internalState === "booked" && activeTrip && (
          <BookingSummary 
            activeTrip={activeTrip}
            onCancel={handleCancel}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
