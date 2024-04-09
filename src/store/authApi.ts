import { apiSlice } from "./apiSlice";
import { logOut, setCredentials } from './authSlice';
import ENV from "../env.config";

export const authApi = apiSlice.injectEndpoints({
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
        refresh: builder.mutation({
            query:() => ({
                url: `${ENV.API_REFRESH_TOKEN}`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
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
    useRefreshMutation,
} = authApi;