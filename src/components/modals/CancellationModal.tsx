"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface CancellationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  role: "rider" | "driver" | "courier";
}

export default function CancellationModal({ isOpen, onClose, onConfirm, role }: CancellationModalProps) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const getReasons = () => {
    if (role === "driver") {
      return [
        "Rider hasn't shown up",
        "Vehicle issue/breakdown",
        "Route is impassable",
        "Safety concern",
        "Accepted by mistake"
      ];
    }
    if (role === "courier") {
      return [
        "Package not ready",
        "Carrier heading wrong way",
        "Item size mismatch",
        "No longer needed"
      ];
    }
    return [
      "Driver hasn't moved",
      "Driver has wrong vehicle",
      "I changed my mind",
      "Safety concern",
      "Taking too long to arrive"
    ];
  };

  const reasons = getReasons();

  const handleConfirm = () => {
    if (selectedReason) {
      onConfirm(selectedReason);
    }
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
              {/* Header */}
              <div className="p-6 pb-4 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 border border-red-100 flex items-center justify-center mb-4 shadow-sm">
                   <AlertTriangle size={28} />
                </div>
                <h3 className="text-[20px] font-bold text-slate-900 mb-2">Abort Active Trip?</h3>
                <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                   Are you sure you want to cancel? This may affect your network rating. Please select a reason below.
                </p>
              </div>

              {/* Content */}
              <div className="px-6 pb-6 pt-2">
                
                <div className="space-y-2 mb-6">
                   {reasons.map((reason, idx) => (
                      <button
                         key={idx}
                         onClick={() => setSelectedReason(reason)}
                         className={`w-full p-3.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                            selectedReason === reason 
                            ? "bg-red-50 border-red-200 text-red-900 shadow-sm" 
                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                         }`}
                      >
                         <span className="text-[13px] font-semibold">{reason}</span>
                         <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedReason === reason ? "border-red-500" : "border-slate-300"
                         }`}>
                            {selectedReason === reason && <div className="w-2 h-2 rounded-full bg-red-500" />}
                         </div>
                      </button>
                   ))}
                </div>

                <div className="flex gap-3">
                   <button
                     onClick={onClose}
                     className="flex-1 h-12 bg-slate-50 text-slate-600 font-semibold rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors"
                   >
                     Keep Trip
                   </button>
                   <button
                     onClick={handleConfirm}
                     disabled={!selectedReason}
                     className={`flex-1 h-12 font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${
                        selectedReason 
                        ? "bg-red-600 hover:bg-red-700 text-white" 
                        : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none border border-slate-200"
                     }`}
                   >
                     Abort Now
                     <X size={16} />
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
