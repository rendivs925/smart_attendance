import React from "react";
import { setLocalStorage } from "@/utils/storage";
import { LOCAL_STORAGE_USER_KEY } from "@/constants";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserSchemaType } from "@/schemas";
import { RoleType } from "@/types";

export function useLoginForm() {
  const methods = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: "student",
      nim: "",
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const [role, setRole] = React.useState<RoleType>("student");

  const handleRoleChange = (value: RoleType) => {
    setRole(value);
    setValue("role", value);
  };

  const onSubmit = async (data: UserSchemaType) => {
    console.log("Submitting form data:", data);
    try {
      const response = await axios.post("/api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const user = response.data;
      console.log("Login successful:", user);

      setLocalStorage(LOCAL_STORAGE_USER_KEY, user);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Login failed:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return {
    methods,
    control,
    handleSubmit,
    errors,
    role,
    handleRoleChange,
    onSubmit,
  };
}
