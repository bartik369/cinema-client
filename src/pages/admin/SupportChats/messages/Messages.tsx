import React, { FC, useState, useRef, useEffect } from "react";
import { useCreateMessageMutation } from "../../../../store/chatApi";
import { IUser } from "../../../../types/auth";
import { IMessage } from "../../../../types/chat";
import Loader from "../../../../components/loader/Loader";
import SenderMessageMenu from "./SenderMessageMenu";
import RecipientMessageMenu from "./RecipientMessageMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
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
  const [messageMenu, setMessageMenu] = useState("");

  type IListRefObj = {
    [index: string]: HTMLDivElement | null;
  };
  const messageMenuRef = useRef<IListRefObj>({});
  const messageEl = useRef(null);

  useEffect(() => {
    const outsideClickhandler = (e: any) => {
      if (messageMenuRef.current) {
        console.log('chick')
        Object.values(messageMenuRef).map((item) => {
          console.log(item.current);
          if (item !== e.target) {
            setMessageMenu("");
            setReplyId("");
          }
        });
      }
    };
    document.addEventListener("click", outsideClickhandler);
  }, []);

  console.log(messageMenu)


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

  return (
    <div className={style.messages}>
      <div className={style.inner}>
        {messages ? (
          messages.map((message) =>
            message.senderId === user._id ? (
                <div className={style.left}
                  onClick={e => e.stopPropagation()}> 
                   <div className={message._id == messageMenu 
                  ? style.menu 
                  : style.inactive}>
                    <RecipientMessageMenu />
                  </div>
                  <div className={style.info} 
                   onClick={() => setMessageMenu(message._id)}
                   ref={(elem) => (messageMenuRef.current[message._id] = elem)}>
                  {message.content}
                  </div>
                </div>
            ) : (
                <div className={style.right}
                  onClick={e => e.stopPropagation()}>
                     <div className={message._id === messageMenu 
                  ? style.menu 
                  : style.inactive}>
                    <SenderMessageMenu />
                  </div>
                   <div className={style.info}
                   onClick={() => setMessageMenu(message._id)}
                   ref={(elem) => (messageMenuRef.current[message._id] = elem)}>
                  {message.content}
                </div>
                </div>
            )
          )
        ) : (
          <Loader />
        )}
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
            <FontAwesomeIcon
              className={style["photo-icon"]}
              icon={faPaperclip}
            />
          </label>
          <input
            type="file"
            name="file"
            id="upload"
            hidden
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.files && setFile(e.target.files[0])
            }
          />
          <button className={style.btn} onClick={sendMessageHandler}>
            отправить
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
function e(e: any): (this: Document, ev: MouseEvent) => any {
  throw new Error("Function not implemented.");
}
