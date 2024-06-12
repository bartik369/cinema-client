import React, {FC, useState, useRef, useEffect} from 'react';
import { IMessage} from '../../../../types/chat';
import { IUser } from '../../../../types/auth';
import { useCreateMessageMutation, useUpdateMessageMutation 
} from '../../../../store/chatApi';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faReply, faXmark} from "@fortawesome/free-solid-svg-icons";
import * as contentConst from '../../../../utils/constants/content';
import style from './Messages.module.css';

interface IInputProps {
    messages: IMessage[];
    replyMessage: string;
    recipientId: string;
    conversationId: string;
    replyId: string;
    mediaSkip: boolean;
    isUpdating: boolean;
    updatedMessage: IMessage;
    user: IUser;
    setMessageMenu: (id: string) => void;
    setMediaSkip: (mediaSkip: boolean) => void;
    setIsUpdating: (isUpdating: boolean) => void;
    setReplyId: (id: string) => void;
}
const Input: FC<IInputProps> = ({
    replyMessage,
    recipientId,
    conversationId,
    replyId,
    isUpdating,
    updatedMessage,
    user,
    setReplyId,
    setIsUpdating,
    setMediaSkip,
    setMessageMenu,
}) => {
  const [file, setFile] = useState<string | Blob>("");
  const [createMessage] = useCreateMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();

    type IListRefObj = {
    [index: string]: HTMLDivElement | null;
  };
  const messageMenuRef = useRef<IListRefObj>({});
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

  const sendMessageHandler = () => {
    const formData = new FormData();
    type messageKey = keyof typeof message;
    Object.keys(message).forEach((key) => {
      formData.append(key, message[key as messageKey]);
    });
    file && formData.append("file", file);

    if (isUpdating) {
      updateMessage(formData)
        .unwrap()
        .then(() => {
          setIsUpdating(false);
          setMessage({ ...message, content: '', replyTo: '' });
          setReplyId('');
        });
    } else {
      createMessage(formData).then(() => {
        setMessage({ ...message, content: '', replyTo: '' });
        setReplyId('');
      });
    }
  };

  const resetReplyHandler = () => {
    setMessage({ ...message, content: '', replyTo: '' });
    setReplyId('');
  };

    useEffect(() => {
    const outsideClickhandler = (e: any) => {
      if (messageMenuRef.current) {
        Object.values(messageMenuRef).map((item) => {
          if (item !== e.target) {
            setMessageMenu('');
            setMessage({ ...message, content: '' });
            // setReplyId('');
          }
        });
      }
    };
    document.addEventListener("click", outsideClickhandler);
  }, []);

  useEffect(() => {
      setMessage({
        ...message,
        recipientId: recipientId && recipientId,
        conversationId: conversationId && conversationId,
        senderId: user?._id,
        replyTo: replyId && replyId,
      });
      setMediaSkip(false);
  }, [recipientId, conversationId, replyId])

  useEffect(() => {
    updatedMessage && 
    setMessage({ ...updatedMessage });
  }, [updatedMessage]);

    return (
      <div className={style.typing} onClick={(e) => e.stopPropagation()}>
        <div className={style.input}>
          {replyId && (
            <div className={style["reply-for"]}>
              <FontAwesomeIcon icon={faReply} className={style["reply-icon"]} />
              {replyMessage}
              <FontAwesomeIcon
                onClick={resetReplyHandler}
                icon={faXmark}
                className={style["reset-reply"]}
              />
            </div>
          )}
          <div className={style.inner}>
            <input onChange={(e) => setMessage({ ...message, content: e.target.value })}
              value={message?.content}
              type="text"
            />
            {message && message.content.length > 0 && (
              <FontAwesomeIcon
                onClick={() => setMessage({ ...message, content: "" })}
                className={style.reset}
                icon={faXmark}
              />
            )}
          </div>
          <div className={style.buttons}>
            <label className={style.file} htmlFor={"upload"}>
              <FontAwesomeIcon className={style["photo-icon"]} icon={faPaperclip}/>
            </label>
            <input type="file"name="file" id="upload" hidden
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                e.target.files && setFile(e.target.files[0])
              }
            />
            <button className={style.btn} onClick={sendMessageHandler}>
              {isUpdating ? contentConst.updateBtn : contentConst.sendData}
            </button>
          </div>
        </div>
      </div>
    );
};

export default React.memo(Input);