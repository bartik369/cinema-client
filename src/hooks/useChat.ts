import { useState } from "react";
import { IMessage } from "../types/chat";
import { useOutsideClick } from "./useOutsideClick";
import { useGetMessageMutation,  useDeleteMessageMutation, useCreateMessageMutation, useUpdateMessageMutation} from "../store/chatApi";
const useChat = () => {
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [replyId, setReplyId] = useState<string>('');
    const [file, setFile] = useState<string | Blob>('');
    const [message, setMessage] = useState<IMessage>({
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
      const [messageMenu, setMessageMenu] = useOutsideClick();
      const [getMessage] = useGetMessageMutation();
      const [deleteMessage] = useDeleteMessageMutation();
      const [createMessage] = useCreateMessageMutation();
      const [updateMessage] = useUpdateMessageMutation();
      const editMessageHandler = (id: string) => {
        getMessage(id).unwrap().then((data) => {
          setMessage({...data});
          setIsUpdating(true);
        }).catch(error => console.log(error));
      };
    
      const deleteMessageHandler = (id: string) => {
        id && deleteMessage(id).unwrap().then(() => {
          setMessageMenu('');
        }).catch(error => console.log(error));
      }
    
      const replayMessageHandler = (id:string) => {
        if (id) {
          setMessage({...message, replyTo: id});
          setReplyId(id);
        }
      }
      const messageIdHandler = (id: string) => {
        if (messageMenu === id) {
          setMessageMenu('');
        } else {
          setMessageMenu(id);
        }
      };
    
      const resetReplyHandler = () => {
        setMessage({ ...message, content: '', replyTo: '' });
        setReplyId('');
      };
      const resetUpdateHandler = () => {
        setIsUpdating(false);
        setMessage({...message, content: ''});
      }

      const sendMessageHandler = () => {
        const formData = new FormData();
            type messageKey = keyof typeof message;
            Object.keys(message).forEach((key) => {
              formData.append(key, message[key as messageKey]);
            });
            file && formData.append('file', file);
    
            if (isUpdating) {
              updateMessage(formData).unwrap().then(() => {
                setMessage({...message, content: '', replyTo: ''});
                setReplyId('');
                setIsUpdating(false);
              }).catch(error => console.log(error));
            } else {
              createMessage(formData).unwrap().then(() => {
                setMessage({...message, content: '', replyTo: ''})
                setReplyId('');
              }).catch(error => console.log(error));
            }
      };

      return [
         message, setMessage, 
         messageMenu, setMessageMenu,
         editMessageHandler, deleteMessageHandler, replayMessageHandler,
         messageIdHandler, resetReplyHandler,
         resetUpdateHandler, isUpdating, setIsUpdating, replyId, 
         setReplyId, sendMessageHandler, file, setFile,
        ] as const
}

export {useChat}