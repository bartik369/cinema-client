
export interface IChatInfo {
  _id: string;
  creatorId: string;
  ticketNumber: string;
  active: boolean;
  pinned: boolean;
  participants: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IUnreadMessages {
  id: string;
  qty: number;
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
  active: boolean;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface IParticipantInfo {
  _id: string;
  email: string;
  roles: string[];
  member: string[];
  pinned: boolean;
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
export type IListRefObj = {
  [index: string]: HTMLDivElement | null;
};

export interface ILastMessages {
  conten:string;
  createdAt:string;
  read:string
  recipientId:string;
  senderId:string;
  updatedAt:string;
  _id: string[];
}