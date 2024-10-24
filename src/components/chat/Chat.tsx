import {FC, useState, useEffect} from 'react';
import { useCreateMessageMutation,useGetMessagesQuery, useGetMessageMutation,
  useDeleteMessageMutation, useUpdateMessageMutation,
  useMarkAsReadMutation, useGetConversationMediaQuery } from '../../store/chatApi';
import Sender from './Recipient';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import Recipient from './Sender';
import { IMessage, IChatInfo } from '../../types/chat';
import { IUser } from '../../types/auth';
import InputUsersSide from './InputUsersSide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark} from '@fortawesome/free-solid-svg-icons';
import * as contentConst from '../../utils/constants/content';
import style from './Chat.module.scss';

interface IChatProps {
    visibleHandler: () => void;
    user: IUser;
    recipientId: string;
    chatInfo: IChatInfo;
}
const Chat: FC<IChatProps> = ({ visibleHandler, user, chatInfo, recipientId}) => {
  const [skip, setSkip] = useState<boolean>(true);
  const [file, setFile] = useState<string | Blob>('');
  const [replyId, setReplyId] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const {data: messages} = useGetMessagesQuery(chatInfo && chatInfo._id, {skip: skip});
  const [createMessage] = useCreateMessageMutation();
  const [getMessage] = useGetMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();
  const [markMessageAsRead] = useMarkAsReadMutation();
  const { data: media } = useGetConversationMediaQuery(chatInfo && chatInfo._id);
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

  useEffect(() => {
    if (recipientId && chatInfo._id) {
      setSkip(false);
      setMessage({
        ...message,
        recipientId: recipientId,
        conversationId: chatInfo._id,
        senderId: user._id,
      });
      markMessageAsRead({
        conversationId: chatInfo._id, 
        userId: user._id,
      });
    }
  }, [recipientId, message.content, chatInfo]);

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

  return (
    <div className={style.chat}>
      <FontAwesomeIcon className={style.close} icon={faXmark} 
        onClick={visibleHandler}
      />
      <div className={style.request}>
        {contentConst.requestNumber}
        <span>{chatInfo && chatInfo.ticketNumber}</span>
      </div>
      <div className={style.messages}>
        {messages ? ( messages.map((message) => message.senderId !== user._id 
          ? <Sender 
            message={message}
            media={media!}
            messageMenu={messageMenu}
            messages={messages}
            chatInfo={chatInfo}
            replayMessageHandler={replayMessageHandler}
            messageIdHandler={messageIdHandler}
          />
          : ( 
          <Recipient 
            message={message}
            user={user}
            media={media!}
            messageMenu={messageMenu}
            messages={messages}
            chatInfo={chatInfo}
            messageIdHandler={messageIdHandler}
            deleteMessageHandler={deleteMessageHandler}
            editMessageHandler={editMessageHandler}
          />
            )
          )
        ) : (
          <div>{contentConst.noMessages}</div>
        )}
      </div>
      <InputUsersSide
        replyId={replyId}
        messages={messages!}
        message={message}
        isUpdating={isUpdating}
        file={file}
        setMessage={setMessage}
        setFile={setFile}
        sendMessageHandler={sendMessageHandler}
        resetReplyHandler={resetReplyHandler}
        resetUpdate={resetUpdateHandler}
      />
    </div>
  );
};

export default Chat;