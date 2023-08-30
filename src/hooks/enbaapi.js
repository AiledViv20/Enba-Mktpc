import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const enbaApi = createApi({
    reducerPath: 'enbaApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:4005/',
        prepareHeaders: async (headers) => {
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    tagTypes: [
        "search",
        "product",
        "kit",
        "order",
        "invoice",
        "form"
    ],
    endpoints: (build) => ({
        getSearch: build.query({
            query: (body) => {
                return {
                  url: `inventory/search`,
                  method: 'POST',
                  body: JSON.stringify(body),
                  headers:{
                    'Content-Type': 'application/json'
                  }
                };
              },
            providesTags: (result, error, arg) =>
                result ? [{ type: "search" }] : [],
        }),
        getProduct: build.query({
            query: (body) => {
                return {
                    url: `inventory/product`,
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                };
            },
            providesTags: (result, error, arg) =>
                result ? [{ type: "product" }] : [],
        }),
        getCategories: build.query({
            query: () => {
              return {
                url: `inventory/categories`,
                method: "GET",
              };
            },
            providesTags: (result, error, arg) =>
              result ? [{ type: "search", id: arg }] : [],
        }),
        getColors: build.query({
            query: () => {
              return {
                url: `inventory/colors`,
                method: "GET",
              };
            },
            providesTags: (result, error, arg) =>
              result ? [{ type: "search", id: arg }] : [],
        }),
        getFavorites: build.query({
            query: () => {
              return {
                url: `inventory/favorites`,
                method: "GET",
              };
            },
            providesTags: (result, error, arg) =>
              result ? [{ type: "search", id: arg }] : [],
        }),
        getKits: build.query({
            query: (body) => {
                return {
                    url: `inventory/kit/search`,
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                };
            },
            providesTags: (result, error, arg) =>
                result ? [{ type: "search" }] : [],
        }),
        getKit: build.query({
            query: (body) => {
                return {
                    url: `inventory/kit`,
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                };
            },
            providesTags: (result, error, arg) =>
                result ? [{ type: "kit" }] : [],
        }),
    }),
})

export const { 
    useGetSearchQuery,
    useGetProductQuery,
    useGetCategoriesQuery,
    useGetColorsQuery,
    useGetFavoritesQuery,
    useGetKitsQuery,
    useGetKitQuery,
    util: {getRunningQueriesThunk},
} = enbaApi