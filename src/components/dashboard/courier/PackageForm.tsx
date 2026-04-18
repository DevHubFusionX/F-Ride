"use client";

import React, { useState } from "react";
import { MapPin, Box, Weight, ChevronRight, Truck } from "lucide-react";

interface PackageFormProps {
  onSubmit: (e: React.FormEvent) => void;
}

export default function PackageForm({ onSubmit }: PackageFormProps) {
  const [packageSize, setPackageSize] = useState("Standard");

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
  );
}
