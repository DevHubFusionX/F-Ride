"use client";

import React from "react";
import { MapPin, Search, Users, ChevronDown, X } from "lucide-react";
import { useLocation } from "@/contexts/LocationContext";

interface DirectionInputProps {
  destination: string;
  onDestinationChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function DirectionInput({ 
  destination, 
  onDestinationChange, 
  onSubmit, 
  onCancel 
}: DirectionInputProps) {
  const { userLocation, isLoading: locationLoading } = useLocation();

  const pickupLabel = locationLoading
    ? "Detecting location..."
    : userLocation
    ? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`
    : "Location unavailable";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-4">
        <div className="pt-2 flex flex-col items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm" />
          <div className="w-0.5 h-12 bg-slate-200 my-1" />
          <MapPin size={16} className="text-slate-400" />
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 block">Current Origin</label>
            <p className="text-[15px] font-semibold text-slate-900">{pickupLabel}</p>
          </div>
          <div className="h-px bg-slate-200 w-full" />
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 block focus-within:text-blue-600 transition-colors">Target Destination</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Enter drop-off hub..."
                value={destination}
                onChange={(e) => onDestinationChange(e.target.value)}
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
          onClick={onCancel}
          className="w-full h-12 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-semibold text-[14px] flex flex-col items-center justify-center gap-2 rounded-lg transition-colors group"
        >
          <div className="flex items-center gap-2">
            <X size={16} className="group-hover:text-red-500 transition-colors" />
            Abort Offer
          </div>
        </button>
      </div>
    </form>
  );
}
