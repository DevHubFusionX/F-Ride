"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle, Leaf, HandCoins } from "lucide-react";

interface TripCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  role: "rider" | "driver" | "courier";
  partnerName: string;
  fare: string;
}

export default function TripCheckoutModal({ isOpen, onClose, onComplete, role, partnerName, fare }: TripCheckoutModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  const tips = [200, 500, 1000];
  const isDriver = role === "driver";

  const handleComplete = () => {
    onComplete();
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
            className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Centered */}
          <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center md:p-4">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-t-[1.5rem] md:rounded-[1.5rem] shadow-2xl border border-slate-200 w-full max-w-sm overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header / Banner */}
              <div className={`p-8 pb-10 flex flex-col items-center justify-center text-center ${isDriver ? 'bg-emerald-50' : 'bg-blue-50'} border-b border-slate-100`}>
                <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center ${isDriver ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'} shadow-sm`}>
                   <CheckCircle size={32} />
                </div>
                <h3 className="text-[24px] font-bold text-slate-900 mb-1">{isDriver ? "Trip Finished" : "You've Arrived"}</h3>
                <p className="text-[14px] text-slate-500 font-medium">
                   {isDriver ? `Earnings added to your ledger.` : `Hope you had a great shared ride.`}
                </p>
              </div>

              {/* Content */}
              <div className="p-6 -mt-6">
                
                {/* Fare Summary */}
                <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-5 mb-6">
                   <div className="flex justify-between items-center mb-3">
                      <span className="text-[14px] font-medium text-slate-500">Base Fare</span>
                      <span className="text-[14px] font-semibold text-slate-900">{fare}</span>
                   </div>
                   {!isDriver && (
                      <div className="flex justify-between items-center mb-3 text-emerald-600">
                        <span className="text-[13px] font-medium flex items-center gap-1.5"><Leaf size={14}/> Shared Network Discount</span>
                        <span className="text-[13px] font-bold">-₦400</span>
                      </div>
                   )}
                   <div className="w-full h-px bg-slate-100 my-3" />
                   <div className="flex justify-between items-end">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{isDriver ? 'Net Earnings' : 'Total Charged'}</span>
                      <span className="text-[28px] font-bold text-slate-900 leading-none">{fare}</span>
                   </div>
                </div>

                {/* Rating System */}
                <div className="flex flex-col items-center mb-6">
                   <p className="text-[13px] font-semibold text-slate-900 mb-3 block">Rate {partnerName}</p>
                   <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(0)}
                          className={`p-1.5 transition-transform hover:scale-110 focus:outline-none`}
                        >
                          <Star 
                            size={28} 
                            className={`transition-colors ${
                               (hoveredStar || rating) >= star 
                               ? "fill-amber-400 text-amber-400" 
                               : "fill-slate-100 text-slate-200"
                            }`} 
                          />
                        </button>
                      ))}
                   </div>
                </div>

                {/* Tipping (Only for Riders) */}
                {!isDriver && role !== "courier" && rating >= 4 && (
                   <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-6 overflow-hidden">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 text-center">Add a Tip (Optional)</p>
                      <div className="flex items-center justify-center gap-2">
                         {tips.map((amount) => (
                            <button
                               key={amount}
                               onClick={() => setSelectedTip(amount === selectedTip ? null : amount)}
                               className={`px-4 py-2.5 rounded-lg border text-[13px] font-bold transition-all ${
                                  selectedTip === amount 
                                  ? "bg-blue-50 border-blue-200 text-blue-700 shadow-sm" 
                                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                               }`}
                            >
                               +₦{amount}
                            </button>
                         ))}
                      </div>
                   </motion.div>
                )}

                <button
                   onClick={handleComplete}
                   className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-[15px]"
                >
                   {isDriver ? "Continue to Map" : "Complete & Pay"}
                </button>
              </div>
            </motion.div>
          </div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
