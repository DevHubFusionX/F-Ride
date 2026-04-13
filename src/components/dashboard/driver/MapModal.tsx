"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";
import DriverMap from "./DriverMap";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  matching?: boolean;
}

export default function MapModal({ isOpen, onClose, matching }: MapModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-8 bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-[102] bg-white/95 backdrop-blur-md border-b border-primary/10 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Maximize2 size={20} className="text-primary" />
                <h2 className="text-[18px] font-bold text-primary tracking-tight">Full Map View</h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary/5 transition-colors text-primary"
              >
                <X size={24} />
              </button>
            </div>

            {/* Map Content */}
            <div className="absolute inset-0 pt-[72px]">
              <DriverMap matching={matching} fullscreen={true} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
