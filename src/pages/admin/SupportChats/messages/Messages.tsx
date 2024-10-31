import { FC, useState} from 'react';
import {useGetConversationMediaQuery } from '../../../../store/chatApi';
import { IUser } from '../../../../types/auth';
import { IMessage} from '../../../../types/chat';
import Loader from '../../../../components/loader/Loader';
import { useMessages } from '../../../../hooks/useMessages';
import Sender from './Sender';
import Input from './Input';
import Recipient from './Recipient';
import * as contentConst from '../../../../utils/constants/content';
import style from './Messages.module.scss';

interface IMessagesProps {
  participants: IUser[];
  user: IUser;
  messages: IMessage[];
  recipientId: string;
  conversationId: string;
}
const Messages: FC<IMessagesProps> = ({
  participants,
  user,
  messages,
  recipientId,
  conversationId,
}) => {
  const [mediaSkip, setMediaSkip] = useState(true);
  const { data: media } = useGetConversationMediaQuery(conversationId, {
    skip: mediaSkip,
  });
  const [editMessageHandler, deleteMessageHandler, messageIdHandler, isUpdating, setIsUpdating,
    messageMenu, replyId, setReplyId, replyMessage, setReplyMessage, updatedMessage
  ] = useMessages();

  const replayMessageHandler = (id: string) => {
    if (id) {
      messages && messages.forEach((item) => {
         if (item._id === id) setReplyMessage(item.content);
      })
      setReplyId(id);
    }
  };

  return (
    <>
      <div className={style['list-messages']}>
        {messages ? messages.map((message) => message.senderId !== user._id
          ? <div key={message._id}>
            <Recipient
              message={message}
              media={media!}
              messageMenu={messageMenu}
              replayMessageHandler={replayMessageHandler}
              messageIdHandler={messageIdHandler}
              messages={messages}
              participants={participants}
              conversationId={conversationId}
          />
          </div>
          : <div key={message._id}>
            <Sender
              message={message}
              messages={messages}
              media={media!}
              messageMenu={messageMenu}
              editMessageHandler={editMessageHandler}
              deleteMessageHandler={deleteMessageHandler}
              messageIdHandler={messageIdHandler}
              conversationId={conversationId}
            />
            </div>

        )
        : participants
          ? <div className={style.notification}>
            {contentConst.noActiveChats}
          </div>
          : <Loader />
       }
      </div>
      <Input
        replyId={replyId}
        messages={messages}
        recipientId={recipientId}
        conversationId={conversationId}
        replyMessage={replyMessage}
        isUpdating={isUpdating}
        updatedMessage={updatedMessage!}
        setIsUpdating={setIsUpdating}
        setReplyId={setReplyId}
        setMediaSkip={setMediaSkip}
        mediaSkip={mediaSkip}
        user={user}
      />
    </>
  );
};

export default Messages;