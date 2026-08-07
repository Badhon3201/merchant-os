import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/auth.store";

const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export function useLogout() {
  const router = useRouter();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logout();
      router.push("/login");
    },
    onError: () => {
      logout();
      router.push("/login");
    },
  });
}
