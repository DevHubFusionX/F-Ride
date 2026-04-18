import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/axios-client";
import { z } from "zod";

const NotificationSchema = z.object({
  _id: z.string(),
  type: z.enum(['security', 'trip', 'courier', 'match', 'system']),
  title: z.string(),
  message: z.string(),
  isRead: z.boolean(),
  createdAt: z.string(),
});

const NotificationsResponseSchema = z.object({
  data: z.array(NotificationSchema),
  pagination: z.object({
    total: z.number(),
    pages: z.number(),
  }),
});

export type NotificationType = z.infer<typeof NotificationSchema>;

export function useNotifications() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data } = await api.get("/notifications");
      return NotificationsResponseSchema.parse(data);
    },
    staleTime: 30_000, // 30 seconds
  });

  const markRead = useMutation({
    mutationFn: async (ids: string[] | "all") => {
      await api.put("/notifications/read", { ids });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return {
    ...query,
    markRead,
  };
}
