import { IMessage } from './../types/chat';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IConversation } from "../types/chat";
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
        getMessage: builder.mutation({
            query:(id) => ({
                url: `/message/`,
                method: 'POST',
                body: {id: id},
            }) 
         }),
        getMessages: builder.query({
           query:(id) => ({
               url: `/messages/${id}`,
               method: 'GET',
           }) 
        }),
        getRecipientMessages: builder.mutation<IMessage[], string>({
            query:(id) => ({
                url: `/recipient-messages/`,
                method: 'POST',
                body: {id: id},
            }) 
        }),
        getActiveConverstionMessages: builder.mutation<IMessage[], string>({
            query:(id) => ({
                url: `/active-messages/`,
                method: 'POST',
                body: {id: id},
            }) 
        }),
        getActiveConverstion: builder.mutation<IMessage, string>({
            query:(id) => ({
                url: `/active-conversation/`,
                method: 'POST',
                body: {id: id},
            }) 
        }),
        createMessage: builder.mutation<IMessage, any>({
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
        }),
        getConversationId: builder.mutation({
            query:(id) => ({
                url: `/get-conversation/`,
                method: 'POST',
                body: {id: id},
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
    useGetConversationIdMutation,
    useGetActiveConverstionMutation,
    useGetActiveConverstionMessagesMutation,
    useGetMessageMutation,

} = chatApi;