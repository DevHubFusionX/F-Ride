"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Bell, Globe, Users, ShieldCheck, Heart } from "lucide-react";

export default function PreferencesSection() {
  const [prefs, setPrefs] = useState({
    genderMatching: true,
    communityRides: true,
    notifications: true,
    anonymousActivity: false
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const preferenceItems = [
    { 
      id: "genderMatching", 
      label: "Gender-Optimized Matching", 
      desc: "Prioritize matches with users of the same gender for enhanced comfort and security.",
      icon: Heart,
      enabled: prefs.genderMatching 
    },
    { 
      id: "communityRides", 
      label: "Community Group Network", 
      desc: "Enable matching within your workplace, school, or residential community hubs.",
      icon: Users,
      enabled: prefs.communityRides 
    },
    { 
      id: "notifications", 
      label: "Real-time Sync Alerts", 
      desc: "Receive push notifications for ride matches, status updates, and system pings.",
      icon: Bell,
      enabled: prefs.notifications 
    },
    { 
      id: "anonymousActivity", 
      label: "Anonymous Identity Ledger", 
      desc: "Keep your specific route history private while still contributing to grid efficiency.",
      icon: Globe,
      enabled: prefs.anonymousActivity 
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white p-6 md:p-10 rounded-2xl border border-primary/5 shadow-sm">
        <div className="mb-8 md:mb-12">
           <h2 className="text-[18px] md:text-[20px] font-bold text-primary tracking-tight mb-2">Network Experience.</h2>
           <p className="text-[13px] md:text-[14px] font-medium text-primary/30 tracking-tight">Customize how you interact with the FrankRide community and shared mobility grid.</p>
        </div>
        
        <div className="space-y-10">
           {preferenceItems.map((pref) => (
             <div key={pref.id} className="flex flex-col xs:flex-row items-start justify-between group gap-6 xs:gap-0">
                <div className="flex items-start gap-4 md:gap-5">
                   <div className={`mt-1 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-500 shadow-sm shrink-0 ${
                     pref.enabled ? "bg-primary text-white" : "bg-primary/5 text-primary/10 group-hover:bg-primary/10"
                   }`}>
                      <pref.icon size={18} className="md:w-5 md:h-5" />
                   </div>
                   <div className="max-w-[480px]">
                      <p className="text-[14px] md:text-[15px] font-bold text-primary tracking-tight mb-1">{pref.label}</p>
                      <p className="text-[12.5px] md:text-[13px] font-medium text-primary/30 leading-relaxed tracking-tight">{pref.desc}</p>
                   </div>
                </div>
                
                <button 
                  onClick={() => toggle(pref.id as keyof typeof prefs)}
                  className={`w-14 h-7 rounded-full relative transition-all duration-500 border border-primary/5 ${
                    pref.enabled ? "bg-[#E76F32] shadow-lg shadow-[#E76F32]/20" : "bg-primary/5"
                  }`}
                >
                   <motion.div 
                     animate={{ x: pref.enabled ? 30 : 4 }}
                     className="absolute top-1.5 left-0 w-4 h-4 rounded-full bg-white shadow-md"
                   />
                </button>
             </div>
           ))}
        </div>
      </div>

      <div className="bg-primary/5 p-8 rounded-2xl border border-primary/5 flex items-start gap-5">
          <div className="p-3 bg-white rounded-xl text-[#E76F32] shadow-sm">
             <ShieldCheck size={20} />
          </div>
          <div>
             <h4 className="text-[14px] font-bold text-primary leading-none mb-2">Privacy & Ethics First</h4>
             <p className="text-[13px] font-medium text-primary/30 leading-relaxed tracking-tight">
                FrankRide never sells your mobility data. Your preferences are encrypted and only used to optimize your immediate network syncs.
             </p>
          </div>
      </div>

      <div className="pt-4 md:pt-6 flex justify-center">
         <button className="h-14 md:h-16 bg-primary text-white w-full sm:w-auto px-16 font-bold text-[12px] md:text-[13px] tracking-widest uppercase rounded-full hover:shadow-2xl transition-all">
            Update Preferences
         </button>
      </div>
    </div>
  );
}
