import {FC} from 'react';
import { IMessage } from '../../../../types/chat';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip} from "@fortawesome/free-solid-svg-icons";
import * as contentConst from '../../../../utils/constants/content';
import style from "./Messages.module.css";

interface IInputProps {
    message: IMessage;
    messages: IMessage[];
    replyId: string;
    isUpdating: boolean;
    setMessage:(message: IMessage) => void
    sendMessageHandler: () => void;
    setFile: (file: string | Blob) => void;
}

const Input: FC<IInputProps> = ({
    message,
    messages,
    replyId,
    isUpdating,
    setMessage,
    sendMessageHandler,
    setFile,
}) => {

  console.log(message)

    return (
      <div className={style.typing} onClick={(e) => e.stopPropagation()}>
        <div className={style.input}>
          <input onChange={(e) =>
            setMessage({ ...message, content: e.target.value })}
            value={message?.content}
            type="text"
          />
          <div className={style.buttons}>
            <label className={style.file} htmlFor={"upload"}>
              <FontAwesomeIcon
                className={style["photo-icon"]}
                icon={faPaperclip}
              />
            </label>
            {(replyId && messages) && messages.map((message) =>
                message._id === replyId && <div>{message.content}</div>
            )}
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
              {isUpdating ? contentConst.updateBtn : contentConst.sendData}
            </button>
          </div>
        </div>
      </div>
    );
};

export default Input;;