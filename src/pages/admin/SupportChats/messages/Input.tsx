import {FC} from 'react';
import { IMessage } from '../../../../types/chat';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip} from "@fortawesome/free-solid-svg-icons";
import style from "./Messages.module.css";

interface IInputProps {
    message: IMessage;
    messages: IMessage[];
    replyId: string;
    setMessage:(message: IMessage) => void
    sendMessageHandler: () => void;
    isUpdating: boolean;
    setFile: (file: string | Blob) => void;
}

const Input: FC<IInputProps> = ({
    message,
    messages,
    replyId,
    setMessage,
    sendMessageHandler,
    isUpdating,
    setFile,
}) => {
    return (
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
    );
};

export default Input;;