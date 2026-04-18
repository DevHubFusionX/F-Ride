"use client";

import React, { useState, useEffect } from "react";
import { Mail, Phone, AtSign, AlignLeft, Loader2, Check, AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api/axios-client";

export default function ProfileSection() {
  const { user, updateUser } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  // Sync form if user data changes (e.g. on hydrate)
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleSync = async () => {
    setIsLoading(true);
    setStatus("idle");
    try {
      const syncData = {
        name: formData.name,
        bio: formData.bio,
        email: formData.email,
        phone: formData.phone,
      };

      const { data } = await api.put("/auth/me", syncData);
      updateUser(data);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err: any) {
      console.error("Profile sync failed:", err);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {user && !user.isVerified && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-3 text-amber-600 text-[12px] font-bold uppercase tracking-wider">
           <AlertTriangle size={16} />
           Identity Sync Required: Please verify your contact details to authorize your presence in the grid.
        </div>
      )}

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
                   value={formData.name}
                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                   placeholder="e.g. Frank Ride"
                   className="w-full bg-[#f8fafc] border border-primary/5 rounded-xl px-6 py-4 text-[15px] font-bold text-primary outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/[0.02] transition-all"
                 />
              </div>
              <p className="text-[11px] font-medium text-primary/20 ml-1">This is how your name will appear in the grid.</p>
           </div>

           <div className="space-y-4">
              <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary/40 ml-1">
                 <AtSign size={13} /> Network ID
              </label>
              <div className="relative">
                 <input
                   type="text"
                   defaultValue={`#${user?._id?.slice(-8) || "SYNCED"}`}
                   className="w-full bg-[#f8fafc] border border-primary/5 rounded-xl px-6 py-4 text-[15px] font-bold text-primary/40 outline-none cursor-not-allowed uppercase tracking-widest"
                   disabled
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
                   value={formData.email}
                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                   placeholder="name@domain.com"
                   className="w-full bg-[#f8fafc] border border-primary/5 rounded-xl px-6 py-4 text-[15px] font-bold text-primary outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/[0.02] transition-all"
                 />
              </div>
              {formData.email !== user?.email && (
                 <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest ml-1">Changing this will trigger identity re-verification.</p>
              )}
           </div>

           <div className="space-y-4">
              <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary/40 ml-1">
                 <Phone size={13} /> Connection Number
              </label>
              <div className="relative">
                 <input
                   type="tel"
                   value={formData.phone}
                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                   placeholder="+1 (555) 000-0000"
                   className="w-full bg-[#f8fafc] border border-primary/5 rounded-xl px-6 py-4 text-[15px] font-bold text-primary outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/[0.02] transition-all"
                 />
              </div>
              {formData.phone !== user?.phone && (
                 <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest ml-1">Changing this will trigger identity re-verification.</p>
              )}
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
               value={formData.bio}
               onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
               placeholder="Tell us about yourself..."
               className="w-full bg-[#f8fafc] border border-primary/5 rounded-xl px-6 py-5 text-[15px] font-bold text-primary outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/[0.02] transition-all resize-none h-40"
            />
         </div>
      </div>

      <div className="pt-4 md:pt-6 flex flex-col items-center gap-4">
         <button 
            disabled={isLoading}
            onClick={handleSync}
            className={`h-14 md:h-16 w-full sm:w-auto px-16 font-bold text-[12px] md:text-[13px] tracking-widest uppercase rounded-full transition-all duration-500 flex items-center justify-center gap-3 ${
              status === "success" 
                ? "bg-green-600 text-white" 
                : status === "error"
                  ? "bg-red-600 text-white"
                  : "bg-primary text-white hover:shadow-2xl hover:scale-[1.02]"
            }`}
         >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : status === "success" ? <Check size={16} /> : "Sync Account Details"}
         </button>
         {status === "success" && <p className="text-[11px] font-bold text-green-600 uppercase tracking-widest">Update synchronized successfully.</p>}
      </div>
    </div>
  );
}
