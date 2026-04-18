"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardTopBar from "@/components/dashboard/shared/DashboardTopBar";
import { LocationProvider } from "@/contexts/LocationContext";
import { TripProvider } from "@/contexts/TripContext";
import DashboardModals from "@/components/dashboard/shared/DashboardModals";
import { Loader2 } from "lucide-react";

/**
 * Dashboard layout with authentication guard.
 * Redirects unauthenticated users to /login.
 * Shows a branded loading state while the session is being validated.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();

  // Session is still being validated against the backend
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white gap-4">
        <Loader2 size={28} className="animate-spin text-primary/30" />
        <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-primary/20">
          Verifying session…
        </p>
      </div>
    );
  }

  // Not authenticated — redirect
  if (!isAuthenticated) {
    if (typeof window !== "undefined") {
      window.location.replace("/login");
    }
    return null;
  }

  return (
    <LocationProvider>
      <TripProvider>
        <div className="h-screen flex flex-col bg-white overflow-hidden">
          <DashboardTopBar />
          <div className="flex-1 relative overflow-hidden">
            {children}
          </div>
          <DashboardModals />
        </div>
      </TripProvider>
    </LocationProvider>
  );
}
