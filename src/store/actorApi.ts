import { apiSlice } from "./apiSlice";
import { IActor } from "../types/media";
import ENV from "../env.config";

export const actorApi = apiSlice.injectEndpoints({
    endpoints: builder =>({ 
        getActor: builder.query<any, string>({
            query:(id) => ({
                url:`${ENV.API_GET_ACTOR}${id}`,
                method: 'GET',
            })
        }),
        getActors: builder.query<IActor[], void>({
            query: () => ({
                url:`${ENV.API_ACTORS}`,
                method: 'GET',
            })
        }),
        getMoviesActor: builder.query<any, string>({
            query:(id) => ({
                url:`${ENV.API_GET_MOVIE_BY_ACTOR}${id}`,
                method: 'GET',
            })
        }),
        addActor: builder.mutation<IActor, any>({
            query: (data) => ({
                url:`${ENV.API_ADD_ACTOR}`,
                method: 'POST',
                body: data,
            })
        }),
        getMovieActors: builder.mutation<IActor[], string[]>({
            query: (data) => ({
                url:`${ENV.API_MOVIE_ACTORS}`,
                method: 'POST',
                body: data,
            })
        }),
    })
});

export const {
    useAddActorMutation,
    useGetMovieActorsMutation,
    useGetActorsQuery,
    useGetActorQuery,
    useGetMoviesActorQuery,
} = actorApi;