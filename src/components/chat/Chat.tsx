import {FC, useState} from 'react';
import { useGetConversationQuery, useCreateMessageMutation, useGetMessagesQuery } from '../../store/chatApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import style from './Chat.module.css'
import { IUser } from '../../types/auth';

interface IChatProps {
    visibleHandler: () => void;
    user: IUser;
}

const Chat: FC<IChatProps> = ({ visibleHandler, user }) => {
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<string | Blob>("");
  const {data: convessationId} = useGetConversationQuery(user && user._id);
  // const {data: messages} = useGetMessagesQuery(convessationId);
  const [createMessage] = useCreateMessageMutation();

  const sendMessageHandler = () => {
    const formData = new FormData();
    message && formData.append('message', message);
    file && formData.append('file', file);
    formData && createMessage(formData);
  };

  console.log(file)
  console.log(message)

  return (
    <div className={style.chat}>
      <FontAwesomeIcon
        className={style.close}
        onClick={visibleHandler}
        icon={faXmark}
      />
      <div className={style.messages}></div>
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