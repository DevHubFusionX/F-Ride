"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Search, X, Users, Clock, ArrowRight, Star, Map as MapIcon } from "lucide-react";
import RiderMatchCard from "../driver/RiderMatchCard";

interface RiderTripPanelProps {
  onStateChange: (state: string) => void;
  dashboardState?: string;
  activeTrip?: any;
  matches?: any[];
  onSelectDriver?: (driver: any) => void;
  onViewMore?: (person: any) => void;
  onOpenMap?: () => void;
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
  activeTripHUD
}: RiderTripPanelProps) {
  const [internalState, setInternalState] = useState("idle");
  const [destination, setDestination] = useState("");

  // Sync internal state with prop state
  React.useEffect(() => {
    if (dashboardState === "idle" || dashboardState === "searching") {
      setInternalState(dashboardState);
    } else if (dashboardState === "booked" || dashboardState === "ongoing") {
      setInternalState("booked");
    }
  }, [dashboardState]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setInternalState("searching");
    onStateChange("searching");
  };

  const handleCancel = () => {
    setInternalState("idle");
    onStateChange("idle");
  };

  return (
    <div className="h-full w-full bg-white border-r border-primary/5 flex flex-col p-5 lg:p-12 relative z-20 overflow-y-auto custom-scrollbar">
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
          <motion.div
            key="idle"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col"
          >
            <div className="mb-6 lg:mb-10 text-left">
               <h2 className="text-[24px] lg:text-[32px] font-bold text-slate-900 mb-2 leading-tight">Where to?</h2>
               <p className="text-[13px] lg:text-[15px] text-slate-500 font-medium">Access the shared vehicle network instantly.</p>
            </div>

            <form onSubmit={handleSearch} className="flex flex-col gap-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-4">
                 <div className="pt-2 flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm" />
                    <div className="w-0.5 h-12 bg-slate-200 my-1" />
                    <MapPin size={16} className="text-slate-400" />
                 </div>
                 <div className="flex-1 space-y-4">
                    <div>
                       <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 block">Current Pickup</label>
                       <p className="text-[15px] font-semibold text-slate-900">Your Current Location</p>
                    </div>
                    <div className="h-px bg-slate-200 w-full" />
                    <div>
                       <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 block focus-within:text-blue-600 transition-colors">Target Destination</label>
                       <div className="flex items-center gap-3">
                          <input
                            type="text"
                            placeholder="Enter drop-off destination..."
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full bg-transparent text-[15px] font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
                            autoFocus
                            required
                          />
                          <Search size={16} className="text-slate-400" />
                       </div>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 focus-within:border-blue-400 transition-colors">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">Passengers</label>
                  <div className="flex items-center justify-between">
                     <select className="flex-1 bg-transparent text-[14px] font-semibold text-slate-900 outline-none cursor-pointer appearance-none">
                        <option>1 Rider</option>
                        <option>2 Riders</option>
                        <option>3 Riders</option>
                     </select>
                     <Users size={16} className="text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 focus-within:border-blue-400 transition-colors">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">Schedule</label>
                  <div className="flex items-center justify-between">
                     <select className="flex-1 bg-transparent text-[14px] font-semibold text-slate-900 outline-none cursor-pointer appearance-none">
                        <option>Now</option>
                        <option>In 10m</option>
                        <option>Schedule</option>
                     </select>
                     <Clock size={16} className="text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[14px] rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 shadow-md"
              >
                Search Shared Rides
                <ArrowRight size={16} />
              </button>
            </form>
            
            <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-slate-100 flex flex-col gap-4">
                <span className="text-[11px] lg:text-[12px] font-semibold text-slate-400 tracking-wide">Frequent Destinations</span>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Silicon District Hub", area: "Downtown" },
                    { label: "Harbor Central Marina", area: "Port Area" }
                  ].map(f => (
                    <button key={f.label} className="w-full flex items-center justify-between group p-3 bg-white border border-slate-100 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all text-left">
                       <div>
                          <p className="text-[14px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{f.label}</p>
                          <p className="text-[12px] text-slate-500 mt-0.5">{f.area}</p>
                       </div>
                       <Navigation size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                    </button>
                  ))}
                </div>
            </div>
          </motion.div>
        )}

        {internalState === "searching" && (
          <motion.div
            key="searching"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col items-center text-center justify-center flex-1 py-12"
          >
            <div className="relative w-24 h-24 mb-8">
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute inset-0 rounded-full bg-blue-100"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center shadow-sm">
                     <Search size={24} className="text-blue-600 animate-pulse" />
                  </div>
               </div>
            </div>
            <h3 className="text-[24px] font-bold text-slate-900 mb-2">Finding capacity</h3>
            <p className="text-[15px] text-slate-500 font-medium leading-relaxed max-w-[280px]">
               Locating vehicles already traveling toward <span className="text-slate-900 font-semibold">{destination || "your destination"}</span>.
            </p>
            
            {/* Integrated Matches for Mobile */}
            {matches.length > 0 && (
              <div className="mt-8 lg:hidden w-full flex flex-col gap-3">
                 <div className="w-full flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Available Capacity Nearby</span>
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest animate-pulse">Searching...</span>
                 </div>
                 {matches.map((driver) => (
                   <RiderMatchCard 
                     key={driver.name}
                     rider={driver}
                     onAccept={() => onSelectDriver?.(driver)}
                     onViewMore={() => onViewMore?.(driver)}
                     onReject={() => console.log("Declined")}
                   />
                 ))}
              </div>
            )}

            <button
                onClick={handleCancel}
                className="mt-12 px-8 h-11 bg-slate-100 text-slate-600 font-semibold text-[14px] hover:bg-slate-200 transition-colors rounded-lg border border-slate-200"
            >
                Cancel Search
            </button>
          </motion.div>
        )}

        {internalState === "booked" && activeTrip && (
          <motion.div
            key="booked"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col h-full"
          >
            <div className="mb-6 lg:mb-8">
               <span className="text-[11px] lg:text-[12px] font-semibold text-emerald-600 uppercase tracking-wider mb-2 block">Booking Active</span>
               <h3 className="text-[22px] lg:text-[28px] font-bold tracking-tight text-slate-900 leading-none">Trip Synced.</h3>
            </div>

            <div className="space-y-6 flex-1">
               <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl text-blue-900 relative">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                     <div className="bg-white px-2 py-0.5 md:px-3 md:py-1 rounded-md border border-blue-200">
                        <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-wider text-blue-600">Driver En-Route</span>
                     </div>
                     <span className="text-[11px] md:text-[13px] font-bold text-emerald-700 uppercase tracking-widest">5 Mins Away</span>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                     <div className="w-10 h-10 rounded-lg bg-white border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0 mt-1">
                        <MapPin size={20} />
                     </div>
                     <div>
                        <p className="text-[10px] md:text-[11px] font-semibold text-blue-500 uppercase tracking-wider mb-1">Pickup Information</p>
                        <p className="text-[14px] md:text-[16px] font-bold text-blue-950 mb-0.5 truncate">{activeTrip.pickup}</p>
                        <p className="text-[12px] md:text-[13px] font-medium text-amber-600">Meet at Point Blue</p>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-3">
                   <div className="bg-slate-50 border border-slate-100 p-3 md:p-4 rounded-xl">
                      <p className="text-[10px] md:text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1 md:mb-1.5">Est. Fare</p>
                      <p className="text-[16px] md:text-[18px] font-bold text-slate-900">{activeTrip.price}</p>
                   </div>
                   <div className="bg-slate-50 border border-slate-100 p-3 md:p-4 rounded-xl">
                      <p className="text-[10px] md:text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1 md:mb-1.5">Emissions</p>
                      <p className="text-[16px] md:text-[18px] font-bold text-emerald-600">-75%</p>
                   </div>
               </div>
            </div>

            <div className="mt-auto pt-6">
               <button
                  onClick={handleCancel}
                  className="w-full h-12 bg-red-50 text-red-600 font-semibold text-[14px] hover:bg-red-100 transition-colors rounded-lg border border-red-100"
               >
                  Abort Trip
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
