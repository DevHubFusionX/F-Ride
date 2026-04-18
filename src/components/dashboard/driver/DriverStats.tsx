"use client";

import React from "react";
import { Activity, Users, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEarnings } from "@/hooks/useEarnings";

interface DriverStatsProps {
  onStartOffering: () => void;
}

export default function DriverStats({ onStartOffering }: DriverStatsProps) {
  const { user } = useAuth();
  const { data, isLoading } = useEarnings();

  const firstName = user?.name?.split(" ")[0] || "Driver";
  const totalEarnings = data?.data?.summary?.total ?? "₦0.00";
  const tripsCount = user?.tripsCount ?? 0;

  return (
    <div className="flex flex-col">
      <div className="mb-6 lg:mb-10">
        <h2 className="text-[24px] lg:text-[32px] font-bold text-slate-900 mb-2 leading-tight">Welcome, {firstName}.</h2>
        <p className="text-[13px] lg:text-[15px] font-medium text-slate-500">Active network status: <span className="text-amber-600 font-semibold tracking-wide ml-1">High Demand</span></p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-4 mb-6 lg:mb-8">
        <div className="bg-slate-50 p-4 lg:p-6 border border-slate-200 rounded-xl hover:shadow-sm transition-shadow">
          <div className="flex items-center gap-2 mb-2 text-slate-400">
            <Activity size={16} />
            <span className="text-[11px] font-semibold uppercase tracking-wider">Revenue Status</span>
          </div>
          {isLoading ? (
            <div className="h-8 w-24 bg-slate-200 animate-pulse rounded" />
          ) : (
            <p className="text-[22px] lg:text-[28px] font-bold text-slate-900">{totalEarnings}</p>
          )}
        </div>
        <div className="bg-slate-50 p-4 lg:p-6 border border-slate-200 rounded-xl hover:shadow-sm transition-shadow">
          <div className="flex items-center gap-2 mb-2 text-slate-400">
            <Users size={16} />
            <span className="text-[11px] font-semibold uppercase tracking-wider">Trips Completed</span>
          </div>
          <p className="text-[22px] lg:text-[28px] font-bold text-slate-900">{tripsCount} <span className="text-[13px] lg:text-[15px] font-medium text-slate-500 ml-1">total</span></p>
        </div>
      </div>

      <button
        onClick={onStartOffering}
        className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[14px] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
      >
        Offer a Ride
        <CheckCircle2 size={18} className="fill-current" />
      </button>
    </div>
  );
}
