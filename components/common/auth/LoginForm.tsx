"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { RoleType } from "@/types";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const {
    control,
    methods,
    handleSubmit,
    errors,
    role,
    handleRoleChange,
    onSubmit,
  } = useLoginForm();

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
                onValueChange={(value) => handleRoleChange(value as RoleType)}
                options={[
                  { value: "Student", label: "Student" },
                  { value: "Teacher", label: "Teacher" },
                  { value: "Admin", label: "Admin" },
                ]}
              />

              {/* Conditional Fields Based on Role */}
              {role === "Student" && (
                <FormFieldComponent
                  name="nim"
                  label="NIM"
                  type="text"
                  control={control}
                  errors={errors}
                  placeholder="Enter your NIM"
                />
              )}

              {role === "Teacher" && (
                <FormFieldComponent
                  name="nidn"
                  label="NIDN"
                  type="text"
                  control={control}
                  errors={errors}
                  placeholder="Enter your NIDN"
                />
              )}

              {role === "Admin" && (
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
