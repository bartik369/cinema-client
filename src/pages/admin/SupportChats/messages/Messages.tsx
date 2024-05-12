import { FC, useState } from "react";
import { useCreateMessageMutation } from "../../../../store/chatApi";
import { IUser } from "../../../../types/auth";
import { IMessage } from "../../../../types/chat";
import Loader from "../../../../components/loader/Loader";
import SenderMessageMenu from "./SenderMessageMenu";
import RecipientMessageMenu from "./RecipientMessageMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip} from '@fortawesome/free-solid-svg-icons';
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
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<string | Blob>("");
  const [replyId, setReplyId] = useState<string>("");
  const [createMessage] = useCreateMessageMutation();
  const [senderMessageMenu, setSenderMessageMenu] = useState<boolean>(false)
  const [recipientMessageMenu, setRecipientMessageMenu] = useState<boolean>(false)

  const sendMessageHandler = () => {
    if (user && conversationId) {
      const formData = new FormData();
      formData.append("senderId", user._id);
      recipientId && formData.append("recipientId", recipientId);
      formData.append("conversationId", conversationId);
      message && formData.append("message", message);
      replyId && formData.append("replyTo", replyId);
      file && formData.append("file", file);
      formData && createMessage(formData);
    }
  };

  const messageMenuHandler = () => {

  }


  return (
    <div className={style.messages}>
      <div className={style.inner}>
        {messages 
        ? messages.map((message) => (
            message.senderId === user._id
            ? <div className={style.message} 
               onClick={() => setRecipientMessageMenu(!recipientMessageMenu)}>
              <div className={style.left}>
             {recipientMessageMenu && <RecipientMessageMenu />}
                 {message.content}
               </div>
              </div>
            : <div className={style.message}
            onClick={() => setSenderMessageMenu(!senderMessageMenu)}>
               <div className={style.right}>
               {senderMessageMenu && <SenderMessageMenu />}
              {message.content}
              </div>
              </div>
          ))
        : <Loader />}
      </div>
      <div className={style.typing}>
        <div className={style.input}>
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            type="text"
          />
         </div>
         <div className={style.buttons}>
         <label className={style.file} htmlFor={"upload"}>
            <FontAwesomeIcon className={style['photo-icon']} icon={faPaperclip} />
          </label>
         <input type="file" name="file" id="upload" hidden
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.files && setFile(e.target.files[0])
            }
          />
          <button className={style.btn} onClick={sendMessageHandler}>отправить</button>
         </div>
      </div>
    </div>
  );
};

export default Messages;
