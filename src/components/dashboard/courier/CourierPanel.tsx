"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, MapPin, Truck, ChevronRight, Weight, Box, Info, Map as MapIcon } from "lucide-react";

interface CourierPanelProps {
  onStateChange: (state: string) => void;
  dashboardState?: string;
  activePackage?: any;
  onOpenMap?: () => void;
  activeTripHUD?: React.ReactNode;
}

export default function CourierPanel({ 
  onStateChange, 
  dashboardState = "idle", 
  activePackage, 
  onOpenMap,
  activeTripHUD
}: CourierPanelProps) {
  const [internalState, setInternalState] = useState("idle");
  const [packageSize, setPackageSize] = useState("Standard");

  // Sync internal state with prop state
  React.useEffect(() => {
    if (dashboardState === "idle" || dashboardState === "dispatching") {
      setInternalState(dashboardState);
    } else if (dashboardState === "tracking" || (dashboardState === "dispatching" && activePackage)) {
      setInternalState("tracking");
    }
  }, [dashboardState, activePackage]);

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    setInternalState("dispatching");
    onStateChange("dispatching");
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
            View Logistics Map
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
               <h2 className="text-[24px] lg:text-[32px] font-bold text-slate-900 mb-2 leading-tight">Courier</h2>
               <p className="text-[13px] lg:text-[15px] font-medium text-slate-500">Utilize shared vehicle capacity to move your items.</p>
            </div>

            <form onSubmit={handleDispatch} className="flex flex-col gap-8">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-4">
                 <div className="pt-2 flex flex-col items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm" />
                    <div className="w-0.5 h-12 bg-slate-200 my-1" />
                    <MapPin size={16} className="text-slate-400" />
                 </div>
                 <div className="flex-1 space-y-4">
                    <div>
                       <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 block focus-within:text-blue-600 transition-colors">Pickup Point</label>
                       <input
                         type="text"
                         placeholder="Enter pickup location..."
                         className="w-full bg-transparent text-[15px] font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
                         autoFocus
                         required
                       />
                    </div>
                    <div className="h-px bg-slate-200 w-full" />
                    <div>
                       <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 block focus-within:text-blue-600 transition-colors">Drop-off Destination</label>
                       <input
                         type="text"
                         placeholder="Enter package destination..."
                         className="w-full bg-transparent text-[15px] font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
                         required
                       />
                    </div>
                 </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block ml-1">Package Size</label>
                <div className="grid grid-cols-3 gap-3">
                   {["Small", "Standard", "Large"].map((size) => (
                     <button
                       key={size}
                       type="button"
                       onClick={() => setPackageSize(size)}
                       className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all gap-1.5 ${
                         packageSize === size ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm" : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                       }`}
                     >
                       <Box size={18} />
                       <span className="text-[12px] font-semibold">{size}</span>
                     </button>
                   ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 focus-within:border-blue-400 transition-colors">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">Weight</label>
                  <div className="flex items-center justify-between">
                     <select className="flex-1 bg-transparent text-[14px] font-semibold text-slate-900 outline-none cursor-pointer appearance-none">
                        <option>&lt; 2kg</option>
                        <option>2 - 5kg</option>
                        <option>5 - 10kg</option>
                     </select>
                     <Weight size={16} className="text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 focus-within:border-blue-400 transition-colors">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">Priority</label>
                  <div className="flex items-center justify-between">
                     <select className="flex-1 bg-transparent text-[14px] font-semibold text-slate-900 outline-none cursor-pointer appearance-none">
                        <option>Standard</option>
                        <option>Express</option>
                        <option>Eco</option>
                     </select>
                     <ChevronRight size={16} className="text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[14px] rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 shadow-md"
              >
                Dispatch Courier
                <Truck size={16} />
              </button>
            </form>
            
            <div className="mt-6 lg:mt-8 bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
                <div className="pt-0.5 text-blue-600 flex-shrink-0">
                   <Info size={16} />
                </div>
                <p className="text-[12px] lg:text-[13px] font-medium text-blue-900 leading-relaxed">
                   Your package will be moved by a FrankRide driver already traveling on your route, ensuring 70% lower emissions and cost.
                </p>
            </div>
          </motion.div>
        )}

        {internalState === "dispatching" && (
          <motion.div
            key="dispatching"
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
                     <Package size={24} className="text-blue-600 animate-pulse" />
                  </div>
               </div>
            </div>
            <h3 className="text-[24px] font-bold text-slate-900 mb-2">Requesting capacity</h3>
            <p className="text-[15px] text-slate-500 font-medium leading-relaxed max-w-[280px]">
               Syncing your package with vehicles currently en-route to your destination.
            </p>
            
            <button
                onClick={handleCancel}
                className="mt-12 px-8 h-11 bg-slate-100 text-slate-600 font-semibold text-[14px] hover:bg-slate-200 transition-colors rounded-lg border border-slate-200"
            >
                Abort Dispatch
            </button>
          </motion.div>
        )}
        {internalState === "tracking" && activePackage && (
          <motion.div
            key="tracking"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col h-full"
          >
            <div className="mb-6 lg:mb-8">
               <span className="text-[11px] lg:text-[12px] font-semibold text-emerald-600 uppercase tracking-wider mb-2 block">Manifest Active</span>
               <h3 className="text-[22px] lg:text-[28px] font-bold tracking-tight text-slate-900 leading-none">In Transit.</h3>
            </div>

            <div className="space-y-6 flex-1">
               <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl text-emerald-900 relative">
                  <div className="flex items-center justify-between mb-6">
                     <div className="bg-white px-3 py-1 rounded-md border border-emerald-200">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">Logistics Node</span>
                     </div>
                     <span className="text-[13px] font-bold text-emerald-700 uppercase tracking-widest">{activePackage.id}</span>
                  </div>
                  
                  <div className="space-y-5">
                     <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-lg bg-white border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
                           <MapPin size={20} />
                        </div>
                        <div>
                           <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider mb-1">Manifest Origin</p>
                           <p className="text-[15px] font-bold text-emerald-950">{activePackage.pickup}</p>
                        </div>
                     </div>
                     
                     <div className="pl-5 border-l-2 border-emerald-200 ml-5 h-4 -my-2" />

                     <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-lg bg-white border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
                           <Truck size={20} />
                        </div>
                        <div>
                           <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider mb-1">Target Endpoint</p>
                           <p className="text-[15px] font-bold text-emerald-950">{activePackage.destination}</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                     <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1.5">Priority</p>
                     <p className="text-[16px] font-bold text-slate-900">{activePackage.priority}</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                     <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1.5">Est. Delivery</p>
                     <p className="text-[16px] font-bold text-slate-900">14:20 PM</p>
                  </div>
               </div>
            </div>

            <div className="mt-auto pt-6">
               <button
                  onClick={handleCancel}
                  className="w-full h-12 bg-red-50 text-red-600 font-semibold text-[14px] hover:bg-red-100 transition-colors rounded-lg border border-red-100"
               >
                  Emergency Abort
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
