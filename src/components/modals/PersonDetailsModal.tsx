"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ShieldCheck, MapPin, Clock, Info, Phone, MessageSquare, Award, User, Car, Music, VolumeX, Zap, Calendar } from "lucide-react";

interface PersonDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  person: {
    name: string;
    initials: string;
    distance?: string;
    overlap?: string;
    pickup?: string;
    dropoff?: string;
    color: string;
    rating?: number;
    trips?: number;
    bio?: string;
    joinedDate?: string;
    role?: "rider" | "driver" | "courier";
    verified?: boolean;
    vehicle?: {
      model: string;
      color: string;
      plate: string;
    };
    preferences?: {
      music: boolean;
      quiet: boolean;
      ac: boolean;
    };
    experience?: string;
    languages?: string[];
  } | null;
  onAccept?: () => void;
}

export default function PersonDetailsModal({ isOpen, onClose, person, onAccept }: PersonDetailsModalProps) {
  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!person) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="fixed inset-0 z-[101] flex items-end md:items-center justify-center md:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-t-2xl md:rounded-2xl shadow-2xl border border-slate-200 w-full max-w-[480px] pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]"
            >
            {/* Header: Clean & Structured */}
            <div className="relative border-b border-slate-100 bg-slate-50/50 p-6 flex flex-col gap-4 flex-shrink-0">
               <div className="absolute top-4 right-4">
                  <button 
                     onClick={onClose}
                     className="w-8 h-8 rounded-full hover:bg-slate-200/50 flex items-center justify-center text-slate-500 transition-colors"
                  >
                     <X size={20} />
                  </button>
               </div>
               
               <div className="flex items-start gap-4 md:gap-5">
                   <motion.div 
                      layoutId={`avatar-${person.name}`}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-[18px] md:text-[22px] font-bold shadow-sm border-2 border-white flex-shrink-0"
                      style={{ backgroundColor: person.color, color: 'white' }}
                   >
                      {person.initials}
                   </motion.div>
                   <div className="flex-1 pt-0.5 md:pt-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                         <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                           {person.role || "Member"}
                        </span>
                         {person.verified && (
                            <span className="flex items-center gap-1 text-[10px] md:text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                               <ShieldCheck size={10} className="md:w-[12px] md:h-[12px] text-emerald-600" />
                               Verified
                            </span>
                         )}
                      </div>
                      <h2 className="text-[18px] md:text-[20px] font-bold text-slate-900 leading-tight mb-1.5 truncate">{person.name}</h2>
                     <div className="flex items-center gap-3 text-sm">
                        <span className="flex items-center gap-1 font-medium text-slate-700">
                           <Star size={14} className="text-amber-500" fill="currentColor" /> 
                           {person.rating || "5.0"}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-500 font-medium">{person.trips || "1.2k"} trips</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Body: Information dense but clean */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white custom-scrollbar">
               
               {/* Smart Output for Pickup (Driver Context) */}
               {person.role === 'driver' && (
                   <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 md:p-4 flex gap-3">
                      <MapPin size={18} className="md:w-[20px] md:h-[20px] text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                         <h4 className="text-[12px] md:text-[13px] font-bold text-blue-900 mb-0.5 md:mb-1">Pickup Instructions</h4>
                         <p className="text-[12px] md:text-[13px] text-blue-800 leading-relaxed">
                            Meet at {person.pickup || "designated hub"}. Look for the {person.vehicle?.color} {person.vehicle?.model}.
                         </p>
                      </div>
                   </div>
               )}

               {/* Bio */}
               {person.bio && (
                  <div>
                     <h4 className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-2">About</h4>
                     <p className="text-[14px] text-slate-700 leading-relaxed">
                        {person.bio}
                     </p>
                  </div>
               )}

               {/* Key Stats Grid */}
               <div className="grid grid-cols-2 gap-3">
                  <div className="border border-slate-100 rounded-lg p-4 bg-slate-50/50">
                     <p className="text-[12px] font-medium text-slate-500 mb-1 flex items-center gap-1.5">
                        <Calendar size={14} /> Joined
                     </p>
                     <p className="text-[15px] font-semibold text-slate-900">{person.joinedDate || "Jan 2026"}</p>
                  </div>
                  <div className="border border-slate-100 rounded-lg p-4 bg-slate-50/50">
                     <p className="text-[12px] font-medium text-slate-500 mb-1 flex items-center gap-1.5">
                        <Zap size={14} /> Route Overlap
                     </p>
                     <p className="text-[15px] font-semibold text-slate-900">{person.overlap || "92%"}</p>
                  </div>
               </div>

               {/* Role-Specific Information */}
               {person.role === 'driver' && person.vehicle ? (
                  <div>
                     <h4 className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Vehicle Details</h4>
                     <div className="border border-slate-200 rounded-lg p-4 flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                           <Car size={24} />
                        </div>
                        <div className="flex-1">
                           <h5 className="text-[15px] font-bold text-slate-900 leading-none mb-1">{person.vehicle.model}</h5>
                           <p className="text-[13px] text-slate-500">{person.vehicle.color}</p>
                        </div>
                        <div className="text-right">
                           <div className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-[12px] font-bold border border-slate-200 font-mono">
                              {person.vehicle.plate}
                           </div>
                        </div>
                     </div>
                  </div>
               ) : (
                  <div>
                     <h4 className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Ride Preferences</h4>
                     <div className="grid grid-cols-3 gap-3">
                        {[
                          { icon: <VolumeX size={18} />, label: "Quiet", active: person.preferences?.quiet },
                          { icon: <Music size={18} />, label: "Music", active: person.preferences?.music },
                          { icon: <Zap size={18} />, label: "AC", active: person.preferences?.ac }
                        ].map((pref, i) => (
                           <div 
                              key={i}
                              className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-2 transition-colors ${
                                 pref.active ? 'bg-primary border-primary text-white' : 'bg-slate-50 border-slate-100 text-slate-500'
                              }`}
                           >
                              {pref.icon}
                              <span className="text-[12px] font-medium">{pref.label}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {/* Logistics HUD mapping (Simplified) */}
               <div>
                  <h4 className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider mb-3">Route Nodes</h4>
                  <div className="flex flex-col gap-0 border-l-2 border-slate-100 ml-2 pl-4 relative space-y-4">
                     <div className="relative">
                        <div className="absolute w-2 h-2 rounded-full bg-slate-300 -left-[21px] top-1.5" />
                        <p className="text-[12px] font-medium text-slate-500 mb-0.5">Pickup</p>
                        <p className="text-[14px] font-semibold text-slate-900">{person.pickup || "Origin Node"}</p>
                     </div>
                     <div className="relative">
                        <div className="absolute w-2 h-2 rounded-full bg-primary -left-[21px] top-1.5 border-2 border-white box-content" />
                        <p className="text-[12px] font-medium text-slate-500 mb-0.5">Drop-off</p>
                        <p className="text-[14px] font-semibold text-slate-900">{person.dropoff || "Destination Node"}</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex gap-3 flex-shrink-0">
               <button className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                  <MessageSquare size={20} />
               </button>
               <button className="w-12 h-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                  <Phone size={20} />
               </button>
               <button 
                  onClick={() => {
                     onAccept?.();
                     onClose();
                  }}
                  className="flex-1 h-12 bg-primary text-white font-semibold text-[14px] rounded-lg shadow-md hover:bg-primary/90 hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
               >
                  Confirm Match
               </button>
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
