import {FC, useState, useEffect, useRef} from 'react';
import { useCreateMessageMutation,useGetMessagesQuery, useGetMessageMutation,
  useDeleteMessageMutation, useUpdateMessageMutation,
  useMarkAsReadMutation, useGetConversationMediaQuery, useGetRecipientInfoQuery,
 } from '../../store/chatApi';
 import RecipientMessageMenu from './RecipientMessageMenu';
 import SenderMessageMenu from './SenderMessageMenu';
 import { IMessage, IChatInfo } from '../../types/chat';
import { IUser } from '../../types/auth';
import InputUsersSide from './InputUsersSide';
import Time from '../../pages/admin/SupportChats/messages/Time';
import MediaFile from '../../pages/admin/SupportChats/messages/MediaFile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck, faCheckDouble, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import ENV from '../../env.config';
import defaultAvatar from "../../assets/pics/profile-circle.svg";
import * as contentConst from '../../utils/constants/content';
import supportAvatar from '../../assets/pics/support.png'
import style from './Chat.module.css';

interface IChatProps {
    visibleHandler: () => void;
    user: IUser;
    recipientId: string;
    chatInfo: IChatInfo;
}
const Chat: FC<IChatProps> = ({ visibleHandler, user, chatInfo, recipientId}) => {
  const [skip, setSkip] = useState<boolean>(true);
  const [file, setFile] = useState<string | Blob>("");
  const [replyId, setReplyId] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const {data: messages} = useGetMessagesQuery(chatInfo && chatInfo._id, {skip: skip});
  const [messageMenu, setMessageMenu] = useState("");
  const [createMessage] = useCreateMessageMutation();
  const [getMessage] = useGetMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();
  const [markMessageAsRead] = useMarkAsReadMutation();
  // const {data: recipientInfo} = useGetRecipientInfoQuery(recipientId && recipientId, {skip: skip});
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

  type IListRefObj = {
    [index: string]: HTMLDivElement | null;
  };
  const messageMenuRef = useRef<IListRefObj>({});

  useEffect(() => {
    
    if (recipientId && chatInfo._id) {
      setSkip(false);
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
          updateMessage(formData).unwrap().then(() => {
            setMessage({...message, content: '', replyTo: ''});
            setIsUpdating(false);
          })
        } else {
          createMessage(formData).unwrap().then(() => {
            setMessage({...message, content: '', replyTo: ''});
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
    id && deleteMessage(id).unwrap().then(() => {
      setMessageMenu('');
    })
  }

  const replayMessageHandler = (id:string) => {
    
    if (id) {
      setMessage({...message, replyTo: id});
      setReplyId(id);
    }
  }
  const messageIdHandler = (id: string) => {

    if (messageMenu === id) {
      setMessageMenu("");
    } else {
      setMessageMenu(id);
    }
  };

  return (
    <div className={style.chat}>
      <FontAwesomeIcon
        className={style.close}
        onClick={visibleHandler}
        icon={faXmark}
      />
      <div className={style.request}>
        {contentConst.requestNumber}
        <span>{chatInfo && chatInfo.ticketNumber}</span>
      </div>
      <div className={style.messages}>
        {messages ? ( messages.map((message) => message.senderId !== user._id 
          ? (<div className={style.left} key={message._id}
                onClick={(e) => e.stopPropagation()}>
                <div className={style.block}>
                <div className={style.avatar}>
                <img src={supportAvatar} alt="" />
                </div>
                </div>
                <div className={style.content}>
                  <div className={style.info}> 
                    <div className={message._id == messageMenu
                      ? style.active
                      : style.inactive}>
                      <RecipientMessageMenu
                        messageId={message._id}
                        reply={replayMessageHandler}
                      />
                    </div>
                    <div className={style.name}>Support</div>
                    <div className={style.time}>
                      <Time timeStamp={message.createdAt} />
                    </div>
                    <div className={style.menu} onClick={() => messageIdHandler(message._id)}
                      ref={(elem) => (messageMenuRef.current[message._id] = elem)}>
                      <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                  </div>
                  <div className={style.text}>
                    {message.replyTo && messages.map((item) => item._id == message.replyTo && (
                      <div className={style.reply} key={item._id}>
                        <span>Вы</span>
                        {item.content.slice(0, 40)}...
                      </div>
                    ))}
                    {message.content}
                    <MediaFile media={media!} message={message} conversationId={chatInfo._id}/>
                  </div>
                </div>
              </div>
            ) : (
              <div className={style.right} key={message._id}
                onClick={(e) => e.stopPropagation()}>
                <div className={style.content}>
                  <div className={style.info}>
                    <div className={ message._id == messageMenu
                        ? style.active
                        : style.inactive
                    }>
                      <SenderMessageMenu
                        messageId={message._id}
                        editMessage={editMessageHandler}
                        deleteMessage={deleteMessageHandler}
                      />
                    </div>
                    <div className={style.name}>Вы</div>
                    <div className={style.time}>
                      <Time timeStamp={message.createdAt} />
                    </div>
                    <div className={style.menu}
                      onClick={() => messageIdHandler(message._id)}
                      ref={(elem) =>
                        (messageMenuRef.current[message._id] = elem)
                      }>
                      <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                  </div>
                  <div className={style.text}>
                    {message.replyTo && messages.map((item) =>
                      item._id == message.replyTo && (
                      <div className={style.reply} key={item._id}>
                        <span>Support</span>
                        {item.content.slice(0, 40)}...
                      </div>
                    ))}
                    {message.content}
                    <MediaFile media={media!} message={message} conversationId={chatInfo._id}/>
                    <div className={style.read}>
                      {message.read === "yes" ? (
                        <FontAwesomeIcon className={style.blue} icon={faCheckDouble} />
                      ) : (
                        <FontAwesomeIcon className={style.dark} icon={faCheck}/>
                      )}
                    </div>
                  </div>
                </div>
                <div className={style.block}>
                <div className={style.avatar}>
                <img src={user && `${ENV.API_URL_UPLOADS_USERS_AVATAR}${user.avatar}`} alt="" />
                </div>
                </div>
              </div>
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
        setMessage={setMessage}
        setFile={setFile}
        isUpdating={isUpdating}
        sendMessageHandler={sendMessageHandler}
      />
    </div>
  );
};

export default Chat;