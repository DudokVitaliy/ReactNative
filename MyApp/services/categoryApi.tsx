import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/constants/urls";
import { ICategoryResponse } from "@/types/ICategoryResponse";
import { ICreateCategory } from "@/types/ICreateCategory";
import { serialize } from "object-to-formdata";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    tagTypes: ["Categories", "Category"],

    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/categories`,
    }),

    endpoints: (builder) => ({

        getCategories: builder.query<ICategoryResponse[], void>({
            query: () => "",

            transformResponse: (response: ICategoryResponse[] | { data: ICategoryResponse[] }) => {
                return Array.isArray(response) ? response : response.data;
            },

            providesTags: ["Categories"],
        }),

        getCategoryById: builder.query<ICategoryResponse, number>({
            query: (id) => `${id}`,

            transformResponse: (response: ICategoryResponse | { data: ICategoryResponse }) => {
                return "data" in response ? response.data : response;
            },

            providesTags: (_result, _error, id) => [{ type: "Category", id }],
        }),

        createCategory: builder.mutation<ICategoryResponse, ICreateCategory>({
            query: (body) => ({
                url: "",
                method: "POST",
                body: serialize(body),
            }),

            invalidatesTags: ["Categories"],
        }),

        updateCategory: builder.mutation<
            ICategoryResponse,
            { id: number; data: FormData }
        >({
            query: ({ id, data }) => ({
                url: `${id}`,
                method: "PUT",
                body: data,
            }),

            invalidatesTags: (_result, _error, arg) => [
                "Categories",
                { type: "Category", id: arg.id },
            ],
        }),

        deleteCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `${id}`,
                method: "DELETE",
            }),

            invalidatesTags: (_result, _error, id) => [
                "Categories",
                { type: "Category", id },
            ],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi;