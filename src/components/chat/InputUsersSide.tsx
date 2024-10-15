import React, {FC} from 'react';
import { IMessage } from '../../types/chat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faReply} from '@fortawesome/free-solid-svg-icons';
import InputActions from "./InputActions";
import ButtonsActions from "./ButtonsActions";
import style from './Chat.module.scss';

interface InputUsersSideProps {
    replyId: string;
    messages: IMessage[];
    message: IMessage,
    isUpdating:boolean;
    file: string | Blob;
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
    file,
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
            <InputActions
                message={message}
                setMessage={setMessage}
            />
            <ButtonsActions
                file={file}
                setFile={setFile}
                sendMessageHandler={sendMessageHandler}
                isUpdating={isUpdating}
            />
        </div>
      </div>
    );
};

export default InputUsersSide;