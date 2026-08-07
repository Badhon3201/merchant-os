"use client";

import { useLogin } from "@/hooks/use-login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginFormData } from "@/validation/auth.schema";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import Button from "@/component/ui/button";
import Input from "@/component/ui/input";
import AuthShell from "@/component/auth/auth-shell";
import { ArrowRight, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useLogin();
  const { setUser } = useAuthStore();
  const router = useRouter();

  const onSubmit = (data: LoginFormData) => {
    mutate(
      {
        ...data,
        companyId: 1,
      },
      {
        onSuccess: (res: any) => {
          if (res?.data?.user) {
            setUser(res.data.user);
          }
          router.push("/dashboard");
        },
        onError: (err: any) => {
          console.error("Login failed:", err);
        },
      }
    );
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue managing your store with confidence."
      footerText="New here?"
      footerLink="Create an account"
      footerHref="/register"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Input label="Email address" placeholder="Enter your email" {...register("email")} type="email" />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Input label="Password" placeholder="Enter your password" {...register("password")} type="password" />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600" />
            Remember me
          </label>
          <a href="#" className="font-medium text-blue-600 transition hover:text-blue-700">
            Forgot password?
          </a>
        </div>

        <Button type="submit" className="flex w-full items-center justify-center gap-2" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign in"}
          {!isPending && <ArrowRight className="h-4 w-4" />}
        </Button>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <Mail className="h-4 w-4 text-blue-600" />
            Secure email login
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <Lock className="h-4 w-4 text-blue-600" />
            Role-aware access
          </div>
        </div>
      </form>
    </AuthShell>
  );
}