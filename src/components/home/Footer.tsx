"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";

const footerLinks = [
  { label: "How It Works", href: "#how-it-works", isAnchor: true },
  { label: "Live Map", href: "#live-map", isAnchor: true },
  { label: "Trust & Safety", href: "#trust", isAnchor: true },
  { label: "Contact", href: "mailto:hello@frankride.com", isAnchor: false },
];

export default function Footer() {
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  
  return (
    <footer className="relative bg-gradient-to-br from-[#0A1628] via-[#1C2A3C] to-[#0F1922] overflow-hidden">
      
      {/* Animated liquid blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#E76F32]/10 rounded-full blur-[120px] animate-blob" />
        <div className="absolute top-20 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-[#E76F32]/8 rounded-full blur-[90px] animate-blob animation-delay-4000" />
      </div>

      {/* Glass container */}
      <div className="relative max-w-[1536px] mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-16">
        
        {/* Main content grid */}
        <div className="relative backdrop-blur-xl bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 md:p-10 lg:p-12 shadow-2xl">
          
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
          
          <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-24">
            
            {/* Left: Brand & Description */}
            <div className="flex flex-col justify-between gap-12">
              
              {/* Brand */}
              <div>
                <Link href="/" className="inline-flex items-center select-none group mb-4">
                  <Logo className="h-8 md:h-9 w-auto text-white transition-transform duration-300 group-hover:scale-105" />
                </Link>
                <p className="text-[14px] md:text-[15px] leading-relaxed text-white/40 font-medium max-w-[420px]">
                  Real-time, same-direction ride matching for sustainable communities. 
                  No detours, just people already going your way.
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 md:gap-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-[#E76F32]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex flex-col">
                    <span className="text-[24px] md:text-[28px] font-extrabold tracking-[-0.03em] text-white leading-none">2.4K+</span>
                    <span className="text-[9px] md:text-[10px] font-semibold tracking-[0.08em] uppercase text-white/25 mt-1">Daily Rides</span>
                  </div>
                </div>
                <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                <div className="relative group">
                  <div className="absolute inset-0 bg-[#E76F32]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex flex-col">
                    <span className="text-[24px] md:text-[28px] font-extrabold tracking-[-0.03em] text-white leading-none">100%</span>
                    <span className="text-[9px] md:text-[10px] font-semibold tracking-[0.08em] uppercase text-white/25 mt-1">Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Navigation & Actions */}
            <div className="flex flex-col justify-between gap-12">
              
              {/* Navigation */}
              <div>
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 block mb-6">
                  Navigate
                </span>
                <nav className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {footerLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={(e) => link.isAnchor && handleAnchorClick(e, link.href)}
                      className="group flex items-center gap-2 text-[14px] font-semibold text-white/50 hover:text-white transition-all duration-300"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#E76F32]/50 group-hover:bg-[#E76F32] transition-colors" />
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* CTA Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E76F32]/20 to-[#E76F32]/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative backdrop-blur-sm bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.08] rounded-2xl p-6">
                  <span className="text-[13px] font-bold text-white/90 block mb-2">
                    Ready to ride smarter?
                  </span>
                  <p className="text-[12px] text-white/40 mb-4 leading-relaxed">
                    Join the waitlist and get early access when we launch.
                  </p>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 text-[13px] font-bold text-[#E76F32] hover:text-[#E76F32]/80 transition-colors group/link"
                  >
                    Get Started
                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Divider with gradient */}
          <div className="relative h-px my-8 md:my-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Bottom row */}
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <span className="text-[11px] md:text-[12px] font-medium text-white/20 tracking-wide">
              © {new Date().getFullYear()} F-ride. Crafted for better commutes.
            </span>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <Link
                href="/privacy"
                className="text-[11px] md:text-[12px] font-medium text-white/25 hover:text-white/60 transition-colors cursor-pointer"
              >
                Privacy
              </Link>
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <Link
                href="/terms"
                className="text-[11px] md:text-[12px] font-medium text-white/25 hover:text-white/60 transition-colors cursor-pointer"
              >
                Terms
              </Link>
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <a
                href="mailto:hello@frankride.com"
                className="text-[11px] md:text-[12px] font-medium text-white/25 hover:text-white/60 transition-colors"
              >
                Support
              </a>
            </div>
          </div>
        </div>

        {/* Floating accent elements */}
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#E76F32]/5 rounded-full blur-3xl pointer-events-none" />
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
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </footer>
  );
}
