import { z } from "zod";

/**
 * Shared API response schemas using Zod.
 * Used for runtime validation and automatic TypeScript type derivation.
 */

/* ─── Auth ─── */

export const UserRoleSchema = z.enum(["rider", "driver", "courier"]);

export const VehicleInfoSchema = z.object({
  model: z.string(),
  color: z.string(),
  plate: z.string(),
});

export const UserSchema = z.object({
  _id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  role: UserRoleSchema,
  isVerified: z.boolean(),
  profileImage: z.string().optional(),
  rating: z.number().optional(),
  tripsCount: z.number().optional(),
  joinedDate: z.string().optional(),
  bio: z.string().optional(),
  languages: z.array(z.string()).optional(),
  vehicle: VehicleInfoSchema.optional(),
});

export const AuthResponseSchema = z.object({
  _id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  role: UserRoleSchema,
  token: z.string(),
});

export const OTPResponseSchema = z.object({
  message: z.string(),
  debug_otp: z.string().optional(),
});

/* ─── Shared Models ─── */

export const VehicleSchema = z.object({
  model: z.string(),
  color: z.string(),
  plate: z.string(),
});

export const PartnerSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  initials: z.string(),
  distance: z.string(),
  overlap: z.string(),
  pickup: z.string(),
  dropoff: z.string(),
  color: z.string(),
  rating: z.number().optional(),
  price: z.string().optional(),
  bio: z.string().optional(),
  role: z.enum(["rider", "driver", "courier"]).optional(),
  verified: z.boolean().optional(),
  trips: z.number().optional(),
  joinedDate: z.string().optional(),
  languages: z.array(z.string()).optional(),
  vehicle: VehicleSchema.optional(),
});

/* ─── Activity ─── */

export const ActivityItemSchema = z.object({
  id: z.number(),
  type: z.enum(["trip", "courier", "earnings"]),
  title: z.string(),
  date: z.string(),
  amount: z.string(),
  status: z.string(),
  details: z.string(),
  efficiency: z.string(),
});

export const ActivityStatsSchema = z.object({
  syncRate: z.string(),
  totalValue: z.string(),
  co2Offset: z.string(),
});

/* ─── Sub-derived Types ─── */

export type Vehicle = z.infer<typeof VehicleSchema>;
export type Partner = z.infer<typeof PartnerSchema>;
export type ActivityItem = z.infer<typeof ActivityItemSchema>;
export type ActivityStats = z.infer<typeof ActivityStatsSchema>;
