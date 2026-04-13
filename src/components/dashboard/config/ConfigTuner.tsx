"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sliders, Zap, Map, Wind, Eye } from "lucide-react";

export default function ConfigTuner() {
  const [configs, setConfigs] = useState({
    performanceMode: true,
    highDensityTraffic: false,
    debugOverlays: false,
    forcedDarkMode: true
  });

  const toggle = (key: keyof typeof configs) => {
    setConfigs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const controls = [
    { 
        id: "performanceMode", 
        label: "Performance Mode", 
        desc: "Optimize battery for mobility. Reduces map particle count and animation resolution.",
        icon: Zap,
        enabled: configs.performanceMode 
    },
    { 
        id: "highDensityTraffic", 
        label: "Max Traffic Density", 
        desc: "Calculate all available capacity paths in real-time. [High CPU Usage]",
        icon: Wind,
        enabled: configs.highDensityTraffic 
    },
    { 
        id: "forcedDarkMode", 
        label: "Forced Command Dark", 
        desc: "Override system theme to utilize the FrankRide high-contrast palette.",
        icon: Map,
        enabled: configs.forcedDarkMode 
    },
    { 
        id: "debugOverlays", 
        label: "Visual Debug Grids", 
        desc: "Expose logic underlying the canvas engine. For system operators only.",
        icon: Eye,
        enabled: configs.debugOverlays 
    }
  ];

  return (
    <div className="space-y-10">
       {controls.map((control) => (
          <div key={control.id} className="flex items-start justify-between group">
             <div className="flex items-start gap-5">
                <div className={`mt-1 w-11 h-11 rounded-sm flex items-center justify-center transition-all ${
                    control.enabled ? "bg-primary text-white" : "bg-primary/5 text-primary/20 group-hover:bg-primary/10"
                }`}>
                   <control.icon size={18} />
                </div>
                <div className="max-w-[320px]">
                   <p className="text-[14px] font-bold text-primary tracking-tight mb-1">{control.label}</p>
                   <p className="text-[12px] font-medium text-primary/30 leading-relaxed tracking-tight">{control.desc}</p>
                </div>
             </div>
             
             <button 
                onClick={() => toggle(control.id as keyof typeof configs)}
                className={`w-12 h-6 rounded-full relative transition-all duration-300 border border-primary/5 ${
                    control.enabled ? "bg-[#E76F32]" : "bg-primary/5"
                }`}
             >
                <motion.div 
                   animate={{ x: control.enabled ? 26 : 2 }}
                   className="absolute top-1 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
                />
             </button>
          </div>
       ))}

       <div className="pt-8">
          <div className="p-6 border border-primary/5 bg-primary/[0.01] rounded-sm flex items-center justify-between">
             <span className="text-[11px] font-bold uppercase tracking-widest text-primary/25">App Environment</span>
             <span className="text-[13px] font-mono font-bold text-primary italic">Production: Stable</span>
          </div>
       </div>
    </div>
  );
}
