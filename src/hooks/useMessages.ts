import { useState } from "react";
import { useOutsideClick } from "./useOutsideClick";
import { IMessage } from "../types/chat";
import { useGetMessageMutation, useDeleteMessageMutation } from "../store/chatApi";

const useMessages = () => {
    const [updatedMessage, setUpdatedMessage] = useState<IMessage>({
        _id: '',
        content: '',
        conversationId: '',
        createdAt: '',
        mediaId: '',
        read: '',
        recipientId: '',
        replyTo: '',
        senderId: '',
        updatedAt: '',
      });
      const [isUpdating, setIsUpdating] = useState<boolean>(false);
      const [messageMenu, setMessageMenu] = useOutsideClick();
      const [replyId, setReplyId] = useState<string>('');
      const [replyMessage, setReplyMessage] = useState<string>('');
      const [getMessage] = useGetMessageMutation();
      const [deleteMessage] = useDeleteMessageMutation();

    const editMessageHandler = (id: string) => {
        id && getMessage(id)
          .unwrap()
          .then((data) => {
            setUpdatedMessage({ ...data });
            setIsUpdating(true);
          });
      };
    
      const deleteMessageHandler = (id: string) => {
        id && deleteMessage(id)
            .unwrap()
            .then(() => {
              setMessageMenu('');
            });
      };
    
      const messageIdHandler = (id: string) => {
    
        if (messageMenu === id) {
          setMessageMenu('');
        } else {
          setMessageMenu(id);
        }
      };
    return [editMessageHandler, 
        deleteMessageHandler,
        messageIdHandler,
        isUpdating, setIsUpdating,
        messageMenu,
        replyId, setReplyId,
        replyMessage, setReplyMessage, updatedMessage, setUpdatedMessage
    ] as const
}

export {useMessages};