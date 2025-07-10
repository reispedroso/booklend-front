'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginData, loginSchema } from "@/lib/schemas/authSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/input/AuthInput";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({  
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const [formError, setFormError] = useState("");

  const onSubmit = async (data: LoginData) => {
    setFormError("");

    try {
      const post = await fetch("/api/auth/login", {
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
      setFormError("Erro inesperado. Tente novamente.");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center space-y-4 mt-10"
    >
      <Input
      type="email"
      placeholder="Enter your email"
      {...register("email")}
      />
      {errors.email && (
      <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <Input
      type="password"
      placeholder="Insira sua senha"
      {...register("password")}
      />
      {errors.password && (
      <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      {formError && <p className="text-red-500 text-sm">{formError}</p>}

      <div>
        <p>Doesn't have an account? <a href="/register" className="font-semibold text-pink-600">Register</a></p>
      </div>
      <button
      type="submit"
      disabled={isSubmitting}
      className="bg-booklend-black text-white w-3xs p-4 rounded-2xl disabled:opacity-50 mt-16"
      >
      {isSubmitting ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
