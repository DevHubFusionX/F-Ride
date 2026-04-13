"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, Activity, Search, X, ChevronDown, CheckCircle2, Map as MapIcon, Send, Radar, Star, Info, ShieldCheck } from "lucide-react";
import RiderMatchCard from "./RiderMatchCard";

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
  React.useEffect(() => {
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
    <div className="h-full w-full bg-white border-r border-primary/5 flex flex-col p-5 lg:p-12 relative z-20 overflow-y-auto custom-scrollbar">
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
          <motion.div
            key="idle"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col"
          >
            <div className="mb-6 lg:mb-10">
               <h2 className="text-[24px] lg:text-[32px] font-bold text-slate-900 mb-2 leading-tight">Welcome, Frank.</h2>
               <p className="text-[13px] lg:text-[15px] font-medium text-slate-500">Active network status: <span className="text-amber-600 font-semibold tracking-wide ml-1">High Demand</span></p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-4 mb-6 lg:mb-8">
               <div className="bg-slate-50 p-4 lg:p-6 border border-slate-200 rounded-xl hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-2 mb-2 text-slate-400">
                     <Activity size={16} />
                     <span className="text-[11px] font-semibold uppercase tracking-wider">Revenue Status</span>
                  </div>
                   <p className="text-[22px] lg:text-[28px] font-bold text-slate-900">₦142.50</p>
               </div>
               <div className="bg-slate-50 p-4 lg:p-6 border border-slate-200 rounded-xl hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-2 mb-2 text-slate-400">
                     <Users size={16} />
                     <span className="text-[11px] font-semibold uppercase tracking-wider">Shared Reach</span>
                  </div>
                   <p className="text-[22px] lg:text-[28px] font-bold text-slate-900">12 <span className="text-[13px] lg:text-[15px] font-medium text-slate-500 ml-1">matched</span></p>
               </div>
            </div>

            <button
              onClick={handleStartOffering}
              className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[14px] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              Offer a Ride
              <CheckCircle2 size={18} className="fill-current" />
            </button>
          </motion.div>
        )}

        {internalState === "offering" && (
          <motion.div
            key="offering"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col h-full"
          >
            <div className="mb-6 lg:mb-10">
               <h3 className="text-[22px] lg:text-[28px] font-bold text-slate-900 mb-2">Publish Route</h3>
               <p className="text-[13px] lg:text-[14px] font-medium text-slate-500">We&apos;ll match you with riders sharing your direction.</p>
            </div>

            <form onSubmit={handlePublish} className="flex flex-col gap-8">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-4">
                 <div className="pt-2 flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm" />
                    <div className="w-0.5 h-12 bg-slate-200 my-1" />
                    <MapPin size={16} className="text-slate-400" />
                 </div>
                 <div className="flex-1 space-y-4">
                    <div>
                       <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 block">Current Origin</label>
                       <p className="text-[15px] font-semibold text-slate-900">Downtown Core, Block A</p>
                    </div>
                    <div className="h-px bg-slate-200 w-full" />
                    <div>
                       <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 block focus-within:text-blue-600 transition-colors">Target Destination</label>
                       <div className="flex items-center gap-3">
                          <input
                            type="text"
                            placeholder="Enter drop-off hub..."
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full bg-transparent text-[15px] font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
                            autoFocus
                          />
                          <Search size={16} className="text-slate-400" />
                       </div>
                    </div>
                 </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 focus-within:border-blue-400 transition-colors">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">Available Slots</label>
                  <div className="flex items-center justify-between">
                     <select className="flex-1 bg-transparent text-[14px] font-semibold text-slate-900 outline-none cursor-pointer appearance-none">
                        <option>3 Seats</option>
                        <option>2 Seats</option>
                        <option>1 Seat</option>
                     </select>
                     <Users size={16} className="text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 focus-within:border-blue-400 transition-colors">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">Time Window</label>
                  <div className="flex items-center justify-between">
                     <select className="flex-1 bg-transparent text-[14px] font-semibold text-slate-900 outline-none cursor-pointer appearance-none">
                        <option>Immediate</option>
                        <option>Within 10m</option>
                        <option>Within 20m</option>
                     </select>
                     <ChevronDown size={16} className="text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-6">
                <button
                  type="submit"
                  className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[14px] rounded-lg transition-colors shadow-md"
                >
                  Confirm & Sync Route
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full h-12 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-semibold text-[14px] flex flex-col items-center justify-center gap-2 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-2">
                     <X size={16} className="group-hover:text-red-500 transition-colors" />
                     Abort Offer
                  </div>
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {internalState === "matching" && (
          <motion.div
            key="matching"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col items-center text-center justify-center flex-1 py-12"
          >
            <div className="relative w-24 h-24 mb-8">
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute inset-0 rounded-full bg-amber-100"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-amber-50 border border-amber-100 rounded-full flex items-center justify-center shadow-sm">
                     <Radar size={24} className="text-blue-500 animate-[pulse_2s_infinite]" />
                  </div>
               </div>
            </div>
            <h3 className="text-[24px] font-bold text-slate-900 mb-2">Route Sync active</h3>
            <p className="text-[15px] text-slate-500 font-medium leading-relaxed max-w-[280px]">
               Searching the urban grid for riders heading toward <span className="text-slate-900 font-semibold">{destination || "your hub"}</span>.
            </p>
            
            {/* Integrated Matches for Mobile */}
            {matches.length > 0 && (
              <div className="mt-8 lg:hidden w-full flex flex-col gap-3">
                 <div className="w-full flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Rider Matches</span>
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest animate-pulse">Searching...</span>
                 </div>
                 {matches.map((rider) => (
                   <RiderMatchCard 
                     key={rider.name}
                     rider={rider}
                     onAccept={() => onSelectRider?.(rider)}
                     onViewMore={() => onViewMore?.(rider)}
                     onReject={() => {}}
                   />
                 ))}
              </div>
            )}

            <button
                onClick={handleCancel}
                className="mt-12 px-8 h-11 bg-slate-100 text-slate-600 font-semibold text-[14px] hover:bg-slate-200 transition-colors rounded-lg border border-slate-200"
            >
                Stop Synchronizing
            </button>
          </motion.div>
        )}

        {internalState === "trip" && activeTrip && (
          <motion.div
            key="trip"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col h-full"
          >
            <div className="mb-8">
               <span className="text-[12px] font-semibold text-blue-600 uppercase tracking-wider mb-2 block">Active Session</span>
               <h3 className="text-[28px] font-bold tracking-tight text-slate-900 leading-none">Trip in Progress.</h3>
            </div>

            <div className="space-y-6 flex-1">
               <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl text-blue-900 relative">
                  <div className="flex items-center justify-between mb-6">
                     <div className="bg-white px-3 py-1 rounded-md border border-blue-200">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">Phase 01</span>
                     </div>
                     <span className="text-[13px] font-bold text-emerald-700 uppercase tracking-widest">{dashboardState === 'ongoing' ? 'En Route' : 'Pickup Pending'}</span>
                  </div>
                  
                  <div className="space-y-5">
                     <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-lg bg-white border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0">
                           <MapPin size={20} />
                        </div>
                        <div>
                           <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-wider mb-1">Pickup Point</p>
                           <p className="text-[15px] font-bold text-blue-950">{activeTrip.pickup}</p>
                        </div>
                     </div>
                     
                     <div className="pl-5 border-l-2 border-blue-200 ml-5 h-4 -my-2" />
                     
                     <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
                           <CheckCircle2 size={20} />
                        </div>
                        <div>
                           <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-wider mb-1">Destination</p>
                           <p className="text-[15px] font-bold text-blue-950">{activeTrip.dropoff}</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                     <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1.5">Est. Fare</p>
                     <p className="text-[18px] font-bold text-slate-900">{activeTrip.price}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                     <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1.5">Shared Fuel</p>
                     <p className="text-[18px] font-bold text-emerald-600">-45%</p>
                  </div>
               </div>
            </div>

            <div className="mt-auto pt-6">
               <button
                  onClick={handleCancel}
                  className="w-full h-12 bg-red-50 text-red-600 font-semibold text-[14px] hover:bg-red-100 transition-colors rounded-lg border border-red-100"
               >
                  Emergency Cancel
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
