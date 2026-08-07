import api from "@/lib/axios";

export const register = async (data: {
  companyId: number;
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
