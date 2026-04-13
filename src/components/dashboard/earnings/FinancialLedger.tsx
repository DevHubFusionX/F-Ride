"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  Car, 
  Package, 
  Zap, 
  CheckCircle2,
  ExternalLink
} from "lucide-react";

const LEDGER_DATA = [
  {
    id: "TX-9042",
    title: "City Grid Sync #29042",
    type: "rider",
    date: "Modernized: 2 mins ago",
    amount: "+₦24.50",
    status: "Verified",
    method: "Digital Wallet"
  },
  {
    id: "TX-8910",
    title: "Document Parcel Batch",
    type: "courier",
    date: "Yesterday",
    amount: "+₦12.10",
    status: "Verified",
    method: "Digital Wallet"
  },
  {
    id: "TX-8842",
    title: "Sustainability Bonus",
    type: "bonus",
    date: "Yesterday",
    amount: "+₦15.00",
    status: "Verified",
    method: "Frank Credits"
  },
  {
    id: "TX-7742",
    title: "High-Capacity Sync #27742",
    type: "rider",
    date: "Apr 10, 2024",
    amount: "+₦42.80",
    status: "Verified",
    method: "Digital Wallet"
  }
];

export default function FinancialLedger() {
  return (
    <div className="space-y-4">
      {LEDGER_DATA.map((item, idx) => (
        <motion.div
           key={item.id}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: idx * 0.05 }}
           className="group flex flex-col md:flex-row md:items-center justify-between p-7 border border-primary/5 hover:border-primary/10 hover:bg-primary/[0.01] transition-all rounded-sm"
        >
           <div className="flex items-center gap-6 mb-4 md:mb-0">
              <div className="w-12 h-12 rounded-sm bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                 {item.type === "rider" && <Car size={20} strokeWidth={1.5} />}
                 {item.type === "courier" && <Package size={20} strokeWidth={1.5} />}
                 {item.type === "bonus" && <Zap size={20} strokeWidth={1.5} />}
              </div>
              <div>
                 <div className="flex items-center gap-3 mb-1">
                    <p className="text-[15px] font-bold text-primary tracking-tight">{item.title}</p>
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary/15">{item.id}</span>
                 </div>
                 <p className="text-[12px] font-medium text-primary/30 tracking-tight">{item.date} • {item.method}</p>
              </div>
           </div>

           <div className="flex items-center justify-between md:justify-end gap-12">
              <div className="flex flex-col items-end">
                 <span className="text-[18px] font-black text-primary tracking-tighter mb-1">{item.amount}</span>
                 <div className="flex items-center gap-1.5 text-green-600 text-[10px] font-bold uppercase tracking-widest">
                    <CheckCircle2 size={12} />
                    {item.status}
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
