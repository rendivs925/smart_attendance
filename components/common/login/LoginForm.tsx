"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RoleType } from "@/types";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLoginForm } from "@/hooks/auth/useLoginForm";
import FormFieldComponent from "@/components/ui/FormFieldComponent";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const methods = useLoginForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods;

  const [role, setRole] = React.useState<RoleType>("student");

  const handleRoleChange = (value: RoleType) => {
    setRole(value);
    setValue("role", value);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormFieldComponent
                name="role"
                label="Select Role"
                type="select"
                control={control}
                errors={errors}
                value={role}
                onValueChange={(value) =>
                  handleRoleChange(value as "student" | "teacher" | "admin")
                }
                options={[
                  { value: "student", label: "Student" },
                  { value: "teacher", label: "Teacher" },
                  { value: "admin", label: "Admin" },
                ]}
              />

              {/* Conditional Fields Based on Role */}
              {role === "student" && (
                <FormFieldComponent
                  name="nim"
                  label="NIM"
                  type="text"
                  control={control}
                  errors={errors}
                  placeholder="Enter your NIM"
                />
              )}

              {role === "teacher" && (
                <FormFieldComponent
                  name="nidn"
                  label="NIDN"
                  type="text"
                  control={control}
                  errors={errors}
                  placeholder="Enter your NIDN"
                />
              )}

              {role === "admin" && (
                <FormFieldComponent
                  name="email"
                  label="Email"
                  type="email"
                  control={control}
                  errors={errors}
                  placeholder="Enter your email"
                />
              )}

              {/* Common Password Field */}
              <FormFieldComponent
                name="password"
                label="Password"
                type="password"
                control={control}
                errors={errors}
                placeholder="Enter your password"
              />

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
