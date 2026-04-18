"use client";

import React, { useState } from "react";
import { Shield, Key, Smartphone, Lock, CheckCircle2, Loader2, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/api/axios-client";

export default function SecuritySection() {
  const { user, logout, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isToggling2FA, setIsToggling2FA] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleToggle2FA = async () => {
    setIsToggling2FA(true);
    setStatus("idle");
    setMessage("");

    try {
      const { data } = await api.post("/auth/toggle-2fa");
      updateUser({ twoFactorEnabled: data.twoFactorEnabled });
      setStatus("success");
      setMessage(data.message);
      // Success feedback
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err: any) {
      console.error("2FA toggle failed:", err);
      setStatus("error");
      setMessage(err.response?.data?.message || "Failed to toggle security setting.");
    } finally {
      setIsToggling2FA(false);
    }
  };

  const handleUpdateSecurity = async () => {
    if (!currentPassword || !newPassword) {
      setStatus("error");
      setMessage("Please provide both current and new passwords.");
      return;
    }

    setIsLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const { data } = await api.post("/auth/change-password", { 
        currentPassword, 
        newPassword 
      });
      
      setStatus("success");
      setMessage(data.message || "Password updated successfully. Logging out...");
      
      setTimeout(() => {
        logout();
      }, 3000);
    } catch (err: any) {
      console.error("Security update failed:", err);
      setStatus("error");
      setMessage(err.response?.data?.message || "Failed to update security profile.");
    } finally {
      setIsLoading(false);
    }
  };

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
                 <div className="max-w-[400px]">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-[14px] md:text-[15px] font-bold text-primary tracking-tight">Two-Factor Authentication</p>
                      {user?.twoFactorEnabled ? (
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-600 text-[9px] font-black uppercase tracking-widest rounded-full">Active</span>
                      ) : (
                        <span className="px-2 py-0.5 bg-primary/5 text-primary/20 text-[9px] font-black uppercase tracking-widest rounded-full">Inactive</span>
                      )}
                    </div>
                    <p className="text-[12px] font-medium text-primary/30 leading-relaxed">Require a 6-digit sync code each time you log in to the network.</p>
                 </div>
              </div>
              <button 
                onClick={handleToggle2FA}
                disabled={isToggling2FA}
                className={`w-full md:w-auto px-8 py-3 text-[11px] font-bold uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2 ${
                  user?.twoFactorEnabled 
                    ? "bg-white border border-red-100 text-red-500 hover:bg-red-50" 
                    : "bg-primary text-white hover:shadow-lg"
                }`}
              >
                {isToggling2FA ? <Loader2 size={12} className="animate-spin" /> : (user?.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA")}
              </button>
            </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-6">
              <div className="space-y-4">
                 <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/40 ml-1">Current Password</label>
                 <div className="relative">
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#f8fafc] border border-primary/5 rounded-xl px-6 py-4 text-[15px] font-bold text-primary outline-none focus:border-primary/20 transition-all font-mono"
                    />
                    <Key size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-primary/10" />
                 </div>
              </div>
              <div className="space-y-4">
                 <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/40 ml-1">New Secure Password</label>
                 <div className="relative">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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
           <h3 className="text-[17px] md:text-[18px] font-bold text-primary tracking-tight mb-2">Security Events.</h3>
           <p className="text-[13px] font-medium text-primary/30 tracking-tight">Critical synchronization alerts and security heartbeat monitoring.</p>
        </div>
        <div className="space-y-4">
           {[
             { device: "Profile Authentication", loc: "Network Center", time: "Ready", icon: CheckCircle2, color: "text-green-600" },
             { device: "Identity Sync", loc: "Identity Vault", time: "Synchronized", icon: Lock, color: "text-primary/20" }
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
                <div className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/10">Active</div>
             </div>
           ))}
        </div>
      </div>

      <div className="pt-4 md:pt-6 flex flex-col items-center gap-4">
         <button 
            disabled={isLoading || status === "success"}
            onClick={handleUpdateSecurity}
            className={`h-14 md:h-16 w-full sm:w-auto px-16 font-bold text-[12px] md:text-[13px] tracking-widest uppercase rounded-full transition-all duration-300 flex items-center justify-center gap-3 ${
              status === "success" 
                ? "bg-green-600 text-white" 
                : status === "error"
                  ? "bg-red-600 text-white"
                  : "bg-primary text-white hover:shadow-2xl"
            }`}
         >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : status === "success" ? <Check size={16} /> : "Update Security Profile"}
         </button>
         {message && (
             <p className={`text-[11px] font-bold uppercase tracking-widest ${status === "success" ? "text-green-600" : "text-red-500"}`}>
                 {message}
             </p>
         )}
      </div>
    </div>
  );
}
