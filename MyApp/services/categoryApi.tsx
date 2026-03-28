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

        addCategory: builder.mutation<Category, Partial<Category>>({
            query: (body) => ({
                url: 'category',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Category'],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useAddCategoryMutation
} = categoryApi;