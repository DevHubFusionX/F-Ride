"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Package,
  Wallet,
  ChevronRight,
  Clock,
  CheckCircle2,
  Calendar,
  MapPin,
  ArrowRight,
  Activity,
  Route,
} from "lucide-react";
import TripDetailsModal from "@/components/modals/TripDetailsModal";
import { useActivity } from "@/hooks/useActivity";

// Icon mapping based on activity type
const ICON_MAP = {
  trip: Car,
  courier: Package,
  earnings: Wallet,
};

export default function ActivityPage() {
  const { data, isLoading, isError } = useActivity();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  if (isError) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-red-500 font-medium tracking-tight">Failed to synchronize activity record. Please try again.</p>
      </div>
    );
  }

  const activityData = data?.data || [];
  const stats = data?.stats || { syncRate: "0%", totalValue: "$0.00", co2Offset: "0kg" };

  const filteredData =
    activeTab === "all"
      ? activityData
      : activityData.filter((item) => item.type === activeTab);

  const tabs = [
    { id: "all", label: "All Activity" },
    { id: "trip", label: "Trips" },
    { id: "courier", label: "Deliveries" },
    { id: "earnings", label: "Financials" },
  ];

  const handleTripClick = (trip: any) => {
    // Map the icon before passing to modal if it expects it
    const tripWithIcon = { ...trip, icon: ICON_MAP[trip.type as keyof typeof ICON_MAP] };
    setSelectedTrip(tripWithIcon);
    setIsDetailOpen(true);
  };

  return (
    <div className="h-full bg-white overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-12 py-8 md:py-16 pb-28 md:pb-16">
        {/* Header */}
        <div className="mb-10 md:mb-16">
          <h1 className="text-[32px] md:text-[42px] font-bold tracking-[-0.05em] text-primary mb-3 md:mb-4">
            Activity.
          </h1>
          <p className="text-[14px] md:text-[16px] font-medium text-primary/40 tracking-tight max-w-[480px]">
            Your historical mobility record, categorized by sync type and
            network impact.
          </p>
        </div>

        {/* Categories / Tabs */}
        <div className="flex border-b border-primary/5 mb-8 md:mb-12 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 md:px-6 py-3 md:py-4 text-[12px] md:text-[13px] font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-primary"
                  : "text-primary/25 hover:text-primary/60"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-primary"
                />
              )}
            </button>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-10 md:mb-16">
          <div className="p-5 md:p-8 bg-primary/[0.02] border border-primary/5 rounded-lg md:rounded-sm">
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-primary/30 block mb-2">
              Network Influence
            </span>
            <div className={isLoading ? "animate-pulse bg-primary/5 h-8 w-24 rounded" : ""}>
              {!isLoading && (
                <p className="text-[20px] md:text-[24px] font-black text-primary tracking-tighter">
                  {stats.syncRate}{" "}
                  <span className="text-[10px] md:text-[12px] font-medium tracking-normal text-green-600">
                    Sync Rate
                  </span>
                </p>
              )}
            </div>
          </div>
          <div className="p-5 md:p-8 bg-primary/[0.02] border border-primary/5 rounded-lg md:rounded-sm">
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-primary/30 block mb-2">
              Total Value Moved
            </span>
            <div className={isLoading ? "animate-pulse bg-primary/5 h-8 w-32 rounded" : ""}>
              {!isLoading && (
                <p className="text-[20px] md:text-[24px] font-black text-primary tracking-tighter">
                  {stats.totalValue}
                </p>
              )}
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 p-5 md:p-8 bg-primary/[0.02] border border-primary/5 rounded-lg md:rounded-sm">
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-primary/30 block mb-2">
              Carbon Offset
            </span>
            <div className={isLoading ? "animate-pulse bg-primary/5 h-8 w-24 rounded" : ""}>
              {!isLoading && (
                <p className="text-[20px] md:text-[24px] font-black text-primary tracking-tighter">
                  {stats.co2Offset}{" "}
                  <span className="text-[10px] md:text-[12px] font-medium tracking-normal text-blue-500">
                    CO2
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* List */}
        <div className="space-y-3 md:space-y-4">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 w-full bg-primary/[0.02] border border-primary/5 rounded-lg md:rounded-sm animate-pulse" />
              ))
            ) : (
              filteredData.map((item, idx) => {
                const Icon = ICON_MAP[item.type as keyof typeof ICON_MAP] || Car;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleTripClick(item)}
                    className="group relative flex items-center justify-between p-4 md:p-6 border border-primary/5 hover:border-primary/10 hover:bg-primary/[0.01] transition-all rounded-lg md:rounded-sm cursor-pointer active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-4 md:gap-6 min-w-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-sm bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 flex-shrink-0">
                        <Icon size={18} strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[14px] md:text-[15px] font-bold text-primary tracking-tight mb-1 truncate">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 md:gap-3 text-[11px] md:text-[12px] font-medium text-primary/30 flex-wrap">
                          <span className="flex items-center gap-1 md:gap-1.5">
                            <Calendar size={11} /> {item.date}
                          </span>
                          <span className="hidden md:inline">•</span>
                          <span className="hidden md:inline">
                            {item.details}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-8 flex-shrink-0">
                      <div className="flex flex-col items-end">
                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#E76F32] mb-1 hidden md:block">
                          {item.efficiency}
                        </span>
                        <span className="text-[13px] md:text-[14px] font-black text-primary tracking-tight">
                          {item.amount}
                        </span>
                      </div>
                      <ChevronRight
                        size={16}
                        className="text-primary/10 group-hover:text-primary transition-colors hidden md:block"
                      />
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {!isLoading && filteredData.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-[14px] font-medium text-primary/20">
              No data found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Trip Details Modal */}
      <TripDetailsModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        trip={selectedTrip}
      />
    </div>
  );
}
