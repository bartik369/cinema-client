import {FC, useState, useEffect, useRef} from 'react';
import { useCreateMessageMutation,useGetMessagesQuery, useGetMessageMutation,
  useDeleteMessageMutation, useUpdateMessageMutation,
  useMarkAsReadMutation,
 } from '../../store/chatApi';
 import RecipientMessageMenu from '../../pages/admin/SupportChats/messages/RecipientMessageMenu';
 import SenderMessageMenu from '../../pages/admin/SupportChats/messages/SenderMessageMenu';
 import { IMessage, IChatInfo } from '../../types/chat';
import { IUser } from '../../types/auth';
import InputUsersSide from './InputUsersSide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck, faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import * as contentConst from '../../utils/constants/content';
import style from './Chat.module.css'

interface IChatProps {
    visibleHandler: () => void;
    user: IUser;
    recipientId: string;
    chatInfo: IChatInfo;
}

const Chat: FC<IChatProps> = ({ visibleHandler, user, chatInfo, recipientId}) => {
  const [file, setFile] = useState<string | Blob>("");
  const [replyId, setReplyId] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const {data: messages} = useGetMessagesQuery(chatInfo?._id);
  const [messageMenu, setMessageMenu] = useState("");
  const [createMessage] = useCreateMessageMutation();
  const [getMessage] = useGetMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();
  const [markMessageAsRead] = useMarkAsReadMutation();

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

  type IListRefObj = {
    [index: string]: HTMLDivElement | null;
  };
  const messageMenuRef = useRef<IListRefObj>({});

  useEffect(() => {
    if (recipientId && chatInfo._id) {
      setMessage({...message, 
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

  useEffect(() => {
    const outsideClickhandler = (e: any) => {
      
      if (messageMenuRef.current) {
        Object.values(messageMenuRef).map((item) => {

          if (item !== e.target) {
            setMessageMenu('');
            setMessage({...message, content: ''});
            setReplyId('');
          }
        });
      }
    };
    document.addEventListener("click", outsideClickhandler);
  }, []);

  const sendMessageHandler = () => {
    const formData = new FormData();
        type messageKey = keyof typeof message;
        Object.keys(message).forEach((key) => {
          formData.append(key, message[key as messageKey]);
        });
        file && formData.append("file", file);
        
        if (isUpdating) {
          updateMessage(formData).unwrap().then((data) => {
            setMessage({...message, content: ''});
            setIsUpdating(false);
          })
        } else {
          createMessage(formData).unwrap().then(() => {
            setMessage({...message, content: ''});
          })
        }
  };

  const editMessageHandler = (id: string) => {
    getMessage(id).unwrap().then((data) => {
      setMessage({...data});
      setIsUpdating(true);
    });
  };

  const deleteMessageHandler = (id: string) => {
    id && deleteMessage(id).unwrap().then((data) => {
      setMessageMenu('');
    })
  }

  const replayMessageHandler = (id:string) => {
    
    if (id) {
      setMessage({...message, replyTo: id});
      setReplyId(id);
    }
  }

  return (
    <div className={style.chat}>
      <FontAwesomeIcon className={style.close} onClick={visibleHandler} icon={faXmark}/>
      <div className={style.request}>
        {contentConst.requestNumber}{chatInfo && chatInfo.ticketNumber}
      </div>
      <div className={style.messages}>
      {messages ? (
          messages.map((message) =>
            message.senderId !== user._id 
              ? (<div className={style.left} key={message._id}
                  onClick={e => e.stopPropagation()}> 
                   <div className={message._id == messageMenu 
                  ? style.menu 
                  : style.inactive}>
                    <RecipientMessageMenu messageId={message._id} 
                    reply={replayMessageHandler}/>
                  </div>
                  <div className={style.info} 
                   onClick={() => setMessageMenu(message._id)}
                   ref={(elem) => (messageMenuRef.current[message._id] = elem)}>
                  {message.content}
                  </div>
                </div>
            ) : (
                <div className={style.right} key={message._id}
                  onClick={e => e.stopPropagation()}>
                    <div className={message.read}>
                      {message.read === 'yes' 
                      ? <FontAwesomeIcon icon={faCheckDouble} />
                      : <FontAwesomeIcon icon={faCheck} />
                      }
                    </div>
                     <div className={message._id === messageMenu 
                  ? style.menu 
                  : style.inactive}>
                    <SenderMessageMenu 
                    messageId={message._id}
                    editMessage={editMessageHandler}
                    deleteMessage={deleteMessageHandler}
                    />
                  </div>
                   <div className={style.info}
                   onClick={() => setMessageMenu(message._id)}
                   ref={(elem) => (messageMenuRef.current[message._id] = elem)}>
                  {message.content}
                </div>
                </div>
            )
          )
        ) : <div>{contentConst.noMessages}</div>}
      </div>
      <InputUsersSide
      replyId={replyId}
      messages={messages!}
      message={message}
      setMessage={setMessage}
      setFile={setFile}
      isUpdating={isUpdating}
      sendMessageHandler={sendMessageHandler}
      />
    </div>
  );
};

export default Chat;