"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  Wallet, 
  Calendar,
  Zap,
  ChevronRight,
  Download
} from "lucide-react";
import SmartEarningsChart from "@/components/dashboard/earnings/SmartEarningsChart";
import FinancialLedger from "@/components/dashboard/earnings/FinancialLedger";
import { useEarnings } from "@/hooks/useEarnings";

export default function EarningsPage() {
  const { data, isLoading } = useEarnings();
  const [viewMode, setViewMode] = useState<"weekly" | "daily">("weekly");

  const earnings = data?.data;
  const summary = earnings?.summary || { total: "₦0.00", avgDaily: "₦0.00", topZone: "...", carbonSaved: "0kg" };

  return (
    <div className="h-full bg-white overflow-y-auto pb-20 md:pb-0">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-16">
        
        {/* Header & Instant Payout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
           <div>
              <h1 className="text-[32px] md:text-[44px] font-bold tracking-[-0.06em] text-primary mb-3">Earnings.</h1>
              <p className="text-[14px] md:text-[15px] font-medium text-primary/30 max-w-[420px] leading-relaxed tracking-tight">
                 Financial velocity across the global shared network. 
                 <span className="text-primary font-bold"> Focused overview of your liquidity.</span>
              </p>
           </div>
           
           <div className="bg-primary px-6 py-8 md:px-8 md:py-10 rounded-sm shadow-2xl shadow-primary/20 w-full md:min-w-[320px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Wallet size={60} className="md:hidden" />
                 <Wallet size={80} className="hidden md:block" />
              </div>
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 block mb-4">Available Liquidity</span>
              <div className="flex items-baseline gap-2 mb-6 md:mb-8">
                 {isLoading ? (
                    <div className="h-12 w-48 bg-white/10 animate-pulse rounded" />
                 ) : (
                    <span className="text-[36px] md:text-[42px] font-black text-white tracking-tighter">{summary.total}</span>
                 )}
              </div>
              <button className="w-full h-12 md:h-14 bg-white text-primary font-bold text-[12px] md:text-[13px] tracking-widest uppercase rounded-sm hover:bg-[#E76F32] hover:text-white transition-all duration-500">
                 Instant Withdrawal
              </button>
           </div>
        </div>

        {/* Asymmetric Stats Hub */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20">
           <div className="md:col-span-2 p-8 md:p-10 bg-primary/[0.02] border border-primary/5 rounded-sm flex flex-col justify-between">
              <div>
                 <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/30 block mb-4">Network Velocity</span>
                 <p className="text-[28px] md:text-[32px] font-black text-primary tracking-tighter mb-2">+{summary.avgDaily}</p>
                 <div className="flex items-center gap-2 text-green-600 text-[11px] md:text-[12px] font-bold">
                    <TrendingUp size={14} />
                    <span>Average performance for current period</span>
                 </div>
              </div>
              <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-primary/5 flex gap-6 md:gap-8">
                 <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/20 block mb-1">Top Zone</span>
                    <span className="text-[13px] md:text-[14px] font-bold text-primary">{summary.topZone}</span>
                 </div>
                 <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/20 block mb-1">Impact Offset</span>
                    <span className="text-[13px] md:text-[14px] font-bold text-primary">{summary.carbonSaved} CO2</span>
                 </div>
              </div>
           </div>

           <div className="p-8 md:p-10 border border-primary/5 rounded-sm flex flex-col justify-center text-center">
              <Zap size={24} className="mx-auto mb-4 text-[#E76F32]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/20 mb-2">Sync Efficiency</span>
              <p className="text-[24px] md:text-[28px] font-black text-primary tracking-tighter">98.2%</p>
           </div>

           <div className="p-8 md:p-10 border border-primary/5 rounded-sm flex flex-col justify-center text-center">
              <Calendar size={24} className="mx-auto mb-4 text-primary/20" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/20 mb-2">Global Standing</span>
              <p className="text-[24px] md:text-[28px] font-black text-primary tracking-tighter">Top 5%</p>
           </div>
        </div>

        {/* Smart Viz Engine */}
        <section className="mb-20 md:mb-24">
           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-10 gap-4">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/30">Financial Visualizer</h3>
              
              <div className="flex items-center p-1 bg-primary/5 rounded-sm">
                 <button 
                  onClick={() => setViewMode("weekly")}
                  className={`px-3 md:px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-[1px] transition-all ${
                    viewMode === "weekly" ? "bg-white text-primary shadow-sm" : "text-primary/30 hover:text-primary/60"
                  }`}
                 >
                    Weekly
                 </button>
                 <button 
                  onClick={() => setViewMode("daily")}
                  className={`px-3 md:px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-[1px] transition-all ${
                    viewMode === "daily" ? "bg-white text-primary shadow-sm" : "text-primary/30 hover:text-primary/60"
                  }`}
                 >
                    Daily
                 </button>
              </div>
           </div>

           <div className="h-[300px] md:h-[400px] w-full bg-primary/[0.01] border border-primary/5 rounded-sm relative overflow-hidden group cursor-crosshair">
              <SmartEarningsChart mode={viewMode} data={earnings?.daily} />
           </div>
        </section>

        {/* Financial Ledger */}
        <section>
           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-10 border-b border-primary/5 pb-4 gap-4">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/30">Recent Sync Payouts</h3>
              <button className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-primary/20 hover:text-primary transition-colors">
                 <Download size={14} />
                 Statement
              </button>
           </div>
           
           <FinancialLedger />
        </section>
      </div>
    </div>
  );
}
