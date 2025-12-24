import { z } from "zod";

export const createStudentSchema = z.object({
    enrollmentId: z.string().min(3),
    name: z.string().min(2),
    department: z.string().min(2),
    semester: z.number().int().min(1).max(8),
    batch: z.string(),
    mentorId: z.string().optional()
});

export const updateStudentSchema = createStudentSchema.partial();
