
    import api from "@/lib/axios";

    export const login = async (data: {
    email: string;
    password: string;
    companyId: 1;
    }) => {
        const response = await api.post("/auth/login", data);

        return response.data;
    };
