"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Star, Info, ShieldCheck, CheckCircle2 } from "lucide-react";

interface RiderMatchCardProps {
  rider: {
    name: string;
    initials: string;
    distance: string;
    overlap: string;
    pickup: string;
    dropoff: string;
    color: string;
    rating?: number;
    price?: string;
    verified?: boolean;
  };
  onAccept: () => void;
  onReject: () => void;
  onViewMore: () => void;
}

export default function RiderMatchCard({ rider, onAccept, onReject, onViewMore }: RiderMatchCardProps) {
  const [isTrashing, setIsTrashing] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);

  const handleReject = () => {
    setIsTrashing(true);
    setTimeout(() => {
      setIsVisible(false);
      onReject();
    }, 400); // 400ms corresponds to animation duration
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.98 }}
      animate={isTrashing 
        ? { 
            opacity: 0, 
            y: 400, 
            scale: 0.2, 
            rotate: -45,
            backgroundColor: "#fee2e2", // red-100
            transition: { duration: 0.4, ease: "circIn" }
          }
        : { opacity: 1, x: 0, scale: 1 }
      }
      exit={{ opacity: 0, x: 20, scale: 0.98 }}
      whileHover={!isTrashing ? { scale: 1.01, transition: { duration: 0.2 } } : {}}
      className={`bg-white border border-slate-200 rounded-xl p-3 shadow-sm w-full mb-3 group relative overflow-hidden transition-all hover:border-slate-300 hover:shadow-md flex items-center gap-3 ${isTrashing ? "pointer-events-none" : ""}`}
    >
      {/* Avatar Section */}
      <div className="relative flex-shrink-0">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-[15px] font-bold text-white shadow-sm ring-1 ring-white"
          style={{ backgroundColor: rider.color }}
        >
          {isTrashing ? "✕" : rider.initials}
        </div>
        {!isTrashing && rider.verified && (
          <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-sm border border-emerald-50">
            <ShieldCheck size={14} className="text-emerald-500" fill="currentColor" fillOpacity={0.1} />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="text-[14px] font-bold text-slate-900 truncate group-hover:text-primary transition-colors">
            {isTrashing ? "Declined Match" : rider.name}
          </h4>
          {!isTrashing && (
            <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md border border-amber-100/50">
               <Star size={10} fill="currentColor" />
               {rider.rating || "5.0"}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-0.5">
           <p className="text-[11px] font-medium text-slate-500 truncate">
             {isTrashing ? "Synchronizing removal..." : `${rider.pickup || "Lagos Hub"} → ${rider.dropoff || "Tech Hub"}`}
           </p>
           {!isTrashing && (
             <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] font-semibold text-slate-600">{rider.distance || "0.5m away"}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="text-[11px] font-bold text-emerald-600">{rider.overlap || "95%"} match</span>
             </div>
           )}
        </div>
      </div>

      {/* Actions Section */}
      {!isTrashing && (
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={onViewMore}
            className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center justify-center"
            title="Full Profile"
          >
            <Info size={14} />
          </button>
          <button
            onClick={handleReject}
            className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 text-red-500 hover:text-red-600 hover:bg-red-100 transition-colors flex items-center justify-center"
          >
            <X size={14} />
          </button>
          <button
            onClick={onAccept}
            className="w-10 h-10 rounded-lg bg-primary text-white shadow-sm hover:bg-primary/90 hover:shadow-md active:scale-95 transition-all flex items-center justify-center ml-1"
          >
            <CheckCircle2 size={18} className="fill-current" />
          </button>
        </div>
      )}
    </motion.div>
  );
}
