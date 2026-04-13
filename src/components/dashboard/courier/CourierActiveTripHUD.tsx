"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Package, Weight, Clock, Info, CheckCircle2 } from "lucide-react";

interface CourierActiveTripHUDProps {
  packageInfo: {
    id: string;
    weight: string;
    priority: string;
    fragile: boolean;
    pickup: string;
    destination: string;
  };
  courier?: {
    name: string;
    id: string;
  };
  status?: string;
  variant?: "floating" | "inline";
  className?: string;
}

export default function CourierActiveTripHUD({ 
  packageInfo, 
  courier, 
  onAbort, 
  onComplete, 
  status = "En-Route",
  variant = "floating",
  className = ""
}: CourierActiveTripHUDProps) {
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
        
        {/* Left Side: Logistics Payload */}
        <div className="flex-1 p-3 md:p-6 flex flex-col gap-3 md:gap-4 border-b md:border-b-0 md:border-r border-slate-100 bg-white">
           <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                 <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <Package size={14} className="md:w-[16px] md:h-[16px] text-blue-600" />
                 </div>
                 <span className="text-[12px] md:text-[14px] font-bold text-slate-800">{packageInfo.id}</span>
              </div>
              {packageInfo.fragile && (
                 <span className="text-[11px] font-semibold bg-red-50 text-red-600 px-2.5 py-0.5 rounded-md border border-red-100">
                   Fragile
                 </span>
              )}
           </div>

           <div>
              <h4 className="text-[14px] md:text-[18px] font-bold text-slate-900 leading-none mb-1">{status}</h4>
              <p className="text-[11px] md:text-[13px] text-slate-500">Vehicle is approaching pickup point.</p>
           </div>

           <div className="flex items-center gap-2 md:gap-4 mt-1 bg-slate-50 rounded-lg p-2 md:p-2.5 border border-slate-100">
              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                 <Weight size={12} className="md:w-[14px] md:h-[14px] text-slate-400" />
                 <span className="text-[11px] md:text-[13px] font-semibold text-slate-700 truncate">{packageInfo.weight}</span>
              </div>
              <div className="w-px h-3 md:h-4 bg-slate-200"></div>
              <div className="flex items-center gap-1.5 flex-1 justify-center min-w-0">
                 <Clock size={12} className="md:w-[14px] md:h-[14px] text-slate-400" />
                 <span className="text-[11px] md:text-[13px] font-semibold text-slate-700 truncate">8m Arrival</span>
              </div>
              <div className="w-px h-3 md:h-4 bg-slate-200"></div>
              <div className="flex items-center gap-1.5 flex-1 justify-end min-w-0">
                 <ShieldCheck size={12} className="md:w-[14px] md:h-[14px] text-emerald-500" />
                 <span className="text-[11px] md:text-[13px] font-semibold text-emerald-600 truncate">Verified</span>
              </div>
           </div>
        </div>

        {/* Right Side: Control Center */}
        <div className="p-3 md:p-6 bg-slate-50 flex flex-col gap-2 md:gap-3">
           <div className="bg-white p-2 md:p-3 rounded-lg border border-slate-200 flex items-center justify-between gap-3 shadow-sm">
              <div className="flex-1">
                 <p className="text-[9px] md:text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Carrier</p>
                 <p className="text-[12px] md:text-[13px] font-bold text-slate-900 truncate">{courier?.name || "John Smith"}</p>
              </div>
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 flex-shrink-0">
                 <CheckCircle2 size={14} className="md:w-[16px] md:h-[16px] text-emerald-600" />
              </div>
           </div>

           <div className="flex flex-col gap-2 w-full">
              <button 
                onClick={onComplete}
                className="w-full h-10 md:h-11 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[13px] rounded-lg transition-colors shadow-md flex items-center justify-center gap-2"
              >
                 Confirm Delivery
              </button>
              <button 
                onClick={onAbort}
                className="w-full h-9 md:h-10 bg-red-50 text-red-600 hover:bg-red-100 transition-colors rounded-lg flex items-center justify-center text-[12px] md:text-[13px] font-semibold border border-red-100/50"
              >
                 Report Issue
              </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
