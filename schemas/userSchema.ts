import { z } from "zod";

export const userSchema = z.object({
  role: z.enum(["student", "teacher", "admin"], {
    errorMap: () => ({ message: "Role is required" }),
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  nim: z.string().optional(),
  nidn: z.string().optional(),
  email: z
    .string()
    .email({
      message: "Invalid email format",
    })
    .optional(),
});

export type UserSchemaType = z.infer<typeof userSchema>;
