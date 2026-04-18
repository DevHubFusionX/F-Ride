"use client";

import React from "react";
import { Navigation } from "lucide-react";
import { useActivity } from "@/hooks/useActivity";

export default function FrequentDestinations() {
  const { data, isLoading } = useActivity();

  const destinations = React.useMemo(() => {
    const trips = (data?.data ?? []).filter((item) => item.type === "trip");
    // Extract unique destinations from trip titles ("Trip to <destination>")
    const seen = new Set<string>();
    return trips
      .map((t) => t.title.replace(/^Trip to /i, "").trim())
      .filter((d) => d && d !== "Unknown Destination" && !seen.has(d) && seen.add(d))
      .slice(0, 3);
  }, [data]);

  if (isLoading || destinations.length === 0) return null;

  return (
    <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-slate-100 flex flex-col gap-4">
      <span className="text-[11px] lg:text-[12px] font-semibold text-slate-400 tracking-wide">Recent Destinations</span>
      <div className="flex flex-col gap-2">
        {destinations.map((dest) => (
          <button key={dest} className="w-full flex items-center justify-between group p-3 bg-white border border-slate-100 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all text-left">
            <p className="text-[14px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors truncate">{dest}</p>
            <Navigation size={16} className="text-slate-300 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-2" />
          </button>
        ))}
      </div>
    </div>
  );
}
