import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { setLoginState } from "@/redux/slices/authSlice";
import axios from "axios";
import { userSchema, UserSchemaType } from "@/schemas";
import { RoleType } from "@/types";

export function useLoginForm() {
  const dispatch = useDispatch();

  const methods = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: "student",
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const [role, setRole] = useState<RoleType>("student");

  const handleRoleChange = (value: RoleType) => {
    setRole(value);
    setValue("role", value);
  };

  const onSubmit = async (data: any) => {
    data.role =
      data.role.charAt(0).toUpperCase() + data.role.slice(1).toLowerCase();

    console.log("Submitting form data:", data);
    try {
      const response = await axios.post("http://localhost:8000/login", data, {
        withCredentials: true,
      });

      const user = response.data.data;
      console.log("Login successful:", user);

      dispatch(setLoginState(user));
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
