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

const ACTIVITY_DATA = [
  {
    id: 1,
    type: "trip" as const,
    title: "Trip to Silicon Heights",
    date: "Today, 02:45 PM",
    amount: "$24.50",
    status: "Completed",
    icon: Car,
    details: "3.2 miles • 15 mins",
    efficiency: "92% Sync",
  },
  {
    id: 2,
    type: "courier" as const,
    title: "Document Dispatch",
    date: "Today, 11:12 AM",
    amount: "$12.00",
    status: "In Transit",
    icon: Package,
    details: "Express • Pickup at Marina Bay",
    efficiency: "Eco Mode",
  },
  {
    id: 3,
    type: "earnings" as const,
    title: "Daily Earnings Payout",
    date: "Yesterday",
    amount: "+$142.50",
    status: "Processed",
    icon: Wallet,
    details: "12 rides shared • 4 packages moved",
    efficiency: "Top 5% Zone",
  },
  {
    id: 4,
    type: "trip" as const,
    title: "Morning Commute",
    date: "Apr 10, 2024",
    amount: "$18.20",
    status: "Completed",
    icon: Car,
    details: "5.1 miles • 22 mins",
    efficiency: "85% Sync",
  },
  {
    id: 5,
    type: "trip" as const,
    title: "Airport Transfer",
    date: "Apr 9, 2024",
    amount: "$45.00",
    status: "Completed",
    icon: Car,
    details: "12.8 miles • 38 mins",
    efficiency: "94% Sync",
  },
  {
    id: 6,
    type: "courier" as const,
    title: "Package Relay — Zone 4",
    date: "Apr 8, 2024",
    amount: "$8.50",
    status: "Completed",
    icon: Package,
    details: "Standard • 2.1 miles",
    efficiency: "Eco Mode",
  },
  {
    id: 7,
    type: "trip" as const,
    title: "Downtown Express",
    date: "Apr 7, 2024",
    amount: "$14.80",
    status: "Completed",
    icon: Car,
    details: "4.5 miles • 18 mins",
    efficiency: "88% Sync",
  },
];

// Mock active trip data
const ACTIVE_TRIP = {
  id: 99,
  type: "trip" as const,
  title: "Trip in Progress",
  partner: "Marcus Aurelius",
  destination: "Silicon Valley Tech Hub",
  eta: "12 mins",
  status: "ongoing",
};

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTrip, setSelectedTrip] = useState<(typeof ACTIVITY_DATA)[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Simulate no active trip for now — set to true to preview the banner
  const hasActiveTrip = false;

  const filteredData =
    activeTab === "all"
      ? ACTIVITY_DATA
      : ACTIVITY_DATA.filter((item) => item.type === activeTab);

  const tabs = [
    { id: "all", label: "All Activity" },
    { id: "trip", label: "Trips" },
    { id: "courier", label: "Deliveries" },
    { id: "earnings", label: "Financials" },
  ];

  const handleTripClick = (trip: (typeof ACTIVITY_DATA)[0]) => {
    setSelectedTrip(trip);
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

        {/* Active Trip Banner */}
        <AnimatePresence>
          {hasActiveTrip && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-4 md:p-5 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl border border-slate-700 shadow-lg cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <div className="relative">
                      <Activity
                        size={20}
                        className="text-emerald-400"
                      />
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[14px] md:text-[15px] font-bold text-white">
                        {ACTIVE_TRIP.title}
                      </h3>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
                        Live
                      </span>
                    </div>
                    <p className="text-[12px] md:text-[13px] text-slate-400 font-medium">
                      with {ACTIVE_TRIP.partner} →{" "}
                      {ACTIVE_TRIP.destination}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden md:block text-right">
                    <p className="text-[11px] text-slate-500 font-medium">
                      ETA
                    </p>
                    <p className="text-[16px] font-bold text-white font-mono">
                      {ACTIVE_TRIP.eta}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-slate-500 group-hover:text-white transition-colors"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
            <p className="text-[20px] md:text-[24px] font-black text-primary tracking-tighter">
              88%{" "}
              <span className="text-[10px] md:text-[12px] font-medium tracking-normal text-green-600">
                Sync Rate
              </span>
            </p>
          </div>
          <div className="p-5 md:p-8 bg-primary/[0.02] border border-primary/5 rounded-lg md:rounded-sm">
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-primary/30 block mb-2">
              Total Value Moved
            </span>
            <p className="text-[20px] md:text-[24px] font-black text-primary tracking-tighter">
              $1,242.00
            </p>
          </div>
          <div className="col-span-2 md:col-span-1 p-5 md:p-8 bg-primary/[0.02] border border-primary/5 rounded-lg md:rounded-sm">
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-primary/30 block mb-2">
              Carbon Offset
            </span>
            <p className="text-[20px] md:text-[24px] font-black text-primary tracking-tighter">
              420kg{" "}
              <span className="text-[10px] md:text-[12px] font-medium tracking-normal text-blue-500">
                CO2
              </span>
            </p>
          </div>
        </div>

        {/* List */}
        <div className="space-y-3 md:space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredData.map((item, idx) => (
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
                    <item.icon size={18} strokeWidth={1.5} />
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
            ))}
          </AnimatePresence>
        </div>

        {filteredData.length === 0 && (
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
