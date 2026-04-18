import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios-client";
import { z } from "zod";

/* ────────────────────────────────────────────────────────────── */
/* ─── Response Schema                                       ─── */
/* ────────────────────────────────────────────────────────────── */

const EarningsResponseSchema = z.object({
  data: z.object({
    daily: z.array(
      z.object({
        day: z.string(),
        amount: z.number(),
      })
    ),
    summary: z.object({
      total: z.string(),
      avgDaily: z.string(),
      topZone: z.string(),
      carbonSaved: z.string(),
    }),
  }),
});

/* ────────────────────────────────────────────────────────────── */
/* ─── Hook                                                  ─── */
/* ────────────────────────────────────────────────────────────── */

/**
 * Hook to fetch visual and summary financial data.
 * Calls the real backend at `GET /api/activity/earnings`.
 *
 * Returns daily breakdowns and aggregate summary stats
 * computed from completed trips and delivered packages.
 */
export function useEarnings() {
  return useQuery({
    queryKey: ["earnings"],
    queryFn: async () => {
      const { data } = await api.get("/activity/earnings");
      return EarningsResponseSchema.parse(data);
    },
    staleTime: 2 * 60_000, // 2 minutes: earnings change less frequently
    retry: 2,
  });
}
