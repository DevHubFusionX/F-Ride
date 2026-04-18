"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLocation } from "@/contexts/LocationContext";

// Fix for default marker icons in Leaflet - moved inside component to avoid SSR issues
const fixLeafletIcons = () => {
  if (typeof window !== "undefined") {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }
};

interface DriverMapProps {
  activeTrip?: any;
  matching?: boolean;
  fullscreen?: boolean;
  variant?: "full" | "mini";
}

function MapEvents({ setCoords }: { setCoords: (c: { lng: number; lat: number }) => void }) {
  useMapEvents({
    mousemove: (e) => {
      setCoords({ lng: e.latlng.lng, lat: e.latlng.lat });
    },
  });
  return null;
}

/**
 * NOTE: Aggressive auto-centering has been removed to allow free dragging.
 * Manual recentering is available via the UI controls.
 */
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  const [hasCentred, setHasCentred] = useState(false);
  
  useEffect(() => {
    if (center && !hasCentred) {
      map.setView(center, map.getZoom(), { animate: true });
      setHasCentred(true);
    }
  }, [center, map, hasCentred]);
  
  return null;
}

function ZoomControl({ onZoomIn, onZoomOut }: { onZoomIn: () => void; onZoomOut: () => void }) {
  const map = useMap();
  
  useEffect(() => {
    const handleZoomIn = () => map.zoomIn();
    const handleZoomOut = () => map.zoomOut();
    
    return () => {};
  }, [map]);
  
  return null;
}

// Mock data for nearby drivers/riders
const MOCK_LOCATIONS = [
  { id: 1, lat: 9.0820, lng: 8.6753, name: "Driver A", type: "driver", status: "available" },
  { id: 2, lat: 9.0950, lng: 8.6850, name: "Driver B", type: "driver", status: "busy" },
  { id: 3, lat: 9.0700, lng: 8.6650, name: "Rider C", type: "rider", status: "waiting" },
  { id: 4, lat: 9.0880, lng: 8.6720, name: "Driver D", type: "driver", status: "available" },
  { id: 5, lat: 9.0760, lng: 8.6800, name: "Rider E", type: "rider", status: "waiting" },
];

export default function DriverMap({ activeTrip, matching, fullscreen = false, variant = "full" }: DriverMapProps) {
  const { userLocation, isLoading: locationLoading, updateLocation, setWatchLocation } = useLocation();
  const [coords, setCoords] = useState<{ lng: number; lat: number }>({ lng: 8.6753, lat: 9.0820 });
  const mapRef = useRef<L.Map | null>(null);
  const [showTraffic, setShowTraffic] = useState(false);
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
    fixLeafletIcons(); // Run icon fix once on client
    setWatchLocation(true); // Enable location tracking
    return () => setWatchLocation(false);
  }, [setWatchLocation]);

  // Get map center from user location or default
  const mapCenter: [number, number] = userLocation 
    ? [userLocation.lat, userLocation.lng] 
    : [9.0820, 7.5324];

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  const handleRecenter = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.setView([userLocation.lat, userLocation.lng], 12, { animate: true });
    }
  };

  const handleMyLocation = () => {
    updateLocation();
    if (userLocation && mapRef.current) {
      mapRef.current.setView([userLocation.lat, userLocation.lng], 14, { animate: true });
    }
  };

  // Custom icon for user location
  const userLocationIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="#2D9CDB" stroke="white" stroke-width="4"/>
        <circle cx="20" cy="20" r="8" fill="white"/>
        <circle cx="20" cy="20" r="4" fill="#2D9CDB"/>
      </svg>
    `),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });

  // Custom icons for markers
  const driverIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" fill="#2D9CDB" stroke="white" stroke-width="3"/>
        <path d="M16 10L18 14H22L18.5 17L20 22L16 19L12 22L13.5 17L10 14H14L16 10Z" fill="white"/>
      </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });

  const riderIcon = new L.Icon({
    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" fill="#E76F32" stroke="white" stroke-width="3"/>
        <circle cx="16" cy="16" r="6" fill="white"/>
      </svg>
    `),
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });

  // Don't render map until client-side
  if (!isClient) {
    return (
      <div className={`${fullscreen ? 'absolute' : 'fixed'} inset-0 bg-[#f0f4f8] z-0 overflow-hidden flex items-center justify-center`}>
        <div className="text-primary/30 text-sm font-medium">Loading map...</div>
      </div>
    );
  }

  const isMini = variant === "mini";

  return (
    <div className={`${fullscreen ? 'absolute' : (isMini ? 'relative' : 'absolute')} inset-0 bg-[#f0f4f8] z-0 overflow-hidden pointer-events-auto`}>
      <div className="w-full h-full opacity-90 pointer-events-auto">
        <MapContainer
          key={`map-${variant}-${fullscreen}`}
          center={mapCenter}
          zoom={isMini ? 11 : 12}
          zoomControl={false}
          dragging={true}
          touchZoom={true}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%", background: "#f0f4f8" }}
        >
          <TileLayer
            url={mapType === 'standard' 
              ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              : "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            }
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* Update map center when user location changes */}
          <MapUpdater center={mapCenter} />
          
          {/* User's current location marker */}
          {userLocation && (
            <>
              <Marker 
                position={[userLocation.lat, userLocation.lng]}
                icon={userLocationIcon}
              >
                <Popup>
                  <div className="text-center">
                    <p className="font-bold text-primary">Your Location</p>
                    <p className="text-xs text-primary/60">Current Position</p>
                  </div>
                </Popup>
              </Marker>
              
              {/* Accuracy circle around user */}
              <Circle
                center={[userLocation.lat, userLocation.lng]}
                radius={100}
                pathOptions={{
                  color: '#2D9CDB',
                  fillColor: '#2D9CDB',
                  fillOpacity: 0.1,
                  weight: 2,
                }}
              />
            </>
          )}
          
          {/* Show markers for nearby drivers/riders */}
          {MOCK_LOCATIONS.map((location) => (
            <Marker 
              key={location.id} 
              position={[location.lat, location.lng]}
              icon={location.type === 'driver' ? driverIcon : riderIcon}
            >
              <Popup>
                <div className="text-center">
                  <p className="font-bold text-primary">{location.name}</p>
                  <p className="text-xs text-primary/60 capitalize">{location.type} - {location.status}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          <MapEvents setCoords={setCoords} />
          <ZoomControl onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
        </MapContainer>
      </div>
      
      {/* Real-World Radar Sync Overlay */}
      <AnimatePresence>
        {matching && !isMini && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
             <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 2],
                  opacity: [0.4, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeOut" 
                }}
                className="w-[300px] h-[300px] rounded-full border-2 border-[#E76F32]/60 bg-[#E76F32]/10"
             />
             <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.5],
                  opacity: [0.6, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeOut",
                  delay: 1
                }}
                className="absolute w-[300px] h-[300px] rounded-full border-2 border-[#2D9CDB]/40 bg-[#2D9CDB]/10"
             />
             
             {/* Scanning Line */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute w-[600px] h-[3px] bg-gradient-to-r from-transparent via-[#E76F32]/40 to-transparent"
             />
          </div>
        )}
      </AnimatePresence>

      {/* Grid HUD Overlay */}
      {!isMini && (
        <div className="absolute bottom-8 left-12 z-20 pointer-events-none hidden md:block">
           <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-primary/10 shadow-lg">
              <div className="flex items-center gap-4 text-primary/50 mb-2">
                 <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-mono whitespace-nowrap">
                   {locationLoading ? "Locating..." : "Live Location"}
                 </span>
              </div>
              <div className="flex items-baseline gap-6 font-mono">
                 <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-primary/40 uppercase tracking-widest">Longitude</span>
                    <span className="text-[14px] font-bold text-primary tabular-nums tracking-tighter">
                      {userLocation ? userLocation.lng.toFixed(4) : coords.lng.toFixed(4)}°E
                    </span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-primary/40 uppercase tracking-widest">Latitude</span>
                    <span className="text-[14px] font-bold text-primary tabular-nums tracking-tighter">
                      {userLocation ? userLocation.lat.toFixed(4) : coords.lat.toFixed(4)}°N
                    </span>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Map Controls - Top Right */}
      {!isMini && (
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          {/* Map Type Toggle */}
          <button
            onClick={() => setMapType(mapType === 'standard' ? 'satellite' : 'standard')}
            className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/10 shadow-lg hover:bg-white transition-all text-[11px] font-bold text-primary uppercase tracking-wider"
          >
            {mapType === 'standard' ? '🛰️ Satellite' : '🗺️ Map'}
          </button>
          
          {/* My Location Button */}
          <button
            onClick={handleMyLocation}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-primary/10 shadow-lg hover:bg-white transition-all text-primary"
            title="My Location"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="2" x2="12" y2="4"/>
              <line x1="12" y1="20" x2="12" y2="22"/>
              <line x1="2" y1="12" x2="4" y2="12"/>
              <line x1="20" y1="12" x2="22" y2="12"/>
            </svg>
          </button>
  
          {/* Recenter Button */}
          <button
            onClick={handleRecenter}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-primary/10 shadow-lg hover:bg-white transition-all text-primary"
            title="Recenter Map"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M12 3v18"/>
              <circle cx="12" cy="12" r="9"/>
            </svg>
          </button>
        </div>
      )}

      {/* Legend */}
      {!isMini && (
        <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-primary/10 shadow-lg hidden lg:block">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-2">Legend</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#2D9CDB] border-2 border-white"></div>
              <span className="text-[11px] font-medium text-primary">Available Drivers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#E76F32] border-2 border-white"></div>
              <span className="text-[11px] font-medium text-primary">Waiting Riders</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
