"use client";

import React, { useState } from "react";
import { Copy, Eye, EyeOff, Globe, Link2, ExternalLink, ShieldCheck } from "lucide-react";

export default function IntegrationsHub() {
  const [showKey, setShowKey] = useState(false);
  const secretKey = "fr_live_8a42_90b1_synckernel_v4_2_9";

  return (
    <div className="space-y-12">
       {/* API Key Management */}
       <div className="space-y-6">
          <div className="flex items-center justify-between">
             <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/25">Live Integration Key</label>
             <button className="text-[10px] font-bold uppercase tracking-widest text-[#E76F32] hover:underline">Regenerate</button>
          </div>
          <div className="flex items-center gap-3 p-4 bg-primary/[0.02] border border-primary/5 rounded-sm group relative">
             <code className="flex-1 font-mono text-[13px] font-bold text-primary truncate">
                {showKey ? secretKey : "••••••••••••••••••••••••••••••••"}
             </code>
             <div className="flex items-center gap-2">
                <button 
                   onClick={() => setShowKey(!showKey)}
                   className="p-1.5 text-primary/20 hover:text-primary transition-colors"
                >
                   {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button className="p-1.5 text-primary/20 hover:text-primary transition-colors">
                   <Copy size={14} />
                </button>
             </div>
          </div>
          <p className="text-[11px] font-medium text-primary/30 leading-relaxed max-w-[400px]">
             Use this key to authorize third-party logistics dispatchers into the FrankRide sync grid. <span className="text-[#E76F32]">Keep this key secure.</span>
          </p>
       </div>

       {/* Webhooks */}
       <div className="space-y-6">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/25">Active Webhooks</label>
          <div className="space-y-3">
             {[
                { label: "City Logistics Sync", url: "https://api.harbor.city/sync", status: "Enabled", icon: Globe },
                { label: "Fleet Telemetry Hub", url: "https://telemetry.kernel.io/v4", status: "Active", icon: Link2 }
             ].map((hook, idx) => (
                <div key={idx} className="flex items-center justify-between p-5 border border-primary/5 rounded-sm hover:border-primary/10 transition-all bg-white shadow-sm">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-sm bg-primary/5 flex items-center justify-center text-primary/30">
                         <hook.icon size={16} />
                      </div>
                      <div>
                         <p className="text-[13px] font-bold text-primary tracking-tight leading-none mb-1">{hook.label}</p>
                         <p className="text-[11px] font-mono text-primary/20">{hook.url}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-green-600">{hook.status}</span>
                      <ExternalLink size={14} className="text-primary/10" />
                   </div>
                </div>
             ))}
          </div>
          <button className="w-full py-4 border-2 border-dashed border-primary/10 rounded-sm text-[11px] font-bold uppercase tracking-widest text-primary/30 hover:bg-primary/[0.01] hover:text-primary transition-all">
             + Push New Webhook Configuration
          </button>
       </div>

       <div className="p-8 bg-[#E76F32]/[0.02] border border-[#E76F32]/10 rounded-sm flex items-start gap-4">
          <div className="pt-1 text-[#E76F32]">
             <ShieldCheck size={16} />
          </div>
          <div>
             <h4 className="text-[13px] font-bold text-primary leading-none mb-2">Security Protocol Active</h4>
             <p className="text-[12px] font-medium text-primary/30 leading-relaxed">
                FrankRide utilizes SHA-256 HMAC signatures for all synchronization webhooks. Review our <button className="text-primary font-bold underline decoration-primary/10 underline-offset-4">Kernel Documentation</button>.
             </p>
          </div>
       </div>
    </div>
  );
}
