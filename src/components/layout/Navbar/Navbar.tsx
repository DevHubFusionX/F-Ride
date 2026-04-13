"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import EarlyAccessModal from "@/components/modals/EarlyAccessModal";
import Logo from "@/components/ui/Logo";

/* ── Navigation structure derived from productplan.md ── */

interface NavChild {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
  tagline?: string;
}

const navItems: NavItem[] = [
  {
    label: "Riders",
    href: "/#how-it-works",
    tagline: "Find a ride with someone already heading your way.",
    children: [
      { label: "Find a Ride", href: "/#how-it-works", description: "Enter your destination, get matched instantly" },
      { label: "Real-Time Tracking", href: "/#live-map", description: "Follow your ride on a live map" },
      { label: "Cost Splitting", href: "/#how-it-works", description: "Fair, automatic fare based on route overlap" },
    ],
  },
  {
    label: "Drivers",
    href: "/#how-it-works",
    tagline: "Turn your empty seats into shared journeys.",
    children: [
      { label: "Offer a Ride", href: "/#how-it-works", description: "Post your route and departure time" },
      { label: "Rider Matching", href: "/#live-map", description: "We find riders going your direction" },
      { label: "Earn Per Trip", href: "/#how-it-works", description: "Offset fuel costs on routes you're already taking" },
    ],
  },
  {
    label: "Safety",
    href: "/#trust",
    tagline: "Every trip is verified, tracked, and protected.",
    children: [
      { label: "Identity Verification", href: "/#trust", description: "OTP + optional ID check before first ride" },
      { label: "Emergency SOS", href: "/#trust", description: "One-tap alert with live location sharing" },
      { label: "Ratings & Reviews", href: "/#trust", description: "Community-driven trust on both sides" },
    ],
  },
  {
    label: "Company",
    href: "/company",
  },
];

/* ── Dropdown Panel (non-generic: split layout with tagline + link list) ── */

function DropdownPanel({ item, onClose }: { item: NavItem; onClose: () => void }) {
  if (!item.children) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-full left-0 right-0 z-40"
    >
      {/* Hairline separator */}
      <div className="h-px bg-primary/[0.06]" />

      <div className="bg-white border-b border-primary/[0.06]">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 py-10">
          <div className="grid grid-cols-[280px_1fr] gap-16">

            {/* Left: tagline + accent */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-primary/25 block mb-3">
                  {item.label}
                </span>
                <p className="text-[17px] font-semibold leading-[1.4] tracking-[-0.01em] text-primary/80 max-w-[260px]">
                  {item.tagline}
                </p>
              </div>
              <div className="w-10 h-[2px] bg-[#E76F32]/40 mt-6" />
            </div>

            {/* Right: link list — vertical, not a grid */}
            <div className="flex flex-col">
              {item.children.map((child, idx) => (
                <Link
                  key={child.label}
                  href={child.href}
                  onClick={onClose}
                  className={`group flex items-baseline justify-between py-4 ${
                    idx !== 0 ? "border-t border-primary/[0.05]" : ""
                  } hover:pl-2 transition-all duration-200`}
                >
                  <div className="flex flex-col">
                    <span className="text-[15px] font-semibold text-primary/80 group-hover:text-primary transition-colors">
                      {child.label}
                    </span>
                    <span className="text-[12.5px] text-primary/35 font-medium mt-0.5">
                      {child.description}
                    </span>
                  </div>
                  <span className="text-[14px] text-primary/15 group-hover:text-[#E76F32] group-hover:translate-x-1 transition-all duration-200">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Navbar ── */

export default function Navbar() {
  const pathname = usePathname();
  const isMinimalPage = pathname === "/login" || pathname === "/register" || pathname.startsWith("/dashboard");

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  if (isMinimalPage) return null;

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const activeItem = navItems.find((item) => item.label === activeDropdown);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled || activeDropdown
            ? "bg-white/95 border-b border-light-gray/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            : "bg-transparent border-b border-transparent"
        }`}
        onMouseLeave={handleMouseLeave}
      >
        <nav className="max-w-[1320px] mx-auto flex items-center justify-between h-20 px-6 lg:px-12">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center select-none group">
            <Logo className="h-8 w-auto text-primary transition-transform duration-300 group-hover:scale-105" />
          </Link>

          {/* ── Center Links (Desktop) ── */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children ? handleMouseEnter(item.label) : setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`relative px-5 py-2 text-[13.5px] font-semibold tracking-[-0.01em] transition-colors duration-200 inline-flex items-center gap-1.5 ${
                    activeDropdown === item.label
                      ? "text-primary"
                      : "text-primary/60 hover:text-primary"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${
                        activeDropdown === item.label ? "rotate-180 text-[#E76F32]" : "text-primary/30"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-[13.5px] font-semibold tracking-[-0.01em] text-primary hover:text-primary/70 transition-colors duration-200 cursor-pointer"
            >
              Get Early Access
            </button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col items-end gap-[5px]">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7, width: 22 } : { rotate: 0, y: 0, width: 22 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block h-[1.5px] bg-primary origin-center rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="block h-[1.5px] w-[16px] bg-primary rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7, width: 22 } : { rotate: 0, y: 0, width: 22 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block h-[1.5px] bg-primary origin-center rounded-full"
              />
            </div>
          </button>
        </nav>

        {/* ── Desktop Dropdown ── */}
        <AnimatePresence>
          {activeDropdown && activeItem?.children && (
            <DropdownPanel
              key={activeDropdown}
              item={activeItem}
              onClose={() => setActiveDropdown(null)}
            />
          )}
        </AnimatePresence>
      </header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white flex flex-col"
          >
            <div className="h-20 flex-shrink-0" />

            <div className="flex-1 flex flex-col justify-between px-8 py-10 overflow-y-auto">
              <nav className="flex flex-col gap-0">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-light-gray/40"
                  >
                    <Link
                      href={item.href}
                      onClick={() => !item.children && setMobileOpen(false)}
                      className="block py-5 text-[26px] font-semibold tracking-[-0.03em] text-primary/80 hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>

                    {/* Inline sub-links on mobile */}
                    {item.children && (
                      <div className="flex flex-col gap-1 pb-5 pl-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between py-2.5 text-[14px] font-medium text-primary/40 hover:text-primary/70 transition-colors"
                          >
                            {child.label}
                            <span className="text-[12px] text-primary/15">→</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="pt-8"
              >
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 text-[15px] font-semibold text-primary/60 hover:text-primary transition-colors cursor-pointer"
                >
                  Get Early Access
                  <span className="text-lg">→</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <EarlyAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
