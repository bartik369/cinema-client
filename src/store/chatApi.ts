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
            }),
        }),
        getMessages: builder.query({
           query:(id) => ({
               url: `/messages/${id}`,
               method: 'GET',
           }) 
        }),
        getRecipientMessages: builder.mutation<undefined, string>({
            query:(id) => ({
                url: `/recipient-messages/`,
                method: 'POST',
                body: {id: id},
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
        getConversations: builder.query({
            query:(id) => ({
                url: `/get-conversations/${id}`,
                method: 'GET',
            })
        })
    })
});

export const {
    useOpenChatMutation,
    useGetMessagesQuery,
    useCreateMessageMutation,
    useDeleteMessageQuery,
    useUpdateMessageMutation,
    useGetConversationsQuery,
    useGetRecipientMessagesMutation,
} = chatApi;