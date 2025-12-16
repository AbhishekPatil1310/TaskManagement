import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").optional()
});

export type ProfileFormInput = z.infer<typeof profileSchema>;
