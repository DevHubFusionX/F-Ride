"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Clock,
  Wallet,
  ShieldCheck,
  Star,
  ArrowRight,
  Car,
  Package,
  Receipt,
  Calendar,
  Route,
  CircleDot,
  Flag,
  Info,
} from "lucide-react";

interface TripDetail {
  id: number;
  type: "trip" | "courier" | "earnings";
  title: string;
  date: string;
  amount: string;
  status: string;
  details: string;
  efficiency: string;
}

interface TripDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: TripDetail | null;
}

export default function TripDetailsModal({
  isOpen,
  onClose,
  trip,
}: TripDetailsModalProps) {
  if (!trip) return null;

  const isCourier = trip.type === "courier";
  const isEarnings = trip.type === "earnings";

  // Mock enriched data for the detail view
  const enrichedData = {
    pickup: isCourier ? "Marina Bay Logistics Hub" : "456 Cedar Avenue",
    dropoff: isCourier
      ? "District 9 Warehouse"
      : "Silicon Heights Tech Park",
    driver: {
      name: "Marcus Aurelius",
      initials: "MA",
      color: "#2D9CDB",
      rating: 4.9,
      vehicle: "Tesla Model S Plaid",
      plate: "FRANK-01",
    },
    timeline: {
      requested: "2:30 PM",
      accepted: "2:31 PM",
      arrived: "2:38 PM",
      started: "2:40 PM",
      completed: "2:55 PM",
    },
    breakdown: {
      baseFare: "₦1,800",
      networkFee: "₦200",
      surge: "₦0",
      total: trip.amount,
    },
    distance: "3.2 mi",
    duration: "15 min",
    carbonSaved: "1.2kg CO₂",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center md:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-t-2xl md:rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg pointer-events-auto overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isEarnings
                        ? "bg-emerald-50 text-emerald-600"
                        : isCourier
                        ? "bg-amber-50 text-amber-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {isEarnings ? (
                      <Wallet size={18} />
                    ) : isCourier ? (
                      <Package size={18} />
                    ) : (
                      <Car size={18} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px] text-slate-900 leading-tight">
                      {trip.title}
                    </h3>
                    <p className="text-[12px] text-slate-400 font-medium mt-0.5">
                      {trip.date}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-1 custom-scrollbar">
                {/* Status Banner */}
                <div
                  className={`px-5 py-3 flex items-center justify-between ${
                    trip.status === "Completed"
                      ? "bg-emerald-50"
                      : trip.status === "In Transit"
                      ? "bg-blue-50"
                      : "bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        trip.status === "Completed"
                          ? "bg-emerald-500"
                          : trip.status === "In Transit"
                          ? "bg-blue-500 animate-pulse"
                          : "bg-slate-400"
                      }`}
                    />
                    <span
                      className={`text-[12px] font-bold uppercase tracking-wider ${
                        trip.status === "Completed"
                          ? "text-emerald-700"
                          : trip.status === "In Transit"
                          ? "text-blue-700"
                          : "text-slate-600"
                      }`}
                    >
                      {trip.status}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400">
                    {trip.efficiency}
                  </span>
                </div>

                {/* Route Visual */}
                {!isEarnings && (
                  <div className="px-5 py-5 border-b border-slate-100">
                    <div className="flex items-start gap-4">
                      {/* Route Line */}
                      <div className="flex flex-col items-center pt-1">
                        <CircleDot
                          size={16}
                          className="text-emerald-500 flex-shrink-0"
                        />
                        <div className="w-[2px] h-12 bg-gradient-to-b from-emerald-300 to-blue-300 my-1" />
                        <Flag
                          size={16}
                          className="text-blue-500 flex-shrink-0"
                        />
                      </div>

                      {/* Addresses */}
                      <div className="flex-1 min-w-0">
                        <div className="mb-5">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-1">
                            Pickup
                          </p>
                          <p className="text-[14px] font-semibold text-slate-800 truncate">
                            {enrichedData.pickup}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-1">
                            Dropoff
                          </p>
                          <p className="text-[14px] font-semibold text-slate-800 truncate">
                            {enrichedData.dropoff}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-4 mt-5 pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Route size={14} />
                        <span className="text-[12px] font-semibold">
                          {enrichedData.distance}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Clock size={14} />
                        <span className="text-[12px] font-semibold">
                          {enrichedData.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-600 ml-auto">
                        <span className="text-[11px] font-bold">
                          🌱 {enrichedData.carbonSaved}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Partner Card */}
                {!isEarnings && (
                  <div className="px-5 py-4 border-b border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-3">
                      {isCourier ? "Courier Agent" : "Driver"}
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center text-[14px] font-bold text-white shadow-sm"
                        style={{
                          backgroundColor: enrichedData.driver.color,
                        }}
                      >
                        {enrichedData.driver.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-[14px] font-bold text-slate-900 truncate">
                            {enrichedData.driver.name}
                          </p>
                          <ShieldCheck
                            size={14}
                            className="text-emerald-500 flex-shrink-0"
                          />
                        </div>
                        <p className="text-[12px] text-slate-400 font-medium truncate">
                          {enrichedData.driver.vehicle} •{" "}
                          <span className="font-mono bg-slate-50 px-1.5 py-0.5 rounded text-slate-600 border border-slate-100">
                            {enrichedData.driver.plate}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-full border border-amber-100">
                        <Star
                          size={12}
                          className="text-amber-500 fill-current"
                        />
                        <span className="text-[12px] font-bold text-amber-700">
                          {enrichedData.driver.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Timeline */}
                {!isEarnings && (
                  <div className="px-5 py-4 border-b border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-4">
                      Trip Timeline
                    </p>
                    <div className="space-y-3">
                      {Object.entries(enrichedData.timeline).map(
                        ([key, value], idx) => (
                          <div
                            key={key}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  idx ===
                                  Object.keys(enrichedData.timeline)
                                    .length -
                                    1
                                    ? "bg-emerald-500"
                                    : "bg-slate-300"
                                }`}
                              />
                              <span className="text-[13px] font-medium text-slate-600 capitalize">
                                {key}
                              </span>
                            </div>
                            <span className="text-[13px] font-semibold text-slate-800 font-mono">
                              {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Economic Breakdown */}
                <div className="px-5 py-4 border-b border-slate-100">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-4">
                    {isEarnings ? "Payout Breakdown" : "Fare Breakdown"}
                  </p>
                  <div className="space-y-3">
                    {!isEarnings && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-slate-500 font-medium">
                            Base Fare
                          </span>
                          <span className="text-[13px] font-semibold text-slate-800">
                            {enrichedData.breakdown.baseFare}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-slate-500 font-medium">
                            Network Fee
                          </span>
                          <span className="text-[13px] font-semibold text-slate-800">
                            {enrichedData.breakdown.networkFee}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-slate-500 font-medium">
                            Surge
                          </span>
                          <span className="text-[13px] font-semibold text-slate-400">
                            {enrichedData.breakdown.surge}
                          </span>
                        </div>
                      </>
                    )}
                    {isEarnings && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-slate-500 font-medium">
                            Rider Revenue
                          </span>
                          <span className="text-[13px] font-semibold text-slate-800">
                            ₦98.40
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[13px] text-slate-500 font-medium">
                            Courier Revenue
                          </span>
                          <span className="text-[13px] font-semibold text-slate-800">
                            ₦44.10
                          </span>
                        </div>
                      </>
                    )}
                    <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-100">
                      <span className="text-[14px] font-bold text-slate-900">
                        Total
                      </span>
                      <span className="text-[16px] font-black text-slate-900">
                        {enrichedData.breakdown.total}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center">
                        <Receipt size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-slate-800">
                          Wallet
                        </p>
                        <p className="text-[11px] text-slate-400 font-medium">
                          FrankRide Balance
                        </p>
                      </div>
                    </div>
                    <span className="text-[13px] font-bold text-emerald-600">
                      Paid
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex-shrink-0">
                <div className="flex gap-3">
                  <button className="flex-1 h-11 bg-slate-100 text-slate-600 font-semibold text-[13px] rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                    <Info size={14} />
                    Report Issue
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 h-11 bg-slate-900 text-white font-semibold text-[13px] rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowRight size={14} />
                    Re-book Route
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
