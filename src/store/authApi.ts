import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './index';
import { logOut, setCredentials, setAuth } from './authSlice';
import ENV from "../env.config";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: ENV.API_URL,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        }
     }),
    endpoints: builder =>({
        signupUser:builder.mutation({
            query: (credentials) => ({
                url: `${ENV.API_CREATE_USER}`,
                method: 'POST',
                body: {...credentials}
            }),
        }),
        signinUser:builder.mutation({
            query: (credentials) => ({
                url: `${ENV.API_AUTH}`,
                method: 'POST',
                body: {...credentials},
                credentials: 'include',
            })
        }),
        logoutUser: builder.mutation<void, void>({
            query: () => ({
                url: `${ENV.API_LOGOUT}`,
                method: 'POST',
                credentials: 'include',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(logOut(null))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refreshToken: builder.mutation<any, void>({
            query:() => ({
                url: `${ENV.API_REFRESH_TOKEN}`,
                method: 'GET',
            }),
            // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            //     try {
            //         const { data } = await queryFulfilled
            //         const { accessToken } = data
            //         dispatch(setCredentials({ accessToken }))
            //     } catch (err) {
            //         console.log(err)
            //     }
            // }
        }),
        verifyToken: builder.mutation<undefined, string>({
            query:(token) => ({
                url: `${ENV.API_URL}/verify-token/`,
                method: 'GET',
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}`}
            }),
            // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            //     try {
            //         const { data } = await queryFulfilled
            //         dispatch(setCredentials(data))
            //         dispatch(setAuth(true))
            //     } catch (err:any) {
            //         return err
            //     }
            // }
        }),
        profileUser: builder.query({
            query: (id) => ({
                url: `${ENV.API_PROFILE}${id}`,
                method: 'GET'
            }),
        }),
    })
});

export const {
    useSigninUserMutation, 
    useSignupUserMutation,
    useLogoutUserMutation,
    useProfileUserQuery,
    useVerifyTokenMutation,
    useRefreshTokenMutation,
} = authApi;