"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User as UserIcon, 
  Shield, 
  Car, 
  Settings, 
  Calendar,
  Camera,
  MapPin,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ProfileSection from "@/components/dashboard/settings/ProfileSection";
import SecuritySection from "@/components/dashboard/settings/SecuritySection";
import VehicleSection from "@/components/dashboard/settings/VehicleSection";
import PreferencesSection from "@/components/dashboard/settings/PreferencesSection";

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("profile");

  const sections = [
    { id: "profile", label: "Profile", icon: UserIcon },
    { id: "security", label: "Security", icon: Shield },
    { id: "vehicle", label: "Vehicle", icon: Car },
    { id: "preferences", label: "Preferences", icon: Settings },
  ];

  // Helper to format join date
  const joinDate = user?.joinedDate 
    ? new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : "Joining...";

  return (
    <div className="h-full bg-[#f8fafc]/50 overflow-y-auto pb-20 md:pb-0">
      <div className="max-w-[1000px] mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-16">
        
        {/* Identity Header */}
        <div className="mb-10 md:mb-14 flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-white p-6 md:p-10 rounded-2xl border border-primary/5 shadow-sm">
           <div className="relative">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-primary/5 border-2 border-primary/10 flex items-center justify-center overflow-hidden group cursor-pointer shadow-inner">
                 {user?.profileImage ? (
                    <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                 ) : (
                    <>
                       <UserIcon size={40} className="md:hidden text-primary/20 group-hover:scale-110 transition-transform duration-500" />
                       <UserIcon size={48} className="hidden md:block text-primary/20 group-hover:scale-110 transition-transform duration-500" />
                    </>
                 )}
                 <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera size={20} className="md:hidden text-white" />
                    <Camera size={24} className="hidden md:block text-white" />
                 </div>
              </div>
           </div>
           <div className="text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 md:gap-4 mb-2">
                 <h1 className="text-[28px] md:text-[32px] font-bold tracking-[-0.05em] text-primary">
                    {user?.name || "Authenticating..."}
                 </h1>
                 {user?.isVerified ? (
                    <span className="bg-primary/5 text-primary text-[9px] md:text-[10px] font-bold px-2.5 md:px-3 py-1 rounded-full uppercase tracking-widest border border-primary/5">Verified Member</span>
                 ) : (
                    <span className="bg-amber-500/5 text-amber-600 text-[9px] md:text-[10px] font-bold px-2.5 md:px-3 py-1 rounded-full uppercase tracking-widest border border-amber-500/5">Sync Pending</span>
                 )}
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-[12px] md:text-[13px] font-medium text-primary/30">
                 <span className="flex items-center gap-2 transition-colors hover:text-primary cursor-default"><MapPin size={13} className="md:hidden" /><MapPin size={14} className="hidden md:block" /> Global Hub</span>
                 <span className="flex items-center gap-2 transition-colors hover:text-primary cursor-default"><Calendar size={13} className="md:hidden" /><Calendar size={14} className="hidden md:block" /> Joined {joinDate}</span>
                 {user?.isVerified ? (
                    <span className="flex items-center gap-2 text-green-600"><CheckCircle2 size={13} className="md:hidden" /><CheckCircle2 size={14} className="hidden md:block" /> Identity Authorized</span>
                 ) : (
                    <span className="flex items-center gap-2 text-amber-500"><AlertCircle size={13} className="md:hidden" /><AlertCircle size={14} className="hidden md:block" /> Authorization Required</span>
                 )}
              </div>
           </div>
        </div>

        {/* Smart Modular Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10 md:mb-12">
          {sections.map(section => (
            <button
               key={section.id}
               onClick={() => setActiveSection(section.id)}
               className={`flex items-center gap-2 md:gap-3 px-5 md:px-8 py-3 md:py-4 rounded-full text-[12px] md:text-[13px] font-bold tracking-tight transition-all duration-300 ${
                 activeSection === section.id 
                  ? "bg-primary text-white shadow-xl shadow-primary/10" 
                  : "bg-white text-primary/40 border border-primary/5 hover:border-primary/10 hover:text-primary"
               }`}
            >
               <section.icon size={15} className="md:hidden" />
               <section.icon size={16} className="hidden md:block" />
               {section.label}
            </button>
          ))}
        </div>

        {/* Content Section with humanized cards */}
        <main className="min-h-[400px] md:min-h-[600px]">
           <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
              >
                  {activeSection === "profile" && <ProfileSection />}
                  {activeSection === "security" && <SecuritySection />}
                  {activeSection === "vehicle" && <VehicleSection />}
                  {activeSection === "preferences" && <PreferencesSection />}
              </motion.div>
           </AnimatePresence>
        </main>

        <div className="mt-16 md:mt-20 py-8 md:py-12 border-t border-primary/5 text-center">
            <p className="text-[11px] md:text-[12px] font-medium text-primary/20">
               Managing your synchronization parameters on the FrankRide grid.
            </p>
        </div>
      </div>
    </div>
  );
}
