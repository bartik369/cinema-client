import { IUser } from './auth';
export interface IChatInfo {
  _id: string;
  creatorId: string;
  ticketNumber: string;
  participants: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IMessage {
  _id: string;
  content: string;
  conversationId: string;
  createdAt:string;
  mediaId: string;
  read: string;
  recipientId: string;
  replyTo: string;
  senderId: string;
  updatedAt: string;
}
export interface IMessageMedia {
  conversationId: string;
  createdAt: string;
  file: string;
  updatedAt: string;
  userId: string;
  _id: string;
}
export interface IConversation {
  _id: string;
  creatorId:string;
  participants: string[];
  ticketNumber: string;
  createdAt: string;
  updatedAt: string;
}
export interface IParticipantInfo {
  _id: string;
  email: string;
  roles: string[];
  member: string[];
  conversationId: string;
  avatar: string;
  ticketNumber: string;
  updatedAt: string;
}
export interface IDataForMarkRead {
  conversationId: string;
  userId: string;
}
export interface IParticipants {
  usersInfo: IParticipantInfo[],
  lastMessages: IMessage[],
}