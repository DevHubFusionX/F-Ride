"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation, Car, Package, Bell, User, Clock, Wallet, LogOut } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardTopBar() {
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();

  // Derive display values from auth state
  const displayName = user?.name || "User";
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const roleBadge = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "Member";

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <header className="h-16 md:h-20 w-full bg-white border-b border-primary/5" />;

  const allTabs = [
    { label: "Trip", href: "/dashboard/rider", icon: Navigation, roles: ["rider"] },
    { label: "Drive", href: "/dashboard/driver", icon: Car, roles: ["driver"] },
    { label: "Courier", href: "/dashboard/courier", icon: Package, roles: ["courier"] },
  ];

  const filteredTabs = allTabs.filter(tab => 
    !tab.roles || tab.roles.includes(user?.role || "rider")
  );

  return (
    <header className="h-16 md:h-20 w-full bg-white border-b border-primary/5 px-4 md:px-6 lg:px-12 flex items-center justify-between z-[60] relative">
      <div className="flex items-center gap-8 md:gap-16">
        <Link href="/" className="shrink-0">
          <Logo className="w-24 md:w-28 h-auto text-primary" />
        </Link>

        <nav className="hidden md:flex items-center h-16 md:h-20">
          {filteredTabs.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={`relative flex items-center gap-3 px-4 md:px-6 h-full text-[12px] md:text-[13px] font-bold tracking-tight transition-all ${
                  isActive ? "text-primary" : "text-primary/25 hover:text-primary/60"
                }`}
              >
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-[-1px] left-0 right-0 h-[3px] bg-primary"
                    transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Link 
          href="/dashboard/activity"
          className="hidden sm:flex items-center gap-2.5 bg-primary/5 px-3 md:px-4 py-2 md:py-2.5 rounded-sm text-[11px] md:text-[12px] font-bold text-primary/60 hover:text-primary hover:bg-primary/10 transition-all"
        >
          <Clock size={14} className="hidden md:block" />
          <span className="hidden md:inline">Activity</span>
          <Clock size={14} className="md:hidden" />
        </Link>
        <Link 
          href="/dashboard/notifications"
          className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-primary/30 hover:text-primary transition-colors"
        >
           <Bell size={18} className="md:hidden" />
           <Bell size={20} className="hidden md:block" />
           <span className="absolute top-2 right-2 md:top-2.5 md:right-2.5 w-1.5 h-1.5 bg-[#E76F32] rounded-full border-2 border-white" />
        </Link>
        
        {/* Profile Dropdown */}
        <div 
          className="relative group py-2"
          onMouseEnter={() => setIsProfileOpen(true)}
          onMouseLeave={() => setIsProfileOpen(false)}
        >
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer hover:bg-primary/95 transition-all shadow-lg shadow-primary/10 ml-1 md:ml-2 text-[11px] md:text-[12px] font-bold tracking-tight">
            {initials}
          </div>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
                className="absolute right-0 top-full mt-2 w-56 bg-white border border-primary/5 shadow-2xl rounded-sm p-2 z-[70] origin-top-right"
              >
                <div className="px-4 py-3 border-b border-primary/5 mb-2">
                  <p className="text-[13px] font-bold text-primary leading-none">{displayName}</p>
                  <p className="text-[11px] font-medium text-primary/30 mt-1">{roleBadge}</p>
                </div>
                
                {[
                  { label: "Settings", icon: User, href: "/dashboard/settings" },
                  ...(user?.role !== "rider" 
                    ? [{ label: "Earnings Overview", icon: Clock, href: "/dashboard/earnings" }] 
                    : []),
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-2.5 text-[12px] font-bold text-primary/60 hover:text-primary hover:bg-primary/[0.02] transition-colors rounded-sm group/item"
                  >
                    <item.icon size={14} className="opacity-40 group-hover/item:opacity-100 transition-opacity" />
                    {item.label}
                  </Link>
                ))}
                
                <button
                  onClick={logout}
                  className="flex items-center gap-3 px-4 py-2.5 text-[12px] font-bold text-[#E76F32] hover:bg-red-50 transition-colors rounded-sm mt-2 border-t border-primary/5 pt-4 w-full text-left"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-primary/5 z-[60] pb-[env(safe-area-inset-bottom)]">
        <nav className="flex items-center justify-around h-14">
          {[
            ...filteredTabs,
            { label: "Activity", href: "/dashboard/activity", icon: Clock },
            ...(user?.role !== "rider" 
              ? [{ label: "Earnings", href: "/dashboard/earnings", icon: Wallet }] 
              : []),
          ].map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all ${
                  isActive ? "text-primary" : "text-primary/25"
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[9px] font-bold tracking-tight">{tab.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
