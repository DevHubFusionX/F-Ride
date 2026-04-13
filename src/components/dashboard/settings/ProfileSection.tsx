"use client";

import React from "react";
import { Mail, Phone, AtSign, AlignLeft } from "lucide-react";

export default function ProfileSection() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white p-6 md:p-10 rounded-2xl border border-primary/5 shadow-sm">
        <div className="mb-8 md:mb-10">
           <h2 className="text-[18px] md:text-[20px] font-bold text-primary tracking-tight mb-2">Tell the fleet about yourself.</h2>
           <p className="text-[13px] md:text-[14px] font-medium text-primary/30 tracking-tight">Your profile details are used to sync you with compatible riders and drivers.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
           <div className="space-y-4">
              <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary/40 ml-1">
                 Full Identity Name
              </label>
              <div className="relative">
                 <input
                   type="text"
                   defaultValue="Frank Ride"
                   className="w-full bg-[#f8fafc] border border-primary/5 rounded-xl px-6 py-4 text-[15px] font-bold text-primary outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/[0.02] transition-all"
                 />
              </div>
              <p className="text-[11px] font-medium text-primary/20 ml-1">This is how your name will appear in the grid.</p>
           </div>

           <div className="space-y-4">
              <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary/40 ml-1">
                 <AtSign size={13} /> Network Handle
              </label>
              <div className="relative">
                 <input
                   type="text"
                   defaultValue="@frankie"
                   className="w-full bg-[#f8fafc] border border-primary/5 rounded-xl px-6 py-4 text-[15px] font-bold text-primary outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/[0.02] transition-all"
                 />
              </div>
           </div>

           <div className="space-y-4">
              <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary/40 ml-1">
                 <Mail size={13} /> Secure Email
              </label>
              <div className="relative">
                 <input
                   type="email"
                   defaultValue="frank@network.com"
                   className="w-full bg-[#f8fafc] border border-primary/5 rounded-xl px-6 py-4 text-[15px] font-bold text-primary outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/[0.02] transition-all"
                 />
              </div>
           </div>

           <div className="space-y-4">
              <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary/40 ml-1">
                 <Phone size={13} /> Connection Number
              </label>
              <div className="relative">
                 <input
                   type="tel"
                   defaultValue="+1 (555) 000-0000"
                   className="w-full bg-[#f8fafc] border border-primary/5 rounded-xl px-6 py-4 text-[15px] font-bold text-primary outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/[0.02] transition-all"
                 />
              </div>
           </div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl border border-primary/5 shadow-sm">
         <div className="mb-8 md:mb-10">
            <h2 className="text-[18px] md:text-[20px] font-bold text-primary tracking-tight mb-2">Short Story.</h2>
            <p className="text-[13px] md:text-[14px] font-medium text-primary/30 tracking-tight">A brief bio helps build trust with other users in the FrankRide community.</p>
         </div>
         <div className="space-y-4">
            <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary/40 ml-1">
               <AlignLeft size={13} /> Your Bio
            </label>
            <textarea
               defaultValue="Global mobility enthusiast and fleet optimization advocate."
               className="w-full bg-[#f8fafc] border border-primary/5 rounded-xl px-6 py-5 text-[15px] font-bold text-primary outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/[0.02] transition-all resize-none h-40"
            />
         </div>
      </div>

      <div className="pt-4 md:pt-6 flex justify-center">
         <button className="h-14 md:h-16 bg-primary text-white w-full sm:w-auto px-16 font-bold text-[12px] md:text-[13px] tracking-widest uppercase rounded-full hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
            Sync Account Details
         </button>
      </div>
    </div>
  );
}
