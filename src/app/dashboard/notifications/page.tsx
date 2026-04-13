"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  Package, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "match",
    title: "Route Connection Found",
    message: "A high-overlap rider (98%) is heading to Silicon Heights. Synchronize now?",
    time: "2 mins ago",
    icon: MapPin,
    color: "#2D9CDB",
    unread: true
  },
  {
    id: 2,
    type: "security",
    title: "Identity Verified",
    message: "Your profile has been fully authorized by the FrankRide trust network.",
    time: "1 hour ago",
    icon: ShieldCheck,
    color: "#E76F32",
    unread: true
  },
  {
    id: 3,
    type: "system",
    title: "High Demand Alert",
    message: "Harbor Port zone is currently seeing 3x normal shared capacity requests.",
    time: "4 hours ago",
    icon: Zap,
    color: "#F2C94C",
    unread: false
  },
  {
    id: 4,
    type: "delivery",
    title: "Package Collected",
    message: "John Smith has successfully picked up your 'Document Dispatch'.",
    time: "6 hours ago",
    icon: Package,
    color: "#27AE60",
    unread: false
  }
];

export default function NotificationsPage() {
  return (
    <div className="h-full bg-white overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16">
        {/* Header */}
        <div className="mb-14 flex items-center justify-between">
          <div>
            <h1 className="text-[42px] font-bold tracking-[-0.05em] text-primary mb-3">Sync Stream.</h1>
            <p className="text-[14px] font-medium text-primary/40 tracking-tight">Real-time alerts from the urban mobility grid.</p>
          </div>
          <button className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/30 hover:text-primary transition-colors">
             Mark all as read
          </button>
        </div>

        {/* Categories / Time Groups */}
        <div className="space-y-12">
           <section>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/20 mb-8 border-b border-primary/5 pb-4">Today</h3>
              <div className="space-y-2">
                 {NOTIFICATIONS.filter(n => n.time.includes("ago")).map((notification, idx) => (
                    <motion.div
                       key={notification.id}
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: idx * 0.1 }}
                       className={`flex items-start gap-6 p-6 transition-all rounded-sm border ${
                          notification.unread ? "bg-primary/[0.02] border-primary/10 shadow-sm" : "bg-white border-primary/5 opacity-60"
                       }`}
                    >
                       <div 
                          className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                          style={{ backgroundColor: notification.color + "15", color: notification.color }}
                       >
                          <notification.icon size={18} strokeWidth={2.5} />
                       </div>
                       <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                             <h4 className="text-[15px] font-bold text-primary tracking-tight">{notification.title}</h4>
                             <span className="text-[11px] font-medium text-primary/30">{notification.time}</span>
                          </div>
                          <p className="text-[14px] font-medium text-primary/50 leading-relaxed tracking-tight max-w-[520px]">
                             {notification.message}
                          </p>
                          {notification.type === "match" && (
                             <div className="mt-4 flex gap-3">
                                <button className="px-5 py-2 bg-primary text-white text-[11px] font-bold uppercase tracking-widest rounded-sm">Sync Now</button>
                                <button className="px-5 py-2 border border-primary/10 text-primary/40 text-[11px] font-bold uppercase tracking-widest rounded-sm">Dismiss</button>
                             </div>
                          )}
                       </div>
                    </motion.div>
                 ))}
              </div>
           </section>

           <section>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/20 mb-8 border-b border-primary/5 pb-4">Earlier</h3>
              <div className="space-y-2">
                 {NOTIFICATIONS.filter(n => !n.time.includes("ago")).map((notification, idx) => (
                    <div
                       key={notification.id}
                       className="flex items-start gap-6 p-6 bg-white border border-primary/5 rounded-sm opacity-40 transition-opacity hover:opacity-100"
                    >
                       <div 
                          className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 grayscale"
                          style={{ backgroundColor: notification.color + "10", color: "#0A2540" }}
                       >
                          <notification.icon size={18} strokeWidth={2} />
                       </div>
                       <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                             <h4 className="text-[15px] font-bold text-primary tracking-tight">{notification.title}</h4>
                             <span className="text-[11px] font-medium text-primary/30">{notification.time}</span>
                          </div>
                          <p className="text-[14px] font-medium text-primary/50 leading-relaxed tracking-tight">
                             {notification.message}
                          </p>
                       </div>
                    </div>
                 ))}
              </div>
           </section>
        </div>

        {/* Empty Footer */}
        <div className="mt-24 text-center border-t border-primary/5 pt-12">
            <div className="flex items-center justify-center gap-2 text-primary/20">
               <AlertCircle size={14} />
               <span className="text-[10px] font-bold uppercase tracking-widest">End of stream</span>
            </div>
        </div>
      </div>
    </div>
  );
}
