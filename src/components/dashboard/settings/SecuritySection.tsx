"use client";

import React from "react";
import { Shield, Key, Smartphone, Lock, EyeOff, CheckCircle2 } from "lucide-react";

export default function SecuritySection() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white p-6 md:p-10 rounded-2xl border border-primary/5 shadow-sm">
        <div className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
           <div>
              <h2 className="text-[18px] md:text-[20px] font-bold text-primary tracking-tight mb-2">Protect your sync.</h2>
              <p className="text-[13px] md:text-[14px] font-medium text-primary/30 tracking-tight">Manage how you access the FrankRide grid and keep your data secure.</p>
           </div>
           <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary/20 shrink-0 self-start sm:self-auto">
              <Shield size={24} />
           </div>
        </div>
        
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 bg-[#f8fafc] border border-primary/5 rounded-2xl group transition-all hover:bg-white hover:shadow-xl hover:shadow-primary/[0.02] gap-6">
              <div className="flex items-start gap-4 md:gap-5">
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white border border-primary/5 shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                    <Smartphone size={20} className="md:w-[22px] md:h-[22px]" />
                 </div>
                 <div className="max-w-[320px]">
                    <p className="text-[14px] md:text-[15px] font-bold text-primary tracking-tight mb-1">Two-Factor Authentication</p>
                    <p className="text-[12px] font-medium text-primary/30 leading-relaxed">Add an extra layer of protection to your account with mobile verification.</p>
                 </div>
              </div>
              <button className="w-full md:w-auto px-8 py-3 bg-primary text-white text-[11px] font-bold uppercase tracking-widest rounded-full hover:shadow-lg transition-all">Setup 2FA</button>
            </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6">
              <div className="space-y-4">
                 <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/40 ml-1">Current Password</label>
                 <div className="relative">
                    <input
                      type="password"
                      defaultValue="••••••••••••"
                      className="w-full bg-[#f8fafc] border border-primary/5 rounded-xl px-6 py-4 text-[15px] font-bold text-primary outline-none focus:border-primary/20 transition-all font-mono"
                    />
                    <EyeOff size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-primary/10" />
                 </div>
              </div>
              <div className="space-y-4">
                 <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/40 ml-1">New Secure Password</label>
                 <div className="relative">
                    <input
                      type="password"
                      placeholder="Assign new password"
                      className="w-full bg-[#f8fafc] border border-primary/5 rounded-xl px-6 py-4 text-[15px] font-bold text-primary outline-none focus:border-primary/20 transition-all"
                    />
                    <Lock size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-primary/10" />
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl border border-primary/5 shadow-sm">
        <div className="mb-8 md:mb-10">
           <h3 className="text-[17px] md:text-[18px] font-bold text-primary tracking-tight mb-2">Where you're logged in.</h3>
           <p className="text-[13px] font-medium text-primary/30 tracking-tight">Authorized devices currently connected to your profile.</p>
        </div>
        <div className="space-y-4">
           {[
             { device: "MacBook Pro 16", loc: "San Francisco, CA", time: "Active Now", icon: CheckCircle2, color: "text-green-600" },
             { device: "iPhone 15 Pro", loc: "Phoenix, AZ", time: "2 days ago", icon: Smartphone, color: "text-primary/20" }
           ].map((session, idx) => (
             <div key={idx} className="flex items-center justify-between p-6 bg-[#f8fafc] border border-primary/5 rounded-xl">
                <div className="flex items-center gap-5">
                   <div className="w-10 h-10 rounded-lg bg-white border border-primary/5 flex items-center justify-center text-primary/20">
                      <session.icon size={18} />
                   </div>
                   <div>
                      <p className="text-[14px] font-bold text-primary tracking-tight">{session.device}</p>
                      <p className="text-[11px] font-medium text-primary/30">{session.loc} • <span className={session.color}>{session.time}</span></p>
                   </div>
                </div>
                <button className="text-[10px] font-bold uppercase tracking-widest text-primary/20 hover:text-red-500 transition-colors">Sign Out</button>
             </div>
           ))}
        </div>
      </div>

      <div className="pt-4 md:pt-6 flex justify-center">
         <button className="h-14 md:h-16 bg-primary text-white w-full sm:w-auto px-16 font-bold text-[12px] md:text-[13px] tracking-widest uppercase rounded-full hover:shadow-2xl transition-all">
            Update Security Profile
         </button>
      </div>
    </div>
  );
}
