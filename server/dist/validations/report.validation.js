"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportQuerySchema = void 0;
const zod_1 = require("zod");
exports.reportQuerySchema = zod_1.z.object({
    startDate: zod_1.z
        .string()
        .datetime({ message: "Invalid startDate ISO format (e.g. 2026-08-01T00:00:00Z)" })
        .optional(),
    endDate: zod_1.z
        .string()
        .datetime({ message: "Invalid endDate ISO format (e.g. 2026-08-31T23:59:59Z)" })
        .optional(),
    salesRepId: zod_1.z
        .string()
        .uuid("Invalid Sales Rep user UUID format")
        .optional(),
});
