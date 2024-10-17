import { FC, useState, useRef} from 'react';
import {useGetMessageMutation, useDeleteMessageMutation, useGetConversationMediaQuery
} from '../../../../store/chatApi';
import { IUser } from '../../../../types/auth';
import { IMessage, IListRefObj } from '../../../../types/chat';
import Loader from '../../../../components/loader/Loader';
import { useOutsideClick } from '../../../../hooks/useOutsideClick';
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
  const [replyId, setReplyId] = useState<string>('');
  const [replyMessage, setReplyMessage] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [getMessage] = useGetMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const [mediaSkip, setMediaSkip] = useState(true);
  const { data: media } = useGetConversationMediaQuery(conversationId, {
    skip: mediaSkip,
  });
  const messageMenuRef = useRef<IListRefObj>({});
  const [messageMenu, setMessageMenu] = useOutsideClick(messageMenuRef);

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

  const replayMessageHandler = (id: string) => {
    if (id) {
      messages && messages.forEach((item) => {
         if (item._id === id) {
           setReplyMessage(item.content);
         }
      })
      setReplyId(id);
    }
  };
  const messageIdHandler = (id: string) => {

    if (messageMenu === id) {
      setMessageMenu('');
    } else {
      setMessageMenu(id);
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