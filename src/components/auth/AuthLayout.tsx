"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Share2 } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  heroTitle: string;
  heroSubtitle: string;
}

export default function AuthLayout({ children, heroTitle, heroSubtitle }: AuthLayoutProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    interface Dot {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
    }

    const dots: Dot[] = [];
    const spacing = 40;
    const friction = 0.88;
    const springStrength = 0.12;
    const mouseRadius = 150;
    const mouseStrength = 0.45;

    const init = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth / 2;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

      dots.length = 0;
      for (let x = spacing; x < canvas.width; x += spacing) {
        for (let y = spacing; y < canvas.height; y += spacing) {
          dots.push({ x, y, originX: x, originY: y, vx: 0, vy: 0 });
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouseRadius - dist) / mouseRadius;
          dot.vx -= Math.cos(angle) * force * mouseStrength;
          dot.vy -= Math.sin(angle) * force * mouseStrength;
        }

        // Spring back to origin
        const sdx = dot.originX - dot.x;
        const sdy = dot.originY - dot.y;
        dot.vx += sdx * springStrength;
        dot.vy += sdy * springStrength;

        // Apply friction and update position
        dot.vx *= friction;
        dot.vy *= friction;
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Visuals
        const colorAlpha = 0.1 + (Math.abs(dot.vx) + Math.abs(dot.vy)) * 0.5;
        ctx.fillStyle = dist < mouseRadius 
          ? `rgba(231, 111, 50, ${Math.min(0.6, colorAlpha + 0.2)})` 
          : `rgba(10, 37, 64, ${Math.min(0.2, colorAlpha)})`;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener("resize", init);
    canvas.addEventListener("mousemove", handleMouseMove);

    init();
    render();

    return () => {
      window.removeEventListener("resize", init);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      {/* ── Left Column: Visual/Editorial ── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#F5F0EB] items-center justify-center overflow-hidden border-r border-primary/5">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-auto"
        />
        
        <div className="relative z-10 px-16 max-w-[640px]">
          <Link href="/" className="inline-block mb-12">
            <span className="text-[20px] font-black tracking-[-0.05em] text-primary">FrankRide <span className="text-[#E76F32]">.</span></span>
          </Link>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] tracking-[-0.05em] text-primary mb-8"
          >
            {heroTitle}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-[16px] md:text-[18px] font-medium leading-[1.6] text-primary/40 max-w-[420px] tracking-tight"
          >
            {heroSubtitle}
          </motion.p>
          
          <div className="mt-20 flex items-center gap-12">
             <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#E76F32]">
                   <Share2 size={16} />
                   <span className="text-[24px] font-black p-0 text-primary tracking-tighter">80%</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary/25">Shared Efficiency</span>
             </div>
             <div className="w-px h-12 bg-primary/10" />
             <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#E76F32]">
                   <ShieldCheck size={16} />
                   <span className="text-[24px] font-black p-0 text-primary tracking-tighter">100%</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary/25">Verified Access</span>
             </div>
          </div>
        </div>
        
        {/* Subtle corner watermark */}
        <div className="absolute bottom-12 left-16 select-none opacity-[0.03] pointer-events-none">
          <span className="text-[100px] font-black tracking-[-0.08em] leading-none text-primary">SYNC</span>
        </div>
      </div>

      {/* ── Right Column: Interaction ── */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-white px-6 md:px-12 py-12">
        <div className="w-full max-w-[400px]">
          {/* Mobile Logo Only */}
          <div className="lg:hidden mb-12">
             <Link href="/">
                <span className="text-[20px] font-black tracking-[-0.04em] text-primary">FrankRide<span className="text-[#E76F32]">.</span></span>
             </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
