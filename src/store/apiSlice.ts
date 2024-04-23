import { RootState } from './index';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError} from '@reduxjs/toolkit/query'
import { setCredentials, logOut } from "./authSlice";
import ENV from "../env.config";

const baseQuery = fetchBaseQuery({
  baseUrl: ENV.API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
          headers.set("authorization", `Bearer ${token}`)
      }
      return headers
  }
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 403) {
    const refreshResult = await baseQuery('/refresh-token/', api, extraOptions);

    if (refreshResult.data) {
      api.dispatch(setCredentials(refreshResult.data))
      result = await baseQuery(args, api, extraOptions)

    } else {
      api.dispatch(logOut(null))
    }
  }
  return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({

    })
});