"use client";

import React from "react";
import { motion } from "framer-motion";
import { Car, Package, Zap, CheckCircle2, ExternalLink } from "lucide-react";
import { useActivity } from "@/hooks/useActivity";

export default function FinancialLedger() {
  const { data, isLoading } = useActivity();

  const earningsItems = (data?.data ?? []).filter((item) => item.type === "earnings").slice(0, 5);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 w-full bg-primary/[0.02] border border-primary/5 rounded-sm animate-pulse" />
        ))}
      </div>
    );
  }

  if (earningsItems.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-[13px] font-medium text-primary/20">No payout records yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {earningsItems.map((item, idx) => (
        <motion.div
           key={item.id}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: idx * 0.05 }}
           className="group flex flex-col md:flex-row md:items-center justify-between p-7 border border-primary/5 hover:border-primary/10 hover:bg-primary/[0.01] transition-all rounded-sm"
        >
           <div className="flex items-center gap-6 mb-4 md:mb-0">
              <div className="w-12 h-12 rounded-sm bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                 {item.type === "trip" && <Car size={20} strokeWidth={1.5} />}
                 {item.type === "courier" && <Package size={20} strokeWidth={1.5} />}
                 {item.type === "earnings" && <Zap size={20} strokeWidth={1.5} />}
              </div>
              <div>
                 <div className="flex items-center gap-3 mb-1">
                    <p className="text-[15px] font-bold text-primary tracking-tight">{item.title}</p>
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary/15">{item.id}</span>
                 </div>
                 <p className="text-[12px] font-medium text-primary/30 tracking-tight">{item.date} • {item.details}</p>
              </div>
           </div>

           <div className="flex items-center justify-between md:justify-end gap-12">
              <div className="flex flex-col items-end">
                 <span className="text-[18px] font-black text-primary tracking-tighter mb-1">{item.amount}</span>
                 <div className="flex items-center gap-1.5 text-green-600 text-[10px] font-bold uppercase tracking-widest">
                    <CheckCircle2 size={12} />
                    Verified
                 </div>
              </div>
              <button className="text-primary/10 hover:text-primary transition-colors">
                 <ExternalLink size={16} />
              </button>
           </div>
        </motion.div>
      ))}

      <div className="pt-12 text-center">
         <button className="text-[12px] font-bold text-primary/20 hover:text-primary transition-colors uppercase tracking-[0.2em]">
            View Historical Ledger
         </button>
      </div>
    </div>
  );
}
