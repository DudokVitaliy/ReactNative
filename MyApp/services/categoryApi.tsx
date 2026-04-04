import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Category } from '@/types/category';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.0.4:5268/api/',
    }),
    tagTypes: ['Category'],

    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => 'category',
            providesTags: ['Category'],
        }),

        getCategoryById: builder.query<Category, number>({
            query: (id) => `category/${id}`,
            providesTags: ['Category'],
        }),

        addCategory: builder.mutation<Category, Partial<Category>>({
            query: (body) => ({
                url: 'category',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Category'],
        }),

        updateCategory: builder.mutation<any, FormData>({
            query: (formData) => {
                const id = formData.get('id');
                return {
                    url: `category/${id}`,
                    method: 'PUT',
                    body: formData,
                };
            },
            invalidatesTags: ['Category'],
        }),

        deleteCategory: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Category'],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi;