import {FC, useState, useEffect, useRef} from 'react';
import { 
  useCreateMessageMutation,
  useGetMessagesQuery,
  useGetMessageMutation,
  useDeleteMessageMutation,
  useUpdateMessageMutation,
} from '../../store/chatApi';
import { IUser } from '../../types/auth';
import { IMessage } from '../../types/chat';
import { IChatInfo } from '../../types/chat';
import SenderMessageMenu from '../../pages/admin/SupportChats/messages/SenderMessageMenu';
import RecipientMessageMenu from '../../pages/admin/SupportChats/messages/RecipientMessageMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPaperclip } from '@fortawesome/free-solid-svg-icons';
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
            setIsUpdating(false);
          })
        } else {
          createMessage(formData);
        }
  };

  const editMessageHandler = (id: string) => {
    getMessage(id).unwrap().then((data) => {
      setMessage({...data});
      setIsUpdating(true);
    });
  }
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
      <FontAwesomeIcon
        className={style.close}
        onClick={visibleHandler}
        icon={faXmark}
      />
      <div>Обращение № {chatInfo && chatInfo.ticketNumber}</div>
      <div className={style.messages}>
      {messages ? (
          messages.map((message) =>
            message.senderId !== user._id ? (
                <div className={style.left}
                  key={message._id}
                  onClick={e => e.stopPropagation()}> 
                   <div className={message._id == messageMenu 
                  ? style.menu 
                  : style.inactive}>
                    <RecipientMessageMenu
                    messageId={message._id}
                    reply={replayMessageHandler}
                    />
                  </div>
                  <div className={style.info} 
                   onClick={() => setMessageMenu(message._id)}
                   ref={(elem) => (messageMenuRef.current[message._id] = elem)}>
                  {message.content}
                  </div>
                </div>
            ) : (
                <div className={style.right}
                key={message._id}
                  onClick={e => e.stopPropagation()}>
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
        ) : "no messages"}
      </div>
      <div className={style.typing}>
          {(replyId && messages) && messages.map((message) =>
           message._id === replyId && <div className={style['reply-text']}>{message.content}</div>
          )}
        <div className={style.input} onClick={e => e.stopPropagation()}>
          <input
            onChange={(e) => setMessage({...message, content: e.target.value})}
            value={message?.content}
            type="text"
          />
          <div className={style.buttons}>
          <label className={style.file} htmlFor={"upload"}>
            <FontAwesomeIcon className={style["photo-icon"]} icon={faPaperclip}/>
          </label>

          <input type="file" name="file" id="upload" hidden
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.files && setFile(e.target.files[0])
            }
          />
          <button className={style.btn} onClick={sendMessageHandler}>
            {isUpdating ? 'Обновить' : 'Отправить'}
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;