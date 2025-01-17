import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserSchemaType } from "@/features/users/schemas";

export function useLoginForm() {
  const methods = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
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
