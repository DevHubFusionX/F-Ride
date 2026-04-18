"use client";

import React from "react";
import { motion } from "framer-motion";
import { Radar } from "lucide-react";
import RiderMatchCard from "./RiderMatchCard";

interface WaitingForMatchesProps {
  destination: string;
  matches: any[];
  onSelectRider?: (rider: any) => void;
  onViewMore?: (person: any) => void;
  onCancel: () => void;
}

export default function WaitingForMatches({ 
  destination, 
  matches, 
  onSelectRider, 
  onViewMore, 
  onCancel 
}: WaitingForMatchesProps) {
  return (
    <div className="flex flex-col items-center text-center justify-center flex-1 py-12">
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
        onClick={onCancel}
        className="mt-12 px-8 h-11 bg-slate-100 text-slate-600 font-semibold text-[14px] hover:bg-slate-200 transition-colors rounded-lg border border-slate-200"
      >
        Stop Synchronizing
      </button>
    </div>
  );
}
