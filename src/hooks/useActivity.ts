import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios-client";
import { ActivityItemSchema, ActivityStatsSchema } from "@/lib/api/schemas";
import { z } from "zod";

/* ────────────────────────────────────────────────────────────── */
/* ─── Response Schema                                       ─── */
/* ────────────────────────────────────────────────────────────── */

const ActivityResponseSchema = z.object({
  data: z.array(ActivityItemSchema),
  stats: ActivityStatsSchema,
  pagination: z
    .object({
      total: z.number(),
      pages: z.number(),
    })
    .optional(),
});

/* ────────────────────────────────────────────────────────────── */
/* ─── Hook                                                  ─── */
/* ────────────────────────────────────────────────────────────── */

/**
 * Hook to fetch the user's unified activity feed (trips + packages + earnings).
 * Handles loading, error, and caching automatically via TanStack Query.
 *
 * Data is fetched from the real backend at `GET /api/activity`.
 */
export function useActivity() {
  return useQuery({
    queryKey: ["activity"],
    queryFn: async () => {
      const { data } = await api.get("/activity");
      return ActivityResponseSchema.parse(data);
    },
    staleTime: 60_000, // 1 minute
    retry: 2,
  });
}
