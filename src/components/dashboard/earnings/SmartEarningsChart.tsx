"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SmartEarningsChartProps {
  mode: "weekly" | "daily";
}

const WEEKLY_DATA = [420, 380, 520, 480, 610, 590, 720, 842];
const DAILY_DATA = [120, 145, 90, 180, 110, 210, 195, 230, 210, 240, 220, 260];

export default function SmartEarningsChart({ mode }: SmartEarningsChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoverData, setHoverData] = useState<{ x: number, y: number, value: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let progress = 0;
    const data = mode === "weekly" ? WEEKLY_DATA : DAILY_DATA;
    const prevData = mode === "weekly" ? DAILY_DATA : WEEKLY_DATA;

    const init = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = 400;
    };

    const getX = (i: number, total: number) => (i / (total - 1)) * (canvas.width - 160) + 80;
    const getY = (val: number) => {
      const max = Math.max(...WEEKLY_DATA, ...DAILY_DATA) * 1.2;
      return canvas.height - (val / max) * (canvas.height - 120) - 60;
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        // Find nearest point
        let nearestIdx = 0;
        let minDist = Infinity;
        
        data.forEach((val, i) => {
            const x = getX(i, data.length);
            const dist = Math.abs(mx - x);
            if (dist < minDist) {
                minDist = dist;
                nearestIdx = i;
            }
        });

        if (minDist < 40) {
            setHoverData({ x: getX(nearestIdx, data.length), y: getY(data[nearestIdx]), value: data[nearestIdx] });
        } else {
            setHoverData(null);
        }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      progress = Math.min(1, progress + 0.04);

      // Draw Main Line
      ctx.beginPath();
      ctx.strokeStyle = "#0A2540";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Linear Interpolation between modes logic simplified:
      // In a real app we'd map data points. Here we just draw the current mode with a fade-in.
      
      data.forEach((val, i) => {
        const x = getX(i, data.length);
        const y = getY(val);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Draw Fill Gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(10, 37, 64, 0.04)");
      gradient.addColorStop(1, "rgba(10, 37, 64, 0)");
      
      ctx.lineTo(getX(data.length - 1, data.length), canvas.height);
      ctx.lineTo(getX(0, data.length), canvas.height);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw Points
      data.forEach((val, i) => {
        const x = getX(i, data.length);
        const y = getY(val);
        ctx.fillStyle = "#0A2540";
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", init);
    canvas.addEventListener("mousemove", handleMouseMove);
    init();
    render();

    return () => {
      window.removeEventListener("resize", init);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [mode]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full" />
      
      <AnimatePresence>
        {hoverData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            style={{ left: hoverData.x, top: hoverData.y - 60 }}
            className="absolute -translate-x-1/2 pointer-events-none bg-primary px-4 py-2 rounded-sm shadow-2xl z-20 flex flex-col items-center"
          >
             <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Value</span>
             <span className="text-[16px] font-black text-white tracking-tighter">₦{hoverData.value.toFixed(2)}</span>
             <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 left-12 flex items-center gap-8">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/30">Network Payouts</span>
         </div>
         <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/10">
            Source: Ledger v2.4
         </div>
      </div>
    </div>
  );
}
