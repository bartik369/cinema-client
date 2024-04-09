import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISlider, ISliderUpdate, ISliderFormData } from '../types/media';
import { IUser } from '../types/auth';
import ENV from '../env.config';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: ENV.API_URL }),
  tagTypes: ['Slides'],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => ({
        url: `${ENV.API_USERS}`,
        method: 'GET',
      }),
    }),
    getMoviesCount: builder.query<number, void>({
      query: () => ({
        url: `${ENV.API_MOVIES_COUNT}`,
        method: 'GET',
      }),
    }),
    getSlides: builder.query<ISlider[], void>({
      query:() => ({
          url:`${ENV.API_SLIDES}`,
          method: 'GET'
      }),
      providesTags: (result) =>
      result
        ? [
            ...result.map(({ _id }) => ({ type: 'Slides' as const, _id })),
            { type: 'Slides', _id: 'LIST' },
          ]
        : [{ type: 'Slides', _id: 'LIST' }],
  }),
    addSlide: builder.mutation<ISlider, ISliderFormData>({
      query: (data) => ({
        url: `${ENV.API_ADD_SLIDE}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Slides'],
    }),
    getSlide: builder.mutation<ISliderUpdate, string>({
      query: (id) => ({
        url: `${ENV.API_GET_SLIDE}`,
        method: 'POST',
        body: {id: id}
      })
    }),
    deleteSlide: builder.mutation<ISlider, string>({
      query:(id) => ({
        url: `${ENV.API_DELETE_SLIDE}`,
        method:'DELETE',
        body: {id: id}
      }),
      invalidatesTags: ['Slides'],
    }),
    updateSide: builder.mutation<ISlider, ISliderFormData>({
      query:(body) => ({
        url: `${ENV.API_UPDATE_SLIDE}`,
        method: 'PUT',
        body: body,
      }),
    })
  }),
});
export const { 
    useGetUsersQuery, 
    useGetMoviesCountQuery, 
    useAddSlideMutation,
    useGetSlidesQuery,
    useGetSlideMutation,
    useDeleteSlideMutation,
    useUpdateSideMutation,
 } =
  adminApi;
