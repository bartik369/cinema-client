import React, { FC, useState, useRef, useEffect } from "react";
import { 
  useCreateMessageMutation, 
  useGetMessageMutation,
  useDeleteMessageMutation,
  useUpdateMessageMutation,
  useGetConversationMediaQuery,
 } from "../../../../store/chatApi";
import { IUser } from "../../../../types/auth";
import { IMessage, IMessageMedia } from "../../../../types/chat";
import Loader from "../../../../components/loader/Loader";
import SenderMessageMenu from "./SenderMessageMenu";
import RecipientMessageMenu from "./RecipientMessageMenu";
import ENV from "../../../../env.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faCheck, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { FileIcon, defaultStyles } from 'react-file-icon';
import style from "./Messages.module.css";

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
  const [file, setFile] = useState<string | Blob>("");
  const [replyId, setReplyId] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [createMessage] = useCreateMessageMutation();
  const [messageMenu, setMessageMenu] = useState("");
  const [getMessage] = useGetMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();
  const [mediaSkip, setMediaSkip] = useState(true);
  const {data:media} = useGetConversationMediaQuery(conversationId, {skip: mediaSkip})
  
  type IListRefObj = {
    [index: string]: HTMLDivElement | null;
  };
  const messageMenuRef = useRef<IListRefObj>({});

  useEffect(() => {
    if (recipientId && conversationId) {
      setMessage({...message, 
        recipientId: recipientId,
        conversationId: conversationId,
        senderId: user._id,
      });
      setMediaSkip(false)
    }
  }, [recipientId, conversationId, message.content]);

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
          updateMessage(formData).unwrap().then(() => {
            setIsUpdating(false);
            setMessage({...message, content: ''});
          })
        } else {
          createMessage(formData).then(() => {
            setMessage({...message, content: ''});
          })
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
    <div className={style.messages}>
      <div className={style.inner}>
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
                  {message.replyTo && messages.map((item) => 
                  item._id == message.replyTo && <div key={item._id}>{item.content}</div>
                  )}
                  {message.content}
                  </div>
                  {media && media.map((item) => {
                    const fileType: string = item.file.split(".").pop()!;
                    type iconKey = keyof typeof defaultStyles;
                    if (item._id === message.mediaId) {
                      return <div className="fileinfo" key={item._id}>
                      <div className="icon">
                        <FileIcon 
                        extension={fileType} 
                        {...defaultStyles[fileType as iconKey]}
                        color='#c5ced9'
                        glyphColor='white'
                        />
                      </div>
                      <a href={`${ENV.API_URL_UPLOADS_CHAT_MEDIA}${conversationId}/${item.file}`}>{item.file}</a>
                    </div>
                    }
                  }
        
                )}
                </div>
            ) : (
                <div className={style.right}
                key={message._id}
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
                {media && media.map((item) => 
                item._id === message.mediaId && <div>{item.file}</div>
                )}
                </div>
            )
          )
        ) : participants ? 'No active chats' : <Loader />}
      </div>
      <div className={style.typing} onClick={e => e.stopPropagation()}>
        <div className={style.input}>
          <input
            onChange={(e) => setMessage({...message, content: e.target.value})}
            value={message?.content}
            type="text"
          />
        </div>
        <div className={style.buttons}>
          <label className={style.file} htmlFor={"upload"}>
            <FontAwesomeIcon className={style["photo-icon"]} icon={faPaperclip}/>
          </label>
          {(replyId && messages) && messages.map((message) =>
           message._id === replyId && <div>{message.content}</div>
          )}
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
  );
};

export default Messages;
