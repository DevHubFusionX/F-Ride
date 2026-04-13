"use client";

import React from "react";
import { Car, FileText, CheckCircle2, AlertTriangle, Zap, ArrowRight } from "lucide-react";

export default function VehicleSection() {
  const isDriver = false; // Demo mode: Non-driver view

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white p-6 md:p-10 rounded-2xl border border-primary/5 shadow-sm">
        <div className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
           <div>
              <h2 className="text-[18px] md:text-[20px] font-bold text-primary tracking-tight mb-2">Your Vehicle.</h2>
              <p className="text-[13px] md:text-[14px] font-medium text-primary/30 tracking-tight">Manage the vehicle you use to synchronize capacity with the network.</p>
           </div>
           {isDriver && (
              <span className="flex items-center gap-2 px-5 py-2 bg-green-500/5 text-green-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-green-500/10">
                 <CheckCircle2 size={12} />
                 Fleet Ready
              </span>
           )}
        </div>

        {!isDriver ? (
           <div className="p-8 md:p-12 border-2 border-dashed border-primary/5 rounded-2xl bg-[#f8fafc]/50 text-center flex flex-col items-center group transition-all hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-primary/[0.02]">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white border border-primary/5 rounded-2xl flex items-center justify-center text-primary/10 mb-6 md:mb-8 shadow-sm group-hover:scale-110 group-hover:text-primary transition-all duration-500">
                 <Car size={32} className="md:w-10 md:h-10" />
              </div>
              <h3 className="text-[20px] md:text-[24px] font-black text-primary mb-3 md:mb-4 tracking-tighter leading-tight">Turn empty seats into efficiency.</h3>
              <p className="text-[14px] md:text-[15px] font-medium text-primary/40 max-w-[460px] leading-relaxed mb-8 md:mb-12 tracking-tight">
                 Join the FrankRide global fleet. Share your vehicle during your existing daily path to reduce city congestion and unlock network earnings.
              </p>
              <button className="h-14 md:h-16 bg-primary text-white px-8 md:px-12 font-bold text-[12px] md:text-[13px] tracking-widest uppercase rounded-full hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center gap-3 md:gap-4">
                 Apply to Join the Fleet
                 <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
              </button>
           </div>
        ) : (
           <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div className="space-y-4">
                    <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/40 ml-1">Current Vehicle</label>
                    <div className="bg-[#f8fafc] p-6 rounded-xl border border-primary/5">
                        <p className="text-[18px] font-black text-primary tracking-tight leading-none mb-1">Tesla Model 3</p>
                        <p className="text-[12px] font-medium text-primary/30">2024 Performance Edition</p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/40 ml-1">Registration</label>
                    <div className="bg-[#f8fafc] p-6 rounded-xl border border-primary/5">
                        <p className="text-[18px] font-black text-primary tracking-tight leading-none mb-1">FRANK-01</p>
                        <p className="text-[12px] font-medium text-primary/30">Verified & Authorized</p>
                    </div>
                 </div>
              </div>
              
              <div className="p-8 bg-[#E76F32]/[0.02] border border-[#E76F32]/10 rounded-xl flex items-start gap-4 shadow-sm shadow-[#E76F32]/[0.02]">
                 <div className="pt-1 text-[#E76F32]">
                    <AlertTriangle size={18} />
                 </div>
                 <div>
                    <h4 className="text-[14px] font-bold text-primary leading-none mb-2">Maintenance Sync Required</h4>
                    <p className="text-[13px] font-medium text-primary/40 leading-relaxed tracking-tight">
                        Please upload your latest safety inspection report before Apr 30, 2024 to keep your driver status active.
                    </p>
                 </div>
              </div>
           </div>
        )}
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl border border-primary/5 shadow-sm">
        <div className="mb-8 md:mb-10">
           <h3 className="text-[17px] md:text-[18px] font-bold text-primary tracking-tight mb-2">Identity & Licensing.</h3>
           <p className="text-[13px] font-medium text-primary/30 tracking-tight">Verification documents required to authorize your presence in the mobility grid.</p>
        </div>
        <div className="space-y-4">
           {[
             { name: "Government Identity Pass", status: "Verified", icon: FileText, color: "text-green-600" },
             { name: "Driver Authorization License", status: "Verified", icon: FileText, color: "text-green-600" },
             { name: "Global Fleet Insurance", status: "Pending Sync", icon: FileText, color: "text-[#E76F32]" }
           ].map((doc, idx) => (
             <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 md:p-6 bg-[#f8fafc] border border-primary/5 rounded-xl group hover:bg-white hover:border-primary/10 transition-all gap-4">
                <div className="flex items-center gap-4 md:gap-5">
                   <div className="w-10 h-10 rounded-lg bg-white border border-primary/5 flex items-center justify-center text-primary/20 group-hover:text-primary transition-colors shrink-0">
                      <doc.icon size={18} />
                   </div>
                   <span className="text-[13px] md:text-[14px] font-bold text-primary/60 group-hover:text-primary transition-colors leading-tight">{doc.name}</span>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-primary/5">
                   <span className={`text-[10px] font-bold uppercase tracking-widest ${doc.color}`}>
                      {doc.status}
                   </span>
                   {doc.status === "Pending Sync" && (
                      <button className="p-2 sm:p-1 px-4 sm:px-3 bg-[#E76F32]/10 text-[#E76F32] rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-[#E76F32] hover:text-white transition-all">Upload</button>
                   )}
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
