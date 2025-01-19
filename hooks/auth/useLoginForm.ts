import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserSchemaType } from "@/schemas";

export function useLoginForm() {
  const methods = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: "student",
      nim: "",
      password: "",
    },
  });

  return methods;
}
