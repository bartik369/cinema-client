import { authApi } from './authApi';
import { apiSlice } from './apiSlice';
import { IUser } from './../types/auth';
import { IMessage, IMessageMedia, IUnreadMessages, IChatInfo, IParticipantInfo } from './../types/chat';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IConversation, IDataForMarkRead, IParticipants } from "../types/chat";
import io from 'socket.io-client';
import ENV from "../env.config";


const socketOptions = {
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttemps: 10,
    transports: ['websocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false
};
const socketUrl = 'http://localhost:5001';


export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({ baseUrl: ENV.API_URL }),
    tagTypes: ['Chat', 'Messages', 'Unread'],
    endpoints: (builder) => ({
        getMessages: builder.query<IMessage[], string>({
           query:(id) => ({
               url: `${ENV.API_GET_MESSAGES}${id}`,
               method: 'GET',
           }),
           providesTags: (result) =>
           result 
           ? [...result.map(({ _id }) => ({ type: 'Messages' as const, _id })), 'Messages']
           : ['Messages']
           
        }),
        getMessage: builder.mutation({
            query:(id) => ({
                url: `${ENV.API_GET_MESSAGE}`,
                method: 'POST',
                body: {id: id},
            }),
         }),
        getUnreadMessages: builder.query<IUnreadMessages[], string>({
            query:(id) => ({
                url: `${ENV.API_GET_UNREAD_MESSAGES}${id}`,
                method: 'GET',
            }),
            providesTags: (result) =>
            result 
            ? [...result.map(({ id }) => ({ type: 'Unread' as const, id })), 'Unread']
            : ['Unread']
         }),
        openChat: builder.mutation<any, string>({
            query:(id) => ({
                url: `${ENV.API_OPEN_CONVERSATION}`,
                method:'POST',
                body: {id: id},
            }),
            invalidatesTags: ['Unread']
        }),
        getRecipientMessages: builder.query<IMessage[], string>({
            query:(id) => ({
                url: `${ENV.API_GET_RECIPIENT_MESSAGES}${id}`,
                method: 'GET',
            }),
        }),
        getActiveConverstion: builder.mutation<IConversation, string>({
            query:(id) => ({
                url: `${ENV.API_GET_ACTIVE_CONVERSATION}`,
                method: 'POST',
                body: {id: id},
            }),
            invalidatesTags: ['Chat', 'Unread']
        }),
        createMessage: builder.mutation<IMessage, any>({
            query:(data) => ({
                url: `${ENV.API_CREATE_MESSAGE}`,
                method: 'POST',
                body: data,
            }),
             invalidatesTags: ['Messages'],   
        }),
        deleteMessage: builder.mutation<{success: boolean; id: number }, string>({
            query:(id) => ({
                url: `${ENV.API_DELETE_MESSAGE}${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Messages'],
        }),
        updateMessage: builder.mutation<IMessage, any>({
            query:(data) => ({
                url: `${ENV.API_UPDATE_MESSAGE}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Messages'],
        }),
        getConversations: builder.query<IParticipants, string>({
            query:(id) => ({
                url: `${ENV.API_GET_CONVERSATIONS}${id}`,
                method: 'GET',
            }),
            providesTags: (result) =>
            result 
            ? [...result.usersInfo.map(({ _id }) => ({ type: 'Chat' as const, _id })), 'Chat']
            : ['Chat']
        }),
        pinConversation: builder.mutation<IChatInfo, string>({
            query:(id) => ({
                url: `${ENV.API_PIN_CONVERSATION}`,
                method: 'POST',
                body: {id: id}
            }),
            invalidatesTags: ['Chat'],
        }),
        closeTicket: builder.mutation<IChatInfo, string>({
            query:(id) => ({
                url: `${ENV.API_CLOSE_TICKET}`,
                method: 'POST',
                body: {id: id}
            }),
            invalidatesTags: ['Chat'],
        }),
        getConversationId: builder.mutation<string, string>({
            query:(id) => ({
                url: `${ENV.API_GET_CONVERSATION}`,
                method: 'POST',
                body: {id: id},
            }),
            invalidatesTags: ['Chat'],
        }),
        markAsRead: builder.mutation<IMessage[], IDataForMarkRead>({
            query:(data) => ({
                url: `${ENV.API_MARK_MESSAGES_READ}`,
                method: 'POST',
                body: data,
            }),
        }),
        getConversationMedia: builder.query<IMessageMedia[], string>({
            query:(id) => ({
                url: `${ENV.API_GET_CONVERSATION_MEDIA}${id}`,
                method: 'GET',
            }),
        }),
        getRecipientInfo: builder.query<IUser, string>({
            query:(id) => ({
                url: `${ENV.API_GET_RECIPIENT_INFO}${id}`,
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
    useGetMessageMutation,
    useMarkAsReadMutation,
    useGetConversationMediaQuery,
    useGetUnreadMessagesQuery,
    useGetRecipientInfoQuery,
    usePinConversationMutation,
    useCloseTicketMutation,
} = chatApi;