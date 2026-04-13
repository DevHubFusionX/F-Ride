"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const liveRides = [
  {
    initials: "AK",
    name: "Amina K.",
    from: "Lagos",
    to: "Abuja",
    match: "92%",
    time: "3 min",
    color: "#2D9CDB",
    coords: [3.3792, 6.5244],
  },
  {
    initials: "OB",
    name: "Ola B.",
    from: "Ibadan",
    to: "Lagos",
    match: "88%",
    time: "5 min",
    color: "#27AE60",
    coords: [3.9470, 7.3775],
  },
  {
    initials: "CM",
    name: "Chidi M.",
    from: "Port Harcourt",
    to: "Enugu",
    match: "85%",
    time: "2 min",
    color: "#E76F32",
    coords: [6.9437, 4.8156],
  },
  {
    initials: "FN",
    name: "Fatima N.",
    from: "Kano",
    to: "Kaduna",
    match: "90%",
    time: "4 min",
    color: "#9B59B6",
    coords: [8.5167, 12.0022],
  },
];

const stats = [
  { value: "120K+", label: "Active Nigerian riders" },
  { value: "94%", label: "Match success rate" },
  { value: "< 3 min", label: "Average wait time" },
];

export default function LiveMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [activeRide, setActiveRide] = useState<number | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          "satellite-tiles": {
            type: "raster",
            tiles: [
              "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            ],
            tileSize: 256,
            attribution: "Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
          }
        },
        layers: [
          {
            id: "satellite-layer",
            type: "raster",
            source: "satellite-tiles"
          }
        ]
      },
      center: [8.6753, 9.0820], // Nigeria center
      zoom: isMobile ? 4.5 : 5.5,
      pitch: 0,
      bearing: 0,
      interactive: true, 
      antialias: true,
      cooperativeGestures: true // Allow two-finger pan on mobile
    });

    mapRef.current = map;

    map.on("style.load", () => {
      // Add markers for each ride
      liveRides.forEach((ride, idx) => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundColor = ride.color;
        el.style.width = '14px';
        el.style.height = '14px';
        el.style.borderRadius = '50%';
        el.style.border = '3px solid rgba(255, 255, 255, 0.4)';
        el.style.boxShadow = `0 0 25px ${ride.color}90, 0 0 50px ${ride.color}40`;
        el.style.cursor = 'pointer';
        el.style.transition = 'all 0.3s ease';
        
        el.addEventListener('mouseenter', () => {
          setActiveRide(idx);
          el.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
          setActiveRide(null);
          el.style.transform = 'scale(1)';
        });

        new maplibregl.Marker(el)
          .setLngLat(ride.coords as [number, number])
          .addTo(map);
      });
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <section
      id="live-map"
      className="relative bg-gradient-to-br from-[#0A1628] via-[#0A2540] to-[#0F1922] py-28 md:py-40 overflow-hidden"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#2D9CDB]/10 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#E76F32]/8 rounded-full blur-[100px] animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <motion.div 
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 md:mb-20"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-[11.5px] font-bold tracking-[0.15em] uppercase text-white/25 block mb-4"
            >
              Live in Nigeria
            </motion.span>
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-[clamp(2rem,4.5vw,3.8rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white max-w-[500px]"
            >
              See who's heading
              <br />
              your way right now.
            </motion.h2>
          </div>

          {/* Stats */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid grid-cols-2 sm:flex gap-6 md:gap-12"
          >
            {stats.map((stat) => (
              <motion.div 
                key={stat.label} 
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 }
                }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-[#E76F32]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex flex-col">
                  <span className="text-[24px] md:text-[34px] font-extrabold tracking-[-0.03em] text-white leading-none">
                    {stat.value}
                  </span>
                  <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.05em] uppercase text-white/30 mt-2">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Map Container with Glass Effect */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative"
        >
          {/* Glass card wrapper */}
          <div className="relative backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">
            
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />
            
            {/* Map */}
            <div className="relative rounded-2xl overflow-hidden min-h-[400px] md:min-h-[600px] border border-white/[0.05] bg-[#0A2540]">
              <div 
                ref={mapContainerRef} 
                className="absolute inset-0 w-full h-full grayscale-[0.4] brightness-[0.75] contrast-[1.1] opacity-85 scale-[1.02]" 
              />

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/20 via-transparent to-[#0A2540]/20 pointer-events-none" />

              {/* Live indicator */}
              <div className="absolute top-6 left-6 backdrop-blur-md bg-white/[0.08] border border-white/[0.12] rounded-full px-4 py-2 flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-[#27AE60]" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#27AE60] animate-ping" />
                </div>
                <span className="text-[11px] font-bold text-white/80 uppercase tracking-wider">
                  Live · {liveRides.length} Active
                </span>
              </div>

              {/* Coordinates HUD */}
              <div className="absolute bottom-6 right-6 backdrop-blur-md bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-3 hidden md:block">
                 <div className="flex flex-col items-end gap-1">
                    <span className="text-[9px] font-bold font-mono text-white/40 uppercase tracking-widest leading-none">Nigeria Live Feed</span>
                    <span className="text-[12px] font-bold font-mono text-white/70 tabular-nums tracking-tight">9.0820°N, 8.6753°E</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Floating accent */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#E76F32]/10 rounded-full blur-3xl pointer-events-none" />
        </motion.div>

      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
