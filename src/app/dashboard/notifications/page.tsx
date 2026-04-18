"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  Package, 
  CheckCircle2,
  AlertCircle,
  Loader2,
  Car
} from "lucide-react";
import { useNotifications, type NotificationType } from "@/hooks/useNotifications";

const ICON_MAP: Record<string, any> = {
  match: MapPin,
  security: ShieldCheck,
  system: Bell,
  delivery: Package,
  trip: Car,
  courier: Package,
};

const COLOR_MAP: Record<string, string> = {
  match: "#2D9CDB",
  security: "#E76F32",
  system: "#6B7280",
  delivery: "#27AE60",
  trip: "#0A2540",
  courier: "#27AE60",
};

function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60_000);
  const hours = Math.floor(mins / 60);
  
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function NotificationsPage() {
  const { data, isLoading, markRead } = useNotifications();
  const notifications = data?.data || [];

  const handleMarkAllRead = () => {
    markRead.mutate("all");
  };

  return (
    <div className="h-full bg-white overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16 pb-32">
        {/* Header */}
        <div className="mb-14 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-[36px] md:text-[42px] font-bold tracking-[-0.05em] text-primary mb-3">Sync Stream.</h1>
            <p className="text-[14px] font-medium text-primary/40 tracking-tight">Real-time alerts from the urban mobility grid.</p>
          </div>
          <button 
            onClick={handleMarkAllRead}
            disabled={markRead.isPending || notifications.length === 0}
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/30 hover:text-primary transition-colors disabled:opacity-30"
          >
             {markRead.isPending ? "Clearing..." : "Mark all as read"}
          </button>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-primary/20" size={32} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/20">Syncing alerts...</span>
          </div>
        ) : (
          <div className="space-y-12">
            {notifications.length > 0 ? (
               <div className="space-y-2">
                 <AnimatePresence mode="popLayout">
                    {notifications.map((notification, idx) => {
                       const Icon = ICON_MAP[notification.type] || Bell;
                       const color = COLOR_MAP[notification.type] || "#0A2540";
                       
                       return (
                          <motion.div
                             key={notification._id}
                             initial={{ opacity: 0, x: 20 }}
                             animate={{ opacity: 1, x: 0 }}
                             exit={{ opacity: 0, scale: 0.95 }}
                             transition={{ delay: idx * 0.05 }}
                             className={`flex items-start gap-4 md:gap-6 p-5 md:p-6 transition-all rounded-sm border ${
                                !notification.isRead ? "bg-primary/[0.02] border-primary/10 shadow-sm" : "bg-white border-primary/5 opacity-60"
                             }`}
                          >
                             <div 
                                className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                                style={{ backgroundColor: color + "15", color: color }}
                             >
                                <Icon size={18} strokeWidth={2.5} />
                             </div>
                             <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1 gap-4">
                                   <h4 className="text-[14px] md:text-[15px] font-bold text-primary tracking-tight truncate">{notification.title}</h4>
                                   <span className="text-[10px] md:text-[11px] font-medium text-primary/30 whitespace-nowrap">{formatTime(notification.createdAt)}</span>
                                </div>
                                <p className="text-[13px] md:text-[14px] font-medium text-primary/50 leading-relaxed tracking-tight max-w-[560px]">
                                   {notification.message}
                                </p>
                             </div>
                          </motion.div>
                       );
                    })}
                 </AnimatePresence>
               </div>
            ) : (
              <div className="py-20 text-center flex flex-col items-center gap-4">
                 <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary/10">
                    <CheckCircle2 size={32} />
                 </div>
                 <p className="text-[14px] font-medium text-primary/20 tracking-tight">Your sync stream is clear. No active alerts.</p>
              </div>
            )}
          </div>
        )}

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
