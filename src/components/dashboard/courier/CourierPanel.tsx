"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Info, Map as MapIcon } from "lucide-react";

// Sub-components
import PackageForm from "./PackageForm";
import DispatchLoading from "./DispatchLoading";
import TransitSummary from "./TransitSummary";

interface CourierPanelProps {
  onDispatch: (e: React.FormEvent) => void;
  onCancel: () => void;
  dashboardState?: string;
  activePackage?: any;
  onOpenMap?: () => void;
  activeTripHUD?: React.ReactNode;
}

export default function CourierPanel({ 
  onDispatch,
  onCancel,
  dashboardState = "idle", 
  activePackage, 
  onOpenMap,
  activeTripHUD
}: CourierPanelProps) {
  const [internalState, setInternalState] = useState("idle");

  // Sync internal state with prop state
  useEffect(() => {
    if (dashboardState === "idle" || dashboardState === "dispatching") {
      setInternalState(dashboardState);
    } else if (dashboardState === "tracking" || (dashboardState === "dispatching" && activePackage)) {
      setInternalState("tracking");
    }
  }, [dashboardState, activePackage]);

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    onDispatch(e);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="h-full w-full bg-white border-r border-primary/5 flex flex-col p-5 lg:p-12 relative z-20 overflow-y-auto custom-scrollbar uppercase-none">
      {/* Mobile Map Access */}
      <div className="lg:hidden mb-6">
         <button 
           onClick={onOpenMap}
           className="w-full h-11 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center gap-2 text-[12px] font-bold text-slate-600 uppercase tracking-widest active:bg-slate-200 transition-colors"
         >
            <MapIcon size={16} />
            View Logistics Map
         </button>
      </div>

      {/* Mobile Active HUD Integration */}
      {activeTripHUD && (
        <div className="lg:hidden mb-8">
           {activeTripHUD}
        </div>
      )}

      <AnimatePresence mode="wait">
        {internalState === "idle" && (
          <div className="flex flex-col">
            <div className="mb-6 lg:mb-10">
               <h2 className="text-[24px] lg:text-[32px] font-bold text-slate-900 mb-2 leading-tight">Courier</h2>
               <p className="text-[13px] lg:text-[15px] font-medium text-slate-500">Utilize shared vehicle capacity to move your items.</p>
            </div>

            <PackageForm onSubmit={handleDispatch} />
            
            <div className="mt-6 lg:mt-8 bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
                <div className="pt-0.5 text-blue-600 flex-shrink-0">
                   <Info size={16} />
                </div>
                <p className="text-[12px] lg:text-[13px] font-medium text-blue-900 leading-relaxed">
                   Your package will be moved by a FrankRide driver already traveling on your route, ensuring 70% lower emissions and cost.
                </p>
            </div>
          </div>
        )}

        {internalState === "dispatching" && (
          <DispatchLoading onCancel={handleCancel} />
        )}

        {internalState === "tracking" && activePackage && (
          <TransitSummary 
            activePackage={activePackage}
            onCancel={handleCancel}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
