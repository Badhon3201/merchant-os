
    import api from "@/lib/axios";

    export const login = async (data: {
        email: string;
        password: string;
        companyId: number;
    }) => {
        const response = await api.post("/auth/login", data);

        return response.data;
    };
