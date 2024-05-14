export interface IChatInfo {
  _id: string;
  creatorId: string;
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
export interface IConversation {
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
}