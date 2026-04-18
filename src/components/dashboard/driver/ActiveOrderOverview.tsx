"use client";

import React from "react";
import { MapPin, CheckCircle2 } from "lucide-react";

interface ActiveOrderOverviewProps {
  activeTrip: any;
  dashboardState: string;
  onCancel: () => void;
}

export default function ActiveOrderOverview({ activeTrip, dashboardState, onCancel }: ActiveOrderOverviewProps) {
  if (!activeTrip) return null;

  return (
    <div className="flex flex-col h-full">
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
          onClick={onCancel}
          className="w-full h-12 bg-red-50 text-red-600 font-semibold text-[14px] hover:bg-red-100 transition-colors rounded-lg border border-red-100"
        >
          Emergency Cancel
        </button>
      </div>
    </div>
  );
}
