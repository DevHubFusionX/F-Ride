"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const sidebarLinks = [
  { icon: "🏎️", label: "Drive", href: "/dashboard/driver", active: true },
  { icon: "📊", label: "Earnings", href: "#" },
  { icon: "📅", label: "Schedule", href: "#" },
  { icon: "👤", label: "Profile", href: "#" },
];

export default function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 240 }}
      className="fixed left-0 top-0 bottom-0 bg-white border-r border-primary/5 z-50 flex flex-col items-center py-8 transition-all duration-300 ease-[0.22, 1, 0.36, 1]"
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <Link href="/" className="mb-12">
        <span className="text-[20px] font-black tracking-[-0.04em] text-primary">F <span className="text-[#E76F32]">.</span></span>
      </Link>

      <div className="flex flex-col gap-4 w-full px-4 overflow-hidden">
        {sidebarLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`flex items-center gap-4 p-3 rounded-lg transition-colors overflow-hidden whitespace-nowrap ${
              link.active ? "bg-primary/5 text-primary" : "text-primary/40 hover:bg-primary/5 hover:text-primary"
            }`}
          >
            <span className="text-[20px] shrink-0">{link.icon}</span>
            <motion.span 
              animate={{ opacity: isCollapsed ? 0 : 1 }}
              className="text-[14px] font-bold"
            >
              {link.label}
            </motion.span>
          </Link>
        ))}
      </div>

      <div className="mt-auto pb-4">
         <button className="text-[20px] opacity-20 hover:opacity-100 transition-opacity">⚙️</button>
      </div>
    </motion.div>
  );
}
