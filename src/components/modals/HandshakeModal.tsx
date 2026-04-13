"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Scan, X, Key, Info, CheckCircle2 } from "lucide-react";

interface HandshakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
  role: "rider" | "driver" | "courier";
  partnerName: string;
}

export default function HandshakeModal({ isOpen, onClose, onVerify, role, partnerName }: HandshakeModalProps) {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timer, setTimer] = useState(180); // 3 minutes waiting

  useEffect(() => {
    if (isOpen) {
      setPin(["", "", "", ""]);
      setIsVerifying(false);
      setIsSuccess(false);
      setTimer(180);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || role === "rider" || timer <= 0 || isSuccess) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [isOpen, role, timer, isSuccess]);

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value) || isSuccess) return;
    
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }
    
    if (newPin.every((p) => p !== "")) {
      handleVerification();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      setTimeout(() => {
        onVerify();
      }, 1500); // 1.5s for the success animation to play
    }, 1000); // simulate network validation
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
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

          {/* Modal Centered */}
          <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center md:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-t-2xl md:rounded-2xl shadow-xl border border-slate-200 w-full max-w-sm pointer-events-auto overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-800">
                  <ShieldCheck size={20} className="text-emerald-500" />
                  <h3 className="font-bold text-[16px]">Secure Handshake</h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div 
                      key="success"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="flex flex-col items-center justify-center py-8 text-center"
                    >
                      <motion.div 
                        initial={{ scale: 0.5 }}
                        animate={{ scale: [0.5, 1.2, 1] }}
                        className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6"
                      >
                         <CheckCircle2 size={40} className="text-emerald-500" />
                      </motion.div>
                      <h4 className="text-[20px] font-bold text-slate-900 mb-2 tracking-tight">Trip Started</h4>
                      <p className="text-[14px] text-slate-500 font-medium leading-relaxed">
                        Secure handshake complete.<br />
                        Synchronizing grid nodes...
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="input"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-center mb-6">
                        {role === "rider" ? (
                           <>
                              <h4 className="text-[16px] md:text-[18px] font-bold text-slate-900 mb-1">{partnerName} has arrived.</h4>
                              <p className="text-[13px] md:text-[14px] text-slate-500 font-medium px-2">Verify your ride by providing this securely generated PIN to the driver.</p>
                           </>
                        ) : (
                           <>
                              <h4 className="text-[16px] md:text-[18px] font-bold text-slate-900 mb-1">Waiting for {partnerName}</h4>
                              <p className="text-[13px] md:text-[14px] text-slate-500 font-medium px-2">Ask the passenger for their 4-digit PIN to begin the trip securely.</p>
                           </>
                        )}
                      </div>

                      {role === "rider" ? (
                         // Rider gets a PIN to show
                         <div className="flex justify-center gap-2 md:gap-3 mb-6 md:mb-8">
                           {["4", "8", "1", "5"].map((digit, i) => (
                             <div key={i} className="w-12 h-14 md:w-14 md:h-16 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[24px] md:text-[28px] font-bold text-slate-900 shadow-sm">
                               {digit}
                             </div>
                           ))}
                         </div>
                      ) : (
                         // Driver/Courier inputs the PIN
                          <div className="flex justify-center gap-2 md:gap-3 mb-6 md:mb-8">
                           {pin.map((digit, i) => (
                             <input
                               id={`pin-${i}`}
                               key={i}
                               type="text"
                               value={digit}
                               placeholder="-"
                               onChange={(e) => handlePinChange(i, e.target.value)}
                               onKeyDown={(e) => handleKeyDown(i, e)}
                               className="w-12 h-14 md:w-14 md:h-16 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-center text-[20px] md:text-[24px] font-bold text-slate-900 shadow-sm transition-all focus:outline-none placeholder:text-slate-300"
                             />
                           ))}
                         </div>
                      )}

                      {/* Sub-actions / Info box */}
                      <div className="bg-slate-50 rounded-xl p-4 flex items-start gap-3 border border-slate-100 mb-6">
                         <Info size={16} className="text-slate-400 mt-0.5 flex-shrink-0" />
                         {role === "rider" ? (
                            <p className="text-[12px] text-slate-600 leading-relaxed font-medium">
                              Ensure the vehicle license plate matches before entering. Never share this PIN until you verify the car.
                            </p>
                         ) : (
                            <div className="w-full">
                               <div className="flex justify-between items-center mb-1">
                                  <p className="text-[12px] font-semibold text-slate-700">Waiting Time</p>
                                  <p className={`text-[12px] font-bold ${timer < 60 ? "text-red-500" : "text-amber-600"}`}>
                                     {formatTime(timer)}
                                  </p>
                               </div>
                               <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                  <motion.div 
                                     initial={{ width: "100%" }} 
                                     animate={{ width: `${(timer / 180) * 100}%` }} 
                                     className={`h-full ${timer < 60 ? "bg-red-500" : "bg-amber-500"}`}
                                  />
                               </div>
                            </div>
                         )}
                      </div>

                      <div className="flex gap-3">
                         {role !== "rider" && (
                            <button
                               onClick={handleVerification}
                               disabled={isVerifying}
                               className="flex-1 h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 group"
                            >
                               {isVerifying ? (
                                 <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                               ) : (
                                 <>
                                   Verify & Start
                                   <Scan size={16} className="text-slate-400 group-hover:text-white" />
                                 </>
                               )}
                            </button>
                         )}
                         {role === "courier" && (
                             <button className="flex-[0.5] h-12 bg-slate-50 text-slate-600 border border-slate-200 font-semibold rounded-lg hover:bg-slate-100 transition-colors flex justify-center items-center">
                                <Scan size={18} />
                             </button>
                         )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
