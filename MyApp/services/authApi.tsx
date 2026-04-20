import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/constants/urls";
import { serialize } from "object-to-formdata";
import { UserLoginFormData } from "@/schemas/userLoginSchema";
import { UserRegisterFormData } from "@/schemas/userRegisterSchema";
import { AuthResponse } from "@/types/AuthResponse";

export const authApi = createApi({
    reducerPath: "authApi",

    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/Auth`,

        prepareHeaders: (headers) => {
            headers.set("ngrok-skip-browser-warning", "true");
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),

    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, UserLoginFormData>({
            query: (body) => ({
                url: "/Login",
                method: "POST",
                body,
            }),
        }),

        register: builder.mutation<AuthResponse, UserRegisterFormData>({
            query: (body) => ({
                url: "/Register",
                method: "POST",
                body: serialize(body), // multipart/form-data
                formData: true,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
} = authApi;