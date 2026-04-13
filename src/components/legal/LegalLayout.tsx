"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/home/Footer";

interface LegalLayoutProps {
  children: React.ReactNode;
  title: string;
  lastUpdated: string;
}

export default function LegalLayout({ children, title, lastUpdated }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-24 md:pt-44 md:pb-40">
        <div className="max-w-[720px] mx-auto px-6">
          
          {/* Header */}
          <header className="mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary/30 block mb-4">
                Policy & Standards
              </span>
              <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-[-0.05em] text-primary leading-[1.05] mb-6">
                {title}
              </h1>
              <div className="flex items-center gap-3 text-[13px] font-medium text-primary/40">
                <div className="w-8 h-px bg-primary/10" />
                Last updated: {lastUpdated}
              </div>
            </motion.div>
          </header>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="prose prose-slate prose-invert max-w-none"
          >
            <div className="legal-content space-y-12 md:space-y-16">
              {children}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        .legal-content h2 {
          font-size: 24px;
          font-weight: 700;
          color: #0A2540;
          letter-spacing: -0.03em;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .legal-content h2::before {
          content: "";
          display: block;
          width: 4px;
          height: 24px;
          background: #E76F32;
        }
        .legal-content p {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(10, 37, 64, 0.5);
          font-weight: 500;
          letter-spacing: -0.01em;
        }
        .legal-content ul {
          list-style: none;
          padding: 0;
          margin: 24px 0;
          display: flex;
          flex-col;
          gap: 16px;
        }
        .legal-content li {
          font-size: 15px;
          color: rgba(10, 37, 64, 0.6);
          font-weight: 600;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          line-height: 1.6;
        }
        .legal-content li::before {
          content: "→";
          color: #E76F32;
          font-weight: 900;
          flex-shrink: 0;
        }
        .legal-content blockquote {
          border-left: none;
          padding: 32px;
          background: rgba(10, 37, 64, 0.02);
          border: 1px solid rgba(10, 37, 64, 0.05);
          border-radius: 16px;
          font-style: italic;
          color: rgba(10, 37, 64, 0.8);
          margin: 40px 0;
        }
      `}</style>
    </div>
  );
}
