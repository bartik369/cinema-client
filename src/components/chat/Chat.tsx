import {FC, useState} from 'react';
import { 
  useCreateMessageMutation,
  useGetMessagesQuery,
} from '../../store/chatApi';
import { IUser } from '../../types/auth';
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
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<string | Blob>("");
  const [replyId, setReplyId] = useState<string>("")
  const {data: messages} = useGetMessagesQuery(chatInfo?._id);
  const [createMessage] = useCreateMessageMutation();

  const sendMessageHandler = () => {

    if (user && chatInfo) {
      const formData = new FormData();
      formData.append('senderId', chatInfo.creatorId);
      recipientId && formData.append('recipientId', recipientId);
      formData.append('conversationId', chatInfo._id);
      message && formData.append('message', message);
      replyId && formData.append('replyTo', replyId);
      file && formData.append('file', file);
      formData && createMessage(formData);
    }
  };

  return (
    <div className={style.chat}>
      <FontAwesomeIcon
        className={style.close}
        onClick={visibleHandler}
        icon={faXmark}
      />
      <div className={style.messages}>
       
      </div>
      <div className={style.input}>
        <input
         onChange={(e) => setMessage(e.target.value)}
         value={message}
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