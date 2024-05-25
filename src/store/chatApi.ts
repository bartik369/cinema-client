import { IUser } from './../types/auth';
import { IMessage, IMessageMedia } from './../types/chat';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IConversation, IDataForMarkRead, IParticipants } from "../types/chat";
import ENV from "../env.config";

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({ baseUrl: ENV.API_URL }),
    tagTypes: ['Chat', 'Messages', 'Unread', '123'],
    endpoints: (builder) => ({
        getMessages: builder.query<IMessage[], string>({
           query:(id) => ({
               url: `/messages/${id}`,
               method: 'GET',
           }),
           providesTags: (result) =>
           result 
           ? [...result.map(({ _id }) => ({ type: 'Messages' as const, _id })), 'Messages']
           : ['Messages']
           
        }),
        getMessage: builder.mutation({
            query:(id) => ({
                url: `/message/`,
                method: 'POST',
                body: {id: id},
            }),
         }),
        getUnreadMessages: builder.query<IMessage[], string>({
            query:(id) => ({
                url: `/unread-messages/${id}`,
                method: 'GET',
            }),
         }),
          openChat: builder.mutation<any, string>({
            query:(id) => ({
                url: `/open-conversation/`,
                method:'POST',
                body: {id: id},
            }),
        }),
        getRecipientMessages: builder.query<IMessage[], string>({
            query:(id) => ({
                url: `/recipient-messages/${id}`,
                method: 'GET',
            }),
        }),
        // getActiveConverstionMessages: builder.query<IMessage[], string>({
        //     query:(id) => ({
        //         url: `/active-messages/${id}`,
        //         method: 'GET',
        //     }),
        //     providesTags: (result) =>
        //     result 
        //     ? [...result.map(({ _id }) => ({ type: 'Messages' as const, _id })), 'Messages']
        //     : ['Messages']
        // }),
        getActiveConverstion: builder.mutation<IConversation, string>({
            query:(id) => ({
                url: `/active-conversation/`,
                method: 'POST',
                body: {id: id},
            }),
            invalidatesTags: ['Chat', 'Messages']
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
        updateMessage: builder.mutation<IMessage, any>({
            query:(data) => ({
                url: `/update-message/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Messages'],
        }),
        getConversations: builder.query<IParticipants, string>({
            query:(id) => ({
                url: `/get-conversations/${id}`,
                method: 'GET',
            }),
            providesTags: (result) =>
            result 
            ? [...result.usersInfo.map(({ _id }) => ({ type: 'Chat' as const, _id })), 'Chat']
            : ['Chat']
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
            }),
        }),
        getConversationMedia: builder.query<IMessageMedia[], string>({
            query:(id) => ({
                url: `/conversation-media/${id}`,
                method: 'GET',
            }),
        }),
        getRecipientInfo: builder.query<IUser, string>({
            query:(id) => ({
                url: `/recipient-info/${id}`,
                method: 'GET',
            }),
        }),
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
    // useGetActiveConverstionMessagesQuery,
    useGetMessageMutation,
    useMarkAsReadMutation,
    useGetConversationMediaQuery,
    useGetUnreadMessagesQuery,
    useGetRecipientInfoQuery,

} = chatApi;