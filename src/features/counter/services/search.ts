// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3001/api/books?` }),
  endpoints: (builder) => ({
    getBookByName: builder.query({
      query: (query) => `page=1&search[title]=${query}&search[author]=${query}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// export const { useGetBookByNameQuery } = searchApi;
