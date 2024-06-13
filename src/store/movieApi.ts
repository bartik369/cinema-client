import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
    IMovie,
    IMovieRating,
    IMovieAddFavorite,
    IMovieFavorites,
    IExistFavorite,
    IListResponse
  } from '../types/media';
  import { IMovieProperties, IFilter } from '../types/media';
import ENV from '../env.config';

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ baseUrl: ENV.API_URL }),
  tagTypes: ['Movies', 'Rating'],
  endpoints: (builder) => ({
    getMovies: builder.query<IListResponse<IMovie>, IFilter>({
      query: (data) => ({
        url: `${ENV.API_MOVIES}`,
        method: "POST",
        body: data,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({ type: "Movies" as const, _id })),
              { type: "Movies", _id: "LIST" },
            ]
          : [{ type: "Movies", _id: "LIST" }],
    }),
    getMovie: builder.mutation<IMovie, string>({
        query: (id:string) => ({
          url: `${ENV.API_MOVIE}`,
          method: "POST",
          body: {id: id},
        })
      }),
    addMovie: builder.mutation<IMovie, any>({
      query: (data) => ({
        url: `${ENV.API_ADD_MOVIE}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Rating'],
    }),
    getTopMovies: builder.query<IMovie[], void>({
      query: () => ({
        url: `${ENV.API_TOP_MOVIES}`,
        method: "GET",
      }),
    }),
    getLatestMovies: builder.query<IMovie[], void>({
      query: () => ({
        url: `${ENV.API_LAST_MOVIES}`,
        method: "GET",
      }),
    }),
    getFavorites: builder.mutation<IMovieFavorites, IExistFavorite>({
      query: (data) => ({
        url: `${ENV.API_MOVIES_FAVORITES}`,
        method: "POST",
        body: data,
      }),
    }),
    addFavorite: builder.mutation<unknown, IMovieAddFavorite>({
      query: (data) => ({
        url: `${ENV.API_MOVIE_FAVORITE}`,
        method: "POST",
        body: data,
      }),
      
    }),
    getRating: builder.query<number, string>({
      query: (id:string) => ({
        url: `${ENV.API_GET_MOVIE_RATING}${id}`,
        method: "GET",
      }),
      providesTags: ['Rating'],
    }),
    setRating: builder.mutation<IMovie, IMovieRating>({
      query: (data) => ({
        url: `${ENV.API_SET_MOVIE_RATING}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Rating'],
    }),
    searchMovie: builder.mutation<IMovie[], string>({
      query: (data) => ({
        url: `${ENV.API_SEARCH_MOVIE}`,
        method: "POST",
        body: {search: data},
      }),
    }),
    getProperties: builder.query<IMovieProperties, void>({
      query: () => ({
        url: `${ENV.API_MOVIE_PROPERTIES}`,
        method: "GET",
      }),
    }),
  }),
});
export const { 
    useGetMoviesQuery, 
    useGetFavoritesMutation,
    useGetTopMoviesQuery,
    useGetLatestMoviesQuery,
    useAddMovieMutation,
    useAddFavoriteMutation,
    useGetMovieMutation,
    useSetRatingMutation,
    useSearchMovieMutation,
    useGetPropertiesQuery,
    useGetRatingQuery,
} = movieApi;