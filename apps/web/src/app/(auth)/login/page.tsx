"use client";
import { useLogin } from "@/hooks/use-login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  LoginFormData,
} from "@/validation/auth.schema";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useLogin();

  console.log("LoginPage render");

  const onSubmit = (data: LoginFormData) => {
    console.log("Login form submit handler called", data);
    mutate(data, {
      onSuccess: (res) => {
        console.log(res);
      },

      onError: (err: any) => {
        console.log(err);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) => {
        console.log("Login validation failed", errors);
      })}
    >
      <input
        {...register("email")}
        placeholder="Email"
      />

      <p>{errors.email?.message}</p>

      <input
        type="password"
        {...register("password")}
        placeholder="Password"
      />

      <p>{errors.password?.message}</p>

      <button
        type="submit"
        disabled={isPending}
        onClick={() => console.log("Login button clicked")}
      >
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}