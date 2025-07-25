"use client";

import { RegisterData, registerSchema } from "@/lib/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();
  const [formError, setFormError] = useState("");

  const onSubmit = async (data: RegisterData) => {
    setFormError("");

    try {
      const post = await fetch("api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const response = await post.json();

      if (!post.ok) {
        setFormError(response.message);
        return;
      }

      router.push("/profile");
    } catch (err) {
      setFormError("Erro inesperado, tente novamente.");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center"
    >
      <Input
        className="mt-4"
        type="text"
        placeholder="Enter your username"
        {...register("username")}
      />
      {errors.username && (
        <p className="text-red-500 text-sm">{errors.username.message}</p>
      )}

      <Input
        className="mt-4"
        type="text"
        placeholder="Enter your first name"
        {...register("firstName")}
      />
      {errors.firstName && (
        <p className="text-red-500 text-sm">{errors.firstName.message}</p>
      )}
      <Input
        className="mt-4"
        type="text"
        placeholder="Enter your last name"
        {...register("lastName")}
      />
      {errors.lastName && (
        <p className="text-red-500 text-sm">{errors.lastName.message}</p>
      )}

      <Input
        className="mt-4"
        type="email"
        placeholder="Enter your email"
        {...register("email")}
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <Input
        className="mt-4"
        type="password"
        placeholder="Confirm your password"
        {...register("password")}
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <Input
        type="password"
        className="mt-4"
        placeholder="Confirm your password"
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
      )}

      {formError && <p className="text-red-500 text-sm">{formError}</p>}

      <p className="text-sm text-gray-600 m-2">
        Already have an account?
        <a
          href="/login"
          className="ml-2 text-blue-600 hover:underline font-medium text-sm"
        >
          Login
        </a>
      </p>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-booklend-black"
      >
        {isSubmitting ? "Creating account..." : "Register"}
      </Button>
    </form>
  );
}
