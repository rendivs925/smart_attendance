import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { setLoginState } from "@/redux/slices/authSlice";
import axios from "axios";
import { userSchema, UserSchemaType } from "@/schemas";
import { RoleType } from "@/types";
import { SERVER_URL } from "@/constants";

export function useLoginForm() {
  const dispatch = useDispatch();

  const methods = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: "Student",
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const [role, setRole] = useState<RoleType>("Student");

  const handleRoleChange = (value: RoleType) => {
    setRole(value);
    setValue("role", value);
  };

  const onSubmit = async (data: UserSchemaType) => {
    console.log("Submitting form data:", data);
    try {
      const response = await axios.post(`${SERVER_URL}/login`, data, {
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
