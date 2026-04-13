import React from "react";
import DashboardTopBar from "@/components/dashboard/shared/DashboardTopBar";
import { LocationProvider } from "@/contexts/LocationContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocationProvider>
      <div className="h-screen flex flex-col bg-white overflow-hidden">
        <DashboardTopBar />
        <div className="flex-1 relative overflow-hidden">
          {children}
        </div>
      </div>
    </LocationProvider>
  );
}
