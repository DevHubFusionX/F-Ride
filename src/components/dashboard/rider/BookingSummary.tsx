"use client";

import React from "react";
import { MapPin } from "lucide-react";

interface BookingSummaryProps {
  activeTrip: any;
  onCancel: () => void;
}

export default function BookingSummary({ activeTrip, onCancel }: BookingSummaryProps) {
  if (!activeTrip) return null;

  return (
    <div className="flex flex-col h-full">
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
          onClick={onCancel}
          className="w-full h-12 bg-red-50 text-red-600 font-semibold text-[14px] hover:bg-red-100 transition-colors rounded-lg border border-red-100"
        >
          Abort Trip
        </button>
      </div>
    </div>
  );
}
