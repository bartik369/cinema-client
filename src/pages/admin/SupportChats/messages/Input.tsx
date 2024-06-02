import {FC, memo} from 'react';
import { IMessage } from '../../../../types/chat';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faReply, faXmark} from "@fortawesome/free-solid-svg-icons";
import * as contentConst from '../../../../utils/constants/content';
import style from "./Messages.module.css";

interface IInputProps {
    message: IMessage;
    replyMessage: string;
    replyId: string;
    isUpdating: boolean;
    resetReplyHandler: () => void;
    setMessage:(message: IMessage) => void
    sendMessageHandler: () => void;
    setFile: (file: string | Blob) => void;
}

const Input: FC<IInputProps> = memo(({
    message,
    replyMessage,
    replyId,
    isUpdating,
    resetReplyHandler,
    setMessage,
    sendMessageHandler,
    setFile,
}) => {

    return (
      <div className={style.typing} onClick={(e) => e.stopPropagation()}>
        <div className={style.input}>
           { replyId && <div className={style['reply-for']}>
                  <FontAwesomeIcon icon={faReply} className={style['reply-icon']}/>
                  {replyMessage}
                  <FontAwesomeIcon onClick={resetReplyHandler} 
                  icon={faXmark} className={style['reset-reply']} />
            </div>}
            <div className={style.inner}>
            <input onChange={(e) =>
              setMessage({ ...message, content: e.target.value })}
              value={message?.content}
              type="text"
            />
            {(message && message.content.length > 0) && 
              <FontAwesomeIcon onClick={() => setMessage({...message, content: ''})}
              className={style.reset} icon={faXmark} />
            }
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
              {isUpdating ? contentConst.updateBtn : contentConst.sendData}
            </button>
          </div>
        </div>
      </div>
    );
});

export default Input;;