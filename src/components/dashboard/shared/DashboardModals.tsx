"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTripContext } from "@/contexts/TripContext";

const HandshakeModal = dynamic(() => import("@/components/modals/HandshakeModal"), { ssr: false });
const TripCheckoutModal = dynamic(() => import("@/components/modals/TripCheckoutModal"), { ssr: false });
const CancellationModal = dynamic(() => import("@/components/modals/CancellationModal"), { ssr: false });
const PersonDetailsModal = dynamic(() => import("@/components/modals/PersonDetailsModal"), { ssr: false });
const MapModal = dynamic(() => import("@/components/dashboard/driver/MapModal"), { ssr: false });

/**
 * Centralized modal layer for the entire dashboard.
 * Rendered once in the dashboard layout — individual pages no longer
 * need to import or render these modals.
 */
export default function DashboardModals() {
  const [mounted, setMounted] = useState(false);
  const {
    isHandshakeOpen, handshakeRole, handshakePartnerName, closeHandshake, completeHandshake,
    isCheckoutOpen, checkoutRole, checkoutPartnerName, checkoutFare, closeCheckout, completeTrip,
    isCancelOpen, cancelRole, closeCancel, cancelTrip,
    isMapFullscreen, mapMatching, closeMapFullscreen,
    isPersonModalOpen, personModalData, closePersonModal,
    selectedPartner, setSelectedPartner,
    riderState, setRiderState,
    driverState, setDriverState,
  } = useTripContext();

  // Prevent "Router action dispatched before initialization" by ensuring 
  // we only render these client-side components (which might use router/pathname)
  // after the component has mounted in the browser.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <HandshakeModal
        isOpen={isHandshakeOpen}
        onClose={closeHandshake}
        onVerify={() => completeHandshake(handshakeRole)}
        role={handshakeRole}
        partnerName={handshakePartnerName}
      />

      <TripCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={closeCheckout}
        onComplete={() => completeTrip(checkoutRole)}
        role={checkoutRole}
        partnerName={checkoutPartnerName}
        fare={checkoutFare}
      />

      <CancellationModal
        isOpen={isCancelOpen}
        onClose={closeCancel}
        onConfirm={(reason: string) => cancelTrip(cancelRole, reason)}
        role={cancelRole}
      />

      <PersonDetailsModal
        isOpen={isPersonModalOpen}
        onClose={closePersonModal}
        person={personModalData}
        onAccept={() => {
          if (personModalData) {
            setSelectedPartner(personModalData);
            // Determine role from current active tab
            if (riderState === "searching") {
              setRiderState("booked");
            } else if (driverState === "matching") {
              setDriverState("accepted");
            }
          }
          closePersonModal();
        }}
      />

      <MapModal
        isOpen={isMapFullscreen}
        onClose={closeMapFullscreen}
        matching={mapMatching}
      />
    </>
  );
}
