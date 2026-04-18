"use client";

import { useEffect } from "react";

const HEALTH_URL = `${process.env.NEXT_PUBLIC_API_URL}/health`;
const INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

export default function KeepAlive() {
  useEffect(() => {
    const ping = () =>
      fetch(HEALTH_URL, { method: "GET", cache: "no-store" }).catch(() => {});

    // Ping immediately on mount to wake up cold starts
    ping();

    const id = setInterval(ping, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return null;
}
