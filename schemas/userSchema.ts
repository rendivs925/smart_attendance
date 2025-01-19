import { z } from "zod";

export const userSchema = z
  .object({
    role: z.enum(["student", "teacher", "admin"], {
      errorMap: () => ({ message: "Role is required" }),
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    nim: z
      .string()
      .min(8, {
        message: "NIM must be at least 8 characters long",
      })
      .optional(),
    nidn: z
      .string()
      .min(8, {
        message: "NIDN must be at least 8 characters long",
      })
      .optional(),
    email: z
      .string()
      .email({
        message: "Invalid email format",
      })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.role === "student" && !data.nim) {
        return false;
      }
      if (data.role === "teacher" && !data.nidn) {
        return false;
      }
      if (data.role === "admin" && !data.email) {
        return false;
      }
      return true;
    },
    {
      message: "Required field is missing based on the role",
      path: ["nim", "nidn", "email"],
    },
  );

export type UserSchemaType = z.infer<typeof userSchema>;
