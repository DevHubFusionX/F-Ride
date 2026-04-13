"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageSquare, Navigation, X, ShieldCheck, MapPin, Search } from "lucide-react";

interface RiderActiveTripHUDProps {
  driver: {
    name: string;
    initials: string;
    color: string;
    vehicle?: {
      model: string;
      color: string;
      plate: string;
    };
    pickup?: string;
  };
  variant?: "floating" | "inline";
  className?: string;
  status?: string;
  onCancel: () => void;
  onRequestStop: () => void;
  onShowPIN?: () => void;
}

export default function RiderActiveTripHUD({ 
  driver, 
  onCancel, 
  onRequestStop, 
  onShowPIN,
  status = "Driver is En-Route",
  variant = "floating",
  className = ""
}: RiderActiveTripHUDProps) {
  const containerClasses = variant === "floating"
    ? "absolute bottom-10 md:bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-auto md:min-w-[500px] z-50"
    : "relative w-full";

  return (
    <motion.div
      initial={variant === "floating" ? { opacity: 0, y: 50 } : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={variant === "floating" ? { opacity: 0, y: 50 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`${containerClasses} ${className}`}
    >
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Driver & Vehicle Info */}
        <div className="flex-1 p-4 md:p-6 flex flex-row items-center gap-3 md:gap-5 border-b md:border-b-0 md:border-r border-slate-100 bg-white">
           <div 
             className="w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center text-[14px] md:text-[20px] font-bold text-white shadow-sm ring-2 ring-white"
             style={{ backgroundColor: driver.color }}
           >
             {driver.initials}
           </div>
           
           <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-[14px] md:text-[18px] font-bold text-slate-900 leading-none truncate">{driver.name}</h4>
                  <ShieldCheck size={16} className="text-emerald-500 flex-shrink-0" />
              </div>
               <p className="text-[10px] md:text-[12px] font-semibold text-emerald-600 mb-2 flex items-center gap-1.5 flex-wrap">
                 <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                 </span>
                 {status}
              </p>
               <div className="flex flex-col gap-1 md:gap-1.5">
                  <p className="text-[11px] md:text-[13px] font-medium text-slate-600 truncate">{driver.vehicle?.color} {driver.vehicle?.model} &bull; <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">{driver.vehicle?.plate}</span></p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-blue-600 text-[11px] md:text-[13px] font-medium">
                       <MapPin size={12} className="md:w-[14px] md:h-[14px]" /> <span className="truncate">Meet at {driver.pickup || "Main Lobby"}</span>
                    </div>
                    {status.includes("Arrived") || status.includes("En-Route") ? (
                      <button 
                        onClick={onShowPIN}
                        className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-100 hover:bg-amber-100 transition-colors animate-pulse"
                      >
                        <ShieldCheck size={12} />
                        <span className="text-[10px] md:text-[11px] font-bold tracking-wider">PIN: 4815</span>
                      </button>
                    ) : null}
                  </div>
               </div>
           </div>
        </div>

        {/* Right Side: Actions */}
        <div className="p-3 md:p-6 bg-slate-50 flex flex-col gap-2 md:gap-3">
           <div className="flex items-center gap-2 w-full justify-center">
               <button className="flex-1 h-10 md:h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm">
                  <MessageSquare size={16} className="md:w-[18px] md:h-[18px]" />
               </button>
               <button className="flex-1 h-10 md:h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm">
                  <Phone size={16} className="md:w-[18px] md:h-[18px]" />
               </button>
               <button className="flex-1 h-10 md:h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm">
                  <Search size={16} className="md:w-[18px] md:h-[18px]" />
               </button>
           </div>
                      <button
              onClick={onRequestStop}
              className="w-full h-10 md:h-12 bg-slate-900 text-white font-semibold text-[13px] md:text-[14px] rounded-lg shadow-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
             Request Drop-off
           </button>

           <button
             onClick={onCancel}
             className="w-full h-10 mt-1 bg-red-50 text-red-600 hover:bg-red-100 transition-colors rounded-lg flex items-center justify-center text-[13px] font-semibold"
           >
             Cancel Trip
           </button>
        </div>
      </div>
    </motion.div>
  );
}
