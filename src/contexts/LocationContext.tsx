"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LocationContextType {
  userLocation: { lat: number; lng: number } | null;
  isLoading: boolean;
  error: string | null;
  updateLocation: () => void;
  watchLocation: boolean;
  setWatchLocation: (watch: boolean) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [watchLocation, setWatchLocation] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);

  const updateLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
        // Fallback to default location (Abuja, Nigeria)
        setUserLocation({
          lat: 9.0820,
          lng: 7.5324,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Initial location fetch
  useEffect(() => {
    updateLocation();
  }, []);

  // Watch location if enabled
  useEffect(() => {
    if (!watchLocation || !navigator.geolocation) {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        setWatchId(null);
      }
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.error("Watch position error:", err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    setWatchId(id);

    return () => {
      if (id !== null) {
        navigator.geolocation.clearWatch(id);
      }
    };
  }, [watchLocation]);

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        isLoading,
        error,
        updateLocation,
        watchLocation,
        setWatchLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}