"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageSquare, Navigation, X, ShieldCheck, MapPin } from "lucide-react";

interface ActiveTripHUDProps {
  rider: {
    name: string;
    initials: string;
    pickup: string;
    dropoff: string;
    color: string;
    role: string;
  };
  onCancel: () => void;
  onArrived: () => void;
  onComplete?: () => void;
  status?: string;
  variant?: "floating" | "inline";
  className?: string;
  tripState?: string;
}

export default function ActiveTripHUD({ 
  rider, 
  onCancel, 
  onArrived, 
  onComplete, 
  status = "En Route to Pickup",
  variant = "floating",
  className = "",
  tripState = "enroute"
}: ActiveTripHUDProps) {
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
        
        {/* Left Side: Rider Info & Status */}
        <div className="flex-[1.5] p-4 md:p-6 flex flex-row items-center gap-3 md:gap-5 border-b md:border-b-0 md:border-r border-slate-100 bg-white">
           <div 
             className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-[14px] md:text-[18px] font-bold text-white shadow-sm ring-1 ring-white/50 flex-shrink-0"
             style={{ backgroundColor: rider.color }}
           >
             {rider.initials}
           </div>
           
           <div className="flex-1 w-full">
              <div className="flex items-center gap-2 mb-1">
                 <h4 className="text-[14px] md:text-[16px] font-bold text-slate-900 leading-none truncate">{rider.name}</h4>
                 <ShieldCheck size={16} className="text-emerald-500 flex-shrink-0" />
                 <span className="ml-auto sm:ml-2 text-[10px] md:text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 md:px-2.5 py-0.5 rounded-md border border-emerald-100/50 whitespace-nowrap">
                   {rider.role || "Rider"}
                 </span>
              </div>
              
              <p className="text-[13px] font-semibold text-amber-600 mb-2 flex items-center gap-1.5 flex-wrap">
                 <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                 </span>
                 {status}
              </p>
              
              <div className="flex items-center gap-1.5 text-slate-600 text-[13px] font-medium bg-slate-50 px-2 py-1 rounded inline-flex">
                 <MapPin size={14} className="text-slate-400" />
                 <span className="truncate">{rider.pickup}</span>
              </div>
           </div>
        </div>

        {/* Right Side: Quick Actions */}
        <div className="flex-1 p-3 md:p-6 bg-slate-50 flex flex-col gap-2 md:gap-3">
           <div className="flex items-center gap-2 w-full">
              <button className="flex-1 h-10 md:h-11 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm">
                 <MessageSquare size={16} className="md:w-[18px] md:h-[18px]" />
              </button>
              <button className="flex-1 h-10 md:h-11 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm">
                 <Phone size={16} className="md:w-[18px] md:h-[18px]" />
              </button>
              <button className="flex-1 h-10 md:h-11 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm">
                 <Navigation size={16} className="md:w-[18px] md:h-[18px]" />
              </button>
           </div>
           
           <div className="flex items-center gap-2 mt-1">
              <button
                onClick={status === "Passenger Onboard" && onComplete ? onComplete : onArrived}
                className="flex-1 h-10 md:h-11 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[13px] md:text-[14px] rounded-lg shadow-md transition-colors flex items-center justify-center"
              >
                {status === "Passenger Onboard" ? "Complete Trip" : "I've Arrived"}
              </button>
              
              <button
                onClick={onCancel}
                className="w-10 h-10 md:w-11 md:h-11 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center justify-center border border-red-100 flex-shrink-0"
                title="Cancel Trip"
              >
                <X size={18} />
              </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
