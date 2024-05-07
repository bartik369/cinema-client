import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ENV from "../env.config";

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({ baseUrl: ENV.API_URL }),
    tagTypes: ['Chat'],
    endpoints: (builder) => ({
        openChat: builder.mutation<any, string>({
            query:(id) => ({
                url: `/open-conversation/`,
                method:'POST',
                body: {id: id},
            })
        }),
        getConversation:builder.query<string, string>({
            query:(id) => ({
                url: `/get-conversation/${id}`,
                method: 'GET',
            })
        }),
        getMessages: builder.query({
           query:(id) => ({
               url: `/messages/${id}`,
               method: 'GET',
           }) 
        }),
        createMessage: builder.mutation({
            query:(data) => ({
                url: `/create-message/`,
                method: 'POST',
                body: data,
            })
        }),
        deleteMessage: builder.query({
            query:(id) => ({
                url: `/delete-message/${id}`,
                method: 'GET',
            })
        }),
        updateMessage: builder.mutation({
            query:(data) => ({
                url: `/update-message/`,
                method: 'POST',
                body: data,
            })
        }),
    })
});

export const {
    useOpenChatMutation,
    useGetConversationQuery,
    useGetMessagesQuery,
    useCreateMessageMutation,
    useDeleteMessageQuery,
    useUpdateMessageMutation,
} = chatApi;