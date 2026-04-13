"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity, Cpu, Zap, Radio } from "lucide-react";

export default function EngineStatus() {
  return (
    <div className="relative z-10">
       <div className="flex items-center justify-between mb-12">
          <div>
             <h3 className="text-[20px] font-bold text-primary tracking-tight mb-1">Engine Synchronizer</h3>
             <p className="text-[12px] font-medium text-primary/30 tracking-tight">Active communication with the FrankRide global mobility kernel.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/5 border border-green-500/10 rounded-sm">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-green-600">Sync Active</span>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {[
            { label: "Core Latency", value: "14ms", status: "Nominal", icon: Activity },
            { label: "Worker Threads", value: "32 Active", status: "High Performance", icon: Cpu },
            { label: "Energy Sync", value: "Balanced", status: "Optimized", icon: Zap },
            { label: "Region Pings", value: "0.2ms", status: "Direct Fiber", icon: Radio }
          ].map((item, idx) => (
             <div key={idx} className="space-y-3">
                <div className="flex items-center gap-2 text-primary/20">
                   <item.icon size={14} />
                   <span className="text-[10px] font-bold uppercase tracking-widest leading-none">{item.label}</span>
                </div>
                <p className="text-[24px] font-black text-primary tracking-tighter leading-none">{item.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-green-600">{item.status}</p>
             </div>
          ))}
       </div>

       {/* Live Beam / Pulse Visualization */}
       <div className="h-24 w-full bg-primary/[0.02] border border-primary/5 rounded-sm relative overflow-hidden flex items-center justify-around px-12">
          {[...Array(6)].map((_, i) => (
             <div key={i} className="flex flex-col items-center gap-3">
                <motion.div 
                   animate={{ 
                      height: [12, 40, 12],
                      opacity: [0.3, 1, 0.3]
                   }}
                   transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: i * 0.2,
                      ease: "easeInOut"
                   }}
                   className="w-1 bg-primary rounded-full shadow-[0_0_8px_rgba(10,37,64,0.3)]"
                />
                <span className="text-[9px] font-mono font-bold text-primary/20">GRID-0{i+1}</span>
             </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/[0.03] to-transparent pointer-events-none" />
       </div>
    </div>
  );
}
