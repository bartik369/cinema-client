import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { IActor, IListResponse } from "../types/media";

import ENV from "../env.config";

export const actorApi = createApi({
  reducerPath: "actorApi",
  baseQuery: fetchBaseQuery({ baseUrl: ENV.API_URL }),
  endpoints: (builder) => ({
    getActor: builder.query<any, string>({
      query: (id) => ({
        url: `${ENV.API_GET_ACTOR}${id}`,
        method: "GET",
      }),
    }),
    getActors: builder.query<IListResponse<IActor>, any>({
      query: ({page, debouncedSearch}) => ({
        url: `${ENV.API_ACTORS}?page=${page}&perPage=10&search=${debouncedSearch}`,
        method: "GET",
      }),
    }),
    getAllActors: builder.query<IActor[], void>({
      query: () => ({
        url: `/all-actors`,
        method: "GET",
      }),
    }),
    getMoviesActor: builder.query<any, string>({
      query: (id) => ({
        url: `${ENV.API_GET_MOVIE_BY_ACTOR}${id}`,
        method: "GET",
      }),
    }),
    addActor: builder.mutation<IActor, any>({
      query: (data) => ({
        url: `${ENV.API_ADD_ACTOR}`,
        method: "POST",
        body: data,
      }),
    }),
    getMovieActors: builder.mutation<IActor[], string[]>({
      query: (data) => ({
        url: `${ENV.API_MOVIE_ACTORS}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
  useAddActorMutation,
  useGetMovieActorsMutation,
  useGetActorsQuery,
  useGetActorQuery,
  useGetMoviesActorQuery,
  useGetAllActorsQuery
} = actorApi;