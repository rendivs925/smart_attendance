import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  role: z.enum(["student", "teacher", "admin"], {
    errorMap: () => ({ message: "Role is required" }),
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
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

interface LoginFormData {
  role: "student" | "teacher" | "admin";
  password: string;
  nim?: string;
  nidn?: string;
  email?: string;
}

export function useLoginForm() {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "student",
      nim: "",
      nidn: "",
      email: "",
      password: "",
    },
  });

  return methods;
}
