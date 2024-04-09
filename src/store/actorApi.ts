import { apiSlice } from "./apiSlice";
import { IActor } from "../types/media";
import ENV from "../env.config";

export const actorApi = apiSlice.injectEndpoints({
    endpoints: builder =>({ 
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
        getActors: builder.query<IActor[], void>({
            query: () => ({
                url:`${ENV.API_ACTORS}`,
                method: 'GET',
            })
        }),
    })
});

export const {
    useAddActorMutation,
    useGetMovieActorsMutation,
    useGetActorsQuery,
} = actorApi;