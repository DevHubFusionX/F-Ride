"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  Settings, 
  Key, 
  Cpu, 
  Terminal, 
  Globe, 
  Database,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import EngineStatus from "@/components/dashboard/config/EngineStatus";
import ConfigTuner from "@/components/dashboard/config/ConfigTuner";
import IntegrationsHub from "@/components/dashboard/config/IntegrationsHub";

export default function ConfigPage() {
  return (
    <div className="h-full bg-[#f8fafc]/50 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        
        {/* Terminal Header */}
        <div className="mb-16 border-l-4 border-primary pl-10">
           <div className="flex items-center gap-3 text-primary/30 mb-2">
              <Terminal size={14} />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-mono">System v4.2.0.8</span>
           </div>
           <h1 className="text-[44px] font-bold tracking-[-0.06em] text-primary mb-4">Command Center.</h1>
           <p className="text-[14px] font-medium text-primary/40 leading-relaxed max-w-[520px] tracking-tight">
              Manage the technical kernel of the FrankRide mobility engine. 
              <span className="font-mono text-primary/60"> [Root Access Authorized]</span>
           </p>
        </div>

        {/* Live System Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
           {/* Engine Status Block */}
           <div className="lg:col-span-2 bg-white border border-primary/5 rounded-sm p-10 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Cpu size={120} />
              </div>
              <EngineStatus />
           </div>

           {/* Quick Diagnostic Card */}
           <div className="bg-primary p-10 rounded-sm shadow-2xl shadow-primary/20 flex flex-col justify-between">
              <div>
                 <div className="flex items-center gap-3 text-white/40 mb-6">
                    <Activity size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Live Diagnostic</span>
                 </div>
                 <p className="text-[20px] font-bold text-white tracking-tight leading-tight">
                    Mobility Grid is operating at <span className="text-[#E76F32]">Optimal Capacity</span> in the Harbor Zone.
                 </p>
              </div>
              
              <div className="pt-8 border-t border-white/10 mt-10">
                 <div className="flex items-center justify-between text-white/60 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest">Network Health</span>
                    <span className="text-[12px] font-mono font-bold">99.98%</span>
                 </div>
                 <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: "99.98%" }}
                       className="h-full bg-white transition-all"
                    />
                 </div>
              </div>
           </div>
        </div>

        {/* Technical Toggles & Integrations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
           <section>
              <div className="flex items-center gap-4 mb-10 border-b border-primary/5 pb-4">
                 <Settings size={16} className="text-primary/30" />
                 <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/30">Engine Overrides</h2>
              </div>
              <ConfigTuner />
           </section>

           <section>
              <div className="flex items-center gap-4 mb-10 border-b border-primary/5 pb-4">
                 <Key size={16} className="text-primary/30" />
                 <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/30">Sync Integrations</h2>
              </div>
              <IntegrationsHub />
           </section>
        </div>

        {/* System Footer Diagnostics */}
        <div className="mt-24 pt-12 border-t border-primary/5 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all">
           <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                 <Database size={14} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Local Cache: 124MB</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                 <ShieldCheck size={14} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted Tunnel Active</span>
              </div>
           </div>
           <p className="text-[10px] font-mono font-bold text-primary/30 group-hover:text-primary transition-colors">
              Session Hash: 0xFD42...A1B9
           </p>
        </div>
      </div>
    </div>
  );
}
