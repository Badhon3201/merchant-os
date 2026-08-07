"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/use-register";
import { useAuthStore } from "@/store/auth.store";
import { registerSchema, RegisterFormData } from "@/validation/auth.schema";
import AuthShell from "@/component/auth/auth-shell";
import Button from "@/component/ui/button";
import Input from "@/component/ui/input";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();
  const { mutate, isPending } = useRegister();
  const { setUser } = useAuthStore();

  const onSubmit = (data: RegisterFormData) => {
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
          console.error("Registration failed:", err);
        },
      }
    );
  };

  return (
    <AuthShell
      title="Create your workspace"
      subtitle="Start with a secure account and unlock your retail dashboard."
      footerText="Already joined?"
      footerLink="Sign in"
      footerHref="/login"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input label="Full name" placeholder="Enter your full name" {...register("name")} />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="sm:col-span-2">
            <Input label="Email address" placeholder="Enter your email" type="email" {...register("email")} />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="sm:col-span-2">
            <Input label="Password" placeholder="Create a password" type="password" {...register("password")} />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm text-blue-800">
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="h-4 w-4" />
            Secure by default
          </div>
          <p className="mt-2 text-blue-700">
            Your account is connected to your company workspace and ready for role-based access.
          </p>
        </div>

        <Button type="submit" className="flex w-full items-center justify-center gap-2" disabled={isPending}>
          {isPending ? "Creating account..." : "Create account"}
          {!isPending && <ArrowRight className="h-4 w-4" />}
        </Button>

        <div className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Role and permission management comes next.
        </div>
      </form>
    </AuthShell>
  );
}
