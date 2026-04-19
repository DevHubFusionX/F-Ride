"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

/* ────────────────────────────────────────────────────────────── */
/* ─── Types ─── */
/* ────────────────────────────────────────────────────────────── */

export type TripRole = "rider" | "driver" | "courier";

export interface PartnerInfo {
  _id?: string;
  name: string;
  initials: string;
  distance: string;
  overlap: string;
  pickup: string;
  dropoff: string;
  color: string;
  rating?: number;
  price?: string;
  bio?: string;
  role?: "rider" | "driver" | "courier";
  verified?: boolean;
  trips?: number;
  joinedDate?: string;
  languages?: string[];
  vehicle?: {
    model: string;
    color: string;
    plate: string;
  };
}

export interface PackageInfo {
  id: string;
  weight: string;
  priority: string;
  fragile: boolean;
  pickup: string;
  destination: string;
}

/* ────────────────────────────────────────────────────────────── */
/* ─── Context Interface ─── */
/* ────────────────────────────────────────────────────────────── */

interface TripContextType {
  /* ── Per-Role Dashboard State ── */
  riderState: string;
  setRiderState: (s: string) => void;
  riderShowDrivers: boolean;
  setRiderShowDrivers: (b: boolean) => void;

  driverState: string;
  setDriverState: (s: string) => void;
  driverShowMatches: boolean;
  setDriverShowMatches: (b: boolean) => void;

  courierState: string;
  setCourierState: (s: string) => void;
  courierTrackingActive: boolean;
  setCourierTrackingActive: (b: boolean) => void;

  /* ── Shared Trip Data ── */
  selectedPartner: PartnerInfo | null;
  setSelectedPartner: (p: PartnerInfo | null) => void;
  activeTripId: string | null;
  activePackage: PackageInfo | null;
  setActivePackage: (p: PackageInfo | null) => void;

  /* ── Shared Modal State ── */
  isHandshakeOpen: boolean;
  handshakeRole: TripRole;
  handshakePartnerName: string;
  openHandshake: (role: TripRole, partnerName: string) => void;
  closeHandshake: () => void;

  isCheckoutOpen: boolean;
  checkoutRole: TripRole;
  checkoutPartnerName: string;
  checkoutFare: string;
  openCheckout: (role: TripRole, partnerName: string, fare: string) => void;
  closeCheckout: () => void;

  isCancelOpen: boolean;
  cancelRole: TripRole;
  openCancel: (role: TripRole) => void;
  closeCancel: () => void;

  isMapFullscreen: boolean;
  mapMatching: boolean;
  openMapFullscreen: (matching: boolean) => void;
  closeMapFullscreen: () => void;

  isPersonModalOpen: boolean;
  personModalData: PartnerInfo | null;
  openPersonModal: (person: PartnerInfo) => void;
  closePersonModal: () => void;

  /* ── Trip Lifecycle Actions ── */
  createTrip: (pickup: string, dropoff: string) => Promise<void>;
  bookPartner: (partner: PartnerInfo) => Promise<void>;
  acceptRider: (rider: PartnerInfo) => Promise<void>;
  goOnline: (destination: string) => Promise<void>;
  goOffline: () => Promise<void>;
  dispatchCourier: () => Promise<void>;
  completeHandshake: (role: TripRole) => void;
  completeTrip: (role: TripRole) => void;
  cancelTrip: (role: TripRole, reason?: string) => void;
  resetRole: (role: TripRole) => void;
}

/* ────────────────────────────────────────────────────────────── */
/* ─── Context & Provider ─── */
/* ────────────────────────────────────────────────────────────── */

const TripContext = createContext<TripContextType | undefined>(undefined);

import { useTrips } from "@/hooks/useTrips";
import { useLocation } from "@/contexts/LocationContext";

export function TripProvider({ children }: { children: ReactNode }) {
  /* ── Per-Role State ── */
  const [riderState, setRiderState] = useState("idle");
  const [riderShowDrivers, setRiderShowDrivers] = useState(false);
  const [riderDestination, setRiderDestination] = useState("");

  const [driverState, setDriverState] = useState("idle");
  const [driverShowMatches, setDriverShowMatches] = useState(false);
  const [driverDestination, setDriverDestination] = useState("");

  /* ── API Hooks ── */
  const riderApi = useTrips("rider", riderDestination);
  const driverApi = useTrips("driver", driverDestination);
  const courierApi = useTrips("courier");
  const { userLocation } = useLocation();

  const [courierState, setCourierState] = useState("idle");
  const [courierTrackingActive, setCourierTrackingActive] = useState(false);

  /* ── Shared Data ── */
  const [selectedPartner, setSelectedPartner] = useState<PartnerInfo | null>(null);
  const [activeTripId, setActiveTripId] = useState<string | null>(null);
  const [activePackage, setActivePackage] = useState<PackageInfo | null>(null);

  /* ── Modal State ── */
  const [isHandshakeOpen, setIsHandshakeOpen] = useState(false);
  const [handshakeRole, setHandshakeRole] = useState<TripRole>("rider");
  const [handshakePartnerName, setHandshakePartnerName] = useState("");

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutRole, setCheckoutRole] = useState<TripRole>("rider");
  const [checkoutPartnerName, setCheckoutPartnerName] = useState("");
  const [checkoutFare, setCheckoutFare] = useState("");

  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [cancelRole, setCancelRole] = useState<TripRole>("rider");

  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [mapMatching, setMapMatching] = useState(false);

  const [isPersonModalOpen, setIsPersonModalOpen] = useState(false);
  const [personModalData, setPersonModalData] = useState<PartnerInfo | null>(null);

  /* ── Modal Openers ── */
  const openHandshake = useCallback((role: TripRole, partnerName: string) => {
    setHandshakeRole(role);
    setHandshakePartnerName(partnerName);
    setIsHandshakeOpen(true);
  }, []);

  const closeHandshake = useCallback(() => setIsHandshakeOpen(false), []);

  const openCheckout = useCallback((role: TripRole, partnerName: string, fare: string) => {
    setCheckoutRole(role);
    setCheckoutPartnerName(partnerName);
    setCheckoutFare(fare);
    setIsCheckoutOpen(true);
  }, []);

  const closeCheckout = useCallback(() => setIsCheckoutOpen(false), []);

  const openCancel = useCallback((role: TripRole) => {
    setCancelRole(role);
    setIsCancelOpen(true);
  }, []);

  const closeCancel = useCallback(() => setIsCancelOpen(false), []);

  const openMapFullscreen = useCallback((matching: boolean) => {
    setMapMatching(matching);
    setIsMapFullscreen(true);
  }, []);

  const closeMapFullscreen = useCallback(() => setIsMapFullscreen(false), []);

  const openPersonModal = useCallback((person: PartnerInfo) => {
    setPersonModalData(person);
    setIsPersonModalOpen(true);
  }, []);

  const closePersonModal = useCallback(() => setIsPersonModalOpen(false), []);

  /* ── Lifecycle Actions ── */
  const createTrip = useCallback(async (pickup: string, dropoff: string) => {
    try {
      setRiderDestination(dropoff);
      const coords: [number, number] = userLocation
        ? [userLocation.lng, userLocation.lat]
        : [7.49508, 9.05785];
      await riderApi.executeAction.mutateAsync({
        action: "create",
        pickup: { address: pickup || "Current Location", coordinates: coords },
        dropoff: { address: dropoff, coordinates: coords },
        fare: 2500,
      });
      setActiveTripId(riderApi.executeAction.data?.trip?._id || null);
      setRiderState("searching");
      setRiderShowDrivers(true);
    } catch (error) {
      console.error("Failed to create trip:", error);
    }
  }, [riderApi, userLocation]);

  const bookPartner = useCallback(async (driver: PartnerInfo) => {
    try {
      setSelectedPartner(driver);
      setRiderState("booked");
      setRiderShowDrivers(false);
      await riderApi.executeAction.mutateAsync({ action: "book_driver", partnerId: driver._id || driver.name });
    } catch (error) {
      console.error("Failed to book driver:", error);
    }
  }, [riderApi]);

  const goOnline = useCallback(async (destination: string) => {
    try {
      setDriverDestination(destination);
      await driverApi.executeAction.mutateAsync({ action: "go_online", destination } as any);
      setDriverState("matching");
      setDriverShowMatches(true);
      driverApi.matches.refetch();
    } catch (error) {
      console.error("Failed to go online:", error);
    }
  }, [driverApi]);

  const goOffline = useCallback(async () => {
    try {
      await driverApi.executeAction.mutateAsync({ action: "go_offline" } as any);
      setDriverDestination("");
      setDriverState("idle");
      setDriverShowMatches(false);
    } catch (error) {
      console.error("Failed to go offline:", error);
    }
  }, [driverApi]);

  const acceptRider = useCallback(async (rider: PartnerInfo) => {
    try {
      setSelectedPartner(rider);
      setDriverState("enroute");
      setDriverShowMatches(false);
      await driverApi.executeAction.mutateAsync({ action: "accept_rider", partnerId: rider._id || rider.name });
    } catch (error) {
      console.error("Failed to accept rider:", error);
    }
  }, [driverApi]);

  const dispatchCourier = useCallback(async () => {
    try {
      setCourierState("dispatching");
      await courierApi.executeAction.mutateAsync({ 
        action: "create",
        pickup: { address: "Logistics Hub A", coordinates: [7.49508, 9.05785] },
        dropoff: { address: "Tech District B", coordinates: [7.48925, 9.07721] },
        fare: 850,
      });

      // Auto-trigger handshake for demo purposes
      setTimeout(() => {
        openHandshake("courier", "Logistics Hub A");
      }, 4000);
    } catch (error) {
      console.error("Failed to dispatch courier:", error);
    }
  }, [courierApi, openHandshake]);

  const completeHandshake = useCallback(async (role: TripRole) => {
    try {
      setIsHandshakeOpen(false);
      
      // Server Sync
      const api = role === "rider" ? riderApi : role === "driver" ? driverApi : courierApi;
      await api.executeAction.mutateAsync({ action: "handshake_complete" });

      if (role === "rider") {
        setRiderState("ongoing");
      } else if (role === "driver") {
        setDriverState("ongoing");
      } else if (role === "courier") {
        setActivePackage({
          id: "PKG-7729-FR",
          weight: "4.5kg",
          priority: "Express",
          fragile: true,
          pickup: "Downtown Hub A",
          destination: "Tech District B",
        });
        setCourierTrackingActive(true);
        setCourierState("tracking");
      }
    } catch (error) {
      console.error("Failed to complete handshake:", error);
      // In a real app, we might show a toast notice here
    }
  }, [riderApi, driverApi, courierApi]);

  const completeTrip = useCallback(async (role: TripRole) => {
    try {
      setIsCheckoutOpen(false);

      // Server Sync
      const api = role === "rider" ? riderApi : role === "driver" ? driverApi : courierApi;
      await api.executeAction.mutateAsync({ action: "trip_complete" });

      if (role === "rider") {
        setRiderState("idle");
        setSelectedPartner(null);
        setRiderShowDrivers(false);
      } else if (role === "driver") {
        setDriverState("idle");
        setSelectedPartner(null);
        setDriverShowMatches(false);
      } else if (role === "courier") {
        setCourierState("idle");
        setCourierTrackingActive(false);
        setActivePackage(null);
      }
    } catch (error) {
      console.error("Failed to complete trip:", error);
    }
  }, [riderApi, driverApi, courierApi]);

  const cancelTrip = useCallback(async (role: TripRole, reason?: string) => {
    try {
      if (reason) console.log(`Trip cancelled (${role}) due to:`, reason);
      setIsCancelOpen(false);

      // Server Sync
      const api = role === "rider" ? riderApi : role === "driver" ? driverApi : courierApi;
      await api.executeAction.mutateAsync({ action: "trip_cancel" });

      if (role === "rider") {
        setRiderState("idle");
        setSelectedPartner(null);
        setRiderShowDrivers(false);
      } else if (role === "driver") {
        setDriverState("idle");
        setSelectedPartner(null);
        setDriverShowMatches(false);
      } else if (role === "courier") {
        setCourierState("idle");
        setCourierTrackingActive(false);
        setActivePackage(null);
      }
    } catch (error) {
      console.error("Failed to cancel trip:", error);
    }
  }, [riderApi, driverApi, courierApi]);

  const resetRole = useCallback((role: TripRole) => {
    if (role === "rider") {
      setRiderState("idle");
      setRiderShowDrivers(false);
    } else if (role === "driver") {
      setDriverState("idle");
      setDriverShowMatches(false);
    } else if (role === "courier") {
      setCourierState("idle");
      setCourierTrackingActive(false);
      setActivePackage(null);
    }
  }, []);

  return (
    <TripContext.Provider
      value={{
        riderState, setRiderState, riderShowDrivers, setRiderShowDrivers,
        driverState, setDriverState, driverShowMatches, setDriverShowMatches,
        courierState, setCourierState, courierTrackingActive, setCourierTrackingActive,
        selectedPartner, setSelectedPartner,
        activeTripId,
        activePackage, setActivePackage,
        isHandshakeOpen, handshakeRole, handshakePartnerName, openHandshake, closeHandshake,
        isCheckoutOpen, checkoutRole, checkoutPartnerName, checkoutFare, openCheckout, closeCheckout,
        isCancelOpen, cancelRole, openCancel, closeCancel,
        isMapFullscreen, mapMatching, openMapFullscreen, closeMapFullscreen,
        isPersonModalOpen, personModalData, openPersonModal, closePersonModal,
        createTrip, bookPartner, acceptRider, goOnline, goOffline, dispatchCourier,
        completeHandshake, completeTrip, cancelTrip, resetRole,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTripContext() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error("useTripContext must be used within a TripProvider");
  }
  return context;
}
