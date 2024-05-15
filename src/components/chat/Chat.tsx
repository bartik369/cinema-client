import {FC, useState, useEffect} from 'react';
import { 
  useCreateMessageMutation,
  useGetMessagesQuery,
} from '../../store/chatApi';
import { IUser } from '../../types/auth';
import { IMessage } from '../../types/chat';
import { IChatInfo } from '../../types/chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import style from './Chat.module.css'

interface IChatProps {
    visibleHandler: () => void;
    user: IUser;
    recipientId: string;
    chatInfo: IChatInfo;
}

const Chat: FC<IChatProps> = ({ visibleHandler, user, chatInfo, recipientId}) => {
  const [file, setFile] = useState<string | Blob>("");
  const [replyId, setReplyId] = useState<string>("")
  const {data: messages} = useGetMessagesQuery(chatInfo?._id);
  const [createMessage] = useCreateMessageMutation();

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

  useEffect(() => {
    if (recipientId && chatInfo._id) {
      setMessage({...message, 
        recipientId: recipientId,
        conversationId: chatInfo._id,
        senderId: user._id,
      });
    }
  }, [recipientId, message.content, chatInfo]);

  console.log(messages)


  const sendMessageHandler = () => {
    const formData = new FormData();
        type messageKey = keyof typeof message;
        Object.keys(message).forEach((key) => {
          formData.append(key, message[key as messageKey]);
        });
        file && formData.append("file", file);
        createMessage(formData);
  };

  return (
    <div className={style.chat}>
      <FontAwesomeIcon
        className={style.close}
        onClick={visibleHandler}
        icon={faXmark}
      />
      <div>Обращение № {chatInfo && chatInfo.ticketNumber}</div>
      <div className={style.messages}>
       {messages && messages.map((message) => 
       <div key={message._id}>{message.content}</div>
       )}
      </div>
      <div className={style.input}>
        <input
         onChange={(e) => setMessage({...message, content: e.target.value})}
         value={message.content}
         type="text" />
        <input type='file' name='file' 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.files &&
          setFile(e.target.files[0])
         }/>
        <button onClick={sendMessageHandler}>send</button>
      </div>
    </div>
  );
};

export default Chat;