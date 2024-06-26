import React, {FC} from 'react';
import { IMessage } from '../../types/chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faXmark, faReply} from '@fortawesome/free-solid-svg-icons';
import * as contentConst from '../../utils/constants/content';
import style from './Chat.module.css';

interface InputUsersSideProps {
    replyId: string;
    messages: IMessage[];
    message: IMessage,
    isUpdating:boolean;
    setMessage: (message:IMessage) => void;
    setFile: (file: Blob | string) => void;
    sendMessageHandler: () => void;
    resetReplyHandler: () => void;
}

const InputUsersSide:FC<InputUsersSideProps> = ({
    replyId,
    messages,
    message,
    isUpdating,
    setMessage,
    setFile,
    sendMessageHandler,
    resetReplyHandler,
}) => {

    return (
      <div className={style.typing}>
         {(replyId && messages) && messages.map((message) =>
                message._id === replyId && 
                <div className={style['reply-for']}>
                  <FontAwesomeIcon icon={faReply} className={style['reply-icon']}/>
                  {message.content.slice(0, 30)}...
                  <FontAwesomeIcon onClick={resetReplyHandler} 
                  icon={faXmark} className={style['reset-reply']} />
                </div>
          )}
        <div className={style.input} onClick={(e) => e.stopPropagation()}>
          <div className={style.inner}>
            <input onChange={(e) => 
              setMessage({ ...message, content: e.target.value })}
              value={message?.content}
              type="text"
            />
            {(message && message.content.length > 0) && 
            <FontAwesomeIcon onClick={() => setMessage({...message, content: ''})}
            className={style.reset} icon={faXmark} />}
          </div>

          <div className={style.buttons}>
            <label className={style.file} htmlFor={"upload"}>
              <FontAwesomeIcon
                className={style["photo-icon"]}
                icon={faPaperclip}
              />
            </label>
            <input type="file" name="file" id="upload" hidden
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

export default InputUsersSide;