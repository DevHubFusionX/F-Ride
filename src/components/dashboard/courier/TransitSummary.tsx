"use client";

import React from "react";
import { MapPin, Truck } from "lucide-react";

interface TransitSummaryProps {
  activePackage: any;
  onCancel: () => void;
}

export default function TransitSummary({ activePackage, onCancel }: TransitSummaryProps) {
  if (!activePackage) return null;

  return (
    <div className="flex flex-col h-full">
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
          onClick={onCancel}
          className="w-full h-12 bg-red-50 text-red-600 font-semibold text-[14px] hover:bg-red-100 transition-colors rounded-lg border border-red-100"
        >
          Emergency Abort
        </button>
      </div>
    </div>
  );
}
