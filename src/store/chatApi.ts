import { IMessage, IMessageMedia } from './../types/chat';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IConversation, IDataForMarkRead } from "../types/chat";
import ENV from "../env.config";

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({ baseUrl: ENV.API_URL }),
    tagTypes: ['Chat', 'Messages'],
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
        getMessages: builder.query<IMessage[], string>({
           query:(id) => ({
               url: `/messages/${id}`,
               method: 'GET',
           }),
           providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Messages" as const, _id })),
              { type: "Messages", _id: "LIST" },
            ]
          : [{ type: "Messages", _id: "LIST" }],
           
        }),
        getRecipientMessages: builder.query<IMessage[], string>({
            query:(id) => ({
                url: `/recipient-messages/${id}`,
                method: 'GET',
            }),
            providesTags: (result) =>
            result
              ? [
                  ...result.map(({ _id }) => ({ type: "Messages" as const, _id })),
                  { type: "Messages", _id: "LIST" },
                ]
              : [{ type: "Messages", _id: "LIST" }],
        }),
        getActiveConverstionMessages: builder.query<IMessage[], string>({
            query:(id) => ({
                url: `/active-messages/${id}`,
                method: 'GET',
            }),
            providesTags: (result) =>
            result
              ? [
                  ...result.map(({ _id }) => ({ type: "Messages" as const, _id })),
                  { type: "Messages", _id: "LIST" },
                ]
              : [{ type: "Messages", _id: "LIST" }],
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
            }),
            invalidatesTags: ['Messages'],
        }),
        deleteMessage: builder.mutation<{success: boolean; id: number }, string>({
            query:(id) => ({
                url: `/delete-message/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Messages'],
        }),
        updateMessage: builder.mutation({
            query:(data) => ({
                url: `/update-message/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Messages'],
        }),
        getConversations: builder.query({
            query:(id) => ({
                url: `/get-conversations/${id}`,
                method: 'GET',
            }),
            // providesTags: (result) =>
            // result
            //   ? [
            //       ...result.usersInfo.map(({ _id }) => ({ type: "Chat" as const, _id })),
            //       { type: "Chat", _id: "LIST" },
            //     ]
            //   : [{ type: "Chat", _id: "LIST" }],
        }),
        getConversationId: builder.mutation({
            query:(id) => ({
                url: `/get-conversation/`,
                method: 'POST',
                body: {id: id},
            })
        }),
        markAsRead: builder.mutation<IMessage[], IDataForMarkRead>({
            query:(data) => ({
                url: `/mark-message-read/`,
                method: 'POST',
                body: data,
            })
        }),
        getConversationMedia: builder.query<IMessageMedia[], string>({
            query:(id) => ({
                url: `/conversation-media/${id}`,
                method: 'GET',
            })
        })
    })
});

export const {
    useOpenChatMutation,
    useGetMessagesQuery,
    useCreateMessageMutation,
    useDeleteMessageMutation,
    useUpdateMessageMutation,
    useGetConversationsQuery,
    useGetRecipientMessagesQuery,
    useGetConversationIdMutation,
    useGetActiveConverstionMutation,
    useGetActiveConverstionMessagesQuery,
    useGetMessageMutation,
    useMarkAsReadMutation,
    useGetConversationMediaQuery,

} = chatApi;