import {FC, useState, useEffect} from 'react';
import { useGetMessagesQuery, useMarkAsReadMutation, useGetConversationMediaQuery } from '../../store/chatApi';
import Sender from './Recipient';
import Recipient from './Sender';
import {useChat} from '../../hooks/useChat';
import { IChatInfo } from '../../types/chat';
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
  const {data: messages} = useGetMessagesQuery(chatInfo && chatInfo._id, {skip: skip});
  const [markMessageAsRead] = useMarkAsReadMutation();
  const { data: media } = useGetConversationMediaQuery(chatInfo && chatInfo._id);
  const [message, setMessage, messageMenu, setMessageMenu, editMessageHandler, deleteMessageHandler,
    replayMessageHandler, messageIdHandler, resetReplyHandler, resetUpdateHandler, 
    isUpdating, setIsUpdating, replyId, setReplyId, sendMessageHandler, file, setFile] = useChat();

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