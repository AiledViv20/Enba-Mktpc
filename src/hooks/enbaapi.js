import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const enbaApi = createApi({
    reducerPath: 'enbaApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://api.enba.mx/',
        // baseUrl: 'http://localhost:4005/',
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
        getSearchM: build.mutation({
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
        getSearchTemporality: build.query({
          query: (body) => {
              return {
                url: `inventory/temporality`,
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
        getSearchTemporalityM: build.mutation({
          query: (body) => {
              return {
                url: `inventory/temporality`,
                method: 'POST',
                body: JSON.stringify(body),
                headers:{
                  'Content-Type': 'application/json'
                }
              };
            },
          providesTags: (result, error, arg) =>
              result ? [{ type: "search" }] : [],
      })
      ,
        getSearchRecomendations: build.query({
          query: (body) => {
              return {
                url: `inventory/search/recomendations`,
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
        getSubCategories: build.query({
            query: () => {
              return {
                url: `inventory/categories-master`,
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
        getFavoritesM: build.mutation({
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
        postLead: build.mutation({
          query: (body) => {
              return {
                  url: `leads/create`,
                  method: 'POST',
                  body: JSON.stringify(body),
                  headers:{
                      'Content-Type': 'application/json'
                  }
              };
          },
        }),
        postQuotation: build.mutation({
          query: (body) => {
              return {
                  url: `quotation/create`,
                  method: 'POST',
                  body: body
              };
          },
        }),
        postCalculateOrder: build.mutation({
          query: (body) => {
              return {
                  url: `order/calculate`,
                  method: 'POST',
                  body: body
              };
          },
        }),
        postCreateOrder: build.mutation({
          query: (body) => {
              return {
                  url: `order/create`,
                  method: 'POST',
                  body: body
              };
          },
        }),
        postCreateInvoice: build.mutation({
          query: (body) => {
              return {
                  url: `order/invoice/create`,
                  method: 'POST',
                  body: body
              };
          },
        }),
        postProof: build.mutation({
          query: (folio, body) => {
              return {
                  url: `order/proof/${folio}`,
                  method: 'POST',
                  body: body
              };
          },
        }),
        postDiscountCode: build.mutation({
          query: (body) => {
              return {
                  url: `discount-code/validate`,
                  method: 'POST',
                  body: body
              };
          },
        }),
        postTransformImage: build.mutation({
          query: (body) => {
              return {
                  url: `inventory/images/transform`,
                  method: 'POST',
                  body: body
              };
          },
        })
    }),
})

export const { 
    useGetSearchQuery,
    useGetSearchTemporalityQuery,
    useGetSearchRecomendationsQuery,
    useGetProductQuery,
    useGetCategoriesQuery,
    useGetSubCategoriesQuery,
    useGetColorsQuery,
    useGetFavoritesQuery,
    useGetKitsQuery,
    useGetKitQuery,
    usePostLeadMutation,
    usePostQuotationMutation,
    usePostCalculateOrderMutation,
    usePostCreateOrderMutation,
    usePostCreateInvoiceMutation,
    usePostProofMutation,
    usePostDiscountCodeMutation,
    usePostTransformImageMutation,
    useGetFavoritesMMutation,
    useGetSearchMMutation,
    useGetSearchTemporalityMMutation,
    util: {getRunningQueriesThunk},
} = enbaApi