import { z } from "zod";

export const reportQuerySchema = z.object({
  startDate: z
    .string()
    .datetime({ message: "Invalid startDate ISO format (e.g. 2026-08-01T00:00:00Z)" })
    .optional(),
  endDate: z
    .string()
    .datetime({ message: "Invalid endDate ISO format (e.g. 2026-08-31T23:59:59Z)" })
    .optional(),
  salesRepId: z
    .string()
    .uuid("Invalid Sales Rep user UUID format")
    .optional(),
});

export type ReportQueryInput = z.infer<typeof reportQuerySchema>;