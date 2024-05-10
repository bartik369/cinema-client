export interface IChatInfo {
  _id: string;
  creatorId: string;
  participants: string[];
  createdAt: string;
  updatedAt: string;
}
export interface IMessage {
content: string;
conversationId: string;
createdAt:string;
mediaId: string;
read: boolean;
recipientId:string;
replyTo:string;
senderId:string;
updatedAt:string;
_id:string;
}