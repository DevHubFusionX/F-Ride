"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Maximize2, Map as MapIcon } from "lucide-react";

const DriverMap = dynamic(() => import("@/components/dashboard/driver/DriverMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0A2540] animate-pulse" />,
});
const MapModal = dynamic(() => import("@/components/dashboard/driver/MapModal"), {
  ssr: false,
});
import RiderTripPanel from "@/components/dashboard/rider/RiderTripPanel";
import RiderMatchCard from "@/components/dashboard/driver/RiderMatchCard";
import RiderActiveTripHUD from "@/components/dashboard/rider/RiderActiveTripHUD";
import PersonDetailsModal from "@/components/modals/PersonDetailsModal";
import HandshakeModal from "@/components/modals/HandshakeModal";
import TripCheckoutModal from "@/components/modals/TripCheckoutModal";
import CancellationModal from "@/components/modals/CancellationModal";
import { AnimatePresence, motion } from "framer-motion";

const MOCK_DRIVERS = [
  {
    name: "Marcus Aurelius",
    initials: "MA",
    distance: "5 mins",
    overlap: "98%",
    pickup: "Your Current Location",
    dropoff: "Silicon Valley Tech Hub", // Correctly matching rider's context
    color: "#2D9CDB",
    rating: 4.9,
    price: "₦2,400",
    bio: "Stoic driver who values silence and safety. Driving a clean Tesla Model S.",
    role: "driver" as const,
    verified: true,
    vehicle: {
      model: "Tesla Model S Plaid",
      color: "Deep Crimson",
      plate: "FRANK-01"
    }
  },
  {
    name: "Elena Rossi",
    initials: "ER",
    distance: "8 mins",
    overlap: "82%",
    pickup: "1 block east",
    dropoff: "Silicon Valley Tech Hub",
    color: "#E76F32",
    rating: 4.7,
    price: "₦1,850",
    bio: "Passionate about city traffic management. Expert driver with 5 years experience.",
    role: "driver" as const,
    verified: true,
    vehicle: {
      model: "Rivian R1S",
      color: "Launch Green",
      plate: "GRN-MOVE"
    }
  },
  {
    name: "Tariq Ali",
    initials: "TA",
    distance: "12 mins",
    overlap: "75%",
    pickup: "3 blocks south",
    dropoff: "Silicon Valley Tech Hub",
    color: "#32D74B",
    rating: 4.8,
    trips: 450,
    joinedDate: "Mar 2024",
    price: "₦1,500",
    bio: "Eco-friendly driver with over 5 years of experience. I drive a clean, hybrid vehicle and enjoy sharing my playlists with riders.",
    role: "driver" as const,
    verified: true,
    languages: ["English", "Yoruba", "French"],
    vehicle: {
      model: "Toyota Camry Hybrid 2022",
      color: "Pearlecent White",
      plate: "LAG-889-TJ"
    }
  },
  {
    name: "Sonia Gupta",
    initials: "SG",
    distance: "15 mins",
    overlap: "65%",
    pickup: "Hub West",
    dropoff: "Silicon Valley Tech Hub",
    color: "#F2994A",
    rating: 4.6,
    trips: 210,
    joinedDate: "July 2025",
    price: "₦1,200",
    bio: "Punctual and safety-conscious. I've been a part-time driver for 2 years and know the best shortcuts to avoid city traffic.",
    role: "driver" as const,
    verified: false,
    languages: ["English", "Hindi"],
    vehicle: {
      model: "Vespa Elettrica",
      color: "Silver",
      plate: "MOV-442-SP"
    }
  },
  {
    name: "Viktor Petrov",
    initials: "VP",
    distance: "4 mins",
    overlap: "90%",
    pickup: "2 blocks North",
    dropoff: "Silicon Valley Tech Hub",
    color: "#EB5757",
    rating: 4.9,
    trips: 842,
    joinedDate: "Sept 2023",
    price: "₦2,100",
    bio: "Professional city driver. I value clear communication and a smooth ride experience. I speak 4 languages and love a good debate.",
    role: "driver" as const,
    verified: true,
    languages: ["English", "Russian", "German", "Spanish"],
    vehicle: {
      model: "Mercedes-Benz E-Class",
      color: "Obsidian Black",
      plate: "VIP-001-RG"
    }
  },
];

export default function RiderDashboard() {
  const [dashboardState, setDashboardState] = useState("idle");
  const [showDrivers, setShowDrivers] = useState(false);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHandshakeOpen, setIsHandshakeOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [activeTrip, setActiveTrip] = useState<any>(null);

  // Simulate finding drivers after a delay when in searching state
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (dashboardState === "searching") {
      timeout = setTimeout(() => {
        setShowDrivers(true);
      }, 3500);
    } else {
      setShowDrivers(false);
    }
    return () => clearTimeout(timeout);
  }, [dashboardState]);

  const handleViewMore = (driver: any) => {
    setSelectedDriver(driver);
    setIsModalOpen(true);
  };

  const handleBook = (driver: any) => {
    setActiveTrip(driver);
    setDashboardState("booked");
    setShowDrivers(false);
    
    // Simulate driver arriving after a few seconds
    setTimeout(() => {
      setIsHandshakeOpen(true);
    }, 4000);
  };

  const handleVerificationComplete = () => {
    setIsHandshakeOpen(false);
    setDashboardState("ongoing");
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden">
      {/* ── Main Content Area ── */}
      <main className="relative flex-1 h-full bg-[#f8fafc] overflow-hidden flex flex-col lg:flex-row">
        {/* Interaction Sidebar (Desktop) / Full Content (Mobile) */}
        <aside className="w-full lg:w-[420px] h-full bg-white border-r border-primary/5 flex flex-col pb-24 lg:pb-32 relative z-20 overflow-y-auto custom-scrollbar">
          <RiderTripPanel 
            onStateChange={setDashboardState} 
            dashboardState={dashboardState}
            activeTrip={selectedDriver}
            matches={dashboardState === "searching" ? MOCK_DRIVERS : []}
            onSelectDriver={(driver) => {
              setSelectedDriver(driver);
              setDashboardState("booked");
            }}
            onViewMore={(driver) => {
              setSelectedDriver(driver);
              setIsModalOpen(true);
            }}
            onOpenMap={() => setIsMapFullscreen(true)}
            activeTripHUD={(dashboardState === "booked" || dashboardState === "ongoing") && selectedDriver ? (
              <RiderActiveTripHUD 
                driver={selectedDriver}
                onCancel={() => setIsCancelOpen(true)}
                onRequestStop={() => setIsCheckoutOpen(true)}
                status={dashboardState === "booked" ? "Driver is En-Route" : "On the way"}
                variant="inline"
              />
            ) : null}
          />
        </aside>

        {/* Live Map (Desktop only background, Mobile hidden by default) */}
        <div className="hidden lg:block relative flex-1 h-full overflow-hidden">
          <DriverMap matching={dashboardState === "searching" || dashboardState === "booked"} />
          
          {/* Floating Driver Matches (Desktop only) */}
          <AnimatePresence>
            {showDrivers && dashboardState === "searching" && (
              <div className="absolute top-12 left-12 z-20 flex flex-col gap-4 pointer-events-none">
                {MOCK_DRIVERS.map((driver, idx) => (
                  <RiderMatchCard 
                    key={driver.name}
                    rider={driver}
                    onAccept={() => {
                      setSelectedDriver(driver);
                      setDashboardState("booked");
                    }}
                    onViewMore={() => {
                       setSelectedDriver(driver);
                       setIsModalOpen(true);
                    }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Active Trip HUD (Desktop only) */}
          <AnimatePresence>
            {(dashboardState === "booked" || dashboardState === "ongoing") && selectedDriver && (
              <RiderActiveTripHUD 
                driver={selectedDriver}
                onCancel={() => setIsCancelOpen(true)}
                onRequestStop={() => setIsCheckoutOpen(true)}
                status={dashboardState === "booked" ? "Driver is En-Route" : "On the way"}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Modals (Global) */}
        <PersonDetailsModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          person={selectedDriver} 
          onAccept={() => {
            setDashboardState("booked");
            setIsModalOpen(false);
          }}
        />
        
        <HandshakeModal
          isOpen={isHandshakeOpen}
          onClose={() => setIsHandshakeOpen(false)}
          onVerify={handleVerificationComplete}
          role="rider"
          partnerName={selectedDriver?.name || "Driver"}
        />
        
        <TripCheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onComplete={() => {
             setIsCheckoutOpen(false);
             setDashboardState("idle");
             setSelectedDriver(null);
          }}
          role="rider"
          partnerName={selectedDriver?.name || "Driver"}
          fare={selectedDriver?.price || "₦2,400"}
        />
        
        <CancellationModal
          isOpen={isCancelOpen}
          onClose={() => setIsCancelOpen(false)}
          onConfirm={(reason) => {
            console.log("Trip cancelled due to:", reason);
            setIsCancelOpen(false);
            setDashboardState("idle");
            setSelectedDriver(null);
          }}
          role="rider"
        />
        
        {/* Map Modal */}
        <MapModal 
          isOpen={isMapFullscreen} 
          onClose={() => setIsMapFullscreen(false)}
          matching={dashboardState === "searching" || dashboardState === "booked"}
        />
      </main>
    </div>
  );
}
