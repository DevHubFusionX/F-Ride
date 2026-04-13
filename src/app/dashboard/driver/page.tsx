"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const DriverMap = dynamic(() => import("@/components/dashboard/driver/DriverMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0A2540] animate-pulse" />,
});
import RideOfferPanel from "@/components/dashboard/driver/RideOfferPanel";
import RiderMatchCard from "@/components/dashboard/driver/RiderMatchCard";
import ActiveTripHUD from "@/components/dashboard/driver/ActiveTripHUD";
import PersonDetailsModal from "@/components/modals/PersonDetailsModal";
import HandshakeModal from "@/components/modals/HandshakeModal";
import TripCheckoutModal from "@/components/modals/TripCheckoutModal";
import CancellationModal from "@/components/modals/CancellationModal";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, Map as MapIcon, Globe } from "lucide-react";

const MapModal = dynamic(() => import("@/components/dashboard/driver/MapModal"), {
  ssr: false,
});

const MOCK_RIDERS = [
  {
    name: "Alex Johnson",
    initials: "AJ",
    distance: "0.8 miles",
    overlap: "92%",
    pickup: "Your Current Location",
    dropoff: "Silicon Valley Tech Hub",
    color: "#2D9CDB",
    rating: 4.9,
    trips: 156,
    joinedDate: "Feb 2025",
    price: "₦1,200",
    bio: "Product Designer at a tech startup. I usually travel with a laptop bag and prefer a quiet ride to focus on my morning coffee.",
    role: "rider" as const,
    verified: true,
    preferences: {
      music: false,
      quiet: true,
      ac: true
    }
  },
  {
    name: "Sarah Chen",
    initials: "SC",
    distance: "1.2 miles",
    overlap: "85%",
    pickup: "2 blocks away",
    dropoff: "Downtown Arts District",
    color: "#E76F32",
    rating: 4.8,
    trips: 89,
    joinedDate: "Dec 2025",
    price: "₦850",
    bio: "Digital nomad and art lover. I enjoy meeting new people and discovering the best coffee spots in the city.",
    role: "rider" as const,
    verified: true,
    preferences: {
      music: true,
      quiet: false,
      ac: true
    }
  },
  {
    name: "Michael Obi",
    initials: "MO",
    distance: "2.1 miles",
    overlap: "78%",
    pickup: "Lekki Phase 1",
    dropoff: "Victoria Island",
    color: "#32D74B",
    rating: 5.0,
    trips: 212,
    joinedDate: "Jan 2024",
    price: "₦2,500",
    bio: "Business executive. I value punctuality and professional service. Frequent traveler between Lagos hubs.",
    role: "rider" as const,
    verified: true,
    preferences: {
      music: false,
      quiet: true,
      ac: true
    }
  },
  {
    name: "Jane Doe",
    initials: "JD",
    distance: "0.5 miles",
    overlap: "95%",
    pickup: "Origin Point A",
    dropoff: "Destination B",
    color: "#9B51E0",
    rating: 4.7,
    trips: 45,
    joinedDate: "Mar 2026",
    price: "₦900",
    bio: "Student exploring the city. I'm always up for a good conversation about music or local tech events.",
    role: "rider" as const,
    verified: false,
    preferences: {
      music: true,
      quiet: false,
      ac: false
    }
  },
  {
    name: "John Smith",
    initials: "JS",
    distance: "3.5 miles",
    overlap: "70%",
    pickup: "Origin Point C",
    dropoff: "Destination D",
    color: "#27AE60",
    rating: 4.6,
    trips: 112,
    joinedDate: "Nov 2025",
    price: "₦1,800",
    bio: "Software engineer. I commute daily and appreciate a reliable and safe ride.",
    role: "rider" as const,
    verified: true,
    preferences: {
      music: false,
      quiet: true,
      ac: true
    }
  },
];

export default function DriverDashboard() {
  const [dashboardState, setDashboardState] = useState("idle");
  const [availableRiders, setAvailableRiders] = useState(MOCK_RIDERS);
  const [showMatches, setShowMatches] = useState(false);
  const [selectedRider, setSelectedRider] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [isHandshakeOpen, setIsHandshakeOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [activeTrip, setActiveTrip] = useState<any>(null);

  // Simulate finding matches after a delay when in matching state
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (dashboardState === "matching") {
      timeout = setTimeout(() => {
        setShowMatches(true);
      }, 3000);
    } else {
      setShowMatches(false);
    }
    return () => clearTimeout(timeout);
  }, [dashboardState]);

  const handleViewMore = (rider: any) => {
    setSelectedRider(rider);
    setIsModalOpen(true);
  };

  const handleAccept = (rider: any) => {
    setActiveTrip(rider);
    setDashboardState("enroute");
    setShowMatches(false);
  };

  const handleReject = (name: string) => {
    setAvailableRiders(prev => prev.filter(r => r.name !== name));
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden">
      {/* ── Main Content Area ── */}
      <main className="relative flex-1 h-full bg-[#f8fafc] overflow-hidden flex flex-col lg:flex-row">
        {/* Interaction Sidebar (Desktop) / Full Content (Mobile) */}
        <aside className="w-full lg:w-[420px] h-full bg-white border-r border-primary/5 flex flex-col p-5 lg:p-12 pb-24 lg:pb-32 relative z-20 overflow-y-auto custom-scrollbar">
          <RideOfferPanel 
            onStateChange={setDashboardState} 
            dashboardState={dashboardState}
            activeTrip={selectedRider}
            matches={dashboardState === "matching" ? MOCK_RIDERS : []}
            onSelectRider={(rider) => {
              setSelectedRider(rider);
              setDashboardState("enroute");
            }}
            onViewMore={(rider) => {
              setSelectedRider(rider);
              setIsModalOpen(true);
            }}
            onOpenMap={() => setIsMapFullscreen(true)}
            activeTripHUD={dashboardState === "enroute" || dashboardState === "ongoing" ? (
              <ActiveTripHUD 
                rider={selectedRider}
                onCancel={() => setIsCancelOpen(true)}
                onArrived={() => setIsHandshakeOpen(true)}
                onComplete={() => setIsCheckoutOpen(true)}
                tripState={dashboardState}
                variant="inline"
              />
            ) : null}
          />
        </aside>

        {/* Live Map (Desktop only background, Mobile hidden by default) */}
        <div className="hidden lg:block relative flex-1 h-full overflow-hidden">
          <DriverMap matching={dashboardState === "matching" || dashboardState === "enroute"} />
          
          {/* Floating Rider Matches (Desktop only) */}
          <AnimatePresence>
            {dashboardState === "matching" && (
              <div className="absolute top-12 left-12 z-20 flex flex-col gap-4 pointer-events-none">
                {MOCK_RIDERS.map((rider, idx) => (
                  <RiderMatchCard 
                    key={rider.name}
                    rider={rider}
                    onAccept={() => {
                      setSelectedRider(rider);
                      setDashboardState("enroute");
                    }}
                    onReject={() => handleReject(rider.name)}
                    onViewMore={() => { setSelectedRider(rider); setIsModalOpen(true); }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Active Trip HUD (Desktop only) */}
          <AnimatePresence>
            {(dashboardState === "enroute" || dashboardState === "ongoing") && (
              <ActiveTripHUD 
                rider={selectedRider}
                onAbort={() => setIsCancelOpen(true)}
                onVerify={() => setIsHandshakeOpen(true)}
                onComplete={() => setIsCheckoutOpen(true)}
                status={dashboardState === "enroute" ? "En Route to Pickup" : "Passenger Onboard"}
              />
            )}
          </AnimatePresence>

          {/* Status Info (Desktop only) */}
          <div className="absolute bottom-10 right-10 z-10">
             <div className="bg-primary px-6 py-4 rounded-xl shadow-2xl shadow-primary/20 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                   <Globe size={20} className="text-white/60" />
                </div>
                <div>
                   <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-1">Network Status</span>
                   <p className="text-[13px] font-black text-white">9 Active Riders Nearby</p>
                </div>
             </div>
          </div>
        </div>

        {/* Floating Modals (Global) */}
        <PersonDetailsModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          person={selectedRider}
          onAccept={() => {
            setDashboardState("enroute");
            setIsModalOpen(false);
          }}
        />

        <HandshakeModal
          isOpen={isHandshakeOpen}
          onClose={() => setIsHandshakeOpen(false)}
          onVerify={() => {
            setIsHandshakeOpen(false);
            setDashboardState("ongoing");
          }}
          role="driver"
          partnerName={selectedRider?.name || "Rider"}
        />
        
        <TripCheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onComplete={() => {
             setIsCheckoutOpen(false);
             setDashboardState("idle");
             setSelectedRider(null);
          }}
          role="driver"
          partnerName={selectedRider?.name || "Rider"}
          fare={selectedRider?.price || "₦1,200"}
        />
        
        <CancellationModal
          isOpen={isCancelOpen}
          onClose={() => setIsCancelOpen(false)}
          onConfirm={(reason) => {
            console.log("Trip cancelled due to:", reason);
            setIsCancelOpen(false);
            setDashboardState("idle");
            setSelectedRider(null);
          }}
          role="driver"
        />

        {/* Fullscreen Map Modal (Global) */}
        <MapModal 
          isOpen={isMapFullscreen} 
          onClose={() => setIsMapFullscreen(false)}
          matching={dashboardState === "matching" || dashboardState === "enroute"}
        />
      </main>
    </div>
  );
}
