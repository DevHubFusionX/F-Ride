import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/axios-client";
import { PartnerSchema } from "@/lib/api/schemas";
import { z } from "zod";
import { useLocation } from "@/contexts/LocationContext";

/* ────────────────────────────────────────────────────────────── */
/* ─── Response Schemas                                      ─── */
/* ────────────────────────────────────────────────────────────── */

const MatchesResponseSchema = z.object({
  data: z.array(PartnerSchema),
});

const TripActionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  trip: z.any().optional(),
  timestamp: z.string().optional(),
});

/* ────────────────────────────────────────────────────────────── */
/* ─── Hook                                                  ─── */
/* ────────────────────────────────────────────────────────────── */

/**
 * Hook to manage the Trip lifecycle: searching for matches,
 * executing lifecycle actions (book, accept, handshake, complete, cancel).
 *
 * Uses TanStack Query for caching, deduplication, and background refetching.
 */
export function useTrips(role: "rider" | "driver" | "courier") {
  const queryClient = useQueryClient();
  const { userLocation } = useLocation();

  const matches = useQuery({
    queryKey: ["matches", role],
    queryFn: async () => {
      const params = new URLSearchParams({ role });
      if (userLocation) {
        params.set("lat", userLocation.lat.toString());
        params.set("lng", userLocation.lng.toString());
      }
      const { data } = await api.get(`/trips?${params.toString()}`);
      return MatchesResponseSchema.parse(data);
    },
    enabled: false,
    staleTime: 30_000,
    retry: 2,
  });

  const executeAction = useMutation({
    mutationFn: async ({
      action,
      partnerId,
      pickup,
      dropoff,
      fare,
    }: {
      action: string;
      partnerId?: number | string;
      pickup?: { address: string; coordinates: number[] };
      dropoff?: { address: string; coordinates: number[] };
      fare?: number;
    }) => {
      const { data } = await api.post("/trips", {
        action,
        role,
        id: partnerId,
        pickup,
        dropoff,
        fare,
      });
      return TripActionResponseSchema.parse(data);
    },
    onSuccess: () => {
      // Invalidate relevant queries to keep UI in sync
      queryClient.invalidateQueries({ queryKey: ["activity"] });
      queryClient.invalidateQueries({ queryKey: ["earnings"] });
      queryClient.invalidateQueries({ queryKey: ["matches", role] });
    },
  });

  return {
    matches,
    executeAction,
  };
}
